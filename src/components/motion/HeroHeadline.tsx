"use client";

import { motion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

/**
 * Hero headline with word-by-word stagger reveal on mount.
 * Restrained, editorial motion — no blur, just subtle opacity + translateY.
 *
 * Wrap sentences in <span className="block"> for dedicated lines.
 * The component recursively tokenizes text inside wrappers so each
 * word still animates individually while respecting block layout.
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
            staggerChildren: 0.04,
            delayChildren: 0.08,
          },
        },
      }}
      className={className}
    >
      {tokens.map((tok, i) => (
        <WordSpan key={i}>{tok}</WordSpan>
      ))}
    </MotionTag>
  );
}

function WordSpan({ children }: { children: ReactNode }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="inline-block whitespace-pre-wrap"
    >
      {children}
    </motion.span>
  );
}

/**
 * Walk children, splitting plain text by word but keeping JSX nodes whole.
 * If a JSX node contains string children, recursively tokenize them so
 * words inside wrappers (like <span className="block">) still animate
 * individually.
 */
function tokenize(children: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      const words = child.split(/(\s+)/).filter(Boolean);
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
      const el = child as ReactElement<{ children?: ReactNode; className?: string }>;
      const inner = el.props.children;

      // If the element has text children, recursively tokenize them
      // and wrap the result back inside the original element.
      if (
        typeof inner === "string" ||
        (Array.isArray(inner) && inner.some((c) => typeof c === "string"))
      ) {
        const innerTokens = tokenize(inner);
        out.push(
          cloneElement(el, {
            ...el.props,
            children: innerTokens.map((tok, i) => (
              <WordSpan key={i}>{tok}</WordSpan>
            )),
          })
        );
      } else {
        // Leaf JSX node (like SignalUnderline) — keep as one token.
        out.push(child);
      }
    } else if (typeof child === "number") {
      out.push(String(child));
    }
  });

  return out;
}
