'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=5 — "You Are Not a Machine. Stop Practicing Like One."
// Shows: machine (fixed pattern) vs adaptive system (variable solutions, consistent outcome)
export default function Inline02_sIdx5() {
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

  // Left: machine — identical outputs, rigid paths
  // Right: adaptive — varied paths, same target
  const machineArrows = [[60, 30, 60, 90], [60, 30, 60, 90], [60, 30, 60, 90]]
  const adaptivePaths = [
    'M 60,20 Q 30,55 60,90',
    'M 60,20 L 60,90',
    'M 60,20 Q 90,55 60,90',
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Machine vs. Adaptive System
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {/* Machine side */}
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: '#aaa', marginBottom: 6, letterSpacing: '0.08em' }}>MACHINE MODEL</p>
          <svg width="100%" viewBox="0 0 120 110" style={{ overflow: 'visible' }}>
            <circle cx={60} cy={15} r={10} fill="#e2e8f0" stroke="#cbd5e1" strokeWidth={1} />
            <text x={60} y={15} textAnchor="middle" dominantBaseline="middle" fontSize={7} fill="#64748b" style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>INPUT</text>
            {machineArrows.map((_, i) => (
              <line key={i} x1={60} y1={26} x2={60} y2={85} stroke="#cbd5e1" strokeWidth={1.5}
                style={{ opacity: active ? 1 : 0, transition: `opacity 0.3s ease ${i * 100}ms` }} />
            ))}
            <text x={60} y={46} textAnchor="middle" fill="#94a3b8" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 200ms' }}>fixed pattern</text>
            <circle cx={60} cy={95} r={10} fill="#e2e8f0" stroke="#cbd5e1" strokeWidth={1}
              style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 400ms' }} />
            <text x={60} y={95} textAnchor="middle" dominantBaseline="middle" fontSize={7} fill="#64748b" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 400ms' }}>OUTPUT</text>
            <text x={60} y={108} textAnchor="middle" fill="#f87171" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>brittle</text>
          </svg>
        </div>

        <div style={{ width: 1, background: '#eee', alignSelf: 'stretch' }} />

        {/* Adaptive side */}
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: '#22d3ee', marginBottom: 6, letterSpacing: '0.08em' }}>ADAPTIVE SYSTEM</p>
          <svg width="100%" viewBox="0 0 120 110" style={{ overflow: 'visible' }}>
            <circle cx={60} cy={15} r={10} fill="#ecfeff" stroke="#22d3ee" strokeWidth={1} />
            <text x={60} y={15} textAnchor="middle" dominantBaseline="middle" fontSize={7} fill="#0e7490" style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>INPUT</text>
            {adaptivePaths.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#22d3ee" strokeWidth={1.5} opacity={0.5}
                strokeDasharray={120} strokeDashoffset={active ? 0 : 120}
                style={{ transition: `stroke-dashoffset 0.7s ease ${i * 150}ms` }} />
            ))}
            <text x={60} y={55} textAnchor="middle" fill="#22d3ee" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 400ms' }}>varied paths</text>
            <circle cx={60} cy={95} r={10} fill="#ecfeff" stroke="#22d3ee" strokeWidth={1.5}
              style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }} />
            <text x={60} y={95} textAnchor="middle" dominantBaseline="middle" fontSize={7} fill="#0e7490" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>TARGET</text>
            <text x={60} y={108} textAnchor="middle" fill="#22d3ee" fontSize={7} fontWeight={700} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 800ms' }}>robust</text>
          </svg>
        </div>
      </div>
    </div>
  )
}
