import { NextResponse } from "next/server";
import { Resend } from "resend";
import { OperatorNotificationEmail } from "@/emails/operator-notification";
import { ApplicantConfirmationEmail } from "@/emails/applicant-confirmation";
import {
  APPLY_CONFIG,
  isApplyType,
  type ApplyType,
} from "@/lib/apply-config";

export const runtime = "nodejs";

const FROM_EMAIL = "Sam Elsner <sam@thesamelsner.com>";

interface ApplyPayload {
  type: ApplyType;
  fullName: string;
  email: string;
  phone?: string;
  workingOn: string;
  constraint: string;
  successIn90Days: string;
  anythingElse?: string;
  bookedTimeIso?: string;
  bookedTimeDisplay?: string;
}

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function validate(p: Partial<ApplyPayload>): p is ApplyPayload {
  if (!p.type || !isApplyType(p.type)) return false;
  if (!p.fullName || p.fullName.trim().length < 2) return false;
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return false;
  if (!p.workingOn || p.workingOn.trim().length < 100) return false;
  if (!p.constraint || p.constraint.trim().length < 100) return false;
  if (!p.successIn90Days || p.successIn90Days.trim().length < 100) return false;
  return true;
}

/**
 * Push applicant into the correct Kit form via the v4 API. Two-step:
 *  1) POST /v4/subscribers       -> create / upsert subscriber
 *  2) POST /v4/forms/{id}/subscribers/{subscriber_id}
 *                                -> add to the form
 *
 * Best-effort: never blocks the form submission. Operator email is the
 * source of truth.
 */
async function pushToKit(
  email: string,
  fullName: string,
  kitFormId: number,
): Promise<boolean> {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    console.info("[kit] skipped: missing KIT_API_KEY");
    return false;
  }
  const baseHeaders = {
    "X-Kit-Api-Key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  try {
    const firstName = fullName.trim().split(/\s+/)[0];
    const subRes = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({
        email_address: email,
        first_name: firstName,
      }),
    });
    if (!subRes.ok) {
      const text = await subRes.text();
      console.error("[kit] subscriber create failed:", subRes.status, text);
      return false;
    }
    const subData = (await subRes.json()) as { subscriber?: { id?: number } };
    const subscriberId = subData.subscriber?.id;
    if (!subscriberId) {
      console.error("[kit] no subscriber.id in response:", subData);
      return false;
    }
    const formRes = await fetch(
      `https://api.kit.com/v4/forms/${kitFormId}/subscribers/${subscriberId}`,
      { method: "POST", headers: baseHeaders },
    );
    if (!formRes.ok) {
      const text = await formRes.text();
      console.error(
        "[kit] add-to-form failed:",
        formRes.status,
        text,
        "form_id=",
        kitFormId,
        "sub_id=",
        subscriberId,
      );
      return false;
    }
    console.info(
      "[kit] subscribed",
      email,
      "→ form",
      kitFormId,
      "(sub_id",
      subscriberId,
      ")",
    );
    return true;
  } catch (err) {
    console.error("[kit] subscribe threw:", err);
    return false;
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.COHORT_NOTIFY_EMAIL;
  if (!apiKey) return bad("Email is not configured.", 500);
  if (!notifyEmail) return bad("Notification email is not configured.", 500);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return bad("Invalid JSON body.");
  }

  const payload = raw as Partial<ApplyPayload>;
  if (!validate(payload)) {
    return bad(
      "Some required fields are missing or too short. Each question needs at least 100 characters of thought.",
    );
  }

  const cfg = APPLY_CONFIG[payload.type];
  const resend = new Resend(apiKey);
  const firstName = payload.fullName.trim().split(/\s+/)[0];

  const [operatorResult, applicantResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM_EMAIL,
      to: notifyEmail,
      replyTo: payload.email,
      subject: cfg.operatorEmailSubject(payload.fullName),
      react: OperatorNotificationEmail(payload),
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      replyTo: "sam@thesamelsner.com",
      subject: cfg.applicantEmailSubject,
      react: ApplicantConfirmationEmail({
        firstName,
        bookedTimeDisplay: payload.bookedTimeDisplay,
        prepNote: cfg.prepNote,
        prepReading: cfg.prepReading,
        tagline: cfg.tagline,
      }),
    }),
  ]);

  const operatorOk =
    operatorResult.status === "fulfilled" && !operatorResult.value.error;
  const applicantOk =
    applicantResult.status === "fulfilled" && !applicantResult.value.error;

  if (operatorResult.status === "rejected") {
    console.error("[resend] operator send threw:", operatorResult.reason);
  } else if (operatorResult.value.error) {
    console.error("[resend] operator send error:", operatorResult.value.error);
  }
  if (applicantResult.status === "rejected") {
    console.error("[resend] applicant send threw:", applicantResult.reason);
  } else if (applicantResult.value.error) {
    console.error("[resend] applicant send error:", applicantResult.value.error);
  }

  if (!operatorOk) {
    return bad(
      "I couldn't get the application to my inbox. Try again, or email sam@thesamelsner.com directly.",
      502,
    );
  }

  // Kit push runs after the emails. Best-effort, doesn't affect response.
  pushToKit(payload.email, payload.fullName, cfg.kitFormId).catch((err) =>
    console.error("[kit] unhandled:", err),
  );

  return NextResponse.json({
    ok: true,
    applicantEmailDelivered: applicantOk,
  });
}
