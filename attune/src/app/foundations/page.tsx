import Image from 'next/image'
import Link from 'next/link'
import { TubelightNav } from '@/components/TubelightNav'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Foundations — The Skill Development Course',
  description:
    'Foundations is an 8-module course on the operating system behind skill development. Learn why deliberate practice fails for most people, how to diagnose your plateau, and how to improve faster.',
  openGraph: {
    title: 'Foundations — The Skill Development Course | Attune',
    description:
      'An 8-module course on why most practice fails and how to break through skill plateaus. Deliberate practice, performance foundations, and real improvement.',
  },
}

const STRIPE_URL = 'https://buy.stripe.com/6oUaEX75TftH4GP77RefC06'

export default function FoundationsPage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px 80px',
      }}
    >
      <Link href="/" style={{ position: 'relative', width: 'min(380px, 32vw)', aspectRatio: '1 / 1', marginBottom: '24px', display: 'block' }}>
        <Image src="/attune-logo.png" alt="Attune" fill style={{ objectFit: 'contain' }} priority />
      </Link>

      <p
        style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: 'clamp(16px, 1.4vw, 24px)',
          fontWeight: 400,
          letterSpacing: '0.02em',
          color: '#000000',
          textAlign: 'center',
          textTransform: 'uppercase',
          margin: '0 0 12px',
        }}
      >
        The reps aren&apos;t the problem.
      </p>

      <p
        style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: 'clamp(15px, 1vw, 16px)',
          fontWeight: 400,
          color: '#555555',
          textAlign: 'center',
          letterSpacing: '0.01em',
          margin: '0 0 32px',
          maxWidth: '480px',
        }}
      >
        You&apos;re doing the work. Showing up. Putting in the hours. Still not clicking.
        Here&apos;s why: skill doesn&apos;t live inside you. It emerges from the relationship
        between you and your environment. Change that relationship, and everything starts
        moving differently. Eight modules. One reframe that makes the work finally land.
      </p>

      <a
        href={STRIPE_URL}
        style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: 'clamp(12px, 1vw, 14px)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#000000',
          textDecoration: 'none',
          border: '1px solid #000000',
          padding: '10px 28px',
        }}
      >
        Enroll — $197
      </a>

      <Link
        href="/sign-in"
        style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: 'clamp(11px, 0.85vw, 12px)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#aaaaaa',
          textDecoration: 'none',
          marginTop: '16px',
        }}
      >
        Already enrolled? Sign in
      </Link>

      <TubelightNav />
    </div>
  )
}
