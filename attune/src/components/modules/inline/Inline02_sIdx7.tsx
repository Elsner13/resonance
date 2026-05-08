'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=7 — "The Click"
// Shows: two states — before (managing) and after (reading directly)
export default function Inline02_sIdx7() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [clicked, setClicked] = useState(false)

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
    const t = setTimeout(() => setClicked(true), 2000)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Before and After the Click
      </p>
      <svg width="100%" viewBox="0 0 400 130" style={{ overflow: 'visible' }}>
        {/* Before box */}
        <rect x={10} y={10} width={170} height={110} rx={6}
          fill={clicked ? '#f9fafb' : '#f0fdff'}
          stroke={clicked ? '#e5e7eb' : '#22d3ee'}
          strokeWidth={clicked ? 1 : 2}
          style={{ transition: 'fill 0.8s ease, stroke 0.8s ease, stroke-width 0.8s ease' }}
        />
        <text x={95} y={30} textAnchor="middle" fontSize={8} fontWeight={700} fill={clicked ? '#9ca3af' : '#0e7490'} letterSpacing={1.5} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.8s ease' }}>BEFORE THE CLICK</text>
        {['perceive', 'deliberate', 'consult memory', 'decide', 'act'].map((s, i) => (
          <text key={s} x={95} y={50 + i * 15} textAnchor="middle" fontSize={9} fill={clicked ? '#d1d5db' : '#334155'} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.8s ease' }}>{s}</text>
        ))}

        {/* Arrow */}
        <text x={200} y={68} textAnchor="middle" fontSize={22} fill={clicked ? '#22d3ee' : '#e5e7eb'} style={{ transition: 'fill 0.8s ease' }}>→</text>
        <text x={200} y={84} textAnchor="middle" fontSize={8} fill={clicked ? '#22d3ee' : '#e5e7eb'} fontWeight={700} letterSpacing={1} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.8s ease' }}>CLICK</text>

        {/* After box */}
        <rect x={220} y={10} width={170} height={110} rx={6}
          fill={clicked ? '#f0fdff' : '#f9fafb'}
          stroke={clicked ? '#22d3ee' : '#e5e7eb'}
          strokeWidth={clicked ? 2 : 1}
          style={{ transition: 'fill 0.8s ease, stroke 0.8s ease, stroke-width 0.8s ease' }}
        />
        <text x={305} y={30} textAnchor="middle" fontSize={8} fontWeight={700} fill={clicked ? '#0e7490' : '#9ca3af'} letterSpacing={1.5} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.8s ease' }}>AFTER THE CLICK</text>
        {['perceive', '↓', 'act'].map((s, i) => (
          <text key={s} x={305} y={52 + i * 20} textAnchor="middle" fontSize={s === '↓' ? 14 : 9} fill={clicked ? '#334155' : '#d1d5db'} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.8s ease' }}>{s}</text>
        ))}
        <text x={305} y={100} textAnchor="middle" fontSize={8} fill={clicked ? '#22d3ee' : '#d1d5db'} fontWeight={600} style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.8s ease' }}>fused in real time</text>
      </svg>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 10, color: '#666', marginTop: 4 }}>
        The domain starts to think for you. Perception leads execution.
      </p>
    </div>
  )
}
