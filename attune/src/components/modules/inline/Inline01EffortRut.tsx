'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline01EffortRut() {
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

  // Two lines: effort up = output flat (wrong direction), effort up = output up (right direction)
  // Left: arrow going up labeled "effort" but flat output line
  // Right: arrow going up = output going up

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Effort compounding in the wrong direction
      </p>
      <svg viewBox="0 0 420 180" style={{ width: '100%', height: 'auto' }}>
        {/* Left panel: effort up, output flat */}
        <text x="100" y="18" textAnchor="middle" fill="#888" fontSize="9" fontFamily="sans-serif">Wrong target</text>
        {/* Effort arrow going up */}
        <line x1="60" y1="155" x2="60" y2="50"
          stroke="#ef4444" strokeWidth="2"
          strokeDasharray="110" strokeDashoffset={active ? 0 : 110}
          style={{ transition: 'stroke-dashoffset 0.7s ease 0ms' }} />
        <polygon points="60,44 55,56 65,56" fill="#ef4444"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 0.7s' }} />
        <text x="45" y="100" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="sans-serif" transform="rotate(-90,45,100)">effort</text>
        {/* Output flat */}
        <line x1="75" y1="130" x2="175" y2="130"
          stroke="#ef4444" strokeWidth="2"
          strokeDasharray="100" strokeDashoffset={active ? 0 : 100}
          style={{ transition: 'stroke-dashoffset 0.7s ease 0.3s' }} />
        <text x="125" y="150" textAnchor="middle" fill="#888" fontSize="8" fontFamily="sans-serif">output</text>
        {/* X mark */}
        <line x1="158" y1="115" x2="172" y2="129" stroke="#ef4444" strokeWidth="1.5"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 1.1s' }} />
        <line x1="172" y1="115" x2="158" y2="129" stroke="#ef4444" strokeWidth="1.5"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 1.1s' }} />

        {/* Divider */}
        <line x1="210" y1="20" x2="210" y2="165" stroke="#dddddd" strokeWidth="1" />

        {/* Right panel: effort up, output up */}
        <text x="320" y="18" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="sans-serif">Right target</text>
        {/* Effort arrow going up */}
        <line x1="270" y1="155" x2="270" y2="50"
          stroke="#ef4444" strokeWidth="2"
          strokeDasharray="110" strokeDashoffset={active ? 0 : 110}
          style={{ transition: 'stroke-dashoffset 0.7s ease 0.4s' }} />
        <polygon points="270,44 265,56 275,56" fill="#ef4444"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 1.1s' }} />
        <text x="255" y="100" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="sans-serif" transform="rotate(-90,255,100)">effort</text>
        {/* Output rising */}
        <path d="M285,140 Q320,130 390,70"
          stroke="#ef4444" strokeWidth="2" fill="none"
          strokeDasharray="130" strokeDashoffset={active ? 0 : 130}
          style={{ transition: 'stroke-dashoffset 0.8s ease 0.6s' }} />
        <text x="337" y="158" textAnchor="middle" fill="#888" fontSize="8" fontFamily="sans-serif">output</text>
        <polygon points="390,64 380,68 384,78" fill="#ef4444"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 1.4s' }} />
      </svg>
    </div>
  )
}
