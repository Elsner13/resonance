'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=9 — "Productive Variability — How to Actually Use This"
// Shows: blocked (same context, same result) vs random (varied context, transfer)
export default function Inline05_sIdx9() {
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
        How to Structure Productive Variability
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        {/* Blocked practice */}
        <div style={{ flex: 1, opacity: active ? 1 : 0, transition: 'opacity 0.5s ease', borderRadius: 8, border: '1px solid #e5e7eb', padding: '10px 8px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', marginBottom: 8 }}>BLOCKED</p>
          <svg width="100%" viewBox="0 0 100 70">
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={10 + (i % 3) * 28} y={5 + Math.floor(i / 3) * 30} width={22} height={22}
                fill="#f3f4f6" stroke="#d1d5db" strokeWidth={1} rx={2} />
            ))}
            {[0,1,2,3,4,5].map(i => (
              <text key={i} x={21 + (i % 3) * 28} y={16 + Math.floor(i / 3) * 30}
                textAnchor="middle" dominantBaseline="middle" fontSize={8} fill="#9ca3af">A</text>
            ))}
          </svg>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 7, color: '#9ca3af', margin: '4px 0 0' }}>same context repeated</p>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 7, color: '#f87171', margin: '2px 0 0' }}>high performance in practice, low transfer</p>
        </div>

        {/* Random/variable practice */}
        <div style={{ flex: 1, opacity: active ? 1 : 0, transition: 'opacity 0.5s ease 300ms', borderRadius: 8, border: '1px solid #a855f7', padding: '10px 8px', background: '#faf5ff' }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, fontWeight: 700, color: '#7c3aed', letterSpacing: '0.1em', marginBottom: 8 }}>VARIABLE</p>
          <svg width="100%" viewBox="0 0 100 70">
            {['A','B','C','B','A','C'].map((letter, i) => (
              <rect key={i} x={10 + (i % 3) * 28} y={5 + Math.floor(i / 3) * 30} width={22} height={22}
                fill={letter === 'A' ? '#f3e8ff' : letter === 'B' ? '#ede9fe' : '#ddd6fe'}
                stroke="#a855f7" strokeWidth={1} rx={2} />
            ))}
            {['A','B','C','B','A','C'].map((letter, i) => (
              <text key={i} x={21 + (i % 3) * 28} y={16 + Math.floor(i / 3) * 30}
                textAnchor="middle" dominantBaseline="middle" fontSize={8} fill="#7c3aed" fontWeight={700}>{letter}</text>
            ))}
          </svg>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 7, color: '#7c3aed', margin: '4px 0 0' }}>contexts interleaved</p>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 7, color: '#7c3aed', fontWeight: 600, margin: '2px 0 0' }}>harder in practice, strong transfer</p>
        </div>
      </div>
    </div>
  )
}
