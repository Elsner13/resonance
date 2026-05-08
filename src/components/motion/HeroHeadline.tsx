"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

/**
 * Hero headline with word-by-word stagger reveal on mount.
 * Pass plain strings or wrap accent words in JSX (e.g. <SignalUnderline>) — those
 * are animated as a single unit.
 *
 * Usage:
 *   <HeroHeadline>
 *     Perform when it <SignalUnderline>counts</SignalUnderline>.
 *   </HeroHeadline>
 */
export function HeroHeadline({
  children,
  as = "h1",
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  const tokens = tokenize(children);

  const MotionTag = (as === "h1" ? motion.h1 : motion.h2) as typeof motion.h1;

  return (
    <MotionTag
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {tokens.map((tok, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="inline-block whitespace-pre"
        >
          {tok}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/**
 * Walk children, splitting plain text by word but keeping JSX nodes whole.
 * Returns an array of strings (with trailing spaces) and JSX nodes.
 */
function tokenize(children: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      const words = child.split(/(\s+)/).filter(Boolean);
      // collapse: pair word with following space if any
      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        const next = words[i + 1];
        if (/\s+/.test(w)) {
          out.push(w);
        } else if (next && /\s+/.test(next)) {
          out.push(w + next);
          i++;
        } else {
          out.push(w);
        }
      }
    } else if (isValidElement(child)) {
      out.push(child);
    } else if (typeof child === "number") {
      out.push(String(child));
    }
  });

  return out;
}
