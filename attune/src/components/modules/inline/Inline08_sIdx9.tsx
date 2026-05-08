'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=9 — "Building Your Practice Architecture"
// Shows: sequential reveal of architecture components
export default function Inline08_sIdx9() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect()
          let c = 0
          const interval = setInterval(() => {
            c++
            setCount(c)
            if (c >= 5) clearInterval(interval)
          }, 400)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const layers = [
    { label: 'Your constraint (from module 1)', color: '#ec4899', width: '100%' },
    { label: 'Representative conditions (module 7)', color: '#f472b6', width: '90%' },
    { label: 'Perceptual challenge design (module 2)', color: '#f9a8d4', width: '80%' },
    { label: 'Feedback architecture (module 6)', color: '#fce7f3', width: '70%' },
    { label: 'Recovery structure (module 6)', color: '#fdf2f8', width: '60%' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 14, textAlign: 'center' }}>
        Building the Architecture
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        {layers.map((l, i) => (
          <div key={i} style={{
            width: l.width,
            padding: '8px 12px',
            borderRadius: 6,
            background: l.color,
            opacity: count > i ? 1 : 0,
            transform: count > i ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}>
            <p style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: 9,
              fontWeight: 600,
              color: i < 2 ? '#fff' : '#831843',
              margin: 0,
            }}>{l.label}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#ec4899', marginTop: 10, textAlign: 'center', opacity: count >= 5 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        Each module was a design tool. Now you use them together.
      </p>
    </div>
  )
}
