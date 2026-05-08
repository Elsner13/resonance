"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Number counter that animates from 0 to `value` once when scrolled into view.
 * Supports prefix/suffix decoration (e.g. "5,000+", "8 yrs", "2× NCAA").
 * Uses GSAP + an IntersectionObserver for view trigger.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  format = "comma",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: "comma" | "plain";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        setPlayed(true);
        obs.disconnect();

        const counter = { v: 0 };
        gsap.to(counter, {
          v: value,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (!el) return;
            const n = Math.round(counter.v);
            el.textContent =
              format === "comma" ? n.toLocaleString("en-US") : String(n);
          },
        });
      },
      { threshold: 0.4 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, format, played]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
