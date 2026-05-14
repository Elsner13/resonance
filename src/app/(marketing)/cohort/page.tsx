import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { CTA } from "@/components/site/CTA";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";

export const metadata: Metadata = {
  title: "The Resonance Cohort",
  description:
    "90 days. 5 creators. Starting June 15. Application only. The Resonance Cohort by Sam Elsner.",
};

const INSIDE = [
  {
    title: "One 90-minute group call per week",
    body: "90 minutes. Once a week. No slide decks. No frameworks rehashed from threads you've already read. Alignment work in real time. The 5 of you, plus me, plus what's actually in the room.",
  },
  {
    title: "Daily Frequency Protocol",
    body: "15 minutes a day. Delivered to your phone before you open the app store. The protocol does the heavy lifting. You do the showing up.",
  },
  {
    title: "Weekly challenges",
    body: "Each week, a challenge. Calibrated to where the group is, not what week of the curriculum it is. There is no curriculum. There is a room, and the room responds.",
  },
  {
    title: "Astro-numerology integration",
    body: "Astrology and numerology used the way they were used originally. As frequency data. As alignment timing. Not as content. Not as woo. As instruments.",
  },
  {
    title: "Private group chat",
    body: "WhatsApp or Telegram. The 5 of you check signal with each other every day. No moderators. No coaches in the chat. The cohort runs itself.",
  },
];

export default function CohortPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="flex min-h-[70vh] items-center border-b border-rule">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-6">
                12 Weeks · 5 Creators · Starts June 15
              </div>
            </Reveal>
            <HeroHeadline className="balance">
              The Resonance <SignalUnderline delay={0.75}>Cohort</SignalUnderline>.
            </HeroHeadline>
            <Reveal
              as="p"
              delay={0.5}
              className="copy-lg mt-8 pretty mx-auto max-w-2xl text-ink/85"
            >
              12 weeks. 5 creators. We don&apos;t add to your stack. We
              strip the noise, calibrate the receiver, and turn you into
              the signal.
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── What's Inside ── */}
      <section className="section">
        <Container>
          <Reveal className="mx-auto max-w-[720px]">
            <div className="eyebrow eyebrow-signal mb-5">The Cohort</div>
            <h2 className="balance">What&apos;s inside.</h2>
            <p className="copy-lg mt-5 text-ink/75 pretty">
              Five pieces. None of them filler. Each calibrated to
              perturb a different attractor in your operating system.
            </p>
          </Reveal>

          {/* Featured first card (full width) + 2x2 grid of the rest */}
          <div className="mt-14 grid gap-6 md:gap-8">
            <Reveal>
              <article className="card card-hover relative grid gap-6 p-8 md:grid-cols-[auto_1fr] md:gap-12 md:p-12">
                <div className="font-sans text-5xl font-bold tracking-tightest text-signal md:text-6xl">
                  01
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold leading-[1.15] tracking-tightest balance">
                    {INSIDE[0].title}
                  </h3>
                  <p className="copy-lg mt-3 text-ink/85 pretty">
                    {INSIDE[0].body}
                  </p>
                </div>
              </article>
            </Reveal>

            <StaggerGroup
              className="grid gap-6 sm:grid-cols-2 md:gap-8"
              stagger={0.08}
            >
              {INSIDE.slice(1).map((item, i) => (
                <StaggerItem key={item.title}>
                  <article className="card card-hover relative flex h-full flex-col p-7 md:p-8">
                    <div className="font-sans text-3xl font-bold tracking-tightest text-signal md:text-4xl">
                      {String(i + 2).padStart(2, "0")}
                    </div>
                    <h3 className="mt-4 font-sans text-xl font-semibold leading-[1.2] tracking-tightest text-ink md:text-2xl balance">
                      {item.title}
                    </h3>
                    <p className="copy mt-3 text-ink/85 pretty">{item.body}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      {/* ── Application (single dark section — Investment + Apply merged) ── */}
      <section
        className="section dark-locked border-t border-rule"
        style={{ background: "#0c1117" }}
      >
        <Container>
          <div className="mx-auto max-w-[720px]">
            <Reveal className="text-center">
              <div className="eyebrow eyebrow-signal mb-5">
                Apply for the Cohort
              </div>
              <h2 className="text-bone balance">
                5 spots. Closes June 10.
              </h2>
              <p className="copy-lg mt-6 text-bone/85 pretty">
                Applications reviewed within 24 hours. If you&apos;re a
                fit, you&apos;re in. If you&apos;re not, you&apos;ll hear
                back anyway.
              </p>
            </Reveal>

            <Reveal
              delay={0.15}
              className="mt-10 mx-auto max-w-[560px] grid gap-6 sm:grid-cols-2 text-left"
            >
              <div className="border-t border-bone/15 pt-5">
                <div className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-signal mb-2">
                  For
                </div>
                <p className="copy text-bone/90 pretty">
                  Creators ready to trade the funnel for a frequency, and
                  committed to 15 minutes a day for 12 weeks.
                </p>
              </div>
              <div className="border-t border-bone/15 pt-5">
                <div className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-bone/40 mb-2">
                  Not for
                </div>
                <p className="copy text-bone/90 pretty">
                  Anyone looking to lurk in a Slack and call it
                  transformation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-14 text-center">
              <CTA href="/apply/cohort" variant="primary">
                Book the call. Then we begin.
              </CTA>
              <p className="mt-6 font-sans text-sm text-bone/65">
                One screen. Pick a time, send the form, you&apos;re in
                the room. Pricing shared after application review.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
