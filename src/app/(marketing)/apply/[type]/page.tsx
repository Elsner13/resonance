"use client";

import { use, useCallback, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/Container";
import {
  CalScheduler,
  type BookingPayload,
  clearStoredBooking,
} from "@/components/apply/CalScheduler";
import { TallyEmbed } from "@/components/apply/TallyEmbed";
import { SuccessState } from "@/components/apply/SuccessState";
import { Reveal } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";
import { APPLY_CONFIG, isApplyType } from "@/lib/apply-config";

type Phase = "scheduling" | "form" | "success";

interface PageProps {
  params: Promise<{ type: string }>;
}

const PHASE_KEY = "resonance-apply-phase";
const BOOKING_KEY = "resonance-booking";

function readStoredPhase(): Phase | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PHASE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const ts = parsed?._ts as number | undefined;
    if (!ts || Date.now() - ts > 30 * 60 * 1000) {
      localStorage.removeItem(PHASE_KEY);
      return null;
    }
    return parsed.phase as Phase;
  } catch {
    return null;
  }
}

function storePhase(phase: Phase) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PHASE_KEY, JSON.stringify({ phase, _ts: Date.now() }));
  } catch {
    // ignore
  }
}

function readStoredBooking(): BookingPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(BOOKING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const ts = parsed?._ts as number | undefined;
    if (!ts || Date.now() - ts > 30 * 60 * 1000) {
      localStorage.removeItem(BOOKING_KEY);
      return null;
    }
    const { _ts, ...payload } = parsed;
    return payload as BookingPayload;
  } catch {
    return null;
  }
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

  // Restore state from localStorage on mount
  useEffect(() => {
    const savedPhase = readStoredPhase();
    const savedBooking = readStoredBooking();
    if (savedPhase && savedPhase !== "scheduling") {
      setPhase(savedPhase);
      if (savedBooking) {
        setBooking(savedBooking);
      }
    }
  }, []);

  // Persist phase changes
  useEffect(() => {
    storePhase(phase);
  }, [phase]);

  const username = process.env.NEXT_PUBLIC_CAL_USERNAME ?? "samelsner";

  const handleBooked = useCallback((payload: BookingPayload) => {
    setBooking(payload);
    setPhase("form");
  }, []);

  const handleSubmitted = useCallback(
    (info?: { displayTime?: string }) => {
      setSubmittedDisplayTime(info?.displayTime ?? booking.displayTime);
      setPhase("success");
      clearStoredBooking();
      localStorage.removeItem(PHASE_KEY);
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

  const steps = [
    { label: "Book call", active: phase === "scheduling", done: phase !== "scheduling" },
    { label: "Application", active: phase === "form", done: phase === "success" },
    { label: "Confirmed", active: phase === "success", done: false },
  ];

  return (
    <>
      {/* ── Progress indicator ── */}
      <div className="border-b border-rule bg-bone">
        <Container className="py-4">
          <div className="flex items-center gap-3">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                      step.done
                        ? "bg-signal text-white"
                        : step.active
                        ? "bg-ink text-bone"
                        : "bg-rule text-muted"
                    }`}
                  >
                    {step.done ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={`hidden font-sans text-sm sm:block ${
                      step.active || step.done ? "text-ink font-medium" : "text-muted"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-px w-6 md:w-10 ${step.done ? "bg-signal" : "bg-rule"}`} />
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Hero: two-column editorial ── */}
      <section className="flex min-h-[50vh] items-center border-b border-rule">
        <Container className="py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24 items-end">
            <div>
              <Reveal>
                <div className="eyebrow eyebrow-signal mb-5">{cfg.eyebrow}</div>
              </Reveal>
              <HeroHeadline className="balance">
                {cfg.headline}{" "}
                <SignalUnderline delay={0.75}>
                  {cfg.headlineAccent}
                </SignalUnderline>
                {cfg.headlineTrail}
              </HeroHeadline>
            </div>
            <Reveal
              as="p"
              delay={0.4}
              className="copy-lg pretty text-ink/80 max-w-lg"
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
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20 lg:gap-28">
              <Reveal>
                <div className="eyebrow eyebrow-signal mb-4">
                  {cfg.step1Eyebrow}
                </div>
                <h2 className="balance">{cfg.step1Headline}</h2>
              </Reveal>
              <Reveal delay={0.1} className="max-w-xl">
                <p className="copy-lg text-ink/75 pretty">
                  {cfg.step1Lede}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-14">
              <CalScheduler
                username={username}
                eventSlug={cfg.calEventSlug}
                onBooked={handleBooked}
              />
            </Reveal>
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
              <div className="mx-auto max-w-[720px] flex items-center justify-center gap-3 py-5 text-center text-[#faf9f5]">
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
              <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20 lg:gap-28">
                <Reveal>
                  <div className="eyebrow eyebrow-signal mb-4">
                    {cfg.step2Eyebrow}
                  </div>
                  <h2 className="text-bone balance">{cfg.step2Headline}</h2>
                </Reveal>
                <Reveal delay={0.1} className="max-w-xl">
                  <p className="copy-lg text-bone/80 pretty">
                    {cfg.step2Lede}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.15} className="mt-14">
                <TallyEmbed
                  type={type}
                  booking={booking}
                  onSubmitted={handleSubmitted}
                />
              </Reveal>
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
