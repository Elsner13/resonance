"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee — used for credibility / values strip.
 * Pauses on hover; respects reduced-motion via media query.
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
  const total = items.length;

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
      <motion.div
        className="flex shrink-0 items-center whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((item, i) => (
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
            {(i + 1) % total === 0 ? null : null}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
