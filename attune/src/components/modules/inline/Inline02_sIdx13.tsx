'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=13 — "The Perceptual Audit" (section 13 of module 2)
// Shows: audit radar — 4 dimensions of perceptual capacity
export default function Inline02_sIdx13() {
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

  // Simple 4-axis radar as concentric ring fill
  const dimensions = [
    { label: 'Distinction\nVocabulary', value: 0.45 },
    { label: 'Predictive\nReading', value: 0.3 },
    { label: 'Noise\nFiltering', value: 0.55 },
    { label: 'Transfer\nRobustness', value: 0.35 },
  ]
  const cx = 100, cy = 100, maxR = 70

  function toXY(angle: number, r: number) {
    const rad = (angle - 90) * Math.PI / 180
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
  }

  const angles = [0, 90, 180, 270]
  const polygonPoints = active
    ? dimensions.map((d, i) => toXY(angles[i], d.value * maxR).join(',')).join(' ')
    : dimensions.map((_, i) => toXY(angles[i], 0).join(',')).join(' ')

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Perceptual Capacity Audit
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Grid rings */}
          {[0.25, 0.5, 0.75, 1].map(scale => (
            <polygon key={scale}
              points={dimensions.map((_, i) => toXY(angles[i], scale * maxR).join(',')).join(' ')}
              fill="none" stroke="#e0f9ff" strokeWidth={1}
            />
          ))}
          {/* Axes */}
          {angles.map((a, i) => {
            const [x2, y2] = toXY(a, maxR)
            return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="#e0f9ff" strokeWidth={1} />
          })}
          {/* Filled shape */}
          <polygon
            points={polygonPoints}
            fill="#22d3ee"
            fillOpacity={0.25}
            stroke="#22d3ee"
            strokeWidth={2}
            style={{ transition: 'points 1s ease' }}
          />
          {/* Labels */}
          {dimensions.map((d, i) => {
            const [x, y] = toXY(angles[i], maxR + 16)
            return (
              <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fontSize={7} fill="#0e7490" style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>
                {d.label.split('\n').map((line, li) => (
                  <tspan key={li} x={x} dy={li === 0 ? 0 : 10}>{line}</tspan>
                ))}
              </text>
            )
          })}
        </svg>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#666', lineHeight: 1.6, maxWidth: 160 }}>
            Where is your perceptual capacity underdeveloped?<br /><br />
            The smallest axis is your next ceiling.
          </p>
        </div>
      </div>
    </div>
  )
}
