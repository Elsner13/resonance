import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";
import { Portrait } from "@/components/motion/Portrait";
import { GridBg } from "@/components/motion/GridBg";

export const metadata: Metadata = {
  title: "About Sam",
  description:
    "Two-time NCAA national champion in the discus. Eight years and over 5,000 athletes coached, from youth level through the NFL and NHL. The lens behind Resonance.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-rule">
        <GridBg variant="dots" />
        <Container className="relative grid items-center gap-12 py-20 md:grid-cols-[1fr_1fr] md:gap-16 md:py-28 lg:gap-24">
          <div>
            <Reveal duration={0.55}>
              <div className="eyebrow eyebrow-signal mb-6">About</div>
            </Reveal>
            <HeroHeadline className="balance">
              I’m{" "}
              <SignalUnderline delay={0.85}>Sam Elsner</SignalUnderline>.
            </HeroHeadline>
            <Reveal
              as="p"
              delay={0.5}
              duration={0.7}
              className="copy-lg mt-7 max-w-xl pretty text-ink/85"
            >
              Two-time NCAA national champion in the discus. Eight years and
              over 5,000 athletes coached, from youth level through the NFL
              and NHL.
            </Reveal>
            <Reveal
              as="p"
              delay={0.65}
              duration={0.7}
              className="copy mt-5 max-w-xl pretty text-ink/70"
            >
              The full story is coming soon. For now, here’s the lens — and
              the face behind Resonance.
            </Reveal>
          </div>

          <div className="md:max-w-md md:justify-self-end">
            <Portrait
              src="/sam-about.jpg"
              alt="Sam Elsner — founder of Resonance, two-time NCAA national champion in the discus."
              ratio="4/5"
              eyebrow="Sam Elsner"
              caption="Founder · Coach · Resonance"
              index="N° 01"
              priority
            />
          </div>
        </Container>
      </section>

      {/* ── Story placeholder ── */}
      <section className="border-b border-rule">
        <Container className="py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <div className="eyebrow mb-5">Coming soon</div>
              <h2 className="balance">The story.</h2>
              <p className="copy-lg mt-6 pretty text-ink/70">
                How a discus thrower from Minnesota became a coach to athletes
                from youth level to the pros — and why the way most people are
                taught to train is wrong. Long-form essay coming this season.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
