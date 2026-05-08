"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated red underline that draws in beneath inline accent words.
 * Replaces the static `.signal-underline` for hero/section headlines.
 * Uses GSAP for tight ease control + repeatable trigger.
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
  const wordRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.85,
          delay,
          ease: "power3.out",
        },
      );
    }, wordRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <span
      ref={wordRef}
      className={cn("relative inline-block", className)}
    >
      {children}
      <span
        ref={lineRef}
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 -bottom-[0.06em] h-[0.08em] origin-left rounded-[2px] bg-signal"
        style={{ transform: "scaleX(0)" }}
      />
    </span>
  );
}
