import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Apply — The Resonance Cohort",
  description:
    "Book the call. Then we begin. Apply to The Resonance Cohort.",
  robots: { index: true, follow: true },
};

/**
 * The /apply layout. Minimal. No nav, no footer.
 * One full-bleed Void surface. The single-decision frame.
 *
 * Brand-within-brand tokens are scoped here via CSS variables so they
 * don't leak into the rest of the site. Fonts are loaded globally in the
 * root layout and referenced by variable.
 */
export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-apply-scope
      style={
        {
          // Void / Onyx / Cosmic Crimson palette — scoped to this surface.
          ["--void"]: "#080806",
          ["--onyx"]: "#1A1A18",
          ["--crimson"]: "#B22222",
          ["--ember"]: "#8B1515",
          ["--bone"]: "#EDEBE0",
          ["--ash"]: "#6B6B65",
          ["--slate"]: "#2C2C2A",
          minHeight: "100vh",
          background: "#080806",
          color: "#EDEBE0",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
