import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Source_Serif_4,
  Fraunces,
  DM_Sans,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Fonts for the /apply brand-within-brand. Fraunces italic for display,
// DM Sans for body/UI. Loaded globally so the /apply layout can reference
// them via CSS variables.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE = {
  name: "Sam Elsner",
  url: "https://thesamelsner.com",
  description:
    "Cut the noise. Find your frequency. Become antifragile. The Resonance Method — an ecological alignment protocol for creators who are done optimizing and ready to resonate.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: "%s — Sam Elsner",
  },
  description: SITE.description,
  keywords: [
    "Sam Elsner",
    "Resonance Method",
    "Attune",
    "Creator mentorship",
    "Antifragile",
    "Frequency",
    "Ecological alignment",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: "Sam Elsner",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Static FOUC guard. Sets `dark` on <html> before hydration so dark-mode
// users don't see a flash of light theme. Reads localStorage first,
// falls back to system preference.
const FOUC_GUARD = [
  "(function(){try{",
  "var s=localStorage.getItem('sam-theme');",
  "var p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';",
  "var t=s||p;",
  "if(t==='dark')document.documentElement.classList.add('dark');",
  "}catch(e){}})();",
].join("");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${fraunces.variable} ${dmSans.variable}`}
      >
        <Script id="theme-fouc-guard" strategy="beforeInteractive">
          {FOUC_GUARD}
        </Script>
        {children}
      </body>
    </html>
  );
}
