'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=13 — "The Non-Linear Path: Plateaus, Phase Transitions"
// Shows: non-linear skill curve with plateau then breakthrough
export default function Inline01_sIdx13() {
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

  // Non-linear path: rise, long plateau, wobble (phase transition), jump
  const pts = '0,110 50,80 90,60 120,58 150,57 180,58 210,60 215,65 220,55 225,62 230,50 280,25 340,10'
  const totalLen = 500

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        The Non-Linear Path
      </p>
      <svg width="100%" viewBox="0 0 360 140" style={{ overflow: 'visible' }}>
        <g transform="translate(16,10)">
          {/* Y axis */}
          <line x1={0} y1={0} x2={0} y2={120} stroke="#eee" strokeWidth={1} />
          <text x={-4} y={5} textAnchor="end" fill="#bbb" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>skill</text>
          {/* X axis */}
          <line x1={0} y1={120} x2={340} y2={120} stroke="#eee" strokeWidth={1} />
          <text x={340} y={128} textAnchor="end" fill="#bbb" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>time</text>

          {/* Skill curve */}
          <polyline
            points={pts}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray={totalLen}
            strokeDashoffset={active ? 0 : totalLen}
            style={{ transition: 'stroke-dashoffset 2s ease 0ms' }}
          />

          {/* Labels */}
          <text x={120} y={50} fill="#aaa" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1200ms' }}>plateau</text>
          <line x1={120} y1={55} x2={185} y2={58} stroke="#ddd" strokeWidth={0.5}
            style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1200ms' }} />

          <text x={215} y={100} textAnchor="middle" fill="#aaa" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1600ms' }}>phase transition</text>
          <line x1={222} y1={95} x2={222} y2={65} stroke="#ddd" strokeWidth={0.5}
            style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1600ms' }} />

          <text x={300} y={20} fill="#ef4444" fontSize={7} fontWeight={700} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 2000ms' }}>breakthrough</text>
        </g>
      </svg>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 10, color: '#666', marginTop: 8 }}>
        Stuck isn't stopped. Plateaus precede phase transitions — the disorganization is the development.
      </p>
    </div>
  )
}
