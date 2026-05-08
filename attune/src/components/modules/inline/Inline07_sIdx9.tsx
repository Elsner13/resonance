'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=9 — "Designing for Transfer — The Principles"
// Shows: drawing path connecting practice to performance with key principles
export default function Inline07_sIdx9() {
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

  const principles = [
    { label: 'Representative cues', y: 40, delay: 200 },
    { label: 'Real decision demands', y: 70, delay: 400 },
    { label: 'Authentic consequences', y: 100, delay: 600 },
    { label: 'Variable contexts', y: 130, delay: 800 },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Designing for Transfer
      </p>
      <svg width="100%" viewBox="0 0 400 165" style={{ overflow: 'visible' }}>
        {/* Practice box */}
        <rect x={10} y={15} width={80} height={130} rx={6} fill="#fffbeb" stroke="#eab308" strokeWidth={1.5}
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease' }} />
        <text x={50} y={40} textAnchor="middle" fontSize={8} fontWeight={700} fill="#92400e" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease' }}>PRACTICE</text>
        <text x={50} y={90} textAnchor="middle" fontSize={20} fill="#eab308" style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease' }}>⟳</text>

        {/* Performance box */}
        <rect x={310} y={15} width={80} height={130} rx={6} fill="#fffbeb" stroke="#ca8a04" strokeWidth={2}
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1200ms' }} />
        <text x={350} y={40} textAnchor="middle" fontSize={8} fontWeight={700} fill="#78350f" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1200ms' }}>PERFORM</text>
        <text x={350} y={90} textAnchor="middle" fontSize={20} fill="#ca8a04" style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1200ms' }}>★</text>

        {/* Bridge principles */}
        {principles.map((p, i) => (
          <g key={i}>
            <line x1={92} y1={p.y} x2={308} y2={p.y} stroke="#fef08a" strokeWidth={1.5}
              strokeDasharray={250} strokeDashoffset={active ? 0 : 250}
              style={{ transition: `stroke-dashoffset 0.6s ease ${p.delay}ms` }} />
            <text x={200} y={p.y - 4} textAnchor="middle" fontSize={8} fontWeight={600} fill="#92400e"
              style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: `opacity 0.4s ease ${p.delay + 400}ms` }}>{p.label}</text>
          </g>
        ))}

        {/* Arrow */}
        <polygon points="308,80 300,76 300,84" fill="#ca8a04"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1000ms' }} />
      </svg>
    </div>
  )
}
