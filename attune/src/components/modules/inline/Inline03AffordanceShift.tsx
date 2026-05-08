'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline03AffordanceShift() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Same environment, different affordances seen
  // Left: beginner sees 2 dots; Right: expert sees 8 dots (same scene)
  const allDots = [
    { cx: 275, cy: 55 }, { cx: 295, cy: 80 }, { cx: 315, cy: 60 }, { cx: 340, cy: 85 },
    { cx: 260, cy: 100 }, { cx: 355, cy: 65 }, { cx: 280, cy: 120 }, { cx: 330, cy: 110 },
  ]
  const beginnerVisible = [0, 3] // only 2 of the 8

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Same environment — different affordances detected
      </p>
      <svg viewBox="0 0 420 145" style={{ width: '100%', height: 'auto' }}>
        <text x="100" y="16" textAnchor="middle" fill="#888" fontSize="9" fontFamily="sans-serif">Beginner</text>
        <text x="310" y="16" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="sans-serif">Expert</text>
        <line x1="210" y1="20" x2="210" y2="135" stroke="#eeeeee" strokeWidth="1" />

        {/* Beginner: only sees 2 affordances */}
        {allDots.map((d, i) => {
          const isVisible = beginnerVisible.includes(i)
          return (
            <circle key={`b${i}`}
              cx={d.cx - 210} cy={d.cy}
              r={isVisible ? 6 : 4}
              fill={isVisible ? 'rgba(136,136,136,0.55)' : 'rgba(220,220,220,0.2)'}
              opacity={active ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${i * 60}ms` }}
            />
          )
        })}

        {/* Expert: sees all 8 affordances */}
        {allDots.map((d, i) => (
          <circle key={`e${i}`}
            cx={d.cx} cy={d.cy}
            r="6"
            fill="rgba(34,197,94,0.75)"
            opacity={active ? 1 : 0}
            style={{ transition: `opacity 0.35s ease ${i * 70 + 200}ms` }}
          />
        ))}

        <text x="100" y="135" textAnchor="middle" fill="#aaaaaa" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.8s' }}>
          2 options visible
        </text>
        <text x="310" y="135" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1s' }}>
          8 options visible
        </text>
      </svg>
    </div>
  )
}
