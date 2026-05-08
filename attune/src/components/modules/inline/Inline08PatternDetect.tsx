'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline08PatternDetect() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setPhase(1)
        setTimeout(() => setPhase(2), 1000)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const dots = [
    { x: 60,  y: 80  }, { x: 90,  y: 55  }, { x: 125, y: 95  },
    { x: 155, y: 65  }, { x: 185, y: 100 }, { x: 220, y: 72  },
    { x: 255, y: 110 }, { x: 290, y: 78  }, { x: 325, y: 115 },
    { x: 355, y: 85  },
  ]

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        Enskilment — random noise reveals its structure
      </p>
      <svg viewBox="0 0 420 145" style={{ width: '100%', height: 'auto' }}>
        {/* Dots appear first */}
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="5"
            fill={phase >= 2 ? '#ec4899' : 'rgba(136,136,136,0.5)'}
            opacity={phase >= 1 ? 1 : 0}
            style={{
              transition: `opacity 0.3s ease ${i * 60}ms, fill 0.6s ease ${i * 40}ms`
            }} />
        ))}

        {/* Connecting curve appears at phase 2 */}
        <path
          d={`M${dots.map(d => `${d.x},${d.y}`).join(' L')}`}
          fill="none" stroke="#ec4899" strokeWidth="2"
          strokeDasharray="700" strokeDashoffset={phase >= 2 ? 0 : 700}
          style={{ transition: 'stroke-dashoffset 1.2s ease' }} />

        {/* Phase labels */}
        <text x="210" y="130" textAnchor="middle" fill="#aaaaaa" fontSize="8" fontFamily="sans-serif"
          opacity={phase === 1 ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }}>
          looks like noise to the beginner...
        </text>
        <text x="210" y="130" textAnchor="middle" fill="#ec4899" fontSize="8" fontFamily="sans-serif"
          opacity={phase === 2 ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.8s' }}>
          the enskilled eye reads the signal
        </text>
      </svg>
    </div>
  )
}
