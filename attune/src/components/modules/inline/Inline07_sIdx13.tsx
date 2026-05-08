'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=13 — "Variable Practice as a Representative Tool"
// Shows: variable contexts all pointing toward transfer
export default function Inline07_sIdx13() {
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

  const contexts = [
    { x: 80, y: 30, label: 'Context A' },
    { x: 220, y: 20, label: 'Context B' },
    { x: 320, y: 70, label: 'Context C' },
    { x: 50, y: 130, label: 'Context D' },
    { x: 270, y: 140, label: 'Context E' },
  ]
  const target = { x: 180, y: 100 }

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Variable Practice Builds Transfer
      </p>
      <svg width="100%" viewBox="0 0 380 180" style={{ overflow: 'visible', maxWidth: 320, margin: '0 auto', display: 'block' }}>
        {/* Lines from contexts to target */}
        {contexts.map((c, i) => (
          <line key={i}
            x1={c.x} y1={c.y} x2={target.x} y2={target.y}
            stroke="#fef08a" strokeWidth={1.5}
            strokeDasharray={200}
            strokeDashoffset={active ? 0 : 200}
            style={{ transition: `stroke-dashoffset 0.7s ease ${i * 150}ms` }}
          />
        ))}
        {/* Context nodes */}
        {contexts.map((c, i) => (
          <g key={i} style={{ opacity: active ? 1 : 0, transition: `opacity 0.4s ease ${i * 150}ms` }}>
            <rect x={c.x - 32} y={c.y - 12} width={64} height={24} rx={4} fill="#fffbeb" stroke="#eab308" strokeWidth={1} />
            <text x={c.x} y={c.y} textAnchor="middle" dominantBaseline="middle" fontSize={8} fill="#92400e" fontWeight={600} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>{c.label}</text>
          </g>
        ))}
        {/* Target */}
        <circle cx={target.x} cy={target.y} r={26} fill="#eab308"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 800ms' }} />
        <text x={target.x} y={target.y - 4} textAnchor="middle" dominantBaseline="middle" fontSize={8} fontWeight={700} fill="#fff" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 800ms' }}>TRANSFER</text>
        <text x={target.x} y={target.y + 10} textAnchor="middle" dominantBaseline="middle" fontSize={7} fill="#fef9c3" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 800ms' }}>robust</text>
      </svg>
    </div>
  )
}
