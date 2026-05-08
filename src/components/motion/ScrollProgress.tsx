"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline scroll progress bar at the top of the page.
 * Sits behind the navbar (z-30 < navbar z-40).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-signal pointer-events-none"
      aria-hidden
    />
  );
}
