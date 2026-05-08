"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle premium shine sweep across CTAs.
 *
 * Per Dan Toruno's brand direction (2026-05-08 call): the floating /
 * magnetic CTA effect read as too flashy for the higher-ticket audience.
 * A restrained, slow shine sweep every ~6s keeps the eye lightly drawn
 * to the primary action without flattening the editorial mood.
 *
 * - Pure CSS, no JS, respects prefers-reduced-motion.
 * - Disabled on coarse pointers via media query (no value on mobile).
 * - Wraps an existing CTA — does not change geometry or color tokens.
 */
export function ShineButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("shine-btn relative inline-block", className)}>
      {children}
    </span>
  );
}
