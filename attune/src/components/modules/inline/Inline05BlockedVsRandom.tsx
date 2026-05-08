'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline05BlockedVsRandom() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Left: blocked practice — smooth rising then drops after
  // Right: random practice — noisy then rises after
  const blockedDuring = 'M30,130 C60,120 90,95 150,70'
  const blockedAfter  = 'M150,70 C175,75 185,95 200,110'
  const randomDuring  = 'M220,100 C240,115 255,85 270,108 C285,90 295,115 320,95 C335,110 345,85 360,100'
  const randomAfter   = 'M360,100 C370,80 375,55 385,40'

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        The contextual interference effect
      </p>
      <svg viewBox="0 0 420 165" style={{ width: '100%', height: 'auto' }}>
        {/* Axes */}
        <line x1="20" y1="140" x2="200" y2="140" stroke="#dddddd" strokeWidth="1" />
        <line x1="20" y1="140" x2="20" y2="20" stroke="#dddddd" strokeWidth="1" />
        <line x1="215" y1="140" x2="400" y2="140" stroke="#dddddd" strokeWidth="1" />
        <line x1="215" y1="140" x2="215" y2="20" stroke="#dddddd" strokeWidth="1" />

        {/* Blocked labels */}
        <text x="110" y="15" textAnchor="middle" fill="#888" fontSize="8.5" fontFamily="sans-serif">Blocked</text>
        <text x="50" y="158" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif">during</text>
        <text x="185" y="158" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif">after</text>
        <line x1="155" y1="140" x2="155" y2="25" stroke="#eeeeee" strokeWidth="1" strokeDasharray="4 3" />

        {/* Random labels */}
        <text x="305" y="15" textAnchor="middle" fill="#a855f7" fontSize="8.5" fontFamily="sans-serif">Random</text>
        <text x="248" y="158" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif">during</text>
        <text x="382" y="158" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif">after</text>
        <line x1="357" y1="140" x2="357" y2="25" stroke="#eeeeee" strokeWidth="1" strokeDasharray="4 3" />

        {/* Blocked: looks good during, drops after */}
        <path d={blockedDuring} fill="none" stroke="rgba(136,136,136,0.7)" strokeWidth="2"
          strokeDasharray="160" strokeDashoffset={active ? 0 : 160}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
        <path d={blockedAfter} fill="none" stroke="rgba(136,136,136,0.4)" strokeWidth="2" strokeDasharray="3 3"
          strokeDashoffset={active ? 0 : 60}
          style={{ transition: 'stroke-dashoffset 0.5s ease 0.8s' }} />

        {/* Random: noisy during, rises after */}
        <path d={randomDuring} fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5"
          strokeDasharray="300" strokeDashoffset={active ? 0 : 300}
          style={{ transition: 'stroke-dashoffset 1s ease 0.2s' }} />
        <path d={randomAfter} fill="none" stroke="#a855f7" strokeWidth="2.5"
          strokeDasharray="80" strokeDashoffset={active ? 0 : 80}
          style={{ transition: 'stroke-dashoffset 0.6s ease 1.2s' }} />

        <text x="110" y="50" textAnchor="middle" fill="#888888" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.5s' }}>feels productive</text>
        <text x="110" y="60" textAnchor="middle" fill="#888888" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.6s' }}>doesn't stick</text>
        <text x="305" y="32" textAnchor="middle" fill="#a855f7" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.7s' }}>feels messy</text>
        <text x="305" y="42" textAnchor="middle" fill="#a855f7" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.8s' }}>actually sticks</text>
      </svg>
    </div>
  )
}
