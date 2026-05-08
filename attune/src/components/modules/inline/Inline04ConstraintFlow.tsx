'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline04ConstraintFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'hidden'|'before'|'after'>('hidden')

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPhase('before'); setTimeout(() => setPhase('after'), 1800); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ maxWidth: '440px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '12px' }}>
        {phase === 'after' ? 'Constraint Removed' : 'Constraint Active'}
      </p>
      <svg viewBox="0 0 360 100" style={{ width: '100%', height: 'auto', transition: 'opacity 0.4s', opacity: phase === 'hidden' ? 0 : 1 }}>
        <path
          d={phase === 'after' ? 'M0,30 L360,30' : 'M0,25 L160,35 L200,35 L360,25'}
          fill="none" stroke="#f97316" strokeWidth="1.5"
          strokeDasharray="400" strokeDashoffset={phase === 'hidden' ? 400 : 0}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <path
          d={phase === 'after' ? 'M0,70 L360,70' : 'M0,75 L160,65 L200,65 L360,75'}
          fill="none" stroke="#f97316" strokeWidth="1.5"
          strokeDasharray="400" strokeDashoffset={phase === 'hidden' ? 400 : 0}
          style={{ transition: 'stroke-dashoffset 0.6s ease 0.1s' }}
        />
        {phase === 'before' && <ellipse cx="180" cy="50" rx="12" ry="15" fill="rgba(249,115,22,0.35)" />}
        <text x="180" y="54" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="sans-serif" opacity={phase === 'after' ? 0 : 0.9} style={{ transition: 'opacity 0.4s' }}>bottleneck</text>
        <text x="180" y="54" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="sans-serif" opacity={phase === 'after' ? 1 : 0} style={{ transition: 'opacity 0.4s 0.5s' }}>flow restored</text>
      </svg>
    </div>
  )
}
