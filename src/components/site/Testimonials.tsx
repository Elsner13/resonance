"use client";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "./Container";
import type { SenjaTestimonial } from "@/lib/senja";

interface Props {
  testimonials: SenjaTestimonial[];
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function cleanTestimonialText(text: string): string {
  // Replace "course" with "lens" (case-insensitive, whole word)
  let cleaned = text.replace(/\bcourse\b/gi, "lens");

  // Remove trailing signature lines (name + title)
  const lines = cleaned.split("\n").map((l) => l.trim());
  while (lines.length > 1) {
    const last = lines[lines.length - 1];
    // If last line looks like a name/title signature, remove it
    if (
      last.length < 60 &&
      (/^[A-Z][a-zA-Z\s.&'-]+$/.test(last) ||
        /^[A-Z][a-zA-Z\s.&'-]+,\s*[A-Z]/.test(last) ||
        /CEO|Founder|Inc\.|LLC/.test(last))
    ) {
      lines.pop();
      continue;
    }
    break;
  }
  return lines.join(" ").trim();
}

export function Testimonials({ testimonials }: Props) {
  if (testimonials.length === 0) return null;

  return (
    <section className="section border-t border-rule">
      <Container>
        <Reveal className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-20 lg:gap-28">
          <div>
            <div className="eyebrow eyebrow-signal mb-4">Proof</div>
            <h2 className="balance">What changes when the signal gets clear.</h2>
          </div>
          <div className="copy-lg pretty text-ink/75 max-w-xl">
            <p>
              Numbers are one thing. The real metric is whether you still
              recognize yourself at the end of the container.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6" stagger={0.1}>
          {testimonials.map((t) => {
            const cleanedText = cleanTestimonialText(t.text);
            return (
              <StaggerItem key={t.id}>
                <article className="card card-hover p-7 md:p-8">
                  <div className="flex gap-6 items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-bone font-sans text-lg font-semibold">
                        {getInitials(t.customerName)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      {t.rating && (
                        <div className="mb-2 flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill={i < t.rating! ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className={
                                i < t.rating! ? "text-signal" : "text-rule"
                              }
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                      )}

                      <blockquote className="copy pretty text-ink/85">
                        &ldquo;{cleanedText}&rdquo;
                      </blockquote>

                      <div className="mt-4 flex items-center gap-2">
                        <p className="font-sans text-sm font-medium text-ink">
                          {t.customerName}
                        </p>
                        {(t.customerTagline || t.customerCompany) && (
                          <p className="font-sans text-xs text-muted">
                            {[t.customerTagline, t.customerCompany]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
