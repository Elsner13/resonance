'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=5 — "Design Variable Four: Recovery Structure"
// Shows: fill/drain — the recovery-to-stress ratio for adaptation
export default function Inline06_sIdx5() {
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

  const cycles = [
    { label: 'STRESS', fill: 0.8, color: '#6366f1' },
    { label: 'RECOVERY', fill: 0.6, color: '#818cf8' },
    { label: 'ADAPTATION', fill: 0.9, color: '#4f46e5' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        The Stress-Recovery-Adaptation Cycle
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'flex-end' }}>
        {cycles.map((c, i) => (
          <div key={c.label} style={{ textAlign: 'center' }}>
            <div style={{ width: 60, height: 80, border: `2px solid ${c.color}`, borderRadius: '4px 4px 0 0', position: 'relative', overflow: 'hidden', background: '#f5f3ff' }}>
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: active ? `${c.fill * 100}%` : '0%',
                background: c.color,
                opacity: 0.7,
                transition: `height 0.8s ease ${i * 400}ms`,
              }} />
            </div>
            <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 7, fontWeight: 700, color: c.color, marginTop: 4, letterSpacing: '0.08em', opacity: active ? 1 : 0, transition: `opacity 0.4s ease ${i * 400}ms` }}>{c.label}</p>
            {/* Arrow */}
            {i < cycles.length - 1 && (
              <div style={{ position: 'absolute', marginTop: -40 }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
        {['→', '→'].map((a, i) => (
          <span key={i} style={{ fontSize: 18, color: '#6366f1', opacity: active ? 1 : 0, transition: `opacity 0.4s ease ${(i + 1) * 500}ms` }}>{a}</span>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#666', marginTop: 8 }}>
        Recovery isn't rest — it's when adaptation actually happens.
      </p>
    </div>
  )
}
