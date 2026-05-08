'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=5 — "Phase Transitions: Why It Feels Slow Until It Doesn't"
// Shows: non-linear skill curve — long plateau then sudden jump
export default function Inline08_sIdx5() {
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

  const totalLen = 550

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Phase Transitions in Skill
      </p>
      <svg width="100%" viewBox="0 0 380 150" style={{ overflow: 'visible' }}>
        <g transform="translate(20,10)">
          {/* Axes */}
          <line x1={0} y1={0} x2={0} y2={120} stroke="#fce7f3" strokeWidth={1} />
          <line x1={0} y1={120} x2={340} y2={120} stroke="#fce7f3" strokeWidth={1} />
          <text x={-4} y={6} textAnchor="end" fill="#f9a8d4" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>skill</text>
          <text x={340} y={128} textAnchor="end" fill="#f9a8d4" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>time</text>

          {/* Skill curve: rise, long plateau with wobble, sudden jump */}
          <polyline
            points="0,118 30,95 60,78 90,75 120,74 150,76 165,72 175,80 180,65 220,38 270,15 310,8"
            fill="none"
            stroke="#ec4899"
            strokeWidth={2.5}
            strokeDasharray={totalLen}
            strokeDashoffset={active ? 0 : totalLen}
            style={{ transition: 'stroke-dashoffset 2.2s ease' }}
          />

          {/* Plateau annotation */}
          <text x={115} y={62} textAnchor="middle" fill="#f9a8d4" fontSize={7}
            style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1200ms' }}>plateau</text>
          <line x1={90} y1={68} x2={165} y2={68} stroke="#fce7f3" strokeWidth={1}
            style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1200ms' }} />

          {/* Transition annotation */}
          <text x={175} y={100} textAnchor="middle" fill="#f9a8d4" fontSize={7}
            style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1600ms' }}>transition</text>
          <line x1={175} y1={93} x2={175} y2={78} stroke="#fce7f3" strokeWidth={1}
            style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1600ms' }} />

          {/* Jump annotation */}
          <text x={280} y={30} fill="#ec4899" fontSize={8} fontWeight={700}
            style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 2000ms' }}>sudden jump</text>
        </g>
      </svg>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 10, color: '#666', marginTop: 4 }}>
        The plateau was never stagnation. It was the system reorganizing at a higher level.
      </p>
    </div>
  )
}
