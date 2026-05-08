// src/components/quiz/QuizResults.tsx
'use client'

import { motion } from 'framer-motion'
import { ARCHETYPES } from './archetypes'
import type { ArchetypeKey } from './archetypes'

const STRIPE_URL = 'https://buy.stripe.com/6oUaEX75TftH4GP77RefC06'

interface Props {
  archetype: ArchetypeKey
  email: string
}

export function QuizResults({ archetype, email }: Props) {
  const data = ARCHETYPES[archetype]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Archetype label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#CC1133',
          margin: '0 0 1rem',
        }}
      >
        Your Archetype
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <p style={{
          fontFamily: 'var(--font-playfair)',
          fontStyle: 'italic',
          fontSize: '13px',
          color: '#555555',
          margin: '0 0 0.5rem',
          letterSpacing: '0.05em',
        }}>
          {data.greek}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          fontWeight: 400,
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          color: '#F0F0F0',
          margin: '0 0 0.5rem',
        }}>
          {data.name}
        </h1>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontStyle: 'italic',
          fontSize: '18px',
          color: '#888888',
          margin: '0 0 2rem',
        }}>
          {data.subtitle}
        </p>
      </motion.div>

      {/* Crimson rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '48px', height: '1px', background: '#CC1133', margin: '0 0 2.5rem', transformOrigin: 'left' }}
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-playfair)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: '#F0F0F0',
          margin: '0 0 2rem',
          lineHeight: 1.4,
        }}
      >
        &ldquo;{data.tagline}&rdquo;
      </motion.p>

      {/* Profile + constraint + methods */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        style={{ maxWidth: '600px' }}
      >
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(14px, 1vw, 16px)',
          lineHeight: 1.78,
          color: '#888888',
          margin: '0 0 2.5rem',
        }}>
          {data.profile}
        </p>

        <p style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#555555',
          margin: '0 0 0.75rem',
        }}>
          Your Core Constraint
        </p>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(14px, 1vw, 16px)',
          lineHeight: 1.78,
          color: '#888888',
          margin: '0 0 2.5rem',
        }}>
          {data.constraint}
        </p>

        <p style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#555555',
          margin: '0 0 1.25rem',
        }}>
          What Works For You
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem' }}>
          {data.methods.map((method, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                gap: '1rem',
                padding: '0.85rem 0',
                borderBottom: '1px solid #1a1a1a',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                lineHeight: 1.65,
                color: '#888888',
              }}
            >
              <span style={{ color: '#CC1133', flexShrink: 0, marginTop: '2px' }}>—</span>
              {method}
            </motion.li>
          ))}
        </ul>

        <div style={{ height: '1px', background: '#1a1a1a', margin: '0 0 2.5rem' }} />

        {/* Next step CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#555555',
            margin: '0 0 1rem',
          }}>
            Your Next Step
          </p>
          <h3 style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#F0F0F0',
            margin: '0 0 1.25rem',
          }}>
            Foundations teaches the operating system your archetype needs.
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <a
              href={STRIPE_URL}
              style={{
                display: 'inline-block',
                background: '#CC1133',
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: 'var(--font-montserrat-alternates)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '15px 36px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(204,17,51,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start with Foundations →
            </a>
            <a
              href="https://t.me/+16128453855"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-montserrat-alternates)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#555555',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#F0F0F0' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#555555' }}
            >
              Want direct attention? →
            </a>
          </div>
        </motion.div>

        {/* Email confirmation */}
        <p style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: '#333333',
          margin: '2rem 0 0',
        }}>
          Your PDF breakdown is on its way to {email}.
        </p>
      </motion.div>
    </motion.div>
  )
}
