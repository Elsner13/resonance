'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=11 — "The Specificity of Adaptation"
// Shows: you adapt to exactly what you practice — two columns, wrong vs right specificity
export default function Inline07_sIdx11() {
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

  const rows = [
    { practice: 'Drills without cues', adaptation: 'Motor patterns w/o perception' },
    { practice: 'Fixed conditions', adaptation: 'Context-specific skill' },
    { practice: 'Low stakes reps', adaptation: 'Pressure-naive performance' },
    { practice: 'Rep the answer', adaptation: 'Answer recall, not judgment' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        You Adapt to Exactly What You Practice
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, opacity: active ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', marginBottom: 8 }}>PRACTICE</p>
          {rows.map((r, i) => (
            <div key={i} style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #e5e7eb', marginBottom: 6, background: '#fafafa' }}>
              <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#555', margin: 0 }}>{r.practice}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingTop: 28 }}>
          {rows.map((_, i) => (
            <div key={i} style={{ fontSize: 14, color: '#eab308', opacity: active ? 1 : 0, transition: `opacity 0.4s ease ${i * 150 + 400}ms` }}>→</div>
          ))}
        </div>
        <div style={{ flex: 1, opacity: active ? 1 : 0, transition: 'opacity 0.5s ease 200ms' }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, fontWeight: 700, color: '#eab308', letterSpacing: '0.1em', marginBottom: 8 }}>ADAPTATION</p>
          {rows.map((r, i) => (
            <div key={i} style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #fef08a', marginBottom: 6, background: '#fffbeb' }}>
              <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#92400e', margin: 0, fontWeight: 500 }}>{r.adaptation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
