'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=9 — "What Experts Actually Have That You Don't"
// Sequential reveal of 4 expert advantages
export default function Inline02_sIdx9() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect()
          let c = 0
          const interval = setInterval(() => {
            c++
            setCount(c)
            if (c >= 4) clearInterval(interval)
          }, 500)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const traits = [
    { label: 'Richer perceptual vocabulary', sub: 'more categories, finer distinctions', color: '#22d3ee' },
    { label: 'Predictive coupling', sub: 'reads earlier signals, acts before events', color: '#06b6d4' },
    { label: 'Robust calibration', sub: 'stable perception under adverse conditions', color: '#0891b2' },
    { label: 'Selective attention', sub: 'knows what NOT to look at', color: '#0e7490' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 14, textAlign: 'center' }}>
        What Experts Actually Have
      </p>
      {traits.map((t, i) => (
        <div key={t.label} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 10,
          opacity: count > i ? 1 : 0,
          transform: count > i ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          <div style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: t.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: 10,
            fontWeight: 700,
            color: '#fff',
          }}>{i + 1}</div>
          <div>
            <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 11, fontWeight: 600, color: '#222', margin: 0, lineHeight: 1.3 }}>{t.label}</p>
            <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#888', margin: 0, lineHeight: 1.3 }}>{t.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
