'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=5 — "The Comfort Trap"
// Shows: comfort zone vs learning zone — concentric circles, animated fill
export default function Inline03_sIdx5() {
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

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        The Comfort Trap
      </p>
      <svg width="100%" viewBox="0 0 280 200" style={{ maxWidth: 280, margin: '0 auto', display: 'block' }}>
        {/* Outer ring: learning zone */}
        <circle cx={140} cy={100} r={90}
          fill="#f0fdf4" stroke="#22c55e" strokeWidth={2}
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease 600ms' }} />
        <text x={140} y={22} textAnchor="middle" fill="#22c55e" fontSize={9} fontWeight={700} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 900ms' }}>LEARNING ZONE</text>
        <text x={140} y={34} textAnchor="middle" fill="#86efac" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 900ms' }}>informative failure, stretch, uncertainty</text>

        {/* Middle ring: performance zone */}
        <circle cx={140} cy={100} r={62}
          fill="#dcfce7" stroke="#4ade80" strokeWidth={1.5}
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease 300ms' }} />

        {/* Inner core: comfort zone */}
        <circle cx={140} cy={100} r={38}
          fill="#bbf7d0" stroke="#16a34a" strokeWidth={1.5}
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease 0ms' }} />
        <text x={140} y={97} textAnchor="middle" fill="#166534" fontSize={9} fontWeight={700} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 200ms' }}>COMFORT</text>
        <text x={140} y={108} textAnchor="middle" fill="#166534" fontSize={7} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 200ms' }}>feels productive</text>
        <text x={140} y={118} textAnchor="middle" fill="#15803d" fontSize={7} fontWeight={600} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 200ms' }}>no growth</text>

        {/* Arrow pointing outward */}
        <line x1={140} y1={62} x2={140} y2={42} stroke="#22c55e" strokeWidth={2}
          strokeDasharray={30} strokeDashoffset={active ? 0 : 30}
          style={{ transition: 'stroke-dashoffset 0.4s ease 1100ms' }} />
        <polygon points="140,38 136,44 144,44" fill="#22c55e"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.3s ease 1300ms' }} />
        <text x={155} y={50} fill="#22c55e" fontSize={8} fontWeight={700} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1200ms' }}>go here</text>
      </svg>
    </div>
  )
}
