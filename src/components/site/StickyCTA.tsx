"use client";

import { useEffect, useState } from "react";
import { CTA } from "./CTA";
import { cn } from "@/lib/utils";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past the hero (roughly 80vh)
      setVisible(window.scrollY > window.innerHeight * 0.7);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-rule bg-bone/95 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <div>
          <p className="font-sans text-sm font-medium text-ink">
            The Resonance Cohort
          </p>
          <p className="font-sans text-xs text-muted">5 spots · Closes June 10</p>
        </div>
        <CTA href="/apply/cohort" variant="primary" className="min-w-0 px-4 py-2 text-sm">
          Apply
        </CTA>
      </div>
    </div>
  );
}
