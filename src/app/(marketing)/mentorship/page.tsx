import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { FeatureGrid, ForList } from "@/components/site/FeatureGrid";
import { FAQ } from "@/components/site/FAQ";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";
import { ShineButton } from "@/components/motion/ShineButton";
import { GridBg } from "@/components/motion/GridBg";

const APPLICATION_FORM_LINK = "/apply/mentorship";
const BOOKING_LINK = "/book/fit-call";

export const metadata: Metadata = {
  title: "Resonance Mentorship",
  description:
    "Private 1-on-1 coaching with Sam Elsner for serious athletes who want to be more consistent, coachable, and game-ready. 12 athletes. Next intake opens May 18, 2026.",
};

export default function MentorshipPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden border-b border-rule">
        <GridBg variant="dots" />
        <Container className="relative grid items-end gap-10 py-20 md:grid-cols-[1.4fr_1fr] md:gap-16 md:py-28">
          <div>
            <Reveal as="div" duration={0.55}>
              <div className="eyebrow eyebrow-signal mb-6">
                Private 1-on-1 coaching with Sam Elsner
              </div>
            </Reveal>
            <HeroHeadline className="balance">
              Resonance{" "}
              <SignalUnderline delay={0.85}>Mentorship</SignalUnderline>.
            </HeroHeadline>
            <Reveal
              as="p"
              delay={0.5}
              className="copy-lg mt-7 max-w-2xl pretty text-ink/85"
            >
              Ongoing 1-on-1 coaching for serious athletes who want to become
              more consistent, more coachable, and more game-ready — so they
              earn more trust, more minutes, and better opportunities.
            </Reveal>
            <Reveal
              as="p"
              delay={0.65}
              className="copy mt-5 max-w-2xl pretty text-ink/70"
            >
              For athletes who know they have more in them, but need the right
              system, support, and lens to perform when it counts. Backed by a
              90-day Game-Ready Guarantee.
            </Reveal>
          </div>

          <Reveal
            delay={0.7}
            className="flex flex-col items-start gap-5 md:items-end md:text-right"
          >
            <div className="flex flex-wrap gap-3 md:justify-end">
              <ShineButton>
                <CTA href={APPLICATION_FORM_LINK} variant="primary">
                  Apply for a mentorship spot
                </CTA>
              </ShineButton>
              <CTA href={BOOKING_LINK} variant="secondary">
                Book a fit call
              </CTA>
            </div>
            <p className="font-sans text-sm text-muted">
              I work with 12 athletes at a time. Next intake opens May 18, 2026.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Problem ── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="The real bottleneck"
            eyebrowSignal
            title="Talent gets you noticed. Consistency gets you trusted."
            lede={
              <>
                <p>
                  Most athletes don’t lose opportunities because they lack
                  talent. They lose them because their performance is
                  inconsistent, their confidence swings, their preparation is
                  scattered, or they don’t fully understand what the game is
                  asking from them.
                </p>
                <p className="mt-5">
                  More training isn’t always the answer. Sometimes you need a
                  better system. Better habits. Better feedback. Better
                  recovery. Better film work. A better way to see the game.
                </p>
                <p className="mt-5 font-sans font-medium text-ink">
                  That’s what Resonance Mentorship is built for.
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
            title="This is for the athlete who wants to be taken seriously."
            layout="stacked"
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <ForList
            forItems={[
              "You want more playing time and more trust from your coaches.",
              "You’re competing for scholarships, contracts, roster spots, or higher-level opportunities.",
              "You’re tired of feeling prepared in training but inconsistent in games.",
              "You want a personalised system, not a copy-and-paste program.",
              "You’re willing to do the work, take feedback, and raise your standard.",
            ]}
            notForItems={[
              "Athletes looking for motivation quotes or shortcuts.",
              "Anyone who wants someone to do the work for them.",
              "You’ll be coached hard, supported properly, and expected to execute.",
            ]}
          />
        </Reveal>
      </Section>

      {/* ── 4. What's included ── */}
      <Section inverted>
        <Reveal>
          <SectionHeader
            inverted
            eyebrow="Inside the room"
            title="Your custom Athlete Operating System."
            lede="Inside Resonance Mentorship, we build the athlete around the game, not just the workout."
            layout="split"
          />
        </Reveal>
        <div className="mt-12">
          <FeatureGrid
            features={[
              {
                title: "Weekly Coaching Calls",
                body: "Get coached every week on your performance, mentality, habits, preparation, and next steps.",
              },
              {
                title: "24/7 Telegram Access",
                body: "Ask questions, send updates, get feedback, and stay connected between calls.",
              },
              {
                title: "Film Review",
                body: "Break down your game so you can see what’s helping you earn trust and what’s costing you opportunities.",
              },
              {
                title: "Custom Training Direction",
                body: "Performance work built around your sport, position, schedule, body, and goals.",
              },
              {
                title: "Nutrition & Recovery Support",
                body: "Simple systems to help you fuel, recover, and stay available when it matters most.",
              },
              {
                title: "Mentality & Confidence Work",
                body: "Build routines that keep you calmer, clearer, and more locked in under pressure.",
              },
              {
                title: "Game Sense Development",
                body: "Learn to read the game faster, make better decisions, and understand what’s happening before everyone else does.",
              },
              {
                title: "Quarterly Performance Audit",
                body: "A full review of your trajectory, where you’re leaking opportunity, and the next 30/60/90 day map.",
              },
              {
                title: "Direct Line To Sam",
                body: "You don’t talk to a coordinator. You talk to me. Every call. Every message.",
              },
            ]}
          />
        </div>
      </Section>

      {/* ── 5. Mentor credibility ── */}
      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-5">The mentor</div>
            <h2 className="balance">
              Coached from youth level to the pros.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="copy-lg pretty text-ink/85">
            <p>
              Resonance Mentorship is led by Sam Elsner, a sports performance
              coach with 8 years of experience and work with over 5,000
              athletes — from youth level through professional sport, including
              the NFL and NHL.
            </p>
            <p className="mt-5">
              The approach is realistic, holistic, and personalised. We don’t
              just chase more reps. We look at the full athlete — body, mind,
              habits, film, recovery, decision-making, and environment.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── 6. Bonus ── */}
      <Section divider>
        <Reveal>
          <SectionHeader
            eyebrow="Bonus"
            eyebrowSignal
            title="Custom Athlete Operating System."
            lede="Every athlete gets a personalised system for training, nutrition, recovery, mindset, film, and weekly habits — built around their sport, position, schedule, and goals."
            layout="split"
          />
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <StaggerItem>
            <div className="card p-7 md:p-8">
              <div className="eyebrow mb-4">Included for everyone</div>
              <h3 className="font-sans text-xl font-semibold tracking-tightest text-ink">
                The Athlete Operating System
              </h3>
              <p className="copy mt-3 pretty text-ink/85">
                A complete personalised system: training, fuel, recovery,
                mindset, film, weekly rhythm. Built once, refined every quarter.
              </p>
              <p className="mt-5 font-sans text-sm text-muted">
                Worth $1,500 — yours when you join.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="card border-ink p-7 md:p-8">
              <div className="eyebrow eyebrow-signal mb-4">
                Fast-action bonus · First 3 athletes
              </div>
              <h3 className="font-sans text-xl font-semibold tracking-tightest text-ink">
                Private Film + Performance Blueprint Session
              </h3>
              <p className="copy mt-3 pretty text-ink/85">
                We break down your current game, identify the biggest
                performance leaks, and map the first 90 days of your
                improvement plan together — line by line.
              </p>
              <p className="mt-5 font-sans text-sm text-muted">
                Worth $1,000. Only available to the first three who join.
              </p>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      {/* ── 7. Guarantee ── */}
      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-5">Guarantee</div>
            <h2 className="balance">
              The 90-Day Game-Ready Guarantee.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="copy-lg pretty text-ink/85">
            <p>
              If you show up to the weekly calls, complete your assignments,
              and use the system for 90 days — and you don’t feel more
              prepared, consistent, and game-ready — you’ll receive an extra
              month of coaching free.
            </p>
            <p className="mt-5 font-sans text-sm text-muted">
              This does not guarantee playing time, scholarships, contracts, or
              selection. Those decisions are outside our control. The guarantee
              backs the process, the coaching, and the work we do together.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── 8. Investment + application gate ──
          Per Dan Toruno brand-discovery call (2026-05-08): for high-ticket
          coaching, public pricing tiers attract tire-kickers and shrink
          the perceived ceiling. Replace with an application gate that
          pre-qualifies on commitment + capacity, then surfaces the right
          investment privately on the fit call. */}
      <Section inverted>
        <Reveal>
          <SectionHeader
            inverted
            eyebrow="Investment"
            eyebrowSignal
            title="By application only."
            lede={
              <>
                <p>
                  Resonance Mentorship is a serious commitment of time,
                  energy, and capital. Because of that — and because I only
                  work with 12 athletes at a time — I do not publish prices.
                </p>
                <p className="mt-5">
                  If you’re a fit, we’ll talk through investment, structure,
                  and the right plan for you on a private fit call. Both
                  monthly and yearly options are available, and a small
                  number of partial-scholarship spots are reserved each
                  intake for athletes whose work I want to back personally.
                </p>
              </>
            }
            layout="split"
          />
        </Reveal>
        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-lg border border-bone/15 bg-ink p-7 md:p-10">
            <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
              <div>
                <div className="eyebrow eyebrow-signal mb-4">
                  How it works
                </div>
                <ol className="space-y-4 font-sans text-[15px] text-bone/85">
                  <li className="flex gap-4">
                    <span className="font-mono text-signal">01</span>
                    <span>
                      Submit a short application — five minutes, designed
                      to make sure we’re the right fit before either of us
                      spends time on a call.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-signal">02</span>
                    <span>
                      If your application is a fit, you’ll get an invite to
                      book a private fit call directly with me. No
                      coordinators, no sales team.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-signal">03</span>
                    <span>
                      We map your goals, your bottleneck, and the right
                      mentorship plan. If we both choose to move forward,
                      you start the next week.
                    </span>
                  </li>
                </ol>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <ShineButton>
                  <CTA href={APPLICATION_FORM_LINK} variant="signal">
                    Apply for a mentorship spot
                  </CTA>
                </ShineButton>
                <CTA href={BOOKING_LINK} variant="ghost" className="text-bone/85">
                  Or book a fit call →
                </CTA>
                <p className="font-sans text-xs text-bone/55 md:text-right">
                  Applications reviewed within 48 hours. <br />
                  12 spots per intake — next opens May 18, 2026.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 9. Urgency ── */}
      <Section divider>
        <div className="grid items-end gap-10 md:grid-cols-[1.4fr_1fr] md:gap-20">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-5">Closing fast</div>
            <h2 className="balance">Next intake opens May 18, 2026.</h2>
            <p className="copy-lg mt-6 max-w-2xl pretty text-ink/85">
              I work with 12 athletes at a time so each person gets proper
              attention, feedback, and support. Applications for the next
              intake close May 17, 2026 — or when every spot is filled.
            </p>
            <p className="copy mt-5 max-w-2xl pretty text-ink/70">
              The first 3 athletes who join the next intake also receive the
              private Film + Performance Blueprint Session.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap gap-3 md:justify-end">
            <ShineButton>
              <CTA href={APPLICATION_FORM_LINK} variant="primary">
                Apply for a spot
              </CTA>
            </ShineButton>
          </Reveal>
        </div>
      </Section>

      {/* ── 10. FAQ ── */}
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
                q: "Is this only for elite athletes?",
                a: "No. It’s for serious athletes. You don’t need to be pro. You do need to care about getting better and be willing to do the work.",
              },
              {
                q: "Does this guarantee more playing time?",
                a: "No. No one can honestly guarantee that. The mentorship helps you become more consistent, prepared, coachable, and game-ready — which puts you in a stronger position to earn trust and opportunity.",
              },
              {
                q: "What sports is this for?",
                a: "The system can be adapted across sports because the work covers performance, mentality, film, recovery, habits, and decision-making.",
              },
              {
                q: "How much time does it take each week?",
                a: "Expect one weekly call, ongoing Telegram access, and weekly assignments based on your goals and schedule.",
              },
              {
                q: "Can parents be involved?",
                a: "Yes — especially for youth athletes. The main work is with the athlete, but parents can be involved where it supports the athlete’s growth.",
              },
              {
                q: "What happens after I apply?",
                a: "You’ll complete a short application. If it looks like a fit, you’ll be invited to a call to make sure the mentorship is the right move.",
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* ── 11. Final CTA ── */}
      <Section divider>
        <div className="grid items-end gap-8 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-5">Last call</div>
            <h2 className="balance">
              If you’re ready to be coached like your next opportunity matters,
              apply now.
            </h2>
            <p className="copy mt-6 max-w-2xl pretty text-ink/85">
              12 athletes. Next intake opens May 18, 2026. The first 3 receive
              the private Film + Performance Blueprint Session.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap gap-3 md:justify-end">
            <ShineButton>
              <CTA href={APPLICATION_FORM_LINK} variant="primary">
                Apply for a mentorship spot
              </CTA>
            </ShineButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
