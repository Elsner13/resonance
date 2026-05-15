"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wrapper that adds a restrained hover brightness to CTAs.
 * Replaces the previous shine sweep with a simpler, more editorial treatment.
 */
export function ShineButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-block transition-transform duration-200 hover:scale-[1.02]", className)}>
      {children}
    </span>
  );
}
