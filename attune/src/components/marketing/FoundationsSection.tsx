'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const STRIPE_URL = 'https://buy.stripe.com/6oUaEX75TftH4GP77RefC06'

const modules = [
  "Why the Reps Aren\u2019t Working",
  'How Skill Actually Happens',
  'What Your Environment Is Doing to You',
  'The Constraints That Are Running You',
  'Repetition Without Repetition',
  'Designing the Bowl',
  'Representative Practice',
  'The Perceptual Shift',
]

export function FoundationsSection() {
  return (
    <section
      style={{
        padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 7vw, 8rem)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '680px' }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(240,240,240,0.35)',
            margin: '0 0 1.5rem',
          }}
        >
          Step Two — The Operating System
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#F0F0F0',
            margin: '0 0 1.5rem',
          }}
        >
          Eight modules.<br />One reframe.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(15px, 1.1vw, 18px)',
            lineHeight: 1.78,
            color: 'rgba(240,240,240,0.65)',
            margin: '0 0 3rem',
          }}
        >
          Not a mindset course. The actual operating system behind how skill
          develops. Why most practice fails and how to fix the conditions that
          are running you.
        </motion.p>

        {/* Module list */}
        <div style={{ marginBottom: '3.5rem' }}>
          {modules.map((module, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1.25rem',
                padding: '0.85rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-montserrat-alternates)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: '#CC1133',
                  minWidth: '20px',
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: 'rgba(240,240,240,0.65)',
                  letterSpacing: '0.01em',
                }}
              >
                {module}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            marginBottom: '2.5rem',
          }}
        />

        {/* Price block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#F0F0F0',
              margin: '0 0 0.6rem',
            }}
          >
            $197
          </p>
          <p
            style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(240,240,240,0.35)',
              margin: 0,
            }}
          >
            One-time payment. Lifetime access.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1.25rem',
          }}
        >
          <CtaButton href={STRIPE_URL}>Start with Foundations →</CtaButton>
          <Link
            href="/sign-in"
            style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(240,240,240,0.35)',
              textDecoration: 'none',
            }}
          >
            Already enrolled? Sign in
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function CtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-montserrat-alternates)',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#ffffff',
        textDecoration: 'none',
        background: '#CC1133',
        padding: '15px 36px',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 8px 40px rgba(204,17,51,0.4)'
        el.style.background = '#E01235'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
        el.style.background = '#CC1133'
      }}
    >
      {children}
    </a>
  )
}
