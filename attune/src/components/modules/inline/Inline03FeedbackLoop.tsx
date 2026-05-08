'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline03FeedbackLoop() {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStep(1)
        setTimeout(() => setStep(2), 700)
        setTimeout(() => setStep(3), 1400)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const fade = (n: number) => ({ opacity: step >= n ? 1 : 0, transition: `opacity 0.5s ease` })

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Skill lives in the loop
      </p>
      <svg viewBox="0 0 380 160" style={{ width: '100%', height: 'auto' }}>
        {/* Three nodes: Person → Environment → Feedback → Person */}
        {/* Person node */}
        <g style={fade(1)}>
          <circle cx="60" cy="80" r="26" fill="none" stroke="#22c55e" strokeWidth="2" />
          <text x="60" y="77" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="sans-serif">person</text>
          <text x="60" y="89" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="sans-serif">+ skill</text>
        </g>

        {/* Arrow: person → environment */}
        <path d="M88,68 Q155,30 222,68" fill="none" stroke="#22c55e" strokeWidth="1.5"
          strokeDasharray="120" strokeDashoffset={step >= 2 ? 0 : 120}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        <polygon points="222,68 210,60 214,72" fill="#22c55e"
          opacity={step >= 2 ? 1 : 0} style={{ transition: 'opacity 0.3s ease 0.5s' }} />
        <text x="155" y="32" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="sans-serif"
          opacity={step >= 2 ? 1 : 0} style={{ transition: 'opacity 0.3s ease 0.5s' }}>action</text>

        {/* Environment node */}
        <g style={fade(2)}>
          <circle cx="250" cy="80" r="30" fill="none" stroke="#22c55e" strokeWidth="2" />
          <text x="250" y="77" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="sans-serif">environ-</text>
          <text x="250" y="89" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="sans-serif">ment</text>
        </g>

        {/* Arrow: environment → person (feedback arc below) */}
        <path d="M222,94 Q155,140 88,94" fill="none" stroke="#22c55e" strokeWidth="1.5"
          strokeDasharray="120" strokeDashoffset={step >= 3 ? 0 : 120}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        <polygon points="88,94 100,88 96,100" fill="#22c55e"
          opacity={step >= 3 ? 1 : 0} style={{ transition: 'opacity 0.3s ease 0.5s' }} />
        <text x="155" y="148" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="sans-serif"
          opacity={step >= 3 ? 1 : 0} style={{ transition: 'opacity 0.3s ease 0.5s' }}>feedback</text>

        {/* Label: change environment = change skill */}
        <text x="340" y="78" textAnchor="middle" fill="#aaaaaa" fontSize="8" fontFamily="sans-serif"
          opacity={step >= 3 ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.2s' }}>change</text>
        <text x="340" y="90" textAnchor="middle" fill="#aaaaaa" fontSize="8" fontFamily="sans-serif"
          opacity={step >= 3 ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.3s' }}>either side</text>
        <text x="340" y="102" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="sans-serif"
          opacity={step >= 3 ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.4s' }}>= new skill</text>
      </svg>
    </div>
  )
}
