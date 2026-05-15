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
              <HeroHeadline className="balance">
                <span className="block">Cut the noise</span>
                <span className="block">Find your frequency</span>
                <span className="block">
                  <SignalUnderline delay={0.85}>Become antifragile</SignalUnderline>
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
                  <CTA href="/apply/cohort" variant="primary">
                    Apply for the Cohort
                  </CTA>
                </ShineButton>
                <CTA href="/apply/mentorship" variant="secondary">
                  Apply for 1-on-1
                </CTA>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Marquee credibility band ── */}
      <div className="border-b border-rule bg-bone py-5">
        <MarqueeRow speed={70} items={MARQUEE} itemClassName="text-ink/60" />
      </div>

      {/* ── The Gap ── */}
      <section className="section">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20 lg:gap-28">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-4">The Gap</div>
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
                anymore. You are the signal.
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
              <h2 className="balance">From setup to signal.</h2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-xl">
              <blockquote>
                <p className="font-serif text-xl md:text-2xl italic leading-snug text-ink balance">
                  &ldquo;I spent two years trying to out-work my environment.
                  Tools. Tactics. Discipline. None of it was the bottleneck.
                  The frequency I was broadcasting was. The Resonance Method
                  is what I built to fix it.&rdquo;
                </p>
                <footer className="mt-6 font-sans text-sm text-muted">
                  Sam Elsner, Resonance #001
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials testimonials={testimonials} />

      {/* ── Three rooms (programs) ── */}
      <section className="section border-t border-rule">
        <Container>
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16 lg:gap-24">
              <div>
                <div className="eyebrow mb-4">Three rooms. One frequency.</div>
                <h2 className="balance">
                  Pick your container. The work is the same.
                </h2>
              </div>
              <div className="copy-lg pretty self-end text-ink/80 max-w-lg">
                Each is a different intensity of the same protocol.
                Becoming the kind of creator the moment respects.
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:gap-8">
            <Reveal>
              <Link href="/apply/cohort" className="group block">
                <article className="card card-hover relative grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:gap-12 md:p-12">
                  <div>
                    <div className="eyebrow eyebrow-signal mb-4">
                      12 Weeks · Live
                      <span className="ml-3 text-muted">· 5 Spots</span>
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
                    <p className="mt-6 font-sans text-sm text-muted">
                      Application only · Closes June 10
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
              <StaggerItem>
                <Link
                  href="/apply/mentorship"
                  className="group block h-full"
                >
                  <article className="card card-hover relative flex h-full flex-col p-7 md:p-8">
                    <div className="eyebrow mb-3">
                      Ongoing · 1-on-1
                      <span className="ml-2 text-muted">· Application only</span>
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
                    <p className="mt-5 font-sans text-sm text-muted">
                      Monthly or yearly · Application only
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

              <StaggerItem>
                <Link href="/resonance" className="group block h-full">
                  <article className="card card-hover relative flex h-full flex-col p-7 md:p-8">
                    <div className="eyebrow mb-3">Free · Weekly</div>
                    <h3 className="font-sans text-xl font-semibold leading-[1.15] tracking-tight text-ink md:text-2xl balance">
                      Resonance
                    </h3>
                    <div className="copy mt-4 grow pretty text-ink/80">
                      <p>
                        The broadcast. One post per week. No publishing
                        calendar. No content strategy. Whatever frequency
                        I&apos;m holding when I sit down to write.
                        What&apos;s real. What&apos;s aligned. What will
                        cut through your own noise.
                      </p>
                    </div>
                    <p className="mt-5 font-sans text-sm text-muted">
                      Every week · Free
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink transition-colors group-hover:text-signal">
                      Read the latest
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
                The frequency is already in you. The question is whether
                you&apos;re ready to broadcast it.
              </h2>
            </Reveal>
            <Reveal
              delay={0.15}
              className="flex flex-wrap gap-3 md:justify-end"
            >
              <ShineButton>
                <CTA href="/apply/cohort" variant="primary">
                  Apply for the Cohort
                </CTA>
              </ShineButton>
              <CTA href="/apply/mentorship" variant="secondary">
                Apply for Attune
              </CTA>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
