'use client'

import { motion } from 'framer-motion'

const TELEGRAM_URL = 'https://t.me/+16128453855'

const packages = [
  {
    name: 'Clarity Call',
    price: '$250',
    priceNote: null,
    note: null,
    description:
      'A single 75-minute session. Map what\u2019s actually happening, find the leverage point, leave with a specific move.',
  },
  {
    name: 'Full Engagement',
    price: '$650',
    priceNote: '/month',
    note: 'Ten spots.',
    description:
      'Monthly calls. Direct Telegram access. Daily check-ins. Resources built for your specific situation. Ongoing attention for as long as we\u2019re working together.',
  },
]

export function CoachingSection() {
  return (
    <section
      style={{
        padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 7vw, 8rem)',
      }}
    >
      <div style={{ maxWidth: '640px' }}>
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
          Step Three — Direct Attention
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
          There are things a<br />course cannot do.
        </motion.h2>

        {/* Body */}
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
          One-on-one. Built entirely around your situation. Not a system you
          apply — someone who actually looks at yours.
        </motion.p>

        {/* Package rows */}
        <div style={{ marginBottom: '2.5rem' }}>
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                padding: '1.75rem 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-montserrat-alternates)',
                    fontSize: '11px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#F0F0F0',
                  }}
                >
                  {pkg.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    color: '#F0F0F0',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {pkg.price}
                  {pkg.priceNote && (
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '13px',
                        color: 'rgba(240,240,240,0.35)',
                        letterSpacing: 0,
                      }}
                    >
                      {pkg.priceNote}
                    </span>
                  )}
                </span>
              </div>
              {pkg.note && (
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat-alternates)',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(240,240,240,0.30)',
                    margin: '0 0 0.6rem',
                  }}
                >
                  {pkg.note}
                </p>
              )}
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: 'rgba(240,240,240,0.55)',
                  margin: 0,
                  maxWidth: '480px',
                }}
              >
                {pkg.description}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        </div>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.4 }}
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(240,240,240,0.55)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#F0F0F0'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(240,240,240,0.55)'
          }}
        >
          Inquire via Telegram →
        </motion.a>
      </div>
    </section>
  )
}
