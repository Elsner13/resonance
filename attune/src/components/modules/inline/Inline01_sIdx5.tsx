'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=5 — "The Perceptual Layer — The Deepest Bottleneck"
// Shows: doing is downstream of seeing — behavioral change requires perceptual change first
export default function Inline01_sIdx5() {
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

  const layers = [
    { label: 'PERCEIVING', color: '#ef4444', delay: 0 },
    { label: 'DECIDING', color: '#f87171', delay: 300 },
    { label: 'ACTING', color: '#fca5a5', delay: 600 },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 20 }}>
        The Perceptual Foundation
      </p>
      <svg width="100%" viewBox="0 0 400 160" style={{ overflow: 'visible' }}>
        {/* Three stacked layers, each appearing in sequence */}
        {layers.map((layer, i) => (
          <g key={layer.label}>
            <rect
              x={40 + i * 8}
              y={20 + i * 44}
              width={active ? 320 - i * 16 : 0}
              height={36}
              rx={4}
              fill={layer.color}
              opacity={active ? 1 : 0}
              style={{
                transition: `width 0.7s ease ${layer.delay}ms, opacity 0.4s ease ${layer.delay}ms`,
              }}
            />
            <text
              x={200}
              y={42 + i * 44}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize={10}
              fontWeight={700}
              letterSpacing={2}
              style={{
                fontFamily: 'var(--font-montserrat-alternates)',
                opacity: active ? 1 : 0,
                transition: `opacity 0.4s ease ${layer.delay + 400}ms`,
              }}
            >
              {layer.label}
            </text>
          </g>
        ))}
        {/* Arrows between layers */}
        {[0, 1].map(i => (
          <text
            key={i}
            x={200}
            y={62 + i * 44}
            textAnchor="middle"
            fill="#666"
            fontSize={14}
            style={{
              opacity: active ? 1 : 0,
              transition: `opacity 0.4s ease ${400 + i * 300 + 400}ms`,
            }}
          >
            ↓
          </text>
        ))}
        {/* Label: "fix here" arrow pointing to perceiving */}
        <text
          x={20}
          y={38}
          textAnchor="end"
          fill="#ef4444"
          fontSize={9}
          fontWeight={700}
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            opacity: active ? 1 : 0,
            transition: `opacity 0.5s ease 1200ms`,
          }}
        >
          fix here
        </text>
        <line
          x1={22} y1={38} x2={38} y2={38}
          stroke="#ef4444" strokeWidth={1}
          style={{
            opacity: active ? 1 : 0,
            transition: `opacity 0.5s ease 1200ms`,
          }}
        />
      </svg>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 10, color: '#666', marginTop: 8 }}>
        Behavior is downstream of perception. You cannot act on what you cannot see.
      </p>
    </div>
  )
}
