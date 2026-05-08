'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline08PerceptualChange() {
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

  // Two columns: "Temporary performance gain" vs "Permanent perceptual change"
  // Left: bar that fills then empties (fades). Right: bar that fills and stays.
  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        What practice actually builds
      </p>
      <svg viewBox="0 0 420 165" style={{ width: '100%', height: 'auto' }}>
        {/* Left column: temporary */}
        <text x="105" y="18" textAnchor="middle" fill="#888" fontSize="8.5" fontFamily="sans-serif">Temporary gain</text>
        <text x="105" y="30" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif">(behavioral polish)</text>

        {/* Bar grows then recedes */}
        <rect x={55} y={40} width={100} height={16} rx="3" fill="#eeeeee" />
        <rect x={55} y={40}
          width={active ? 100 : 0} height={16} rx="3" fill="rgba(136,136,136,0.45)"
          style={{ transition: 'width 0.8s ease 0.2s' }} />
        <text x={105} y={52} textAnchor="middle" fill="#888" fontSize="7" fontFamily="sans-serif">builds</text>

        {/* Decay arrow */}
        <line x1={105} y1={60} x2={105} y2={80}
          stroke="#cccccc" strokeWidth="1.5"
          strokeDasharray="20" strokeDashoffset={active ? 0 : 20}
          style={{ transition: 'stroke-dashoffset 0.4s ease 1s' }} />
        <polygon points="105,80 100,70 110,70" fill="#cccccc"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s ease 1.3s' }} />

        <rect x={55} y={84} width={100} height={16} rx="3" fill="#eeeeee" />
        <rect x={55} y={84}
          width={active ? 30 : 0} height={16} rx="3" fill="rgba(136,136,136,0.3)"
          style={{ transition: 'width 0.6s ease 1.4s' }} />
        <text x={105} y={96} textAnchor="middle" fill="#aaaaaa" fontSize="7" fontFamily="sans-serif">fades without reps</text>

        <text x="105" y="125" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.8s' }}>stop practicing →</text>
        <text x="105" y="136" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.9s' }}>gain erodes</text>

        {/* Divider */}
        <line x1={210} y1={15} x2={210} y2={150} stroke="#eeeeee" strokeWidth="1" />

        {/* Right column: permanent */}
        <text x="315" y="18" textAnchor="middle" fill="#ec4899" fontSize="8.5" fontFamily="sans-serif">Permanent change</text>
        <text x="315" y="30" textAnchor="middle" fill="#aaaaaa" fontSize="7.5" fontFamily="sans-serif">(perceptual distinction)</text>

        <rect x={265} y={40} width={100} height={16} rx="3" fill="#eeeeee" />
        <rect x={265} y={40}
          width={active ? 100 : 0} height={16} rx="3" fill="rgba(236,72,153,0.55)"
          style={{ transition: 'width 0.8s ease 0.4s' }} />
        <text x={315} y={52} textAnchor="middle" fill="#ec4899" fontSize="7" fontFamily="sans-serif">distinction carved in</text>

        {/* Lock icon suggestion */}
        <rect x={300} y={68} width={30} height={22} rx="3" fill="none" stroke="#ec4899" strokeWidth="1.5"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.2s' }} />
        <path d="M307,68 Q307,60 315,60 Q323,60 323,68"
          fill="none" stroke="#ec4899" strokeWidth="1.5"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.3s' }} />
        <text x={315} y={83} textAnchor="middle" fill="#ec4899" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.4s' }}>locked</text>

        <text x="315" y="125" textAnchor="middle" fill="#ec4899" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.8s' }}>stop practicing →</text>
        <text x="315" y="136" textAnchor="middle" fill="#ec4899" fontSize="7.5" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 1.9s' }}>you still see it</text>
      </svg>
    </div>
  )
}
