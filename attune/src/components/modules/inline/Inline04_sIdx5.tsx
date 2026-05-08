'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=5 — "Perceptual Constraints: The Deepest Level"
// Shows: drawing path — cue → perception → decision → execution chain
export default function Inline04_sIdx5() {
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

  const steps = [
    { label: 'CUE\nIN ENV', x: 40, y: 60, color: '#f97316' },
    { label: 'PERCEPTUAL\nREAD', x: 130, y: 60, color: '#fb923c' },
    { label: 'DECISION', x: 220, y: 60, color: '#fdba74' },
    { label: 'EXECUTION', x: 310, y: 60, color: '#fed7aa' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        The Perceptual Chain
      </p>
      <svg width="100%" viewBox="0 0 380 120" style={{ overflow: 'visible' }}>
        {/* Connection lines */}
        {steps.slice(0, -1).map((s, i) => (
          <line key={i}
            x1={s.x + 28} y1={s.y}
            x2={steps[i + 1].x - 28} y2={steps[i + 1].y}
            stroke="#fed7aa" strokeWidth={2}
            strokeDasharray={80} strokeDashoffset={active ? 0 : 80}
            style={{ transition: `stroke-dashoffset 0.5s ease ${i * 300 + 400}ms` }}
          />
        ))}
        {/* Step circles */}
        {steps.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r={28}
              fill={s.color} opacity={0.15}
              style={{ opacity: active ? 0.15 : 0, transition: `opacity 0.4s ease ${i * 200}ms` }} />
            <circle cx={s.x} cy={s.y} r={28}
              fill="none" stroke={s.color} strokeWidth={2}
              style={{ opacity: active ? 1 : 0, transition: `opacity 0.4s ease ${i * 200}ms` }} />
            {s.label.split('\n').map((line, li) => (
              <text key={li} x={s.x} y={s.y - 5 + li * 12}
                textAnchor="middle" fontSize={7} fontWeight={700}
                fill={s.color}
                style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: `opacity 0.4s ease ${i * 200 + 100}ms` }}>
                {line}
              </text>
            ))}
          </g>
        ))}
        {/* "blocked here" indicator on perception */}
        <text x={130} y={100} textAnchor="middle" fill="#f97316" fontSize={8} fontWeight={700}
          style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1200ms' }}>
          ↑ deepest bottleneck
        </text>
        <text x={130} y={112} textAnchor="middle" fill="#f97316" fontSize={7}
          style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1300ms' }}>
          can't fix downstream without fixing this
        </text>
      </svg>
    </div>
  )
}
