'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline06ParameterSliders() {
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

  const sliders = [
    { label: 'Challenge', pct: 0.68 },
    { label: 'Feedback speed', pct: 0.82 },
    { label: 'Constraint', pct: 0.55 },
    { label: 'Recovery', pct: 0.45 },
  ]
  const trackW = 260
  const startX = 80

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Four levers of practice design
      </p>
      <svg viewBox="0 0 380 140" style={{ width: '100%', height: 'auto' }}>
        {sliders.map((s, i) => {
          const y = 25 + i * 28
          const fillW = active ? s.pct * trackW : 0
          return (
            <g key={i}>
              <text x={startX - 8} y={y + 5} textAnchor="end" fill="#888888" fontSize="8.5" fontFamily="sans-serif">{s.label}</text>
              {/* Track */}
              <rect x={startX} y={y - 3} width={trackW} height={6} rx="3" fill="#eeeeee" />
              {/* Fill */}
              <rect x={startX} y={y - 3} width={fillW} height={6} rx="3" fill="#6366f1"
                style={{ transition: `width 0.9s ease ${i * 150}ms` }} />
              {/* Thumb */}
              <circle cx={startX + fillW} cy={y} r="6" fill="#6366f1"
                opacity={active ? 1 : 0}
                style={{ transition: `cx 0.9s ease ${i * 150}ms, opacity 0.3s ease ${i * 150}ms` }} />
              {/* Pct label */}
              <text x={startX + trackW + 10} y={y + 4} fill="#6366f1" fontSize="8" fontFamily="sans-serif"
                opacity={active ? 1 : 0}
                style={{ transition: `opacity 0.4s ease ${i * 150 + 800}ms` }}>
                {Math.round(s.pct * 100)}%
              </text>
            </g>
          )
        })}
        <text x="190" y="132" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.5s' }}>
          the architect sets these — not the practitioner
        </text>
      </svg>
    </div>
  )
}
