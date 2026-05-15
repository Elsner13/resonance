"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "./Container";

const CREDIBILITY = [
  "Resonance #001",
  "Attune Protocol",
  "The Frequency Method",
  "Coherent Creator",
];

export function CredibilityStrip() {
  return (
    <section className="border-y border-rule bg-ink py-16 md:py-20">
      <Container>
        <Reveal className="text-center">
          <p className="font-sans text-sm uppercase tracking-[0.18em] text-bone/50 mb-10">
            Built from the same frequency as
          </p>
        </Reveal>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {CREDIBILITY.map((item) => (
            <Reveal key={item} delay={0.05}>
              <span className="font-sans text-lg md:text-xl font-semibold text-bone/90 tracking-tight">
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
