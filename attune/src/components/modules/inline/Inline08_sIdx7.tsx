'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=7 — "The Can't-Unsee Phenomenon"
// Shows: two-state — domain before/after perceptual development
export default function Inline08_sIdx7() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [showAfter, setShowAfter] = useState(false)

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

  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setShowAfter(true), 2000)
    return () => clearTimeout(t)
  }, [active])

  // Dots representing information in the domain — more visible after
  const dots = Array.from({ length: 24 }, (_, i) => ({
    x: 30 + (i % 6) * 55,
    y: 25 + Math.floor(i / 6) * 35,
    important: i % 3 === 0,
  }))

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>
        The Can't-Unsee Phenomenon
      </p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: showAfter ? '#9ca3af' : '#ec4899', transition: 'color 0.7s ease', fontWeight: 600 }}>BEFORE</span>
        <div style={{ width: 32, height: 2, background: '#fce7f3', borderRadius: 1 }}>
          <div style={{ height: '100%', width: showAfter ? '100%' : '0%', background: '#ec4899', borderRadius: 1, transition: 'width 0.7s ease 2000ms' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: showAfter ? '#ec4899' : '#9ca3af', transition: 'color 0.7s ease', fontWeight: 600 }}>AFTER</span>
      </div>
      <svg width="100%" viewBox="0 0 360 155" style={{ maxWidth: 320, margin: '0 auto', display: 'block' }}>
        {dots.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r={d.important ? (showAfter ? 9 : 3) : (showAfter ? 5 : 3)}
              fill={d.important ? (showAfter ? '#ec4899' : '#f9a8d4') : (showAfter ? '#fce7f3' : '#f3f4f6')}
              stroke={d.important ? '#ec4899' : 'none'}
              strokeWidth={showAfter && d.important ? 2 : 0}
              style={{ opacity: active ? 1 : 0, transition: `all 0.7s ease ${(i % 6) * 50}ms` }} />
          </g>
        ))}
        {/* Label: what you see now */}
        <text x={180} y={148} textAnchor="middle" fontSize={8} fill={showAfter ? '#ec4899' : '#d1d5db'} fontWeight={700}
          style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.7s ease' }}>
          {showAfter ? 'the important signals are now obvious' : 'all signals look the same'}
        </text>
      </svg>
    </div>
  )
}
