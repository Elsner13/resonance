import type { Metadata } from 'next'
import { playfair, inter, montserratAlternates } from '@/lib/fonts'
import { ThemeProvider } from '@/components/ThemeProvider'
import { DottedSurface } from '@/components/ui/dotted-surface'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Attune | Skill Development & Performance Coaching',
    template: '%s | Attune',
  },
  description:
    'Stop practicing harder and start practicing smarter. Attune helps you break through skill plateaus, close the gap between effort and results, and reach your next level of performance.',
  keywords: [
    'skill development',
    'performance coaching',
    'how to improve faster',
    'break through skill plateau',
    'deliberate practice course',
    'why am I not improving',
    'skill plateau',
    'learning faster',
    'how to get better at skills',
    'performance foundations',
  ],
  openGraph: {
    title: 'Attune | Skill Development & Performance Coaching',
    description:
      'Stop practicing harder and start practicing smarter. Attune helps you break through skill plateaus, close the gap between effort and results, and reach your next level of performance.',
    url: 'https://www.attunemastery.com',
    siteName: 'Attune',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Attune — Skill is forged, not taught.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Attune | Skill Development & Performance Coaching',
    description:
      'Stop practicing harder and start practicing smarter. Attune helps you break through skill plateaus and reach your next level of performance.',
    images: ['/og.png'],
  },
  metadataBase: new URL('https://www.attunemastery.com'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Attune',
  url: 'https://www.attunemastery.com',
  description:
    'Attune is a skill development and performance coaching platform for people who are putting in the work but not seeing the results. We help you break through skill plateaus, identify what is actually holding you back, and build the conditions for consistent improvement.',
  offers: {
    '@type': 'Course',
    name: 'Foundations',
    description:
      'An 8-module course that teaches the operating system behind skill development — why most practice fails, how to diagnose your own plateau, and how to design conditions that produce real improvement.',
    provider: {
      '@type': 'Organization',
      name: 'Attune',
      url: 'https://www.attunemastery.com',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${montserratAlternates.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <ClerkProvider>
          <ThemeProvider>
            <DottedSurface />
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
