"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee — used for credibility / values strip.
 * Pauses on hover; respects reduced-motion via media query.
 * Uses CSS animation for better performance and reliable hover-pause.
 */
export function MarqueeRow({
  items,
  separator = "·",
  speed = 60,
  className,
  itemClassName,
}: {
  items: ReactNode[];
  separator?: string;
  speed?: number;
  className?: string;
  itemClassName?: string;
}) {
  const duration = Math.max(20, items.length * speed * 0.4);

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        className,
      )}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max items-center will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
        }}
      >
        {/* Duplicate 4x to ensure seamless loop on all screen sizes */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className={cn(
              "inline-flex items-center gap-6 pr-6 font-sans text-sm font-medium uppercase tracking-[0.18em]",
              itemClassName,
            )}
          >
            <span>{item}</span>
            <span aria-hidden className="text-signal">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
