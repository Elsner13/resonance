"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle grid/dot pattern background for hero. Editorial — not flashy.
 * Slow vertical parallax tied to page scroll. Fades at the bottom edge.
 */
export function GridBg({
  className,
  variant = "dots",
}: {
  className?: string;
  variant?: "dots" | "lines";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  const bg =
    variant === "dots"
      ? "radial-gradient(rgba(20,20,19,0.10) 1px, transparent 1px)"
      : "linear-gradient(rgba(20,20,19,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,19,0.06) 1px, transparent 1px)";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: bg,
            backgroundSize: variant === "dots" ? "22px 22px" : "44px 44px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 35%, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 35%, black, transparent 80%)",
          }}
        />
      </motion.div>
    </div>
  );
}
