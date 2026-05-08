'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline05AdaptiveCapacity() {
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

  // Fixed program: one arrow to target. Adaptive: many paths all reaching target.
  const adaptivePaths = [
    'M60,90 Q120,50 190,85',
    'M60,90 Q130,90 190,85',
    'M60,90 Q110,125 190,88',
    'M60,90 Q140,70 190,82',
    'M60,90 Q125,110 190,91',
  ]

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Adaptive capacity — many routes, same outcome
      </p>
      <svg viewBox="0 0 380 175" style={{ width: '100%', height: 'auto' }}>
        {/* Fixed program side */}
        <text x="100" y="18" textAnchor="middle" fill="#888" fontSize="9" fontFamily="sans-serif">Fixed program</text>
        <circle cx="30" cy="90" r="5" fill="rgba(168,85,247,0.4)"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s' }} />
        <line x1="36" y1="90" x2="164" y2="90"
          stroke="rgba(168,85,247,0.5)" strokeWidth="2"
          strokeDasharray="130" strokeDashoffset={active ? 0 : 130}
          style={{ transition: 'stroke-dashoffset 0.7s ease' }} />
        <circle cx="170" cy="90" r="7" fill="none" stroke="rgba(168,85,247,0.6)" strokeWidth="2"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 0.7s' }} />
        <text x="170" y="93" textAnchor="middle" fill="rgba(168,85,247,0.7)" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 0.7s' }}>✓</text>
        <text x="100" y="120" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.9s' }}>one path — brittle</text>

        {/* Divider */}
        <line x1="200" y1="10" x2="200" y2="155" stroke="#eeeeee" strokeWidth="1" />

        {/* Adaptive side */}
        <text x="290" y="18" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="sans-serif">Adaptive capacity</text>
        <circle cx="220" cy="90" r="5" fill="rgba(168,85,247,0.7)"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s' }} />
        {adaptivePaths.map((d, i) => (
          <path key={i} d={d.replace('60', '220').replace('190', '350')} fill="none"
            stroke="rgba(168,85,247,0.55)" strokeWidth="1.5"
            strokeDasharray="180" strokeDashoffset={active ? 0 : 180}
            style={{ transition: `stroke-dashoffset 0.7s ease ${i * 100}ms` }} />
        ))}
        <circle cx="350" cy="87" r="8" fill="none" stroke="#a855f7" strokeWidth="2"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.8s' }} />
        <text x="350" y="91" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.9s' }}>✓</text>
        <text x="285" y="120" textAnchor="middle" fill="#a855f7" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.1s' }}>many paths — robust</text>
      </svg>
    </div>
  )
}
