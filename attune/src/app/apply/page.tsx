import Image from 'next/image'
import Link from 'next/link'
import { TubelightNav } from '@/components/TubelightNav'
import ApplyForm from './ApplyForm'

const fontBase = 'var(--font-montserrat-alternates)'

export default function ApplyPage() {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 6vw, 80px) clamp(100px, 14vw, 160px)',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          position: 'relative',
          width: 'min(140px, max(80px, 14vw))',
          aspectRatio: '1 / 1',
          marginBottom: '56px',
          display: 'block',
        }}
      >
        <Image src="/attune-logo.png" alt="Attune" fill style={{ objectFit: 'contain' }} priority />
      </Link>

      <div style={{ maxWidth: '520px', width: '100%' }}>
        {/* Headline */}
        <p
          style={{
            fontFamily: fontBase,
            fontSize: 'clamp(16px, 1.4vw, 22px)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            color: '#000000',
            textTransform: 'uppercase',
            margin: '0 0 18px',
          }}
        >
          Before we talk.
        </p>

        {/* Pre-form qualifier */}
        <p
          style={{
            fontFamily: fontBase,
            fontSize: 'clamp(14px, 1vw, 15px)',
            fontWeight: 400,
            color: '#555555',
            lineHeight: 1.9,
            letterSpacing: '0.01em',
            margin: '0 0 52px',
          }}
        >
          Ten spots. Not a marketing line — that&apos;s genuinely what I can hold
          and do real work inside of. This form tells me if we&apos;re a fit.
          Answer honestly. I&apos;d rather know now than find out later.
        </p>

        {/* Form */}
        <ApplyForm />

        {/* Footer note */}
        <p
          style={{
            fontFamily: fontBase,
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: '#aaaaaa',
            textTransform: 'uppercase',
            marginTop: '40px',
          }}
        >
          I read every application personally.
        </p>
      </div>

      <TubelightNav />
    </div>
  )
}
