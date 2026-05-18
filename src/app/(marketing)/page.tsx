import Link from "next/link";
import { Container } from "@/components/site/Container";
import { CTA } from "@/components/site/CTA";
import { GridBg } from "@/components/motion/GridBg";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { ShineButton } from "@/components/motion/ShineButton";
import { MarqueeRow } from "@/components/motion/MarqueeRow";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { SubstackEmbed } from "@/components/site/SubstackEmbed";
import { getSenjaTestimonials } from "@/lib/senja";

const MARQUEE = [
  "Frequency",
  "Resonance",
  "Antifragile",
  "Sovereign",
  "Excavation",
  "Foundations",
  "Mastery",
  "Signal",
];

export default async function HomePage() {
  const testimonials = await getSenjaTestimonials(6);

  return (
    <>
      {/* ── Hero: Anthropic two-column editorial ── */}
      <section className="relative overflow-hidden border-b border-rule">
        <GridBg variant="dots" />
        <Container className="relative py-20 md:py-28 lg:py-36">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24 items-end">
            <div>
              {/* Social proof eyebrow */}
              <Reveal
                as="p"
                delay={0.15}
                duration={0.6}
                className="mb-5 font-sans text-sm text-muted"
              >
                Trusted by creators and founders who are done optimizing and
                ready to resonate.
              </Reveal>
              <HeroHeadline className="balance">
                <span className="block">Cut the noise.</span>
                <span className="block">Find your frequency.</span>
                <span className="block">
                  <SignalUnderline delay={0.85}>
                    Become antifragile.
                  </SignalUnderline>
                </span>
              </HeroHeadline>
            </div>
            <div>
              <Reveal
                as="p"
                delay={0.4}
                duration={0.7}
                className="copy-lg pretty text-ink/80 max-w-lg"
              >
                The Resonance Method™. Not another framework. Not another
                funnel. A protocol for creators ready to broadcast from
                alignment.
              </Reveal>
              <Reveal
                delay={0.6}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <ShineButton>
                  <CTA
                    href="https://cal.com/samelsner/discovery-call"
                    variant="primary"
                  >
                    Book Free Discovery Call
                  </CTA>
                </ShineButton>
                <CTA href="#pricing" variant="secondary">
                  See Pricing
                </CTA>
              </Reveal>
              <Reveal delay={0.75} className="mt-4">
                <p className="font-sans text-xs text-muted">
                  20 minutes. No pitch. Just signal.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Marquee credibility band ── */}
      <div className="border-b border-rule bg-bone py-5">
        <MarqueeRow speed={70} items={MARQUEE} itemClassName="text-ink/60" />
      </div>

      {/* ── Social proof stats band ── */}
      <section className="section-tight border-b border-rule">
        <Container>
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <Reveal>
              <div className="text-center md:text-left">
                <p className="font-sans text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  ~10,000
                </p>
                <p className="mt-1.5 font-sans text-sm text-muted">
                  Athletes coached
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="text-center md:text-left">
                <p className="font-sans text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  2×
                </p>
                <p className="mt-1.5 font-sans text-sm text-muted">
                  NCAA National Champion
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="text-center md:text-left">
                <p className="font-sans text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  12
                </p>
                <p className="mt-1.5 font-sans text-sm text-muted">
                  School records broken in one season
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── The Problem ── */}
      <section className="section">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20 lg:gap-28">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-4">The Problem</div>
              <h2 className="balance">
                You don&apos;t have a productivity problem. You have a{" "}
                <span className="text-signal">frequency</span> problem.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="copy space-y-5 text-ink/85 max-w-xl">
              <p>
                You&apos;ve built the funnel. Bought the CRM. Hired the VA.
                Configured the agent. Every quarter you stack one more tool
                that promised freedom and delivered noise. The stack is not
                the problem. The stack is the symptom.
              </p>
              <p>
                The old identity says: &ldquo;I need more systems before I
                can create.&rdquo; The new identity knows it&apos;s the
                opposite. You are the system. Everything else is just
                amplification.
              </p>
              <p>
                I was you. I had a stack so impressive I forgot I
                hadn&apos;t shipped in three months. I had discipline. I had
                tactics. I had every tool the smart accounts said to buy.
                None of it was the bottleneck. The frequency I was
                broadcasting from was. So I stopped optimizing the machine
                and started tuning the signal. Now I run that protocol on
                the creators who hire me to do the same.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── The Method (dark inverted) ── */}
      <section className="section bg-ink text-bone">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20 lg:gap-28">
            <Reveal>
              <div className="eyebrow text-bone/50 mb-4">The Method</div>
              <h2 className="text-bone balance">
                The Resonance Method™
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="copy-lg pretty text-bone/75 max-w-xl">
              <p>
                The protocol is not addition. It is subtraction. It is
                calibration. It is broadcast.
              </p>
            </Reveal>
          </div>

          <StaggerGroup
            className="mt-16 grid gap-px overflow-hidden border border-bone/15 bg-bone/15 md:grid-cols-3"
            stagger={0.12}
          >
            <StaggerItem className="bg-ink p-8 md:p-10">
              <div className="font-sans text-sm text-signal mb-3">
                Phase 1
              </div>
              <h3 className="text-bone">Excavation</h3>
              <p className="copy mt-4 text-bone/70 pretty">
                Cut the noise. Every tool you don&apos;t need. Every belief
                that isn&apos;t yours. Every system you&apos;ve outgrown.
                Audit them all. Bury them all.
              </p>
            </StaggerItem>
            <StaggerItem className="bg-ink p-8 md:p-10">
              <div className="font-sans text-sm text-signal mb-3">
                Phase 2
              </div>
              <h3 className="text-bone">Calibration</h3>
              <p className="copy mt-4 text-bone/70 pretty">
                15 minutes a day. Not for productivity. For frequency. Run
                the Daily Frequency Protocol until antifragile is not a
                concept but a baseline.
              </p>
            </StaggerItem>
            <StaggerItem className="bg-ink p-8 md:p-10">
              <div className="font-sans text-sm text-signal mb-3">
                Phase 3
              </div>
              <h3 className="text-bone">Broadcast</h3>
              <p className="copy mt-4 text-bone/70 pretty">
                Launch. Create. Fill the room. You are not chasing signal
                anymore. You are the signal. And the right people feel it
                before you explain it.
              </p>
            </StaggerItem>
          </StaggerGroup>

          <Reveal delay={0.4}>
            <p className="mt-10 font-sans text-sm text-bone/50">
              Astrology and numerology woven in as alignment tools, not fluff.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Proof ── */}
      <section className="section border-t border-rule">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20 lg:gap-28">
            <Reveal>
              <div className="eyebrow mb-4">Proof</div>
              <h2 className="balance">
                12 school records in one season.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-xl">
              <div className="copy space-y-5 text-ink/85 pretty">
                <p>
                  December. A women&apos;s track program. Division III. I
                  stepped in as assistant coach and ran the Resonance
                  protocol — not on their training, on their frequency.
                </p>
                <p>
                  12 school records fell in a single indoor season. Not
                  because I changed their workouts. Because I changed what
                  they were broadcasting from.
                </p>
                <p>
                  That&apos;s what this method does. It doesn&apos;t add
                  volume. It tunes the signal.
                </p>
              </div>
              <blockquote className="mt-8 border-l-2 border-signal pl-5">
                <p className="font-serif text-lg italic leading-snug text-ink balance">
                  &ldquo;I spent two years trying to out-work my environment.
                  Tools. Tactics. Discipline. None of it was the bottleneck.
                  The frequency I was broadcasting was. The Resonance Method
                  is what I built to fix it.&rdquo;
                </p>
                <footer className="mt-3 font-sans text-sm text-muted">
                  Sam Elsner, Resonance #001
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials testimonials={testimonials} />

      {/* ── Programs (pricing-transparent) ── */}
      <section id="pricing" className="section border-t border-rule">
        <Container>
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16 lg:gap-24">
              <div>
                <div className="eyebrow eyebrow-signal mb-4">
                  Two containers. One frequency.
                </div>
                <h2 className="balance">
                  Pick your intensity. The work is the same.
                </h2>
              </div>
              <div className="copy-lg pretty self-end text-ink/80 max-w-lg">
                <p>
                  Each is a different intensity of the same protocol.
                  Becoming the kind of creator the moment respects.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:gap-8">
            {/* Cohort */}
            <Reveal>
              <Link href="/apply/cohort" className="group block">
                <article className="card card-hover relative grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:gap-12 md:p-12">
                  <div>
                    <div className="eyebrow eyebrow-signal mb-4">
                      12 Weeks · Live · Application only
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold leading-[1.1] tracking-tight balance">
                      The Resonance Cohort
                    </h3>
                    <div className="copy mt-5 max-w-xl pretty text-ink/80">
                      <p>
                        12 weeks. 5 creators. Starting June 15. Weekly
                        group calls. A Daily Frequency Protocol you run
                        every morning. Astro-numerology as alignment
                        timing. You leave the cohort resonant or you
                        leave it expelled. There is no third option.
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="font-sans text-2xl font-bold tracking-tight text-ink">
                        $2,500
                      </span>
                      <span className="font-sans text-sm text-muted">
                        Founding rate (normally $5,000)
                      </span>
                    </div>
                    <p className="mt-2 font-sans text-sm text-muted">
                      5 founding spots · Closes June 10
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-end md:items-end md:text-right">
                    <span className="btn btn-primary group-hover:opacity-90">
                      Apply for the Cohort
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 7h8m0 0L7 3m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>

            <StaggerGroup className="grid gap-6 md:grid-cols-2 md:gap-8">
              {/* Attune */}
              <StaggerItem>
                <Link
                  href="/apply/mentorship"
                  className="group block h-full"
                >
                  <article className="card card-hover relative flex h-full flex-col p-7 md:p-8">
                    <div className="eyebrow mb-3">
                      Ongoing · 1-on-1 · Application only
                    </div>
                    <h3 className="font-sans text-xl font-semibold leading-[1.15] tracking-tight text-ink md:text-2xl balance">
                      Attune
                    </h3>
                    <div className="copy mt-4 grow pretty text-ink/80">
                      <p>
                        Ongoing 1-on-1 mentorship for creators ready to
                        become antifragile. Weekly calls. Daily DM
                        access. Custom challenges deployed against your
                        actual bottlenecks, not a curriculum. A
                        container, not a course.
                      </p>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <span className="font-sans text-2xl font-bold tracking-tight text-ink">
                        $1,500
                      </span>
                      <span className="font-sans text-sm text-muted">
                        /month
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-sm text-muted">
                      3 spots available · Monthly or yearly
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink transition-colors group-hover:text-signal">
                      Apply for Attune
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 7h8m0 0L7 3m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </article>
                </Link>
              </StaggerItem>

              {/* Discovery Call */}
              <StaggerItem>
                <a
                  href="https://cal.com/samelsner/discovery-call"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block h-full"
                >
                  <article className="card card-hover relative flex h-full flex-col p-7 md:p-8">
                    <div className="eyebrow mb-3">Free · 20 minutes</div>
                    <h3 className="font-sans text-xl font-semibold leading-[1.15] tracking-tight text-ink md:text-2xl balance">
                      Discovery Call
                    </h3>
                    <div className="copy mt-4 grow pretty text-ink/80">
                      <p>
                        Not sure which container fits? Book a free 20-minute
                        call. No pitch. I&apos;ll ask about your signal,
                        your bottlenecks, and whether the protocol is the
                        right fit. If it&apos;s not, I&apos;ll tell you.
                      </p>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <span className="font-sans text-2xl font-bold tracking-tight text-signal">
                        Free
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-sm text-muted">
                      Limited availability · Book below
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink transition-colors group-hover:text-signal">
                      Book Free Call
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 7h8m0 0L7 3m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </article>
                </a>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── Email capture (dark) ── */}
      <section
        className="section dark-locked border-t border-rule"
        style={{ background: "#0c1117" }}
      >
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 lg:gap-24 items-end">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-4">Resonance</div>
              <h2 className="text-bone balance">
                Not ready to apply? Start with the signal.
              </h2>
            </Reveal>
            <div>
              <Reveal delay={0.1}>
                <p className="copy-lg text-bone/75 pretty max-w-lg">
                  One email a week. No sequences. No upsells. When the
                  frequency stops being yours, you unsubscribe.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-8">
                <div className="max-w-md">
                  <SubstackEmbed publication="samelsner" />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <section className="section border-t border-rule">
        <Container>
          <div className="grid items-end gap-10 md:grid-cols-[1.5fr_1fr] md:gap-16 lg:gap-24">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-4">Start here</div>
              <h2 className="balance">
                Still deciding? Talk to me first.
              </h2>
              <p className="mt-4 copy-lg pretty text-ink/75 max-w-lg">
                The frequency is already in you. The question is whether
                you&apos;re ready to broadcast it. Book a free 20-minute
                call and we&apos;ll find out together.
              </p>
            </Reveal>
            <Reveal
              delay={0.15}
              className="flex flex-wrap gap-3 md:justify-end"
            >
              <ShineButton>
                <CTA
                  href="https://cal.com/samelsner/discovery-call"
                  variant="primary"
                >
                  Book Free Discovery Call
                </CTA>
              </ShineButton>
              <CTA href="#pricing" variant="secondary">
                See Pricing
              </CTA>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
