"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial portrait with restrained motion stack:
 *   1. Mount: fade-in + de-blur + slight scale.
 *   2. Cursor parallax: image shifts 6-10px toward pointer (disabled on touch).
 *   3. Scroll parallax: subtle vertical drift as the page scrolls.
 *   4. Hover: gentle ken-burns scale + saturation lift.
 *   5. Sigil: thin red index line + optional mono number tag.
 *
 * Uses next/image for LCP. Pass `priority` for hero placement.
 */
export function Portrait({
  src,
  alt,
  ratio = "4/5",
  caption,
  eyebrow,
  index,
  className,
  priority = false,
  imgClassName,
}: {
  src: string;
  alt: string;
  ratio?: "4/5" | "3/4" | "1/1" | "5/7";
  caption?: string;
  eyebrow?: string;
  index?: string;
  className?: string;
  priority?: boolean;
  imgClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.5 });
  const tx = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const ty = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.25,
      }}
      className={cn("relative isolate", className)}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={reset}
        className={cn(
          "relative overflow-hidden rounded-lg border border-rule bg-rule",
          imgClassName,
        )}
        style={{ aspectRatio: ratio }}
      >
        <motion.div
          style={{ x: tx, y: ty }}
          className="absolute inset-0"
          aria-hidden
        >
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1.02 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: scrollY }}
            className="absolute inset-[-6%]"
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(min-width: 768px) 40vw, 90vw"
              className={cn(
                "object-cover transition-[filter] duration-700 ease-out",
                hovered
                  ? "grayscale-0 contrast-105"
                  : "grayscale contrast-110",
              )}
            />
          </motion.div>
        </motion.div>

        {/* Quiet vignette to keep mark + index visible across photo crop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent mix-blend-multiply opacity-30"
        />

        {/* Index mark — top right, mono, signal red */}
        {index && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute right-4 top-4 z-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/90"
          >
            <span className="h-px w-6 bg-signal" />
            <span>{index}</span>
          </motion.div>
        )}

        {/* Signal index bar — top left, draws in on mount */}
        <motion.span
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
          className="absolute left-4 top-4 h-6 w-[2px] origin-top bg-signal z-10"
        />
      </div>

      {/* Below-image caption (museum-label style) */}
      {(eyebrow || caption) && (
        <motion.figcaption
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-4 flex items-baseline justify-between gap-4"
        >
          {eyebrow && (
            <span className="eyebrow eyebrow-signal">{eyebrow}</span>
          )}
          {caption && (
            <span className="font-sans text-xs text-muted">{caption}</span>
          )}
        </motion.figcaption>
      )}
    </motion.figure>
  );
}
