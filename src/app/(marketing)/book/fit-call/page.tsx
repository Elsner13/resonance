import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { Reveal } from "@/components/motion/Reveal";
import { ShineButton } from "@/components/motion/ShineButton";

export const metadata: Metadata = {
  title: "Book a Fit Call — Resonance Mentorship",
  description:
    "Book a private 20-minute fit call with Sam Elsner to talk through your goals, your bottleneck, and whether Resonance Mentorship is right for you.",
};

/**
 * Booking page — currently a styled placeholder.
 *
 * TO ACTIVATE:
 *   1. Create a free Cal.com account at cal.com
 *   2. Create a 20-min event type ("Resonance Fit Call")
 *   3. Copy your Cal.com username (e.g. "samelsner")
 *   4. Replace CAL_USERNAME below and uncomment the <CalEmbed /> block
 *
 * Cal.com embed docs: https://cal.com/docs/core-features/embed
 */
const CAL_USERNAME = ""; // e.g. "samelsner"
const CAL_EVENT = "fit-call"; // must match your Cal.com event slug

export default function BookFitCallPage() {
  const calLink = CAL_USERNAME
    ? `https://cal.com/${CAL_USERNAME}/${CAL_EVENT}`
    : null;

  return (
    <>
      {/* ── Header ── */}
      <section className="border-b border-rule">
        <Container className="py-16 md:py-20">
          <Reveal as="div" duration={0.5}>
            <div className="eyebrow eyebrow-signal mb-5">
              Resonance Mentorship · Fit Call
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="balance max-w-2xl">
              20 minutes. You and me. No pitch, no pressure.
            </h1>
          </Reveal>

          <Reveal
            as="p"
            delay={0.25}
            className="copy-lg mt-6 max-w-xl pretty text-ink/80"
          >
            We talk through where you are, what you're working toward, and
            whether Resonance Mentorship is the right fit. If it is, we'll
            outline the plan and you can decide from there.
          </Reveal>
        </Container>
      </section>

      {/* ── Booking widget / placeholder ── */}
      <Section>
        <Container>
          {calLink ? (
            /* ─── Live Cal.com inline embed ─── */
            <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-rule">
              <iframe
                src={`${calLink}?embed=true&layout=month_view`}
                width="100%"
                height="700"
                title="Book a fit call with Sam Elsner"
                style={{ border: "none" }}
                loading="lazy"
              />
            </div>
          ) : (
            /* ─── Placeholder until Cal.com is connected ─── */
            <Reveal>
              <div className="mx-auto max-w-2xl">
                <div className="rounded-lg border border-rule bg-bone p-10 text-center">
                  {/* Big signal accent */}
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-rule">
                    <span className="font-mono text-lg text-signal">20m</span>
                  </div>

                  <h2 className="balance text-2xl">
                    Booking opens shortly.
                  </h2>
                  <p className="copy mt-4 pretty text-muted">
                    The calendar is being set up. In the meantime, send a
                    direct email and I'll get back to you within 24 hours to
                    find a time that works.
                  </p>

                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <ShineButton>
                      <CTA href="mailto:hello@resonance.coach" variant="primary">
                        Email Sam directly
                      </CTA>
                    </ShineButton>
                    <CTA href="/apply/mentorship" variant="secondary">
                      Or apply first →
                    </CTA>
                  </div>

                  <p className="mt-6 font-sans text-xs text-muted">
                    hello@resonance.coach · Replies within 24 hours
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* ── What to expect ── */}
      <Section divider>
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-5">On the call</div>
              <h2 className="balance text-2xl">What we cover in 20 minutes.</h2>
            </Reveal>

            <div className="mt-10 space-y-6">
              {[
                {
                  n: "01",
                  title: "Where you are right now",
                  body: "Your sport, level, biggest performance bottleneck, and what you've already tried.",
                },
                {
                  n: "02",
                  title: "Where you want to go",
                  body: "The specific outcome you're working toward — playing time, scholarship, contract, next level, consistency under pressure.",
                },
                {
                  n: "03",
                  title: "Whether Resonance is the right fit",
                  body: "I'll be honest if I don't think I'm the right person. If we're a fit, I'll walk you through the plan and what working together looks like.",
                },
              ].map((item) => (
                <Reveal key={item.n} delay={0.05}>
                  <div className="flex gap-5">
                    <span className="font-mono text-sm text-signal shrink-0 mt-0.5">
                      {item.n}
                    </span>
                    <div>
                      <p className="font-sans font-semibold text-ink">
                        {item.title}
                      </p>
                      <p className="copy mt-1 text-muted">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
