'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline04CollapseSequence() {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStep(1)
        setTimeout(() => setStep(2), 600)
        setTimeout(() => setStep(3), 1200)
        setTimeout(() => setStep(4), 1800)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const items = [
    { x: 40, label: 'BOTTLENECK', sub: 'falls first', accent: true },
    { x: 155, label: 'consequence', sub: 'cascade 1' },
    { x: 260, label: 'consequence', sub: 'cascade 2' },
    { x: 355, label: 'outcome', sub: '"bad day"' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        The collapse sequence — trace back to the first domino
      </p>
      <svg viewBox="0 0 420 100" style={{ width: '100%', height: 'auto' }}>
        {items.map((item, i) => (
          <g key={i}>
            {/* Arrow to next */}
            {i < items.length - 1 && (
              <line
                x1={item.x + 40} y1={50}
                x2={items[i + 1].x - 5} y2={50}
                stroke={i === 0 ? '#f97316' : '#cccccc'}
                strokeWidth="1.5"
                strokeDasharray="80"
                strokeDashoffset={step >= i + 2 ? 0 : 80}
                style={{ transition: `stroke-dashoffset 0.5s ease` }}
              />
            )}
            <rect
              x={item.x - 40} y={item.accent ? 30 : 35}
              width={item.accent ? 84 : 80}
              height={item.accent ? 40 : 30}
              rx="3"
              fill={item.accent ? '#f97316' : 'none'}
              stroke={item.accent ? '#f97316' : '#cccccc'}
              strokeWidth={item.accent ? 0 : 1}
              opacity={step >= i + 1 ? 1 : 0}
              style={{ transition: 'opacity 0.4s ease' }}
            />
            <text x={item.x} y={item.accent ? 47 : 51}
              textAnchor="middle"
              fill={item.accent ? '#ffffff' : '#888'}
              fontSize={item.accent ? 7.5 : 8}
              fontFamily="sans-serif"
              opacity={step >= i + 1 ? 1 : 0}
              style={{ transition: 'opacity 0.4s ease' }}>
              {item.label}
            </text>
            <text x={item.x} y={item.accent ? 59 : 62}
              textAnchor="middle"
              fill={item.accent ? 'rgba(255,255,255,0.7)' : '#aaaaaa'}
              fontSize="7"
              fontFamily="sans-serif"
              opacity={step >= i + 1 ? 1 : 0}
              style={{ transition: 'opacity 0.4s ease' }}>
              {item.sub}
            </text>
          </g>
        ))}
        <text x="40" y="84" textAnchor="middle" fill="#f97316" fontSize="8" fontFamily="sans-serif"
          opacity={step >= 4 ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }}>
          ← fix here
        </text>
      </svg>
    </div>
  )
}
