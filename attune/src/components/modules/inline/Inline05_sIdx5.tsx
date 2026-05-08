'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=5 — "Why the Struggle Is the Signal"
// Shows: spectrum — easy/no-growth vs hard/growth zone
export default function Inline05_sIdx5() {
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
        Struggle is the Signal
      </p>
      <svg width="100%" viewBox="0 0 400 100" style={{ overflow: 'visible' }}>
        {/* Background spectrum bar */}
        <defs>
          <linearGradient id="spectrumGrad05" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>
        </defs>
        <rect x={20} y={35} width={360} height={18} rx={9} fill="#f3e8ff"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 0ms' }} />
        <rect x={20} y={35} width={active ? 360 : 0} height={18} rx={9} fill="url(#spectrumGrad05)"
          style={{ transition: 'width 1.2s ease 0ms' }} />

        {/* Labels */}
        <text x={20} y={26} fontSize={8} fill="#c4b5fd" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>COMFORTABLE</text>
        <text x={380} y={26} textAnchor="end" fontSize={8} fill="#7c3aed" fontWeight={700} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1000ms' }}>STRUGGLE</text>

        <text x={20} y={70} fontSize={7} fill="#c4b5fd" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>feels smooth</text>
        <text x={20} y={80} fontSize={7} fill="#c4b5fd" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>confirms existing skill</text>
        <text x={20} y={90} fontSize={7} fill="#c4b5fd" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>no new differentiation</text>

        <text x={380} y={70} textAnchor="end" fontSize={7} fill="#7c3aed" fontWeight={600} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1000ms' }}>informative failure</text>
        <text x={380} y={80} textAnchor="end" fontSize={7} fill="#7c3aed" fontWeight={600} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1000ms' }}>perception stretched</text>
        <text x={380} y={90} textAnchor="end" fontSize={7} fill="#7c3aed" fontWeight={600} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1000ms' }}>where growth lives</text>

        {/* Marker */}
        <line x1={active ? 290 : 20} y1={28} x2={active ? 290 : 20} y2={60} stroke="#a855f7" strokeWidth={2}
          style={{ transition: 'x1 1.2s ease, x2 1.2s ease' }} />
        <text x={active ? 290 : 20} y={25} textAnchor="middle" fontSize={8} fill="#a855f7" fontWeight={700}
          style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.3s ease 1200ms' }}>aim here</text>
      </svg>
    </div>
  )
}
