'use client'
import { useEffect, useRef, useState } from 'react'
import type React from 'react'

export default function Inline01SymptomRoot() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPhase(1); setTimeout(() => setPhase(2), 1200); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const lineStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
    transition: `opacity 0.5s ease ${delay}ms, stroke-dashoffset 0.6s ease ${delay}ms`,
    opacity: visible ? 1 : 0,
  })

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Symptom vs. Root Cause
      </p>
      <svg viewBox="0 0 400 200" style={{ width: '100%', height: 'auto' }}>
        <g style={{ transition: 'opacity 0.6s ease 200ms', opacity: phase >= 1 ? (phase === 2 ? 0.15 : 1) : 0 }}>
          <text x="80" y="30" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="sans-serif">symptom</text>
          <text x="80" y="60" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="sans-serif">symptom</text>
          <text x="80" y="90" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="sans-serif">symptom</text>
          <line x1="80" y1="95" x2="80" y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="60" strokeDashoffset={phase >= 1 ? 0 : 60} style={{ transition: 'stroke-dashoffset 0.7s ease' }} />
          <circle cx="80" cy="155" r="5" fill="#ef4444" style={lineStyle(phase >= 1)} />
        </g>
        <line x1="200" y1="10" x2="200" y2="190" stroke="#dddddd" strokeWidth="1" />
        <g style={{ transition: 'opacity 0.6s ease', opacity: phase === 2 ? 1 : 0 }}>
          <circle cx="320" cy="155" r="18" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="320" y="159" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="sans-serif">root</text>
          <line x1="320" y1="137" x2="320" y2="90" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="50" strokeDashoffset={phase === 2 ? 0 : 50} style={{ transition: 'stroke-dashoffset 0.6s ease 0.2s' }} />
          <text x="320" y="80" textAnchor="middle" fill="#333333" fontSize="11" fontFamily="sans-serif">cause</text>
          <line x1="270" y1="137" x2="250" y2="90" stroke="#ef4444" strokeWidth="1" strokeDasharray="55" strokeDashoffset={phase === 2 ? 0 : 55} style={{ transition: 'stroke-dashoffset 0.6s ease 0.4s' }} />
          <line x1="370" y1="137" x2="385" y2="90" stroke="#ef4444" strokeWidth="1" strokeDasharray="55" strokeDashoffset={phase === 2 ? 0 : 55} style={{ transition: 'stroke-dashoffset 0.6s ease 0.6s' }} />
        </g>
      </svg>
    </div>
  )
}
