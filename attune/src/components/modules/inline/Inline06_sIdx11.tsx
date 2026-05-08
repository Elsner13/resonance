'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=11 — "The Bowl That Fits You"
// Shows: the bowl shape — optimal challenge zone between too easy and too hard
export default function Inline06_sIdx11() {
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

  const pathLen = 400

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        The Bowl That Fits You
      </p>
      <svg width="100%" viewBox="0 0 400 160" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="bowlGrad06" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Bowl curve */}
        <path d="M 20,20 Q 200,150 380,20"
          fill="none" stroke="#6366f1" strokeWidth={2.5}
          strokeDasharray={pathLen} strokeDashoffset={active ? 0 : pathLen}
          style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
        {/* Fill under bowl */}
        <path d="M 20,20 Q 200,150 380,20 L 380,0 L 20,0 Z"
          fill="url(#bowlGrad06)"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.8s ease 800ms' }} />

        {/* Labels on curve */}
        <text x={40} y={55} fontSize={8} fill="#818cf8" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>too easy</text>
        <text x={40} y={67} fontSize={7} fill="#c7d2fe" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>no development</text>

        <text x={310} y={55} textAnchor="end" fontSize={8} fill="#818cf8" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>too hard</text>
        <text x={310} y={67} textAnchor="end" fontSize={7} fill="#c7d2fe" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 600ms' }}>overwhelm</text>

        {/* Optimal zone marker at bottom of bowl */}
        <circle cx={200} cy={142} r={6} fill="#6366f1"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1000ms' }} />
        <text x={200} y={158} textAnchor="middle" fontSize={9} fill="#4f46e5" fontWeight={700} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1000ms' }}>optimal challenge zone</text>

        {/* X axis label */}
        <text x={20} y={12} fontSize={7} fill="#a5b4fc" style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 800ms' }}>challenge level →</text>
      </svg>
    </div>
  )
}
