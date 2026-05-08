import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export interface Feature {
  title: string;
  body: ReactNode;
}

/**
 * Editorial feature grid — used for "what's included", benefits, etc.
 * Hairline ruled rows in a responsive grid. Tiles stagger in on scroll.
 */
export function FeatureGrid({
  features,
  columns = 3,
  className,
}: {
  features: Feature[];
  columns?: 2 | 3;
  className?: string;
}) {
  const cols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <StaggerGroup
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule",
        cols,
        className,
      )}
      stagger={0.06}
    >
      {features.map((f, i) => (
        <StaggerItem key={i} className="bg-bone p-7 md:p-8">
          <h3 className="font-sans text-base font-semibold leading-[1.2] tracking-tightest text-ink">
            {f.title}
          </h3>
          <div className="copy mt-3 pretty text-ink/85">{f.body}</div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

/**
 * Two-column "this / not this" layout for "Who it's for".
 */
export function ForList({
  forItems,
  notForItems,
  forHeading = "Who it’s for",
  notForHeading = "Not for",
}: {
  forItems: string[];
  notForItems?: string[];
  forHeading?: string;
  notForHeading?: string;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-16">
      <div>
        <div className="eyebrow mb-5 eyebrow-signal">{forHeading}</div>
        <ul className="space-y-4">
          {forItems.map((item, i) => (
            <li key={i} className="flex gap-4 border-t border-rule pt-4 first:border-0 first:pt-0">
              <span
                aria-hidden
                className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
              />
              <span className="copy pretty text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {notForItems && notForItems.length > 0 && (
        <div className="rounded-lg border border-rule bg-bone p-6 md:p-7">
          <div className="eyebrow mb-3">{notForHeading}</div>
          <ul className="space-y-3 font-sans text-sm leading-relaxed text-muted">
            {notForItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
