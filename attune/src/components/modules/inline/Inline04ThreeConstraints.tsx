'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline04ThreeConstraints() {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStep(1)
        setTimeout(() => setStep(2), 600)
        setTimeout(() => setStep(3), 1200)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const boxes = [
    { x: 30, label: 'Individual', sub: 'body · attention\nnerves · history', color: '#f97316' },
    { x: 160, label: 'Task', sub: 'rules · goals\nsequence · demands', color: '#f97316' },
    { x: 290, label: 'Environment', sub: 'space · culture\nstakes · people', color: '#f97316' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Newell's three constraint categories
      </p>
      <svg viewBox="0 0 400 130" style={{ width: '100%', height: 'auto' }}>
        {boxes.map((b, i) => (
          <g key={i} opacity={step >= i + 1 ? 1 : 0} style={{ transition: 'opacity 0.5s ease' }}>
            <rect x={b.x} y={15} width={100} height={90} rx="4"
              fill="none" stroke={b.color} strokeWidth="1.5" />
            <text x={b.x + 50} y={36} textAnchor="middle"
              fill={b.color} fontSize="9" fontWeight="700" fontFamily="sans-serif">{b.label}</text>
            {b.sub.split('\n').map((line, j) => (
              <text key={j} x={b.x + 50} y={56 + j * 14} textAnchor="middle"
                fill="#888888" fontSize="8" fontFamily="sans-serif">{line}</text>
            ))}
          </g>
        ))}

        {/* Plus signs between boxes */}
        <text x="140" y="63" textAnchor="middle" fill="#cccccc" fontSize="14"
          opacity={step >= 2 ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }}>+</text>
        <text x="272" y="63" textAnchor="middle" fill="#cccccc" fontSize="14"
          opacity={step >= 3 ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }}>+</text>

        {/* Arrow down to "behavior emerges" */}
        <line x1="200" y1="108" x2="200" y2="122"
          stroke="#f97316" strokeWidth="1.5"
          strokeDasharray="16" strokeDashoffset={step >= 3 ? 0 : 16}
          style={{ transition: 'stroke-dashoffset 0.4s ease 1.3s' }} />
        <text x="200" y="118" textAnchor="middle" fill="#f97316" fontSize="8" fontFamily="sans-serif"
          opacity={step >= 3 ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.5s' }}>
        </text>
        <text x="200" y="126" textAnchor="middle" fill="#f97316" fontSize="8" fontFamily="sans-serif"
          opacity={step >= 3 ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.5s' }}>
          behavior emerges from all three
        </text>
      </svg>
    </div>
  )
}
