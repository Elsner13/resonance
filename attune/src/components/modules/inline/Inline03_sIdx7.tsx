'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=7 — "Your Environment Is Already Training You. For What?"
// Shows: 5 audit questions as sequential reveal
export default function Inline03_sIdx7() {
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
          }, 450)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const questions = [
    { q: 'What does it make easy?', warn: 'comfortable reps compound' },
    { q: 'What does it make hard?', warn: 'structural friction = underdoing' },
    { q: 'What does it make invisible?', warn: 'most dangerous gap' },
    { q: 'What does it reward immediately?', warn: 'fast feedback shapes you' },
    { q: 'What does it demand?', warn: 'demands create development' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 14, textAlign: 'center' }}>
        The Environment Audit
      </p>
      {questions.map((item, i) => (
        <div key={item.q} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          marginBottom: 10,
          opacity: count > i ? 1 : 0,
          transform: count > i ? 'translateX(0)' : 'translateX(-12px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          <div style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            background: '#f0fdf4',
            border: '1px solid #22c55e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: 9,
            fontWeight: 700,
            color: '#16a34a',
          }}>{i + 1}</div>
          <div>
            <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 11, fontWeight: 600, color: '#111', margin: 0 }}>{item.q}</p>
            <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#16a34a', margin: 0 }}>{item.warn}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
