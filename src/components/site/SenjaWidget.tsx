"use client";

import { useEffect, useRef } from "react";

/**
 * Senja testimonial widget embed.
 * Loads the Senja platform script and renders the widget inline.
 */
export function SenjaWidget({
  widgetId = "29b9f436-82eb-4daa-ba46-0c2c257780bd",
}: {
  widgetId?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    // Load Senja widget script if not already present
    const existing = document.querySelector(
      `script[src*="widget.senja.io/widget/${widgetId}"]`,
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = `https://widget.senja.io/widget/${widgetId}/platform.js`;
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [widgetId]);

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="senja-embed"
        data-id={widgetId}
        data-mode="shadow"
        data-lazyload="false"
        style={{ display: "block", width: "100%" }}
      />
    </div>
  );
}
