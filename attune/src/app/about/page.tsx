import Image from 'next/image'
import Link from 'next/link'
import { TubelightNav } from '@/components/TubelightNav'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Attune was built by someone obsessed with how humans get better — not a guru or system-seller, just someone who ran too many experiments on himself and had to share what actually works.',
  openGraph: {
    title: 'About Attune',
    description:
      'Not a guru. Not a system-seller. Just someone obsessed with how humans get better and what actually drives skill development.',
  },
}

export default function AboutPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px 80px' }}>
      <Link href="/" style={{ position: 'relative', width: 'min(380px, 32vw)', aspectRatio: '1 / 1', marginBottom: '24px', display: 'block' }}>
        <Image src="/attune-logo.png" alt="Attune" fill style={{ objectFit: 'contain' }} priority />
      </Link>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 'clamp(16px, 1.4vw, 24px)', fontWeight: 400, letterSpacing: '0.02em', color: '#000000', textAlign: 'center', textTransform: 'uppercase', margin: '0 0 12px' }}>
        Just obsessed with how humans get better.
      </p>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 'clamp(15px, 1vw, 16px)', fontWeight: 400, color: '#555555', textAlign: 'center', letterSpacing: '0.01em', margin: '0 0 32px', maxWidth: '460px' }}>
        Not a guru. Not a system-seller. Just someone who can&apos;t turn the question off.
        Read too many books. Ran too many experiments on himself. Started Attune because the conversation had to go somewhere.
      </p>
      <a href="https://findthesignal.substack.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 'clamp(12px, 1vw, 14px)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#000000', textDecoration: 'none', border: '1px solid #000000', padding: '10px 28px' }}>
        Read Signal/Noise
      </a>
      <TubelightNav />
    </div>
  )
}
