"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { BookingPayload } from "./CalScheduler";

interface Props {
  booking: BookingPayload;
  onSuccess: (info: { displayTime?: string }) => void;
}

const MIN_REFLECTION_LENGTH = 100;

/**
 * The application form. Revealed after Cal.com fires `bookingSuccessful`.
 *
 * Styled to match the rest of the site — sits inside the always-dark
 * application section (#0c1117) so input surfaces use literal light hex
 * (consistent with /cohort + /attune Tally form sections).
 */
export function ApplicationForm({ booking, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const headingId = useId();

  // Announce the form's reveal to screen readers, one-shot.
  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent =
        "Your call is booked. The application form is open below — fill it out to lock your spot.";
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);

    const payload = {
      fullName: String(data.get("fullName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim() || undefined,
      workingOn: String(data.get("workingOn") ?? "").trim(),
      constraint: String(data.get("constraint") ?? "").trim(),
      successIn90Days: String(data.get("successIn90Days") ?? "").trim(),
      anythingElse:
        String(data.get("anythingElse") ?? "").trim() || undefined,
      bookedTimeIso: booking.startTime,
      bookedTimeDisplay: booking.displayTime,
    };

    const failed = (["workingOn", "constraint", "successIn90Days"] as const)
      .filter((k) => payload[k].length < MIN_REFLECTION_LENGTH);
    if (failed.length > 0) {
      setError(
        "Each of the three reflection questions needs at least 100 characters of real thought.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/cohort-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(
          json.error ??
            "Something broke on send. Try again, or email sam@thesamelsner.com directly.",
        );
        setSubmitting(false);
        return;
      }
      onSuccess({ displayTime: booking.displayTime });
    } catch {
      setError(
        "Network error. Check your connection and try again, or email sam@thesamelsner.com directly.",
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <p ref={liveRef} aria-live="polite" className="sr-only"></p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        aria-labelledby={headingId}
        className="w-full"
        noValidate
      >
        <h3 id={headingId} className="sr-only">
          Application form
        </h3>

        <div className="grid gap-6">
          <FormField
            label="Full name"
            name="fullName"
            type="text"
            required
            defaultValue={booking.name ?? ""}
            autoComplete="name"
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            required
            defaultValue={booking.email ?? ""}
            autoComplete="email"
          />
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            optional
            autoComplete="tel"
          />
          <FormTextarea
            label="What are you working on right now?"
            name="workingOn"
            required
            minChars={MIN_REFLECTION_LENGTH}
          />
          <FormTextarea
            label="What's the constraint you can't get past?"
            name="constraint"
            required
            minChars={MIN_REFLECTION_LENGTH}
          />
          <FormTextarea
            label="What would success in 90 days look like?"
            name="successIn90Days"
            required
            minChars={MIN_REFLECTION_LENGTH}
          />
          <FormTextarea
            label="Anything else I should know before our call?"
            name="anythingElse"
            optional
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 px-4 py-3 border-l-2 border-signal text-sm font-sans text-[#faf9f5]"
            style={{ background: "rgba(253, 54, 59, 0.10)" }}
          >
            {error}
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending…" : "Send it"}
          </button>
        </div>
      </form>
    </>
  );
}

function FormField({
  label,
  name,
  type,
  required,
  optional,
  defaultValue,
  autoComplete,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
  required?: boolean;
  optional?: boolean;
  defaultValue?: string;
  autoComplete?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="apply-field-label">
        {label}
        {required && <span className="text-signal ml-0.5">*</span>}
        {optional && <span className="text-[#faf9f5]/40"> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="apply-field-input"
      />
    </div>
  );
}

function FormTextarea({
  label,
  name,
  required,
  optional,
  minChars,
}: {
  label: string;
  name: string;
  required?: boolean;
  optional?: boolean;
  minChars?: number;
}) {
  const id = `f-${name}`;
  const [count, setCount] = useState(0);
  return (
    <div>
      <label htmlFor={id} className="apply-field-label">
        {label}
        {required && <span className="text-signal ml-0.5">*</span>}
        {optional && <span className="text-[#faf9f5]/40"> (optional)</span>}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={4}
        onChange={(e) => setCount(e.target.value.length)}
        className={cn("apply-field-input apply-field-textarea")}
      />
      {minChars && (
        <p
          className={cn(
            "mt-2 font-sans text-xs",
            count >= minChars ? "text-signal" : "text-[#faf9f5]/40",
          )}
        >
          {count} / {minChars} characters
        </p>
      )}
    </div>
  );
}
