import { cn } from "@/lib/utils";
import { CTA } from "./CTA";
import type { ReactNode } from "react";

export interface PricingCardProps {
  name: string;
  price: string;
  cadence?: string;
  description?: ReactNode;
  bullets?: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
  badge?: string;
  footnote?: ReactNode;
}

export function PricingCard({
  name,
  price,
  cadence,
  description,
  bullets,
  cta,
  highlight,
  badge,
  footnote,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border p-7 md:p-8",
        highlight
          ? "border-ink bg-ink text-bone"
          : "border-rule bg-bone text-ink",
      )}
    >
      {badge && (
        <span
          className={cn(
            "absolute -top-3 left-7 rounded-full px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]",
            highlight ? "bg-signal text-bone" : "bg-ink text-bone",
          )}
        >
          {badge}
        </span>
      )}

      <div className="flex items-baseline justify-between gap-4">
        <h3
          className={cn(
            "font-sans text-xl font-semibold tracking-tightest",
            highlight ? "text-bone" : "text-ink",
          )}
        >
          {name}
        </h3>
      </div>

      <div className="mt-5 flex items-baseline gap-2">
        <span
          className={cn(
            "font-sans text-4xl font-semibold tracking-tightest",
            highlight ? "text-bone" : "text-ink",
          )}
        >
          {price}
        </span>
        {cadence && (
          <span
            className={cn(
              "font-sans text-sm",
              highlight ? "text-bone/70" : "text-muted",
            )}
          >
            {cadence}
          </span>
        )}
      </div>

      {description && (
        <p
          className={cn(
            "copy mt-4 text-[1rem]",
            highlight ? "text-bone/85" : "text-ink/85",
          )}
        >
          {description}
        </p>
      )}

      {bullets && bullets.length > 0 && (
        <ul
          className={cn(
            "mt-5 space-y-2 font-sans text-sm",
            highlight ? "text-bone/85" : "text-ink/85",
          )}
        >
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span
                className={cn(
                  "mt-2 inline-block h-px w-3 shrink-0",
                  highlight ? "bg-bone/50" : "bg-ink/50",
                )}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-7">
        <CTA
          href={cta.href}
          variant={highlight ? "signal" : "primary"}
          className="w-full"
        >
          {cta.label}
        </CTA>
      </div>

      {footnote && (
        <p
          className={cn(
            "mt-4 font-sans text-xs",
            highlight ? "text-bone/65" : "text-muted",
          )}
        >
          {footnote}
        </p>
      )}
    </div>
  );
}
