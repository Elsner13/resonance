'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=5 — "The Specific Failure Modes — A Field Guide"
// Shows: sequential reveal of 4 failure mode types
export default function Inline07_sIdx5() {
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

  const modes = [
    { label: 'Decontextualized practice', sub: 'skill built without real-world information', icon: '✂' },
    { label: 'Instruction loop', sub: 'knowing the rule vs perceiving the cue', icon: '📖' },
    { label: 'Pressure collapse', sub: 'works in practice, fails in performance', icon: '⚡' },
    { label: 'Specificity mismatch', sub: 'adapted to practice, not to the task', icon: '⤢' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 14, textAlign: 'center' }}>
        Transfer Failure Modes
      </p>
      {modes.map((m, i) => (
        <div key={m.label} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 10,
          padding: '8px 12px',
          borderRadius: 6,
          border: `1px solid ${count > i ? '#fef08a' : '#f5f5f5'}`,
          background: count > i ? '#fffbeb' : '#fafafa',
          opacity: count > i ? 1 : 0,
          transform: count > i ? 'translateX(0)' : 'translateX(-10px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease, background 0.3s ease, border-color 0.3s ease',
        }}>
          <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{m.icon}</span>
          <div>
            <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 11, fontWeight: 600, color: '#92400e', margin: 0 }}>{m.label}</p>
            <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#78716c', margin: 0 }}>{m.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
