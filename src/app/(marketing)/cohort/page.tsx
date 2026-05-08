import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { FeatureGrid, ForList } from "@/components/site/FeatureGrid";
import { PricingCard } from "@/components/site/PricingCard";
import { FAQ } from "@/components/site/FAQ";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";
import { ShineButton } from "@/components/motion/ShineButton";
import { GridBg } from "@/components/motion/GridBg";

const APPLICATION_FORM_LINK = "/apply/cohort";
const BOOKING_LINK = "/book/fit-call";

export const metadata: Metadata = {
  title: "Resonance Cohort",
  description:
    "An 8-week cohort for coaches who want to lead better when things get hard. 5 spots. First cohort begins June 15, 2026.",
};

const WEEKS = [
  { n: "Week 1", title: "Your current coaching lens" },
  { n: "Week 2", title: "Becoming antifragile under pressure" },
  { n: "Week 3", title: "Coaching philosophy and leadership identity" },
  { n: "Week 4", title: "Practice design and skill development" },
  { n: "Week 5", title: "Standards, accountability, and hard conversations" },
  { n: "Week 6", title: "Team adversity and pressure moments" },
  { n: "Week 7", title: "Building your Antifragile Coaching System" },
  { n: "Week 8", title: "Integration, review, and next steps" },
];

