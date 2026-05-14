import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { CTA } from "@/components/site/CTA";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";

export const metadata: Metadata = {
  title: "Attune",
  description:
    "Attune. Ongoing 1-on-1 mentorship with Sam Elsner. For creators ready to become antifragile. Application only.",
};

const INSIDE = [
  {
    title: "Weekly 60-minute calls",
    body: "60 minutes. Once a week. No fluff. Three phases: alignment check, challenge deployment, frequency tuning. We don't review your task list. We tune your operator.",
  },
  {
    title: "Daily DM access",
    body: "Telegram or iMessage. Signal loss is real. When you feel yourself drift, you reach me. We recalibrate in real time. Not in two weeks at the next call.",
  },
  {
    title: "The Frequency Protocol",
    body: "15 minutes a day. The same protocol I run myself. The same one the cohort runs. It does the heavy lifting. You do the showing up.",
  },
  {
    title: "Custom challenges",
    body: "Deployed when you need them. Not when a curriculum says. The bottleneck reveals itself first. Then I deploy the challenge that breaks it.",
  },
  {
    title: "Ecological alignment tracking",
    body: "Your energy mapped to natural cycles. Lunar. Astrological. Numerological. You stop forcing output on empty days. You start riding the days that are actually yours.",
  },
  {
    title: "Astro-numerology integration",
    body: "Astrology and numerology integrated fully. Frequency data, not woo. The day you book a launch matters. The week you record matters. The mentorship knows your charts and runs to them.",
  },
];

export default function AttunePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="flex min-h-[70vh] items-center border-b border-rule">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-6">
                Ongoing · 1-on-1 · Application only
              </div>
            </Reveal>
            <HeroHeadline className="balance">
              <SignalUnderline delay={0.75}>Attune</SignalUnderline>.
            </HeroHeadline>
            <Reveal
              as="p"
              delay={0.5}
              className="copy-lg mt-8 pretty mx-auto max-w-2xl text-ink/85"
            >
              Ongoing 1-on-1 mentorship for creators done playing the
              funnel game and ready to broadcast from frequency.
              Antifragile by design, not by accident.
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── The Pitch ── */}
      <section className="section">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-5">The Truth</div>
              <h2 className="balance">
                You don&apos;t need another funnel. You need a{" "}
                <span className="text-signal">frequency</span> that funnels
                can&apos;t break.
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="copy mt-8 space-y-5 text-ink/90">
              <p>
                I see you. You&apos;ve built the thing. You&apos;ve got the
                offer, the audience, the proof of concept. But you&apos;re
                running on fumes.
              </p>
              <p>
                Every new client feels like a debt instead of a win.
                You&apos;re managing systems that were supposed to manage
                themselves. And every &ldquo;growth hack&rdquo; you try adds
                more noise to a signal that was already weak.
              </p>
              <p>
                The creator economy is not the funnel economy anymore.
                It is the frequency economy. Signal clarity is the only
                moat that compounds. Not tactics. Not hacks. Signal.
              </p>
              <p>
                Most mentors sell you their playbook. I don&apos;t have a
                playbook. I have a tuning fork.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── What's Inside ── */}
      <section className="section border-t border-rule">
        <Container>
          <Reveal className="mx-auto max-w-[720px]">
            <div className="eyebrow eyebrow-signal mb-5">Attune</div>
            <h2 className="balance">What&apos;s inside.</h2>
            <p className="copy-lg mt-5 text-ink/75 pretty">
              Six instruments. One nervous system. Everything tuned to
              you, not to a curriculum someone else built for someone
              else.
            </p>
          </Reveal>

          <StaggerGroup
            className="mt-14 grid gap-6 sm:grid-cols-2 md:gap-8"
            stagger={0.08}
          >
            {INSIDE.map((item, i) => (
              <StaggerItem key={item.title}>
                <article className="card card-hover relative flex h-full flex-col p-7 md:p-8">
                  <div className="font-sans text-3xl font-bold tracking-tightest text-signal md:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-sans text-xl font-semibold leading-[1.2] tracking-tightest text-ink md:text-2xl balance">
                    {item.title}
                  </h3>
                  <p className="copy mt-3 text-ink/85 pretty">{item.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
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
              {/* OG Attune mark — slashed null */}
              <svg
                aria-hidden="true"
                width="56"
                height="56"
                viewBox="0 0 64 64"
                className="mx-auto mb-8 text-signal"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <circle cx="32" cy="32" r="24" />
                <line x1="14" y1="50" x2="50" y2="14" />
              </svg>

              <div className="eyebrow eyebrow-signal mb-5">
                Apply for Attune
              </div>
              <h2 className="text-bone balance">
                12 spots open. Application only.
              </h2>
              <p className="copy-lg mt-6 text-bone/85 pretty">
                Applications reviewed within 48 hours. If you&apos;re a fit,
                you&apos;ll book a 15-minute Calibration Call with me before
                either of us commits.
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
                  Creators done playing the funnel game and ready to
                  broadcast from frequency.
                </p>
              </div>
              <div className="border-t border-bone/15 pt-5">
                <div className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-bone/40 mb-2">
                  Not for
                </div>
                <p className="copy text-bone/90 pretty">
                  Anyone looking for a course, a template, or a 7-figure
                  shortcut.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-14 text-center">
              <CTA href="/apply/mentorship" variant="primary">
                Book the call. Then we begin.
              </CTA>
              <p className="mt-6 font-sans text-sm text-bone/65">
                One screen. Pick a time, send the form, you&apos;re in
                the room. Monthly and yearly options available, pricing
                shared after application review.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
