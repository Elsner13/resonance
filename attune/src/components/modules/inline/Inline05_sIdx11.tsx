'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=11 — "The Question That Changes Everything"
// Shows: the question reframe — from "how did I do?" to "what did I perceive?"
export default function Inline05_sIdx11() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [flipped, setFlipped] = useState(false)

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
    const t = setTimeout(() => setFlipped(true), 1800)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 20 }}>
        The Question That Changes Everything
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        {/* Old question */}
        <div style={{
          padding: '14px 24px',
          borderRadius: 8,
          border: `1px solid ${flipped ? '#e5e7eb' : '#d1d5db'}`,
          background: flipped ? '#fafafa' : '#fff',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.5s ease, background 0.6s ease 1800ms, border-color 0.6s ease 1800ms',
          width: '100%',
          maxWidth: 320,
        }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: '#9ca3af', margin: '0 0 4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>old question</p>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 13, color: flipped ? '#ccc' : '#555', fontWeight: 600, margin: 0, transition: 'color 0.6s ease 1800ms' }}>"How well did I do?"</p>
        </div>

        <div style={{ fontSize: 20, color: '#a855f7', opacity: flipped ? 1 : 0, transition: 'opacity 0.5s ease' }}>↓</div>

        {/* New question */}
        <div style={{
          padding: '14px 24px',
          borderRadius: 8,
          border: `1px solid ${flipped ? '#a855f7' : '#e5e7eb'}`,
          background: flipped ? '#faf5ff' : '#fafafa',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.5s ease 300ms, background 0.6s ease 1800ms, border-color 0.6s ease 1800ms',
          width: '100%',
          maxWidth: 320,
        }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, color: flipped ? '#a855f7' : '#ccc', margin: '0 0 4px', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.6s ease 1800ms' }}>new question</p>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 13, color: flipped ? '#7c3aed' : '#ccc', fontWeight: 600, margin: 0, transition: 'color 0.6s ease 1800ms' }}>"What did I perceive, and what did I miss?"</p>
        </div>
      </div>
    </div>
  )
}
