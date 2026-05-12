"use client";

import { useEffect } from "react";

/**
 * Tally inline embed.
 * Loads Tally's widget script once, then renders the form in-place.
 * transparentBackground=1 so it inherits our bone background.
 * alignLeft=1 matches editorial left-alignment.
 */
export function TallyEmbed({
  formId,
  title = "Application",
  className,
}: {
  formId: string;
  title?: string;
  className?: string;
}) {
  useEffect(() => {
    // If Tally is already loaded, tell it to load new widgets
    const w = window as unknown as { Tally?: { loadEmbeds: () => void } };
    if (typeof w.Tally !== "undefined") {
      w.Tally.loadEmbeds();
      return;
    }

    // Otherwise inject the script
    const existing = document.getElementById("tally-js");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "tally-js";
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => {
      if (typeof w.Tally !== "undefined") w.Tally.loadEmbeds();
    };
    document.head.appendChild(script);
  }, [formId]);

  return (
    <iframe
      data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&dynamicHeight=1`}
      loading="lazy"
      width="100%"
      height="700"
      title={title}
      className={className}
      style={{ border: "none", display: "block" }}
    />
  );
}
