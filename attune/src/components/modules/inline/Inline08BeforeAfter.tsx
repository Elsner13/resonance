'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline08BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setActive(true), 200); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const elements = [
    { bx: 55, by: 45 }, { bx: 95, by: 95 }, { bx: 130, by: 55 },
    { bx: 70, by: 130 }, { bx: 115, by: 130 }, { bx: 145, by: 95 },
  ]
  const afterPos = [
    { x: 255, y: 65 }, { x: 285, y: 65 }, { x: 300, y: 90 },
    { x: 285, y: 115 }, { x: 255, y: 115 }, { x: 240, y: 90 },
  ]
  const connections = [[0,1],[1,2],[2,5],[5,4],[4,3],[3,0],[0,5],[1,4]]

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '12px' }}>
        Before & After the Perceptual Shift
      </p>
      <svg viewBox="0 0 380 170" style={{ width: '100%', height: 'auto' }}>
        <text x="95" y="20" textAnchor="middle" fill="#888" fontSize="9" fontFamily="sans-serif">Before</text>
        <text x="270" y="20" textAnchor="middle" fill="#ec4899" fontSize="9" fontFamily="sans-serif">After</text>
        <line x1="190" y1="15" x2="190" y2="160" stroke="#333" strokeWidth="0.5" />
        {elements.map((e, i) => (
          <circle key={i} cx={e.bx} cy={e.by + 20} r="5"
            fill="none" stroke="rgba(236,72,153,0.35)" strokeWidth="1.5"
            opacity={active ? 1 : 0} style={{ transition: `opacity 0.4s ease ${i * 80}ms` }} />
        ))}
        {connections.map(([a, b], i) => (
          <line key={i}
            x1={afterPos[a].x} y1={afterPos[a].y}
            x2={afterPos[b].x} y2={afterPos[b].y}
            stroke="#ec4899" strokeWidth="1"
            strokeDasharray="60" strokeDashoffset={active ? 0 : 60}
            opacity={0.6}
            style={{ transition: `stroke-dashoffset 0.5s ease ${300 + i * 80}ms` }} />
        ))}
        {afterPos.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5"
            fill="rgba(236,72,153,0.7)" stroke="none"
            opacity={active ? 1 : 0} style={{ transition: `opacity 0.4s ease ${200 + i * 60}ms` }} />
        ))}
      </svg>
    </div>
  )
}
