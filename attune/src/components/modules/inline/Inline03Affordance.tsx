'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline03Affordance() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handles = [
    { angle: -60, connects: true, delay: 200 },
    { angle: -20, connects: true, delay: 450 },
    { angle: 20, connects: false, delay: 700 },
    { angle: 60, connects: true, delay: 350 },
    { angle: 100, connects: false, delay: 600 },
  ]

  return (
    <div ref={ref} style={{ maxWidth: '440px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Affordances
      </p>
      <svg viewBox="0 0 380 160" style={{ width: '100%', height: 'auto' }}>
        <circle cx="80" cy="80" r="28" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s' }} />
        <text x="80" y="84" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="sans-serif" opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s' }}>Environment</text>
        <circle cx="300" cy="80" r="22" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s' }} />
        <text x="300" y="84" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="sans-serif" opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s' }}>You</text>
        {handles.map((h, i) => {
          const rad = (h.angle * Math.PI) / 180
          const x1 = 80 + Math.cos(rad) * 30, y1 = 80 + Math.sin(rad) * 30
          const x2 = h.connects ? 300 - Math.cos(rad) * 24 : 80 + Math.cos(rad) * 80
          const y2 = h.connects ? 80 + Math.sin(rad) * 24 : 80 + Math.sin(rad) * 80
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#22c55e"
                strokeWidth="1" strokeDasharray="120" strokeDashoffset={active ? 0 : 120}
                opacity={h.connects ? 0.8 : 0.25}
                style={{ transition: `stroke-dashoffset 0.5s ease ${h.delay}ms` }} />
              <circle cx={x2} cy={y2} r="3"
                fill={h.connects ? '#22c55e' : 'none'}
                stroke="#22c55e" strokeWidth="1"
                opacity={active ? (h.connects ? 1 : 0.25) : 0}
                style={{ transition: `opacity 0.4s ease ${h.delay + 300}ms` }} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
