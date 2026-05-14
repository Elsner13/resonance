"use client";

import { use, useCallback, useEffect, useState } from "react";
import { notFound } from "next/navigation";
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
import { APPLY_CONFIG, isApplyType } from "@/lib/apply-config";

type Phase = "scheduling" | "form" | "success";

interface PageProps {
  params: Promise<{ type: string }>;
}

export default function ApplyPage({ params }: PageProps) {
  const { type } = use(params);
  if (!isApplyType(type)) notFound();
  const cfg = APPLY_CONFIG[type];

  const [phase, setPhase] = useState<Phase>("scheduling");
  const [booking, setBooking] = useState<BookingPayload>({});
  const [submittedDisplayTime, setSubmittedDisplayTime] = useState<
    string | undefined
  >();

  const username = process.env.NEXT_PUBLIC_CAL_USERNAME ?? "samelsner";

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
              <div className="eyebrow eyebrow-signal mb-6">{cfg.eyebrow}</div>
            </Reveal>
            <HeroHeadline className="balance">
              {cfg.headline}{" "}
              <SignalUnderline delay={0.75}>
                {cfg.headlineAccent}
              </SignalUnderline>
              {cfg.headlineTrail}
            </HeroHeadline>
            <Reveal
              as="p"
              delay={0.5}
              className="copy-lg mt-8 pretty mx-auto max-w-2xl text-ink/85"
            >
              {cfg.subhead}
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
                  {cfg.step1Eyebrow}
                </div>
                <h2 className="balance">{cfg.step1Headline}</h2>
                <p className="copy-lg mt-5 text-ink/75 pretty">
                  {cfg.step1Lede}
                </p>
              </Reveal>

              <Reveal delay={0.15} className="mt-12">
                <CalScheduler
                  username={username}
                  eventSlug={cfg.calEventSlug}
                  onBooked={handleBooked}
                />
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* ── Phase 2: Form ── */}
      {phase === "form" && (
        <>
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

          <section
            className="section dark-locked apply-fade-in"
            style={{ background: "#0c1117" }}
          >
            <Container>
              <div className="mx-auto max-w-[720px]">
                <Reveal className="text-center">
                  <div className="eyebrow eyebrow-signal mb-5">
                    {cfg.step2Eyebrow}
                  </div>
                  <h2 className="text-bone balance">{cfg.step2Headline}</h2>
                  <p className="copy-lg mt-6 text-bone/85 pretty">
                    {cfg.step2Lede}
                  </p>
                </Reveal>

                <Reveal delay={0.15} className="mt-12">
                  <ApplicationForm
                    type={type}
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
              <SuccessState
                headline={cfg.successHeadline}
                bookedTimeDisplay={submittedDisplayTime}
              />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
