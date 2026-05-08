'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=13 — "The Deeper Game"
// Shows: node network — practice architecture elements connecting
export default function Inline06_sIdx13() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect()
          let c = 0
          const interval = setInterval(() => {
            c++
            setCount(c)
            if (c >= 5) clearInterval(interval)
          }, 350)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const center = { x: 200, y: 100 }
  const nodes = [
    { x: 200, y: 30, label: 'You', sub: 'becoming' },
    { x: 320, y: 80, label: 'Challenge', sub: 'calibrated' },
    { x: 280, y: 165, label: 'Recovery', sub: 'structured' },
    { x: 120, y: 165, label: 'Feedback', sub: 'fast + specific' },
    { x: 80, y: 80, label: 'Constraints', sub: 'designed' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>
        Your Practice Architecture
      </p>
      <svg width="100%" viewBox="0 0 400 200" style={{ maxWidth: 320, margin: '0 auto', display: 'block' }}>
        {/* Lines from center to each node */}
        {nodes.map((n, i) => (
          <line key={i}
            x1={center.x} y1={center.y}
            x2={n.x} y2={n.y}
            stroke="#6366f1" strokeWidth={1}
            opacity={count > i + 1 ? 0.35 : 0}
            style={{ transition: 'opacity 0.3s ease' }} />
        ))}
        {/* Center node */}
        <circle cx={center.x} cy={center.y} r={22} fill="#6366f1"
          style={{ opacity: count > 0 ? 1 : 0, transition: 'opacity 0.4s ease' }} />
        <text x={center.x} y={center.y - 3} textAnchor="middle" dominantBaseline="middle" fontSize={8} fontWeight={700} fill="#fff" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: count > 0 ? 1 : 0, transition: 'opacity 0.4s ease' }}>PRACTICE</text>
        <text x={center.x} y={center.y + 9} textAnchor="middle" dominantBaseline="middle" fontSize={7} fill="#c7d2fe" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: count > 0 ? 1 : 0, transition: 'opacity 0.4s ease' }}>ARCHITECTURE</text>
        {/* Peripheral nodes */}
        {nodes.map((n, i) => (
          <g key={i} style={{ opacity: count > i + 1 ? 1 : 0, transition: 'opacity 0.4s ease' }}>
            <circle cx={n.x} cy={n.y} r={20} fill="#f5f3ff" stroke="#6366f1" strokeWidth={1.5} />
            <text x={n.x} y={n.y - 3} textAnchor="middle" dominantBaseline="middle" fontSize={7} fontWeight={700} fill="#4f46e5" style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>{n.label}</text>
            <text x={n.x} y={n.y + 8} textAnchor="middle" dominantBaseline="middle" fontSize={6} fill="#818cf8" style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>{n.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
