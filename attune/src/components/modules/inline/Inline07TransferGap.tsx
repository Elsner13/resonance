'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline07TransferGap() {
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

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        The transfer gap — what practice builds vs. what performance needs
      </p>
      <svg viewBox="0 0 420 155" style={{ width: '100%', height: 'auto' }}>
        {/* Practice box */}
        <rect x={20} y={30} width={140} height={85} rx="5"
          fill="none" stroke="#aaaaaa" strokeWidth="1.5"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }} />
        <text x={90} y={52} textAnchor="middle" fill="#888" fontSize="9" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }}>Practice</text>
        <text x={90} y={68} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.2s' }}>fixed cues</text>
        <text x={90} y={80} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.3s' }}>no real stakes</text>
        <text x={90} y={92} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.4s' }}>scripted context</text>
        <text x={90} y={104} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.5s' }}>no live opponents</text>

        {/* Arrow with gap */}
        <line x1={163} y1={72} x2={195} y2={72}
          stroke="#aaaaaa" strokeWidth="1.5"
          strokeDasharray="30" strokeDashoffset={active ? 0 : 30}
          style={{ transition: 'stroke-dashoffset 0.5s ease 0.6s' }} />
        {/* Gap indicator */}
        <line x1={200} y1={62} x2={200} y2={83}
          stroke="#eab308" strokeWidth="2"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 1s' }} />
        <line x1={258} y1={62} x2={258} y2={83}
          stroke="#eab308" strokeWidth="2"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 1s' }} />
        <line x1={200} y1={72} x2={258} y2={72}
          stroke="#eab308" strokeWidth="1.5" strokeDasharray="4 3"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 1.1s' }} />
        <text x={229} y={58} textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.2s' }}>gap</text>
        <line x1={263} y1={72} x2={290} y2={72}
          stroke="#eab308" strokeWidth="1.5"
          strokeDasharray="30" strokeDashoffset={active ? 0 : 30}
          style={{ transition: 'stroke-dashoffset 0.5s ease 1.1s' }} />
        <polygon points="290,68 300,72 290,76" fill="#eab308"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 1.4s' }} />

        {/* Performance box */}
        <rect x={298} y={30} width={100} height={85} rx="5"
          fill="none" stroke="#eab308" strokeWidth="1.5"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.8s' }} />
        <text x={348} y={52} textAnchor="middle" fill="#eab308" fontSize="9" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.8s' }}>Performance</text>
        <text x={348} y={68} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1s' }}>live cues</text>
        <text x={348} y={80} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.1s' }}>real stakes</text>
        <text x={348} y={92} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.2s' }}>ambiguity</text>
        <text x={348} y={104} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.3s' }}>real opponents</text>

        <text x={210} y={145} textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.5s' }}>
          close this gap with representative practice
        </text>
      </svg>
    </div>
  )
}
