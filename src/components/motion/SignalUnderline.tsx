"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated red underline that draws in beneath inline accent words.
 * Pure CSS animation — no JS runtime required. Respects prefers-reduced-motion.
 */
export function SignalUnderline({
  children,
  className,
  delay = 0.4,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <span
        aria-hidden
        className="signal-underline-draw pointer-events-none absolute left-0 right-0 -bottom-[0.06em] h-[0.08em] origin-left rounded-[2px] bg-signal"
        style={{ animationDelay: `${delay}s` }}
      />
    </span>
  );
}
