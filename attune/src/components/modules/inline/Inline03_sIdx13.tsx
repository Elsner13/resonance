'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=13 — "What This Changes About How You Practice" (last section of module 3)
// Shows: before/after practice approach — comparison split
export default function Inline03_sIdx13() {
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

  const before = ['Ask: what should I work on?', 'Add volume in same env', 'Hope for improvement', 'Rely on willpower', 'Practice = performance']
  const after = ['Ask: what is my env training me for?', 'Redesign constraints', 'Engineer the conditions', 'Make development structural', 'Env does the training']

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        What Changes
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{
          flex: 1,
          opacity: active ? 1 : 0,
          transition: 'opacity 0.5s ease 0ms',
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          padding: '10px 8px',
        }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', marginBottom: 10 }}>BEFORE</p>
          {before.map((s, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: '#9ca3af', margin: '0 0 6px', lineHeight: 1.4 }}>{s}</p>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 16, color: '#22c55e' }}>→</div>
        <div style={{
          flex: 1,
          opacity: active ? 1 : 0,
          transition: 'opacity 0.5s ease 400ms',
          borderRadius: 8,
          border: '1px solid #22c55e',
          padding: '10px 8px',
          background: '#f0fdf4',
        }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, fontWeight: 700, color: '#16a34a', letterSpacing: '0.1em', marginBottom: 10 }}>AFTER</p>
          {after.map((s, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: '#15803d', margin: '0 0 6px', lineHeight: 1.4, fontWeight: 500 }}>{s}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
