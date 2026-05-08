'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=11 — "The Skill-Level Dependency of Affordances"
// Shows: same environment, more affordances visible at higher skill
export default function Inline03_sIdx11() {
  const ref = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect()
          setTimeout(() => setStage(1), 400)
          setTimeout(() => setStage(2), 1400)
          setTimeout(() => setStage(3), 2400)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const nodes = [
    { cx: 200, cy: 100, r: 14, label: 'ENV', always: true },
    { cx: 120, cy: 55, r: 10, label: 'A1', minStage: 1 },
    { cx: 280, cy: 55, r: 10, label: 'A2', minStage: 1 },
    { cx: 120, cy: 145, r: 10, label: 'A3', minStage: 2 },
    { cx: 280, cy: 145, r: 10, label: 'A4', minStage: 2 },
    { cx: 200, cy: 28, r: 8, label: 'A5', minStage: 3 },
    { cx: 200, cy: 172, r: 8, label: 'A6', minStage: 3 },
  ]

  const labels = ['', 'BEGINNER\nsees 2 affordances', 'INTERMEDIATE\nsees 4 affordances', 'EXPERT\nsees 6 affordances']

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>
        Same Environment — More Affordances Visible
      </p>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 10, color: '#22c55e', fontWeight: 600, minHeight: 24, transition: 'opacity 0.4s ease' }}>
        {labels[stage]}
      </p>
      <svg width="100%" viewBox="0 0 400 210" style={{ maxWidth: 320, margin: '0 auto', display: 'block' }}>
        {/* Lines from center to each affordance node */}
        {nodes.slice(1).map((n, i) => (
          <line key={i}
            x1={200} y1={100} x2={n.cx} y2={n.cy}
            stroke="#22c55e" strokeWidth={1}
            opacity={stage >= (n.minStage ?? 0) ? 0.4 : 0}
            style={{ transition: 'opacity 0.5s ease' }}
          />
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r}
              fill={n.always ? '#22c55e' : '#f0fdf4'}
              stroke="#22c55e" strokeWidth={n.always ? 2 : 1}
              opacity={n.always || stage >= (n.minStage ?? 0) ? 1 : 0}
              style={{ transition: 'opacity 0.5s ease' }}
            />
            <text x={n.cx} y={n.cy} textAnchor="middle" dominantBaseline="middle"
              fontSize={n.r < 12 ? 6 : 8} fontWeight={600}
              fill={n.always ? '#fff' : '#16a34a'}
              opacity={n.always || stage >= (n.minStage ?? 0) ? 1 : 0}
              style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'opacity 0.5s ease' }}>
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
