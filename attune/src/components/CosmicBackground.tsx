"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid-hero";

// Attune compass logo (white SVG)
const LOGO_BASE64 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQiIGhlaWdodD0iODQiIHZpZXdCb3g9IjAgMCA4NCA4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMgMzJDMTMgMjAuOTU0MyAyMS45NTQzIDEyIDMzIDEyQzQ0LjA0NTcgMTIgNTMgMjAuOTU0MyA1MyAzMkM1MyA0My4wNDU3IDQ0LjUgNDcuNSAzMyA1Mkg1M0M1MyA2My4wNDU3IDQ0LjA0NTcgNzIgMzMgNzJDMjEuOTU0MyA3MiAxMyA2My4wNDU3IDEzIDUyQzEzIDQwLjk1NDMgMjIuNSAzNCAzMyAzMkgxM1oiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTUzIDcyQzY0LjczMjQgNjcuMDk3NyA3MyA1NS41MTE3IDczIDQyQzczIDI4LjQ4ODMgNjQuNzMyNCAxNi45MDIzIDUzIDEyVjcyWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=";

const maskStyle = {
  WebkitMaskImage: `url('${LOGO_BASE64}')`,
  WebkitMaskSize: "100vw",
  WebkitMaskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  maskImage: `url('${LOGO_BASE64}')`,
  maskSize: "100vw",
  maskPosition: "center",
  maskRepeat: "no-repeat",
} as const;

export default function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background: "#000000",
      }}
    >
      {/* Background grid layer */}
      <FlickeringGrid
        color="#6D28D9"
        maxOpacity={0.15}
        flickerChance={0.12}
        squareSize={4}
        gridGap={4}
        className="absolute inset-0 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
      />

      {/* Logo mask layer */}
      <div
        className="absolute inset-0 translate-y-[2vh]"
        style={maskStyle}
      >
        <FlickeringGrid
          color="#7C3AED"
          maxOpacity={0.65}
          flickerChance={0.18}
          squareSize={3}
          gridGap={6}
        />
      </div>
    </div>
  );
}
