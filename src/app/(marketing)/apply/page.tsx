"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/site/Container";
import {
  CalScheduler,
  type BookingPayload,
} from "@/components/apply/CalScheduler";
import { ApplicationForm } from "@/components/apply/ApplicationForm";
import { SuccessState } from "@/components/apply/SuccessState";
import { Reveal } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";

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

  // Smooth-scroll to the new step when phase advances.
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
    <>
      {/* ── Hero ── */}
      <section className="flex min-h-[60vh] items-center border-b border-rule">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-6">
                The Resonance Cohort · Apply
              </div>
            </Reveal>
            <HeroHeadline className="balance">
              Book the call. Then we{" "}
              <SignalUnderline delay={0.75}>begin</SignalUnderline>.
            </HeroHeadline>
            <Reveal
              as="p"
              delay={0.5}
              className="copy-lg mt-8 pretty mx-auto max-w-2xl text-ink/85"
            >
              The Resonance Cohort is a 12-week container for creators
              ready to trade the funnel for a frequency.
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Phase 1: Scheduler ── */}
      {phase === "scheduling" && (
        <section className="section border-t border-rule">
          <Container>
            <div className="mx-auto max-w-[720px]">
              <Reveal>
                <div className="eyebrow eyebrow-signal mb-5">
                  Step 1 — Pick a time
                </div>
                <h2 className="balance">
                  Choose your slot. The form opens once it&apos;s held.
                </h2>
                <p className="copy-lg mt-5 text-ink/75 pretty">
                  15 minutes. Just enough to see if the frequency fits.
                </p>
              </Reveal>

              <Reveal delay={0.15} className="mt-12">
                <CalScheduler
                  username={username}
                  eventSlug={eventSlug}
                  onBooked={handleBooked}
                />
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* ── Phase 2: Form (dark, matches /cohort + /attune application sections) ── */}
      {phase === "form" && (
        <>
          {/* Booking confirmation strip */}
          <section
            id="apply-form-target"
            className="border-t border-signal apply-fade-in"
            style={{ background: "#0c1117" }}
          >
            <Container>
              <div className="mx-auto max-w-[720px] flex items-center justify-center gap-3 py-6 text-center text-[#faf9f5]">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full bg-signal"
                />
                <p className="font-sans text-sm text-[#faf9f5]/85">
                  Slot held
                  {booking.displayTime ? ` for ${booking.displayTime}` : ""}.
                  Lock it by sending the form below.
                </p>
              </div>
            </Container>
          </section>

          {/* The form */}
          <section
            className="section dark-locked apply-fade-in"
            style={{ background: "#0c1117" }}
          >
            <Container>
              <div className="mx-auto max-w-[720px]">
                <Reveal className="text-center">
                  <div className="eyebrow eyebrow-signal mb-5">
                    Step 2 — Send it
                  </div>
                  <h2 className="text-bone balance">
                    Tell me what you&apos;re bringing.
                  </h2>
                  <p className="copy-lg mt-6 text-bone/85 pretty">
                    Five questions. Honest answers. The three reflection
                    prompts need at least 100 characters of real thought
                    each.
                  </p>
                </Reveal>

                <Reveal delay={0.15} className="mt-12">
                  <ApplicationForm
                    booking={booking}
                    onSuccess={handleSubmitted}
                  />
                </Reveal>
              </div>
            </Container>
          </section>
        </>
      )}

      {/* ── Phase 3: Success ── */}
      {phase === "success" && (
        <section
          id="apply-success-target"
          className="section dark-locked apply-fade-in border-t border-signal"
          style={{ background: "#0c1117" }}
        >
          <Container>
            <div className="mx-auto max-w-[640px]">
              <SuccessState bookedTimeDisplay={submittedDisplayTime} />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
