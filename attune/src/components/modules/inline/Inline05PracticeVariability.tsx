'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline05PracticeVariability() {
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

  const rigidPaths = Array.from({ length: 3 }, (_, i) => `M20,${55 + i * 4} L180,${55 + i * 4}`)
  const variablePaths = [
    'M220,50 Q270,25 340,55', 'M220,55 Q270,45 340,55', 'M220,55 Q280,80 340,55',
    'M220,55 Q260,30 340,58', 'M220,60 Q290,85 340,52',
  ]

  return (
    <div ref={ref} style={{ maxWidth: '440px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '12px' }}>
        Rigid vs. Variable Practice
      </p>
      <svg viewBox="0 0 380 110" style={{ width: '100%', height: 'auto' }}>
        <text x="100" y="18" textAnchor="middle" fill="#888" fontSize="9" fontFamily="sans-serif">Rigid</text>
        <text x="280" y="18" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="sans-serif">Variable</text>
        <line x1="200" y1="10" x2="200" y2="100" stroke="#333" strokeWidth="0.5" />
        {rigidPaths.map((d, i) => (
          <path key={i} d={d} stroke="rgba(168,85,247,0.35)" strokeWidth="1.5" fill="none"
            strokeDasharray="160" strokeDashoffset={active ? 0 : 160}
            style={{ transition: `stroke-dashoffset 0.7s ease ${i * 150}ms` }} />
        ))}
        {variablePaths.map((d, i) => (
          <path key={i} d={d} stroke="rgba(168,85,247,0.75)" strokeWidth="1.5" fill="none"
            strokeDasharray="160" strokeDashoffset={active ? 0 : 160}
            style={{ transition: `stroke-dashoffset 0.7s ease ${i * 120}ms` }} />
        ))}
        <circle cx="20" cy="55" r="4" fill="rgba(168,85,247,0.5)" opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s' }} />
        <circle cx="180" cy="55" r="4" fill="rgba(168,85,247,0.5)" opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s' }} />
        <circle cx="220" cy="55" r="4" fill="rgba(168,85,247,0.9)" opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s' }} />
        <circle cx="340" cy="55" r="4" fill="rgba(168,85,247,0.9)" opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s' }} />
      </svg>
    </div>
  )
}
