import { Container } from "@/components/site/Container";
import { Section, SectionHeader } from "@/components/site/Section";
import { OfferCard } from "@/components/site/OfferCard";
import { CTA } from "@/components/site/CTA";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";
import { Counter } from "@/components/motion/Counter";
import { ShineButton } from "@/components/motion/ShineButton";
import { GridBg } from "@/components/motion/GridBg";
import { MarqueeRow } from "@/components/motion/MarqueeRow";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-rule">
        <GridBg variant="dots" />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl">
            <Reveal as="div" duration={0.55}>
              <div className="eyebrow eyebrow-signal mb-6">
                Resonance · by Sam Elsner
              </div>
            </Reveal>
            <HeroHeadline className="balance">
              Perform when it{" "}
              <SignalUnderline delay={0.85}>counts</SignalUnderline>.
            </HeroHeadline>
            <Reveal
              as="p"
              delay={0.5}
              duration={0.7}
              className="copy-lg mt-7 max-w-2xl pretty text-ink/85"
            >
              A school for athletes and coaches who refuse to be average.
              Private 1-on-1 mentorship, live coach cohorts, and the Resonance
              newsletter — built around the way humans actually learn.
            </Reveal>
            <Reveal
              delay={0.7}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ShineButton>
                <CTA href="/mentorship" variant="primary">
                  Apply for mentorship
                </CTA>
              </ShineButton>
              <CTA href="/cohort" variant="secondary">
                See the coach cohort
              </CTA>
            </Reveal>
          </div>

        </Container>
      </section>

      {/* ── Marquee strip ── */}
      <div className="border-b border-rule bg-bone py-6">
        <MarqueeRow
          speed={70}
          items={[
            "Performance",
            "Consistency",
            "Coachability",
            "Game-Ready",
            "Ecological Lens",
            "Forged",
            "Resonance",
          ]}
          itemClassName="text-ink/70"
        />
      </div>

      {/* ── Programs grid ── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Programs & Writing"
            title={<>Three rooms. One lens.</>}
            lede="Each is a different intensity of the same work — becoming the kind of athlete or coach the moment respects."
            layout="split"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:gap-8">
          <Reveal>
            <OfferCard
              layout="feature"
              eyebrow="Flagship · 1-on-1 coaching"
              status="Applications open"
              signalAccent
              title="Resonance Mentorship"
              description={
                <>
                  <p>
                    My private 1-on-1 coaching service for serious athletes who
                    want to become more consistent, more coachable, and more
                    game-ready — so they earn more trust, more minutes, and
                    better opportunities.
                  </p>
                  <p>
                    Weekly coaching, 24/7 access, film review, and a custom
                    Athlete Operating System built around your sport, body, and
                    schedule. Backed by a 90-day Game-Ready Guarantee.
                  </p>
                </>
              }
              href="/mentorship"
              cta="Apply for a spot"
              meta="12 athletes · Next intake opens May 18, 2026"
            />
          </Reveal>

          <StaggerGroup className="grid gap-6 md:grid-cols-2 md:gap-8">
            <StaggerItem>
              <OfferCard
                eyebrow="8 weeks · Live"
                status="5 spots"
                title="Resonance Cohort"
                description={
                  <p>
                    An 8-week live cohort for coaches who want to lead better
                    under pressure. Build your pressure-response system,
                    coaching philosophy upgrade, and team adversity playbook.
                  </p>
                }
                href="/cohort"
                cta="See the cohort"
                meta="First cohort · June 15, 2026"
              />
            </StaggerItem>

            <StaggerItem>
              <OfferCard
                eyebrow="Free · Weekly"
                title="The Resonance Newsletter"
                description={
                  <p>
                    A weekly letter on athletic skill, performance, and the
                    ecological lens. Long-form essays for athletes, coaches,
                    and parents who want a better frame than motivational
                    coaching.
                  </p>
                }
                href="https://samelsner.substack.com/"
                cta="Read the latest"
                meta="Every Friday morning · Free"
              />
            </StaggerItem>
          </StaggerGroup>

          <Reveal>
            <OfferCard
              eyebrow="About"
              title="The lens behind Resonance"
              description={
                <p>
                  Why athletes don’t lose opportunities to talent — they lose
                  them to inconsistency, scattered preparation, and a misread
                  of what the game is asking. The story behind the work, and
                  how I’ll coach you.
                </p>
              }
              href="/about"
              cta="Read about Sam"
            />
          </Reveal>
        </div>
      </Section>

      {/* ── Inverted philosophy strip ── */}
      <Section inverted>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <Reveal>
            <div className="eyebrow text-bone/60 mb-5">The lens</div>
            <h2 className="text-bone balance">
              Talent gets you noticed. Consistency gets you trusted.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="copy-lg pretty text-bone/80">
            <p>
              Most athletes don’t lose opportunities because they lack talent.
              They lose them because their performance is inconsistent, their
              preparation is scattered, or they don’t fully understand what the
              game is asking from them.
            </p>
            <p className="mt-5">
              More training isn’t always the answer. Better training is.
              Resonance is built around how humans actually learn — through
              perception, environment, and reps that match the real demands of
              the game.
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          className="mt-16 grid gap-px overflow-hidden rounded-lg border border-bone/15 bg-bone/15 md:grid-cols-3"
          stagger={0.12}
        >
          <StaggerItem className="bg-ink p-7 md:p-8">
            <div className="font-sans text-3xl font-semibold tracking-tightest text-bone md:text-4xl">
              <Counter value={5000} suffix="+" duration={2.2} />
            </div>
            <div className="copy mt-3 pretty text-bone/70">
              Athletes coached, youth level through NFL and NHL.
            </div>
          </StaggerItem>
          <StaggerItem className="bg-ink p-7 md:p-8">
            <div className="font-sans text-3xl font-semibold tracking-tightest text-bone md:text-4xl">
              <Counter value={8} suffix=" yrs" duration={1.8} />
            </div>
            <div className="copy mt-3 pretty text-bone/70">
              Coaching across performance, mentality, recovery, and film.
            </div>
          </StaggerItem>
          <StaggerItem className="bg-ink p-7 md:p-8">
            <div className="font-sans text-3xl font-semibold tracking-tightest text-bone md:text-4xl">
              <Counter value={2} prefix="" suffix="× NCAA" duration={1.5} />
            </div>
            <div className="copy mt-3 pretty text-bone/70">
              National champion in the discus. Six-time All-American.
            </div>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      {/* ── Final CTA ── */}
      <Section divider>
        <div className="grid items-end gap-8 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-5">Start here</div>
            <h2 className="balance">
              The opportunity is already in front of you. The question is
              whether you’re ready for it.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap gap-3 md:justify-end">
            <ShineButton>
              <CTA href="/mentorship" variant="primary">
                Apply for mentorship
              </CTA>
            </ShineButton>
            <CTA href="https://samelsner.substack.com/" variant="secondary">
              Read the newsletter
            </CTA>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
