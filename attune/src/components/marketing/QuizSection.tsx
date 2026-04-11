// src/components/marketing/QuizSection.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function QuizSection() {
  return (
    <section style={{
      padding: 'clamp(6rem, 14vw, 12rem) clamp(1.5rem, 7vw, 8rem)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '680px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,240,240,0.35)',
            margin: '0 0 1.5rem',
          }}
        >
          The Learner Archetype
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#F0F0F0',
            margin: '0 0 1.75rem',
          }}
        >
          Most learning advice<br />was built for<br />someone else.
        </motion.h2>

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
            maxWidth: '520px',
            margin: '0 0 2.5rem',
          }}
        >
          There are four distinct ways the human mind acquires skill.
          Most people spend years in the wrong framework.
          Eight questions. Your result is free.
          Your PDF breakdown arrives in your inbox.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '8', label: 'questions' },
            { value: '4', label: 'archetypes' },
            { value: 'Free', label: 'result + PDF' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {i > 0 && (
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#CC1133', flexShrink: 0 }} />
              )}
              <div>
                <span style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  fontWeight: 400,
                  color: '#F0F0F0',
                  marginRight: '0.4rem',
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-montserrat-alternates)',
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#555555',
                }}>
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/quiz"
            style={{
              display: 'inline-block',
              background: '#CC1133',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '18px 48px',
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
            Discover your archetype →
          </Link>
          <p style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#555555',
            marginTop: '1.25rem',
          }}>
            Takes 3 minutes. No account required.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
