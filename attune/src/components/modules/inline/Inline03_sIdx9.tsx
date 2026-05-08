'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=9 — "Engineering vs. Hoping"
// Shows: three levers — constraint design, feedback architecture, demand level
export default function Inline03_sIdx9() {
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

  const levers = [
    { label: 'Constraint Design', sub: 'reconfigure what the env makes possible/impossible', fill: 0.7 },
    { label: 'Feedback Architecture', sub: 'make failure fast, specific, undeniable', fill: 0.85 },
    { label: 'Demand Level', sub: 'raise the floor — not willpower, structure', fill: 0.9 },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16, textAlign: 'center' }}>
        Three Engineering Levers
      </p>
      <svg width="100%" viewBox="0 0 400 130" style={{ overflow: 'visible' }}>
        {levers.map((l, i) => {
          const y = 20 + i * 38
          const barW = active ? l.fill * 300 : 0
          return (
            <g key={l.label}>
              <text x={0} y={y} fontSize={10} fontWeight={600} fill="#111" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: `opacity 0.4s ease ${i * 200}ms` }}>{i + 1}. {l.label}</text>
              <text x={0} y={y + 11} fontSize={8} fill="#888" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: `opacity 0.4s ease ${i * 200 + 100}ms` }}>{l.sub}</text>
              <rect x={0} y={y + 16} width={320} height={8} rx={4} fill="#f0fdf4" />
              <rect x={0} y={y + 16} width={barW} height={8} rx={4} fill="#22c55e"
                style={{ transition: `width 0.8s ease ${i * 250 + 200}ms` }} />
            </g>
          )
        })}
      </svg>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 10, color: '#666', marginTop: 4 }}>
        Willpower is finite. A well-designed environment makes willpower mostly irrelevant.
      </p>
    </div>
  )
}
