'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline02ExpertPerception() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setPhase(1)
        setTimeout(() => setPhase(2), 900)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Same scene — different perception
      </p>
      <svg viewBox="0 0 420 160" style={{ width: '100%', height: 'auto' }}>
        {/* Beginner side */}
        <text x="100" y="18" textAnchor="middle" fill="#888" fontSize="9" fontFamily="sans-serif">Beginner sees</text>
        {/* Blurry/sparse dots */}
        {[[60,60],[80,90],[100,70],[120,95],[140,65],[70,110],[130,110]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="4"
            fill="rgba(136,136,136,0.4)"
            opacity={phase >= 1 ? 1 : 0}
            style={{ transition: `opacity 0.4s ease ${i * 80}ms` }} />
        ))}
        <text x="100" y="145" textAnchor="middle" fill="#aaaaaa" fontSize="8" fontFamily="sans-serif"
          opacity={phase >= 1 ? 1 : 0} style={{ transition: 'opacity 0.5s ease 0.6s' }}>
          noise
        </text>

        {/* Divider */}
        <line x1="210" y1="25" x2="210" y2="155" stroke="#eeeeee" strokeWidth="1" />

        {/* Expert side */}
        <text x="320" y="18" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="sans-serif">Expert sees</text>
        {/* Same dots but connected into meaningful clusters */}
        {[[265,60],[285,90],[305,70],[325,95],[345,65],[275,110],[335,110]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="4"
            fill="rgba(34,211,238,0.85)"
            opacity={phase >= 2 ? 1 : 0}
            style={{ transition: `opacity 0.3s ease ${i * 60}ms` }} />
        ))}
        {/* Lines connecting them into a pattern */}
        <polyline points="265,60 285,90 305,70 325,95 345,65"
          stroke="rgba(34,211,238,0.6)" strokeWidth="1.5" fill="none"
          strokeDasharray="200" strokeDashoffset={phase >= 2 ? 0 : 200}
          style={{ transition: 'stroke-dashoffset 0.7s ease 0.3s' }} />
        <line x1="285" y1="90" x2="275" y2="110"
          stroke="rgba(34,211,238,0.5)" strokeWidth="1" fill="none"
          strokeDasharray="30" strokeDashoffset={phase >= 2 ? 0 : 30}
          style={{ transition: 'stroke-dashoffset 0.5s ease 0.7s' }} />
        <line x1="325" y1="95" x2="335" y2="110"
          stroke="rgba(34,211,238,0.5)" strokeWidth="1" fill="none"
          strokeDasharray="30" strokeDashoffset={phase >= 2 ? 0 : 30}
          style={{ transition: 'stroke-dashoffset 0.5s ease 0.8s' }} />
        <text x="320" y="145" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="sans-serif"
          opacity={phase >= 2 ? 1 : 0} style={{ transition: 'opacity 0.5s ease 1s' }}>
          signal
        </text>
      </svg>
    </div>
  )
}
