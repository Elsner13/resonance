'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=9 — "Practicing the Solution vs. Practicing the Process"
// Shows: two-state toggle — solution practice vs process practice
export default function Inline01_sIdx9() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [showProcess, setShowProcess] = useState(false)

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
    const t = setTimeout(() => setShowProcess(true), 1800)
    return () => clearTimeout(t)
  }, [active])

  const solutionSteps = ['KNOWN ANSWER', 'DRILL IT', 'SAME CONTEXT']
  const processSteps = ['READ SITUATION', 'DECIDE', 'ACT', 'EVALUATE']

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Two Modes of Practice
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        {/* Solution side */}
        <div style={{
          flex: 1,
          border: `1px solid ${showProcess ? '#ddd' : '#ef4444'}`,
          borderRadius: 8,
          padding: '12px 8px',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.5s ease 0ms, border-color 0.5s ease 1800ms',
        }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: showProcess ? '#bbb' : '#ef4444', marginBottom: 10, transition: 'color 0.5s ease 1800ms' }}>SOLUTIONS</p>
          {solutionSteps.map((s, i) => (
            <div key={s} style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: 9,
              color: showProcess ? '#ccc' : '#555',
              padding: '5px 0',
              borderBottom: i < solutionSteps.length - 1 ? '1px solid #eee' : 'none',
              transition: 'color 0.5s ease 1800ms',
            }}>{s}</div>
          ))}
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: showProcess ? '#ddd' : '#ef4444', marginTop: 10, transition: 'color 0.5s ease 1800ms' }}>breaks under variation</p>
        </div>
        {/* Process side */}
        <div style={{
          flex: 1,
          border: `1px solid ${showProcess ? '#ef4444' : '#ddd'}`,
          borderRadius: 8,
          padding: '12px 8px',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.5s ease 200ms, border-color 0.5s ease 1800ms',
        }}>
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: showProcess ? '#ef4444' : '#bbb', marginBottom: 10, transition: 'color 0.5s ease 1800ms' }}>PROCESS</p>
          {processSteps.map((s, i) => (
            <div key={s} style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: 9,
              color: showProcess ? '#555' : '#ccc',
              padding: '5px 0',
              borderBottom: i < processSteps.length - 1 ? '1px solid #eee' : 'none',
              transition: 'color 0.5s ease 1800ms',
            }}>{s}</div>
          ))}
          <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 8, color: showProcess ? '#ef4444' : '#ddd', marginTop: 10, transition: 'color 0.5s ease 1800ms' }}>transfers to any context</p>
        </div>
      </div>
    </div>
  )
}
