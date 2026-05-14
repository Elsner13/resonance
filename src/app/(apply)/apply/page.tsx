"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CalScheduler, type BookingPayload } from "@/components/apply/CalScheduler";
import { ApplicationForm } from "@/components/apply/ApplicationForm";
import { SuccessState } from "@/components/apply/SuccessState";

type Phase = "scheduling" | "form" | "success";

export default function ApplyPage() {
  const [phase, setPhase] = useState<Phase>("scheduling");
  const [booking, setBooking] = useState<BookingPayload>({});
  const [submittedDisplayTime, setSubmittedDisplayTime] = useState<
    string | undefined
  >();

  const username = process.env.NEXT_PUBLIC_CAL_USERNAME ?? "samelsner";
  const eventSlug = process.env.NEXT_PUBLIC_CAL_EVENT_SLUG ?? "cohort-call";

  const handleBooked = useCallback((payload: BookingPayload) => {
    setBooking(payload);
    setPhase("form");
  }, []);

  const handleSubmitted = useCallback(
    (info: { displayTime?: string }) => {
      setSubmittedDisplayTime(info.displayTime ?? booking.displayTime);
      setPhase("success");
    },
    [booking.displayTime],
  );

  // Smooth-scroll to the form when it reveals.
  useEffect(() => {
    if (phase === "form") {
      const t = window.setTimeout(() => {
        document
          .getElementById("apply-form-target")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
      return () => window.clearTimeout(t);
    }
    if (phase === "success") {
      const t = window.setTimeout(() => {
        document
          .getElementById("apply-success-target")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  return (
    <main className="apply-shell">
      {/* Top utility row — minimal escape hatch back to the brand */}
      <div className="apply-top-row">
        <Link href="/" className="apply-back-link">
          ← thesamelsner.com
        </Link>
      </div>

      {phase !== "success" && (
        <header className="apply-header">
          <p className="apply-eyebrow apply-eyebrow-crimson">
            The Resonance Cohort · Apply
          </p>
          <h1 className="apply-h1">Book the call. Then we begin.</h1>
          <p className="apply-lede">
            The Resonance Cohort is a 12-week container for creators ready
            to trade the funnel for a frequency.
          </p>
        </header>
      )}

      {/* Phase 1 — scheduling */}
      {phase === "scheduling" && (
        <section className="apply-section" aria-label="Pick a time">
          <p className="apply-step">Step 1 — Pick a time</p>
          <CalScheduler
            username={username}
            eventSlug={eventSlug}
            onBooked={handleBooked}
          />
        </section>
      )}

      {/* Phase 2 — form reveal */}
      {phase === "form" && (
        <>
          <section
            id="apply-form-locked-summary"
            className="apply-locked-summary"
            aria-label="Booking confirmation"
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--crimson)",
                marginRight: "12px",
                verticalAlign: "middle",
              }}
            />
            <span>
              Slot held{booking.displayTime ? ` for ${booking.displayTime}` : ""}.
              Lock it by sending the form below.
            </span>
          </section>

          <section
            id="apply-form-target"
            className="apply-section apply-form-reveal"
            aria-label="Application form"
          >
            <ApplicationForm
              booking={booking}
              onSuccess={handleSubmitted}
            />
          </section>
        </>
      )}

      {/* Phase 3 — success */}
      {phase === "success" && (
        <section
          id="apply-success-target"
          className="apply-section apply-form-reveal"
        >
          <SuccessState bookedTimeDisplay={submittedDisplayTime} />
        </section>
      )}
    </main>
  );
}
