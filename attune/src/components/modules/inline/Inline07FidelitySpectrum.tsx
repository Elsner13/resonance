'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline07FidelitySpectrum() {
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

  const barW = 340
  const startX = 40
  // Target zone: roughly 65%–90% of bar
  const zoneStart = startX + barW * 0.62
  const zoneEnd = startX + barW * 0.92

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Representativeness spectrum — aim for the target zone
      </p>
      <svg viewBox="0 0 420 120" style={{ width: '100%', height: 'auto' }}>
        {/* Track */}
        <rect x={startX} y={48} width={barW} height={10} rx="5" fill="#eeeeee" />

        {/* Gradient fill */}
        <defs>
          <linearGradient id="fidelityGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(239,68,68,0.3)" />
            <stop offset="60%" stopColor="rgba(234,179,8,0.4)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0.6)" />
          </linearGradient>
        </defs>
        <rect x={startX} y={48} width={active ? barW : 0} height={10} rx="5" fill="url(#fidelityGrad)"
          style={{ transition: 'width 1s ease' }} />

        {/* Target zone highlight */}
        <rect x={zoneStart} y={42} width={zoneEnd - zoneStart} height={22} rx="4"
          fill="rgba(234,179,8,0.0)" stroke="#eab308" strokeWidth="2"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.9s' }} />
        <text x={(zoneStart + zoneEnd) / 2} y={38} textAnchor="middle"
          fill="#eab308" fontSize="8.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1s' }}>target zone</text>

        {/* End labels */}
        <text x={startX} y={76} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.8s' }}>isolated drill</text>
        <text x={startX} y={86} textAnchor="middle" fill="#aaaaaa" fontSize="7" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.9s' }}>no real cues</text>
        <text x={startX + barW} y={76} textAnchor="middle" fill="#22c55e" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.8s' }}>full performance</text>
        <text x={startX + barW} y={86} textAnchor="middle" fill="#22c55e" fontSize="7" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.9s' }}>real cues + stakes</text>

        <text x={210} y={108} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.2s' }}>
          informational fidelity →
        </text>
      </svg>
    </div>
  )
}
