import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TallyEmbed } from "@/components/motion/TallyEmbed";

export const metadata: Metadata = {
  title: "Apply — Resonance Mentorship",
  description:
    "Apply for a spot in Resonance Mentorship. Private 1-on-1 coaching with Sam Elsner. 12 athletes per intake. Takes 5 minutes.",
};

const TALLY_FORM_ID = "bPuOKUx2sDBGWovJMmkJqt3ESmNElPxx";

export default function ApplyMentorshipPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="border-b border-rule">
        <Container className="py-16 md:py-20">
          <Reveal as="div" duration={0.5}>
            <div className="eyebrow eyebrow-signal mb-5">
              Resonance Mentorship · Application
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="balance max-w-2xl">
              Tell me about where you are and where you want to go.
            </h1>
          </Reveal>

          <Reveal
            as="p"
            delay={0.25}
            className="copy-lg mt-6 max-w-xl pretty text-ink/80"
          >
            This takes about five minutes. I read every application personally
            and reply within 48 hours. If it looks like a fit, I'll send you a
            link to book a private call directly with me.
          </Reveal>

          {/* Trust signals */}
          <Reveal delay={0.35} className="mt-8 flex flex-wrap gap-6">
            {[
              "12 athletes per intake",
              "Applications reviewed within 48 hrs",
              "No sales team — direct to Sam",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-px w-4 bg-signal" />
                <span className="font-sans text-sm text-muted">{item}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ── Form ── */}
      <Section>
        <Container>
          <Reveal delay={0.1}>
            <div className="mx-auto max-w-2xl">
              <TallyEmbed formId={TALLY_FORM_ID} />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
