'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline02SCurve() {
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

  // S-curve: flat start, steep rise, plateau
  const sCurve = 'M30,155 C60,155 90,150 120,130 C150,110 160,60 190,35 C220,10 260,8 380,8'

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Perceptual skill develops in leaps, not gradients
      </p>
      <svg viewBox="0 0 420 175" style={{ width: '100%', height: 'auto' }}>
        {/* Axes */}
        <line x1="25" y1="160" x2="395" y2="160" stroke="#dddddd" strokeWidth="1" />
        <line x1="25" y1="160" x2="25" y2="10" stroke="#dddddd" strokeWidth="1" />
        <text x="210" y="175" textAnchor="middle" fill="#aaaaaa" fontSize="8" fontFamily="sans-serif">experience</text>
        <text x="10" y="90" textAnchor="middle" fill="#aaaaaa" fontSize="8" fontFamily="sans-serif" transform="rotate(-90,10,90)">perception</text>

        {/* S-curve path */}
        <path d={sCurve} fill="none" stroke="#22d3ee" strokeWidth="2.5"
          strokeDasharray="500" strokeDashoffset={active ? 0 : 500}
          style={{ transition: 'stroke-dashoffset 1.4s ease 0.2s' }} />

        {/* Inflection zone label */}
        <line x1="155" y1="100" x2="155" y2="55"
          stroke="rgba(34,211,238,0.4)" strokeWidth="1" strokeDasharray="4 3"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.4s' }} />
        <text x="170" y="80" fill="#22d3ee" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.5s' }}>
          distinction
        </text>
        <text x="170" y="92" fill="#22d3ee" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.6s' }}>
          clicks in
        </text>
      </svg>
    </div>
  )
}
