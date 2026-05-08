'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=7 — "Ruthless Prioritization: Doing Less, Aimed at the Right Thing"
// Shows: fill/drain — capacity being poured into wrong vs right constraint
export default function Inline04_sIdx7() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [shifted, setShifted] = useState(false)

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
    const t = setTimeout(() => setShifted(true), 2000)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Where Your Energy Goes
      </p>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'flex-end' }}>
        {/* Wrong bucket */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: shifted ? '#ccc' : '#f97316', marginBottom: 6, transition: 'color 0.8s ease', fontWeight: 600 }}>SYMPTOMS</p>
          <div style={{ width: 70, height: 100, border: `2px solid ${shifted ? '#ddd' : '#f97316'}`, borderRadius: '0 0 6px 6px', borderTop: 'none', position: 'relative', overflow: 'hidden', transition: 'border-color 0.8s ease' }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: active ? (shifted ? '15%' : '80%') : '0%',
              background: shifted ? '#e5e7eb' : '#fed7aa',
              transition: 'height 1s ease 0ms, background 0.8s ease 1800ms',
            }} />
          </div>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: '#aaa', marginTop: 4 }}>not the ceiling</p>
        </div>

        {/* Arrow */}
        <div style={{ fontSize: 22, color: '#f97316', paddingBottom: 40, opacity: shifted ? 1 : 0, transition: 'opacity 0.6s ease 1800ms' }}>→</div>

        {/* Right bucket */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: shifted ? '#f97316' : '#ccc', marginBottom: 6, transition: 'color 0.8s ease', fontWeight: 600 }}>THE CONSTRAINT</p>
          <div style={{ width: 70, height: 100, border: `2px solid ${shifted ? '#f97316' : '#ddd'}`, borderRadius: '0 0 6px 6px', borderTop: 'none', position: 'relative', overflow: 'hidden', transition: 'border-color 0.8s ease' }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: active ? (shifted ? '80%' : '10%') : '0%',
              background: shifted ? '#fed7aa' : '#f5f5f5',
              transition: 'height 1s ease 1800ms, background 0.8s ease 1800ms',
            }} />
          </div>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: shifted ? '#f97316' : '#aaa', marginTop: 4, transition: 'color 0.8s ease' }}>this moves the ceiling</p>
        </div>
      </div>
    </div>
  )
}
