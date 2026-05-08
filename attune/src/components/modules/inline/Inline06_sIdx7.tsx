'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=7 — "Start With the Failure"
// Shows: reverse design — failure mode → practice backward to cause
export default function Inline06_sIdx7() {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect()
          let s = 0
          const interval = setInterval(() => {
            s++
            setStep(s)
            if (s >= 4) clearInterval(interval)
          }, 500)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const nodes = [
    { label: '1. Name the failure mode', sub: 'be specific and observable', color: '#f87171', x: 200, y: 20 },
    { label: '2. What conditions produce it?', sub: 'pressure, load, unfamiliarity...', color: '#fb923c', x: 200, y: 60 },
    { label: '3. Recreate those conditions', sub: 'in practice, deliberately', color: '#a78bfa', x: 200, y: 100 },
    { label: '4. Practice at the edge', sub: 'where failure is informative', color: '#6366f1', x: 200, y: 140 },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 12, textAlign: 'center' }}>
        Design From Failure
      </p>
      <svg width="100%" viewBox="0 0 400 170" style={{ overflow: 'visible' }}>
        {nodes.map((n, i) => (
          <g key={i}>
            {i > 0 && (
              <line
                x1={200} y1={nodes[i - 1].y + 16}
                x2={200} y2={n.y - 2}
                stroke="#c7d2fe" strokeWidth={1}
                style={{ opacity: step > i ? 1 : 0, transition: 'opacity 0.3s ease' }}
              />
            )}
            <rect
              x={20} y={n.y - 14} width={360} height={28} rx={4}
              fill={step > i ? `${n.color}18` : 'transparent'}
              stroke={step > i ? n.color : '#e5e7eb'}
              strokeWidth={1}
              style={{ transition: 'fill 0.4s ease, stroke 0.4s ease' }}
            />
            <text x={40} y={n.y + 1} fontSize={10} fontWeight={600} fill={step > i ? n.color : '#ccc'} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.4s ease' }}>{n.label}</text>
            <text x={40} y={n.y + 12} fontSize={8} fill={step > i ? '#888' : '#ddd'} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.4s ease' }}>{n.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
