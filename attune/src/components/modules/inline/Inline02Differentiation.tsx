'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline02Differentiation() {
  const ref = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setStage(1), 100)
        setTimeout(() => setStage(2), 800)
        setTimeout(() => setStage(3), 1500)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const stages = [
    { label: 'Rough', r: 32, opacity: 0.35 },
    { label: 'Refined', r: 20, opacity: 0.6 },
    { label: 'Automatic', r: 9, opacity: 1 },
  ]

  return (
    <div ref={ref} style={{ maxWidth: '420px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '20px' }}>
        Differentiation Arc
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
        {stages.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: s.r * 2, height: s.r * 2, borderRadius: '50%',
              background: `rgba(34,211,238,${s.opacity})`,
              transition: `transform 0.6s ease ${i * 300}ms, opacity 0.6s ease ${i * 300}ms`,
              transform: stage > i ? 'scale(1)' : 'scale(0)',
              opacity: stage > i ? 1 : 0,
            }} />
            <p style={{
              fontFamily: 'var(--font-montserrat-alternates)', fontSize: '11px', color: '#555555',
              transition: `opacity 0.4s ease ${i * 300 + 200}ms`,
              opacity: stage > i ? 1 : 0,
            }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', marginTop: '4px' }}>
        {['→', '→'].map((a, i) => (
          <span key={i} style={{ color: '#cccccc', fontSize: '18px', transition: `opacity 0.4s ease ${(i+1)*300}ms`, opacity: stage > i + 1 ? 1 : 0 }}>{a}</span>
        ))}
      </div>
    </div>
  )
}
