'use client'
import { useEffect, useRef, useState } from 'react'

const VARS = [
  { label: 'Challenge', angle: -90, color: '#6366f1' },
  { label: 'Feedback', angle: 0, color: '#818cf8' },
  { label: 'Constraint', angle: 90, color: '#6366f1' },
  { label: 'Recovery', angle: 180, color: '#818cf8' },
]

export default function Inline06FourVariables() {
  const ref = useRef<HTMLDivElement>(null)
  const [lit, setLit] = useState(-1)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        VARS.forEach((_, i) => setTimeout(() => setLit(i), i * 500 + 200))
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const CX = 160, CY = 100, R = 60

  return (
    <div ref={ref} style={{ maxWidth: '360px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '12px' }}>
        4 Design Variables
      </p>
      <svg viewBox="0 0 320 200" style={{ width: '100%', height: 'auto' }}>
        <circle cx={CX} cy={CY} r="6" fill="#6366f1" opacity={lit >= 0 ? 1 : 0.2} style={{ transition: 'opacity 0.3s' }} />
        {VARS.map((v, i) => {
          const rad = (v.angle * Math.PI) / 180
          const x2 = CX + Math.cos(rad) * R, y2 = CY + Math.sin(rad) * R
          const lx = CX + Math.cos(rad) * (R + 28), ly = CY + Math.sin(rad) * (R + 18)
          const active = lit >= i
          return (
            <g key={v.label}>
              <line x1={CX} y1={CY} x2={x2} y2={y2}
                stroke={v.color} strokeWidth={active ? 2 : 1}
                strokeDasharray={R} strokeDashoffset={active ? 0 : R}
                opacity={active ? 0.9 : 0.2}
                style={{ transition: `stroke-dashoffset 0.5s ease, opacity 0.4s ease` }} />
              <circle cx={x2} cy={y2} r="4" fill={v.color}
                opacity={active ? 1 : 0.1}
                style={{ transition: `opacity 0.4s ease ${i * 100}ms` }} />
              <text x={lx} y={ly + 4} textAnchor="middle" fill={active ? v.color : '#888'}
                fontSize="10" fontFamily="sans-serif"
                style={{ transition: 'fill 0.4s ease' }}>{v.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
