import Image from 'next/image'
import Link from 'next/link'
import { TubelightNav } from '@/components/TubelightNav'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '1-on-1 Performance Coaching',
  description:
    'Work directly with Attune for personalized performance coaching. Designed for people who are stuck at the same skill level despite hard work — and need someone to identify exactly what is holding them back.',
  openGraph: {
    title: '1-on-1 Performance Coaching | Attune',
    description:
      'Personalized coaching for skill development. If you have tried everything and are still not improving, this is for you.',
  },
}

// TODO: replace with your Telegram username
const TELEGRAM_URL = 'https://t.me/+16128453855'

const font = 'var(--font-montserrat-alternates)'

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.14em',
  color: '#000000',
  textTransform: 'uppercase',
  margin: '0 0 20px',
}

const bodyStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: 'clamp(13px, 1.1vw, 16px)',
  fontWeight: 400,
  color: '#555555',
  lineHeight: 1.95,
  letterSpacing: '0.01em',
  margin: '0 0 14px',
}

const dividerStyle: React.CSSProperties = {
  width: '100%',
  height: '1px',
  background: '#e8e8e8',
  margin: '48px 0',
}

const telegramBtnStyle: React.CSSProperties = {
  display: 'inline-block',
  marginTop: '24px',
  fontFamily: font,
  fontSize: '11px',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: '#000000',
  textDecoration: 'none',
  border: '1px solid #000000',
  padding: '9px 20px',
}

export default function CoachingPage() {
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

      <div style={{ maxWidth: '560px', width: '100%' }}>

        {/* Page headline */}
        <p
          style={{
            fontFamily: font,
            fontSize: 'clamp(16px, 1.6vw, 26px)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: '#000000',
            textTransform: 'uppercase',
            margin: '0 0 48px',
          }}
        >
          1:1 Coaching
        </p>

        {/* What this is */}
        <p style={sectionHeadingStyle}>What this is</p>
        <p style={bodyStyle}>
          This is my only private coaching container. One-on-one, ongoing, built entirely
          around you.
        </p>
        <p style={bodyStyle}>
          You&apos;re working directly with me — on your specific situation, your specific
          environment, the specific thing that isn&apos;t moving.
        </p>
        <p style={bodyStyle}>
          The approach is rooted in how performance actually develops: not through more
          discipline or better mindset, but through the relationship between you and your
          conditions. Most people try to change themselves. We change the conditions.
          The results follow.
        </p>
        <p style={bodyStyle}>
          Think of it as a performance coach and thinking partner in your pocket —
          someone who knows your actual situation, not a generic version of it.
        </p>

        <div style={dividerStyle} />

        {/* How it works */}
        <p style={sectionHeadingStyle}>How it works</p>
        <p style={bodyStyle}>
          We start with a 75-minute onboarding call to map your situation: where you are,
          what you&apos;re working on, and what&apos;s actually in the way. Not the story
          about it — the actual thing.
        </p>
        <p style={bodyStyle}>
          From there you have a direct line to me. Voice notes, messages, real-time
          check-ins when the moment is live — not just when we have a scheduled hour.
          A brief daily check-in keeps me inside the loop as things evolve.
        </p>
        <p style={bodyStyle}>
          Along the way: resources, frameworks, and assignments built for your specific
          situation. Nothing generic. Everything matched to what you&apos;re actually
          working through.
        </p>

        <div style={dividerStyle} />

        {/* Who it's for */}
        <p style={sectionHeadingStyle}>Who it&apos;s for</p>
        <p style={bodyStyle}>
          Founders, athletes, creators, executives — anyone doing serious work on
          something that matters to them.
        </p>
        <p style={bodyStyle}>
          The common thread: you&apos;re already doing the work. Showing up. Putting in
          the hours. Something still isn&apos;t moving the way it should.
        </p>
        <p style={bodyStyle}>
          Maybe it&apos;s performance — athletic, creative, professional. Maybe it&apos;s a
          decision you keep circling. Maybe it&apos;s a pattern you&apos;ve identified
          but can&apos;t seem to actually change.
        </p>
        <p style={bodyStyle}>
          If you want someone to hand you a system, this isn&apos;t it. If you want someone
          to actually look at your situation and tell you what you can&apos;t see alone —
          this is it.
        </p>

        <div style={dividerStyle} />

        {/* Packages */}
        <p style={sectionHeadingStyle}>1:1 Coaching Packages</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Clarity Call */}
          <div style={{ border: '1px solid #d8d8d8', padding: '32px 28px' }}>
            <p
              style={{
                fontFamily: font,
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#000000',
                margin: '0 0 10px',
              }}
            >
              Clarity Call
            </p>
            <p
              style={{
                fontFamily: font,
                fontSize: 'clamp(20px, 2.2vw, 30px)',
                color: '#000000',
                margin: '0 0 16px',
                letterSpacing: '-0.01em',
              }}
            >
              $250
            </p>
            <p
              style={{
                fontFamily: font,
                fontSize: '14px',
                color: '#666666',
                lineHeight: 1.9,
                margin: '0',
                letterSpacing: '0.01em',
                maxWidth: '420px',
              }}
            >
              A single 75-minute call. We map what&apos;s actually happening, identify
              the leverage point, and you leave with a clear direction and a specific
              move to make.
            </p>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" style={telegramBtnStyle}>
              Inquire via Telegram
            </a>
          </div>

          {/* Full Engagement */}
          <div style={{ border: '1px solid #000000', padding: '32px 28px' }}>
            <p
              style={{
                fontFamily: font,
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#000000',
                margin: '0 0 10px',
              }}
            >
              Full Engagement
            </p>
            <p
              style={{
                fontFamily: font,
                fontSize: 'clamp(20px, 2.2vw, 30px)',
                color: '#000000',
                margin: '0 0 4px',
                letterSpacing: '-0.01em',
              }}
            >
              $650
              <span style={{ fontSize: '14px', color: '#888888', letterSpacing: '0.04em' }}>
                {' '}/month
              </span>
            </p>
            <p
              style={{
                fontFamily: font,
                fontSize: '11px',
                color: '#aaaaaa',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: '0 0 16px',
              }}
            >
              Ten spots
            </p>
            <p
              style={{
                fontFamily: font,
                fontSize: '14px',
                color: '#666666',
                lineHeight: 1.9,
                margin: '0',
                letterSpacing: '0.01em',
                maxWidth: '420px',
              }}
            >
              Monthly 75-minute calls. Direct Telegram access between sessions.
              Daily check-ins so I stay inside what&apos;s actually happening.
              Resources and assignments built for your specific situation.
              Ongoing attention for as long as we&apos;re working together.
            </p>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" style={telegramBtnStyle}>
              Inquire via Telegram
            </a>
          </div>

        </div>

      </div>

      <TubelightNav />
    </div>
  )
}
