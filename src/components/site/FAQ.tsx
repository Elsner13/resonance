"use client";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "./Container";

const FAQS = [
  {
    q: "How much does it cost?",
    a: "The Resonance Cohort is $2,500 at the founding rate (full price $5,000). Attune mentorship is $1,500/month. Both are application-only because fit matters more than fee. If you're the right frequency, we'll make it work. If you're not, no amount of money changes that.",
  },
  {
    q: "Is this another course?",
    a: "No. There is no curriculum, no modules, no worksheets. The Cohort is a container. The mentorship is a tuning fork. Both are designed to reveal what's already in you — not to install something from the outside.",
  },
  {
    q: "What if I miss a week?",
    a: "Life happens. The Daily Frequency Protocol is 15 minutes — you can do it on a plane, in a parking lot, between calls. The weekly group calls are recorded. But the container works best when you treat it as non-negotiable.",
  },
  {
    q: "Do I need to believe in astrology?",
    a: "No. Astro-numerology is used as frequency data — alignment timing, not dogma. If it resonates, it accelerates the work. If it doesn't, the protocol still functions exactly the same.",
  },
  {
    q: "What makes this different from a mastermind?",
    a: "Masterminds trade tactics. This trades frequency. You won't leave with a new funnel template. You'll leave with a baseline that makes funnels optional.",
  },
  {
    q: "How do I know if I'm ready?",
    a: "If you're exhausted from optimizing and still feel like you're broadcasting static, you're ready. If you're looking for a hack to 10x your output in 30 days, you're not. Book a free discovery call and I'll tell you honestly if this is the right fit.",
  },
];

export function FAQ() {
  return (
    <section className="section border-t border-rule">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20 lg:gap-28">
          <Reveal>
            <div className="eyebrow eyebrow-signal mb-4">Questions</div>
            <h2 className="balance">What people ask before they apply.</h2>
          </Reveal>

          <StaggerGroup className="space-y-0" stagger={0.06}>
            {FAQS.map((faq, i) => (
              <StaggerItem key={i}>
                <details className="group border-b border-rule py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="font-sans text-lg font-medium text-ink">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-6 w-6 shrink-0 items-center justify-center text-muted transition-transform duration-200 group-open:rotate-45"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M7 1v12M1 7h12" />
                      </svg>
                    </span>
                  </summary>
                  <p className="copy mt-4 max-w-xl text-ink/80 pretty pr-8">
                    {faq.a}
                  </p>
                </details>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
