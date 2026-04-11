// src/components/marketing/StatsSection.tsx
'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '—', label: 'Students', sub: 'have completed Foundations' },
  { value: '—', label: 'Subscribers', sub: 'reading Signal/Noise weekly' },
  { value: '8', label: 'Modules', sub: 'one operating system' },
]

export function StatsSection() {
  return (
    <section style={{
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem)',
      borderTop: '1px solid #1a1a1a',
      borderBottom: '1px solid #1a1a1a',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 'clamp(2rem, 4vw, 0)',
        maxWidth: '900px',
      }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              paddingLeft: i > 0 ? 'clamp(0px, 4vw, 3rem)' : 0,
              borderLeft: i > 0 ? '1px solid #1a1a1a' : 'none',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#F0F0F0',
              margin: '0 0 0.5rem',
            }}>
              {stat.value}
            </p>
            <p style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#F0F0F0',
              margin: '0 0 0.4rem',
            }}>
              {stat.label}
            </p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '13px',
              color: '#555555',
              margin: 0,
              lineHeight: 1.5,
            }}>
              {stat.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
