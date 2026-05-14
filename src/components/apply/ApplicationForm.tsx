"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BookingPayload } from "./CalScheduler";

interface Props {
  booking: BookingPayload;
  onSuccess: (info: { displayTime?: string }) => void;
}

const MIN_REFLECTION_LENGTH = 100;

/**
 * The application form. Revealed after Cal.com fires `bookingSuccessful`.
 *
 * Fields pre-fill from the booking payload where available. Submits to
 * /api/cohort-apply. On success, calls `onSuccess` so the page can render
 * the SuccessState panel.
 */
export function ApplicationForm({ booking, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const headingId = useId();

  // Announce to screen readers when the form mounts (i.e. is revealed
  // after booking). One-shot.
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

    // Client-side length validation before hitting the server.
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
      {/* Live region — announces the form's appearance to screen readers */}
      <p ref={liveRef} aria-live="polite" className="sr-only"></p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        aria-labelledby={headingId}
        className="w-full"
        noValidate
      >
        <header className="mb-10">
          <p className="apply-eyebrow">Step 2</p>
          <h2 id={headingId} className="apply-h2">
            Tell me what you&apos;re bringing.
          </h2>
          <p className="apply-lede">
            Five questions. Honest answers. The three reflection prompts
            need at least 100 characters of real thought each.
          </p>
        </header>

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
          <p role="alert" className="apply-error mt-6">
            {error}
          </p>
        )}

        <div className="mt-10">
          <button
            type="submit"
            disabled={submitting}
            className="apply-submit"
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
      <label htmlFor={id} className="apply-label">
        {label}
        {required && <span className="apply-label-req">*</span>}
        {optional && <span className="apply-label-opt"> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="apply-input"
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
      <label htmlFor={id} className="apply-label">
        {label}
        {required && <span className="apply-label-req">*</span>}
        {optional && <span className="apply-label-opt"> (optional)</span>}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={4}
        onChange={(e) => setCount(e.target.value.length)}
        className="apply-textarea"
      />
      {minChars && (
        <p
          className={`apply-count ${
            count >= minChars ? "apply-count-ok" : ""
          }`}
        >
          {count} / {minChars} characters
        </p>
      )}
    </div>
  );
}
