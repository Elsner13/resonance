import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { TallyEmbed } from "@/components/site/TallyEmbed";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";

export const metadata: Metadata = {
  title: "The Resonance Cohort",
  description:
    "90 days. 5 creators. Starting June 15. Application only. The Resonance Cohort by Sam Elsner.",
};

// Tally form ID for The Resonance Cohort application — https://tally.so/r/BzAgvK
const TALLY_FORM_ID = "BzAgvK";

const INSIDE = [
  {
    title: "One 90-minute group call per week",
    body: "Real alignment work, not slide decks.",
  },
  {
    title: "Daily Frequency Protocol",
    body: "15 minutes per day, delivered to your phone. The discipline that does the heavy lifting.",
  },
  {
    title: "Weekly challenges",
    body: "Based on group energy and ecological cycles, not a rigid curriculum.",
  },
  {
    title: "Astro-numerology integration",
    body: "Used as frequency data and alignment timing, not fluff.",
  },
  {
    title: "Private group chat",
    body: "WhatsApp or Telegram for daily signal checks with the cohort.",
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
                90 days · 5 creators · Starts June 15
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
              An ecological alignment protocol for 5 creators ready to find
              their frequency and broadcast from it.
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
              Five pieces working together. None of them are filler.
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

      {/* ── Investment (quiet note) ── */}
      <section className="section-tight border-t border-rule">
        <Container>
          <div className="mx-auto max-w-[720px] text-center">
            <Reveal>
              <div className="eyebrow mb-4">Investment</div>
              <p className="font-sans text-2xl md:text-3xl font-semibold tracking-tightest text-ink">
                Application only
              </p>
              <p className="copy mt-4 text-muted pretty">
                Pricing shared after application review. Payment plans
                available for qualified applicants.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Application (dark — flows into form) ── */}
      <section
        className="section text-bone border-t border-signal"
        style={{ background: "#0c1117" }}
      >
        <Container>
          <div className="mx-auto max-w-[720px]">
            <Reveal className="text-center">
              <div className="eyebrow eyebrow-signal mb-5">Apply</div>
              <h2 className="text-bone balance">
                5 spots. Applications close June 10.
              </h2>
              <p className="copy-lg mt-6 text-bone/75 pretty">
                Fill out the form below. I read every application personally.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-12">
              <TallyEmbed
                formId={TALLY_FORM_ID}
                title="Resonance Cohort Application"
              />
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-10 text-center font-sans text-sm text-bone/60">
                I&apos;ll confirm your spot within 24 hours of receiving your
                application.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
