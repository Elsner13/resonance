'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=11 — "Building Discrimination: How to Practice..."
// Shows: spectrum of practice quality — 5 principles as a fill bar
export default function Inline02_sIdx11() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const principles = [
    { label: 'Contrast', desc: 'examples vs counterexamples' },
    { label: 'Constraint-led', desc: 'remove options, not add rules' },
    { label: 'Feedback richness', desc: 'was your perception right?' },
    { label: 'Desirable difficulty', desc: 'harder practice = better learning' },
    { label: 'Slow attention', desc: 'notice what situation communicated' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 14, textAlign: 'center' }}>
        5 Principles of Perceptual Practice
      </p>
      {principles.map((p, i) => (
        <div key={p.label} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 10, fontWeight: 600, color: '#222' }}>{p.label}</span>
            <span style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#888' }}>{p.desc}</span>
          </div>
          <div style={{ height: 6, background: '#f0fdff', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: active ? `${60 + i * 8}%` : '0%',
              background: `hsl(${185 + i * 5}, 80%, ${50 - i * 3}%)`,
              borderRadius: 3,
              transition: `width 0.8s ease ${i * 150}ms`,
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}
