import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sam Elsner — Cut the noise. Find your frequency.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: SITE.url,
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

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Sam Elsner",
      url: SITE.url,
      sameAs: [
        "https://samelsner.substack.com/",
        "https://x.com/samelsner_",
      ],
      jobTitle: "Creator Mentor",
      description: SITE.description,
    },
    {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE.url}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable}`}
      >
        <Script id="theme-fouc-guard" strategy="beforeInteractive">
          {FOUC_GUARD}
        </Script>
        {children}
      </body>
    </html>
  );
}