export default function CohortPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden border-b border-rule">
        <GridBg variant="dots" />
        <Container className="relative grid items-end gap-10 py-20 md:grid-cols-[1.4fr_1fr] md:gap-16 md:py-28">
          <div>
            <Reveal duration={0.55}>
              <div className="eyebrow eyebrow-signal mb-6">
                8-week live cohort · For coaches
              </div>
            </Reveal>
            <HeroHeadline className="balance">
              Resonance{" "}
              <SignalUnderline delay={0.85}>Cohort</SignalUnderline>.
            </HeroHeadline>
            <Reveal
              as="p"
              delay={0.5}
              className="copy-lg mt-7 max-w-2xl pretty text-ink/85"
            >
              Become an unshakable leader in 8 weeks, so you can handle
              pressure better, lead through adversity, and build teams that
              don’t fold when things get hard.
            </Reveal>
            <Reveal
              as="p"
              delay={0.65}
              className="copy mt-5 max-w-2xl pretty text-ink/70"
            >
              For coaches who want to sharpen their mentality, upgrade their
              leadership lens, and build a practical system for responding to
              adversity.
            </Reveal>
          </div>

          <Reveal
            delay={0.7}
            className="flex flex-col items-start gap-5 md:items-end md:text-right"
          >
            <div className="flex flex-wrap gap-3 md:justify-end">
              <ShineButton>
                <CTA href={APPLICATION_FORM_LINK} variant="primary">
                  Apply for the cohort
                </CTA>
              </ShineButton>
              <CTA href={BOOKING_LINK} variant="secondary">
                Book a fit call
              </CTA>
            </div>
            <p className="font-sans text-sm text-muted">
              Only 5 spots available. First cohort starts June 15, 2026.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Problem ── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="The real test"
            eyebrowSignal
            title="The season doesn’t expose your athletes first. It exposes your leadership."
            lede={
              <>
                <p>
                  Every coach looks solid when things are going well. The real
                  test comes when the team loses, athletes push back, parents
                  get loud, standards slip, confidence drops, or the plan stops
                  working.
                </p>
                <p className="mt-5">
                  That’s where most coaches default to old habits. More
                  control. More talking. More pressure. More frustration. The
                  Resonance Cohort helps you build a better response.
                </p>
                <p className="mt-5 font-sans font-medium text-ink">
                  Not more motivation. A practical lens, philosophy, and
                  pressure-response system you can actually use with your team.
                </p>
              </>
            }
            layout="split"
          />
        </Reveal>
      </Section>

      {/* ── 3. Who it’s for ── */}
      <Section divider>
        <Reveal>
          <SectionHeader
            eyebrow="Fit"
            title="This is for coaches who want to lead better when things get hard."
            layout="stacked"
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <ForList
            forItems={[
              "You coach athletes or teams and want to lead with more clarity under pressure.",
              "You want to build a stronger coaching philosophy.",
              "You want practices that transfer better to real games.",
              "You want higher standards without losing connection.",
              "You want to handle adversity, conflict, and hard conversations better.",
              "You’re willing to reflect, be challenged, and upgrade how you coach.",
            ]}
            notForItems={[
              "Coaches looking for quick motivation or recycled leadership quotes.",
              "Anyone wanting a soft place to complain.",
              "This is for coaches who want to think better and build teams that handle pressure.",
            ]}
          />
        </Reveal>
      </Section>

      {/* ── 4. What you'll build ── */}
      <Section inverted>
        <Reveal>
          <SectionHeader
            inverted
            eyebrow="Outcomes"
            title="By the end of 8 weeks, you’ll have your Antifragile Coaching System."
            lede="Six artefacts you walk out with — built around your sport, your team, and your context."
            layout="split"
          />
        </Reveal>
        <div className="mt-12">
          <FeatureGrid
            features={[
              {
                title: "Pressure-Response System",
                body: "A clear way to respond when your team faces adversity, conflict, poor performance, or emotional swings.",
              },
              {
                title: "Coaching Philosophy Upgrade",
                body: "Turn your beliefs into a practical coaching compass you can use with athletes, staff, and parents.",
              },
              {
                title: "Team Adversity Playbook",
                body: "A simple framework for helping your team respond when things get hard — instead of folding, blaming, or drifting.",
              },
              {
                title: "Practice Design Lens",
                body: "Make practice more game-like, adaptive, and connected to real skill development.",
              },
              {
                title: "Standards & Conversations",
                body: "Build better standards and learn how to have the conversations most coaches avoid until the problem gets bigger.",
              },
              {
                title: "Ecological Coaching Lens",
                body: "A more realistic lens for learning and skill development — environment, perception, decision-making, and adaptability.",
              },
            ]}
            columns={3}
          />
        </div>
      </Section>

      {/* ── 5. Cohort breakdown ── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="The cadence"
            title="8 weeks. 5 coaches. Real work."
            lede="A small-group cohort, not a passive course. You’ll learn, reflect, build, and apply the work directly to your team context."
            layout="split"
          />
        </Reveal>
        <StaggerGroup
          className="mt-12 overflow-hidden rounded-lg border border-rule"
          stagger={0.05}
        >
          {WEEKS.map((w, i) => (
            <StaggerItem
              key={w.n}
              className={`grid grid-cols-[1fr_3fr] items-center gap-6 px-6 py-5 transition-colors hover:bg-rule/40 md:grid-cols-[180px_1fr] md:px-8 md:py-6 ${
                i !== WEEKS.length - 1 ? "border-b border-rule" : ""
              }`}
              y={8}
            >
              <div className="font-sans text-sm font-medium uppercase tracking-[0.08em] text-muted">
                {w.n}
              </div>
              <div className="font-sans text-base font-medium text-ink md:text-lg">
                {w.title}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* ── 6. Mentor credibility ── */}
      <Section divider>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-5">The mentor</div>
            <h2 className="balance">
              Built from real coaching environments.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="copy-lg pretty text-ink/85">
            <p>
              Resonance Cohort is led by Sam Elsner, a sports performance coach
              with 8 years of experience working with over 5,000 athletes —
              from youth level through professional sport, including the NFL
              and NHL.
            </p>
            <p className="mt-5">
              The approach is realistic, holistic, and grounded in the real
              world of coaching. Not theory for theory’s sake. A practical lens
              for helping coaches lead better, design better environments, and
              respond better when pressure hits.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── 7. Bonus ── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Bonuses"
            eyebrowSignal
            title="Two artefacts. Built for you."
            layout="stacked"
          />
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <StaggerItem>
            <div className="card p-7 md:p-8">
              <div className="eyebrow mb-4">Included for everyone</div>
              <h3 className="font-sans text-xl font-semibold tracking-tightest text-ink">
                Practice Design Audit
              </h3>
              <p className="copy mt-3 pretty text-ink/85">
                We review how you currently design practice and give feedback
                on how to make it more game-like, more adaptive, and more
                connected to real skill development.
              </p>
              <p className="mt-5 font-sans text-sm text-muted">
                Worth $1,000.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="card border-ink p-7 md:p-8">
              <div className="eyebrow eyebrow-signal mb-4">
                Fast-action bonus · First 2 coaches
              </div>
              <h3 className="font-sans text-xl font-semibold tracking-tightest text-ink">
                Private Coaching Lens Audit
              </h3>
              <p className="copy mt-3 pretty text-ink/85">
                In a private audit we review your coaching philosophy, practice
                flow, and leadership style. You’ll see where you may be
                over-coaching, under-leading, or missing the real learning
                moments.
              </p>
              <p className="mt-5 font-sans text-sm text-muted">
                Worth $1,000. Only available to the first two who join.
              </p>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      {/* ── 8. Guarantee ── */}
      <Section divider>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-5">Guarantee</div>
            <h2 className="balance">
              The Antifragile Coaching System Guarantee.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="copy-lg pretty text-ink/85">
            <p>
              By the end of 8 weeks, you’ll have your personal pressure-response
              system, coaching philosophy upgrade, and team adversity playbook
              built. If not, I’ll work with you until it is.
            </p>
            <p className="mt-5 font-sans text-sm text-muted">
              This does not guarantee wins, championships, athlete performance
              outcomes, or team selection results. It guarantees the buildout
              of your coaching system and the support needed to complete it.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── 9. Pricing ── */}
      <Section inverted>
        <Reveal>
          <SectionHeader
            inverted
            eyebrow="Pricing"
            title="Join the first Resonance Cohort."
            layout="stacked"
          />
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <StaggerItem>
            <PricingCard
              name="Pay in full"
              price="$1,997"
              description="The cleanest option and the best price. Save $244 vs. payment plan."
              bullets={[
                "All 8 weekly cohort calls",
                "Practice Design Audit",
                "Private cohort group",
                "All artefacts and frameworks",
              ]}
              cta={{ label: "Apply (pay in full)", href: APPLICATION_FORM_LINK }}
              highlight
              badge="Best value"
            />
          </StaggerItem>

          <StaggerItem>
            <PricingCard
              name="Payment plan"
              price="$747"
              cadence="× 3 monthly"
              description="Total: $2,241. For coaches who want to spread the investment."
              bullets={[
                "All 8 weekly cohort calls",
                "Practice Design Audit",
                "Private cohort group",
                "Same access, easier on cash flow",
              ]}
              cta={{ label: "Apply (payment plan)", href: APPLICATION_FORM_LINK }}
            />
          </StaggerItem>
        </StaggerGroup>
        <Reveal as="p" delay={0.2} className="mt-8 font-sans text-sm text-bone/70">
          Only 5 spots are available for the first cohort.
        </Reveal>
      </Section>

      {/* ── 10. Urgency ── */}
      <Section divider>
        <div className="grid items-end gap-10 md:grid-cols-[1.4fr_1fr] md:gap-20">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-5">Closing fast</div>
            <h2 className="balance">First cohort starts June 15, 2026.</h2>
            <p className="copy-lg mt-6 max-w-2xl pretty text-ink/85">
              The first Resonance Cohort is limited to 5 coaches so every
              person gets proper feedback, attention, and support. Enrollment
              closes June 12, 2026 — or when all 5 spots are filled.
            </p>
            <p className="copy mt-5 max-w-2xl pretty text-ink/70">
              The first 2 coaches who join also receive the private Coaching
              Lens Audit.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap gap-3 md:justify-end">
            <ShineButton>
              <CTA href={APPLICATION_FORM_LINK} variant="primary">
                Apply for the cohort
              </CTA>
            </ShineButton>
          </Reveal>
        </div>
      </Section>

      {/* ── 11. FAQ ── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Real answers to real questions."
            layout="stacked"
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <FAQ
            items={[
              {
                q: "Who is this for?",
                a: "Coaches who want to lead better, design better learning environments, and become steadier under pressure.",
              },
              {
                q: "Is this only for sports coaches?",
                a: "The language and examples are built around sport, so it’s strongest for sports coaches. The leadership principles can apply wider, but the first cohort is built for coaches.",
              },
              {
                q: "What do I leave with?",
                a: "Your pressure-response system, coaching philosophy upgrade, team adversity playbook, and a sharper lens for practice design and skill development.",
              },
              {
                q: "Is this a course or a live cohort?",
                a: "It’s a live 8-week cohort. You’ll be expected to show up, reflect, build, and apply the work.",
              },
              {
                q: "How many spots are available?",
                a: "There are 5 spots available for the first cohort.",
              },
              {
                q: "When does it start?",
                a: "The first cohort starts June 15, 2026. Enrollment closes June 12, 2026 or when the 5 spots are filled.",
              },
              {
                q: "Is there a guarantee?",
                a: "Yes. By the end of 8 weeks you’ll have your pressure-response system, coaching philosophy upgrade, and team adversity playbook built. If not, I’ll work with you until it is.",
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* ── 12. Final CTA ── */}
      <Section divider>
        <div className="grid items-end gap-8 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-5">Last call</div>
            <h2 className="balance">
              If you want to lead better when things get hard, this is the
              room.
            </h2>
            <p className="copy mt-6 max-w-2xl pretty text-ink/85">
              5 coaches. 8 weeks. First cohort starts June 15, 2026. Build the
              lens, philosophy, and system to become a more unshakable coach.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap gap-3 md:justify-end">
            <ShineButton>
              <CTA href={APPLICATION_FORM_LINK} variant="primary">
                Apply for the cohort
              </CTA>
            </ShineButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
