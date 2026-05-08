'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline07PerceptionAction() {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        [0,1,2,3].forEach(i => setTimeout(() => setStep(i + 1), i * 600 + 100))
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ maxWidth: '440px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Perception–Action Loop
      </p>
      <svg viewBox="0 0 380 120" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#eab308" opacity="0.8" />
          </marker>
        </defs>
        <circle cx="60" cy="60" r="25" fill="none" stroke="#eab308" strokeWidth="1.5" opacity={step>=1?1:0.1} style={{transition:'opacity 0.4s'}} />
        <text x="60" y="64" textAnchor="middle" fill="#eab308" fontSize="9" fontFamily="sans-serif" opacity={step>=1?1:0.1} style={{transition:'opacity 0.4s'}}>Env</text>
        <path d="M88,50 L182,50" fill="none" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#arr)"
          strokeDasharray="95" strokeDashoffset={step>=2?0:95} style={{transition:'stroke-dashoffset 0.5s ease 0.1s'}} />
        <text x="135" y="44" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif" opacity={step>=2?0.7:0} style={{transition:'opacity 0.3s 0.4s'}}>signal</text>
        <circle cx="210" cy="60" r="25" fill="none" stroke="#eab308" strokeWidth="1.5" opacity={step>=2?1:0.1} style={{transition:'opacity 0.4s'}} />
        <text x="210" y="64" textAnchor="middle" fill="#eab308" fontSize="9" fontFamily="sans-serif" opacity={step>=2?1:0.1} style={{transition:'opacity 0.4s'}}>You</text>
        <path d="M233,75 Q280,108 60,85 Q60,85 60,84" fill="none" stroke="#eab308" strokeWidth="1.5"
          strokeDasharray="260" strokeDashoffset={step>=3?0:260} style={{transition:'stroke-dashoffset 0.7s ease 0.1s'}} />
        <text x="160" y="108" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif" opacity={step>=3?0.7:0} style={{transition:'opacity 0.3s 0.5s'}}>response</text>
        <circle cx="60" cy="60" r="32" fill="none" stroke="#eab308" strokeWidth="2" opacity={step>=4?0.4:0} style={{transition:'opacity 0.5s'}} />
      </svg>
    </div>
  )
}
