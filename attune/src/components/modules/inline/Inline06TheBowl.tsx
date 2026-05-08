'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline06TheBowl() {
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

  // Bowl cross-section: U-shape, zones labeled too-easy / sweet-spot / too-hard
  const bowlPath = 'M30,30 Q100,150 210,165 Q320,150 390,30'

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        The bowl — design the geometry of challenge
      </p>
      <svg viewBox="0 0 420 185" style={{ width: '100%', height: 'auto' }}>
        {/* Bowl outline */}
        <path d={bowlPath} fill="none" stroke="#6366f1" strokeWidth="2.5"
          strokeDasharray="600" strokeDashoffset={active ? 0 : 600}
          style={{ transition: 'stroke-dashoffset 1.2s ease' }} />

        {/* Zone fills */}
        {/* Too easy — left zone */}
        <path d="M30,30 Q60,100 100,140 L100,170 Q60,155 30,30" fill="rgba(99,102,241,0.06)"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.5s ease 0.8s' }} />
        {/* Too hard — right zone */}
        <path d="M390,30 Q360,100 320,140 L320,170 Q360,155 390,30" fill="rgba(99,102,241,0.06)"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.5s ease 0.8s' }} />
        {/* Sweet spot — center zone */}
        <path d="M130,155 Q170,175 210,178 Q250,175 290,155 L290,168 Q250,182 210,185 Q170,182 130,168 Z"
          fill="rgba(99,102,241,0.22)"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.5s ease 1s' }} />

        {/* Labels */}
        <text x="65" y="25" textAnchor="middle" fill="#aaaaaa" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.1s' }}>too easy</text>
        <text x="65" y="36" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.2s' }}>(no growth)</text>

        <text x="355" y="25" textAnchor="middle" fill="#aaaaaa" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.1s' }}>too hard</text>
        <text x="355" y="36" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.2s' }}>(no signal)</text>

        <text x="210" y="172" textAnchor="middle" fill="#6366f1" fontSize="8.5" fontFamily="sans-serif" fontWeight="600"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.3s' }}>sweet spot</text>

        {/* Skater dot in sweet spot */}
        <circle cx="210" cy="168" r="5" fill="#6366f1"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.4s' }} />
      </svg>
    </div>
  )
}
