'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=9 — "Productive Failure vs. Demoralizing Failure"
// Shows: comparison split — two types of failure
export default function Inline06_sIdx9() {
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

  const productive = ['At your perceptual edge', 'Reveals what you can\'t see', 'Specific and traceable', 'Recoverable quickly', 'Points to the constraint']
  const demoralizing = ['Too far beyond capacity', 'Produces only overwhelm', 'Ambiguous — no signal', 'Hard to recover from', 'Points nowhere']

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Two Types of Failure
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, opacity: active ? 1 : 0, transition: 'opacity 0.5s ease', borderRadius: 8, border: '1px solid #6366f1', padding: '10px 8px', background: '#f5f3ff' }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, fontWeight: 700, color: '#4f46e5', letterSpacing: '0.1em', marginBottom: 10 }}>PRODUCTIVE</p>
          {productive.map((s, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: '#4f46e5', margin: '0 0 5px', lineHeight: 1.4 }}>✓ {s}</p>
          ))}
        </div>
        <div style={{ flex: 1, opacity: active ? 1 : 0, transition: 'opacity 0.5s ease 300ms', borderRadius: 8, border: '1px solid #e5e7eb', padding: '10px 8px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', marginBottom: 10 }}>DEMORALIZING</p>
          {demoralizing.map((s, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: '#9ca3af', margin: '0 0 5px', lineHeight: 1.4 }}>✗ {s}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
