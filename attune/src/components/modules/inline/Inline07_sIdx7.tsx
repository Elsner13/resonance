'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=7 — "Why Instruction Alone Doesn't Work"
// Shows: two-state toggle — instruction vs perception-action
export default function Inline07_sIdx7() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [showPerception, setShowPerception] = useState(false)

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

  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setShowPerception(true), 1800)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Why Instruction Alone Doesn't Transfer
      </p>
      <svg width="100%" viewBox="0 0 400 130" style={{ overflow: 'visible' }}>
        {/* Instruction chain */}
        <rect x={10} y={15} width={170} height={100} rx={6}
          fill={showPerception ? '#fafafa' : '#fffbeb'}
          stroke={showPerception ? '#e5e7eb' : '#eab308'}
          strokeWidth={showPerception ? 1 : 2}
          style={{ transition: 'all 0.7s ease', opacity: active ? 1 : 0 }}
        />
        <text x={95} y={35} textAnchor="middle" fontSize={8} fontWeight={700} fill={showPerception ? '#9ca3af' : '#92400e'} letterSpacing={1} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.7s ease' }}>INSTRUCTION</text>
        {['hear rule', '→ memorize', '→ apply consciously', '→ breaks under load'].map((s, i) => (
          <text key={i} x={95} y={52 + i * 16} textAnchor="middle" fontSize={8} fill={showPerception ? '#d1d5db' : '#78716c'} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.7s ease' }}>{s}</text>
        ))}

        {/* Arrow */}
        <text x={200} y={72} textAnchor="middle" fontSize={20} fill={showPerception ? '#eab308' : '#e5e7eb'} style={{ transition: 'fill 0.7s ease' }}>→</text>

        {/* Perception-action chain */}
        <rect x={220} y={15} width={170} height={100} rx={6}
          fill={showPerception ? '#fffbeb' : '#fafafa'}
          stroke={showPerception ? '#eab308' : '#e5e7eb'}
          strokeWidth={showPerception ? 2 : 1}
          style={{ transition: 'all 0.7s ease', opacity: active ? 1 : 0 }}
        />
        <text x={305} y={35} textAnchor="middle" fontSize={8} fontWeight={700} fill={showPerception ? '#92400e' : '#9ca3af'} letterSpacing={1} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.7s ease' }}>PERCEPTION</text>
        {['perceive cue directly', '→ pattern recognized', '→ action emerges', '→ robust under load'].map((s, i) => (
          <text key={i} x={305} y={52 + i * 16} textAnchor="middle" fontSize={8} fill={showPerception ? '#78716c' : '#d1d5db'} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.7s ease' }}>{s}</text>
        ))}
      </svg>
    </div>
  )
}
