import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
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

const SITE = {
  name: "Resonance by Sam Elsner",
  url: "https://resonance.coach",
  description:
    "A school for athletes and coaches who want to perform when it counts. Mentorship, cohorts, and the Resonance newsletter from Sam Elsner.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: "%s | Resonance",
  },
  description: SITE.description,
  keywords: [
    "Sam Elsner",
    "Resonance",
    "Athlete mentorship",
    "Coaching cohort",
    "Sport performance",
    "Ecological dynamics",
    "Skill acquisition",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: "Resonance",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
