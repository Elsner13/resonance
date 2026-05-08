'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=7 — "Variability as the Fingerprint of Expertise"
// Shows: novice (rigid pattern) vs expert (variable paths, consistent target)
export default function Inline05_sIdx7() {
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

  // Expert: 5 different paths all converging on target
  const expertPaths = [
    'M 30,20 Q 80,60 140,80',
    'M 30,40 Q 70,50 140,80',
    'M 30,60 Q 75,70 140,80',
    'M 30,80 Q 80,80 140,80',
    'M 30,100 Q 80,90 140,80',
  ]

  // Novice: same path repeated
  const novicePaths = [
    'M 220,50 L 360,50',
    'M 220,52 L 360,52',
    'M 220,48 L 360,48',
    'M 220,53 L 360,53',
    'M 220,47 L 360,47',
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>
        Variability as Expertise
      </p>
      <svg width="100%" viewBox="0 0 400 130" style={{ overflow: 'visible' }}>
        {/* Expert side */}
        <text x={85} y={14} textAnchor="middle" fontSize={8} fontWeight={700} fill="#a855f7" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease' }}>EXPERT</text>
        <text x={85} y={24} textAnchor="middle" fontSize={7} fill="#c4b5fd" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease' }}>varied paths → consistent target</text>
        {expertPaths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#a855f7" strokeWidth={1.2} opacity={0.6}
            strokeDasharray={160} strokeDashoffset={active ? 0 : 160}
            style={{ transition: `stroke-dashoffset 0.8s ease ${i * 150}ms` }} />
        ))}
        <circle cx={140} cy={80} r={8} fill="#a855f7"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1000ms' }} />
        <text x={140} y={80} textAnchor="middle" dominantBaseline="middle" fontSize={6} fill="#fff" fontWeight={700} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>TARGET</text>

        {/* Divider */}
        <line x1={185} y1={10} x2={185} y2={120} stroke="#f3e8ff" strokeWidth={1} />

        {/* Novice side */}
        <text x={290} y={14} textAnchor="middle" fontSize={8} fontWeight={700} fill="#9ca3af" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease' }}>NOVICE</text>
        <text x={290} y={24} textAnchor="middle" fontSize={7} fill="#d1d5db" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease' }}>same path → brittle</text>
        {novicePaths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#d1d5db" strokeWidth={1.2}
            strokeDasharray={160} strokeDashoffset={active ? 0 : 160}
            style={{ transition: `stroke-dashoffset 0.8s ease ${i * 80}ms` }} />
        ))}
        <text x={280} y={90} textAnchor="middle" fontSize={8} fill="#d1d5db" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>pattern</text>
        <text x={280} y={102} textAnchor="middle" fontSize={8} fill="#f87171" fontWeight={600} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>breaks under variation</text>
      </svg>
    </div>
  )
}
