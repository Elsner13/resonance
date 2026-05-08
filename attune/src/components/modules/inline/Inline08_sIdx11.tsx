'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=11 — "What Happens After the Course Ends"
// Shows: the ongoing cycle — diagnose → design → develop → repeat
export default function Inline08_sIdx11() {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect()
          let s = 0
          const interval = setInterval(() => {
            s = (s % 4) + 1
            setStep(s)
          }, 700)
          // Stop cycling at 4 after showing all
          setTimeout(() => clearInterval(interval), 3200)
          setTimeout(() => setStep(0), 3200)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const nodes = [
    { label: 'DIAGNOSE', sub: 'find the real constraint', cx: 160, cy: 40 },
    { label: 'DESIGN', sub: 'build the conditions', cx: 280, cy: 100 },
    { label: 'DEVELOP', sub: 'practice at the edge', cx: 160, cy: 160 },
    { label: 'REPEAT', sub: 'constraint migrates up', cx: 40, cy: 100 },
  ]

  const arcs = [
    'M 185,50 Q 280,50 280,90',
    'M 268,118 Q 230,175 185,165',
    'M 135,160 Q 40,160 40,118',
    'M 40,82 Q 80,40 135,45',
  ]

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        The Ongoing Cycle
      </p>
      <svg width="100%" viewBox="0 0 320 210" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }}>
        {/* Arcs */}
        {arcs.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#fce7f3" strokeWidth={2}
            strokeDasharray={160} strokeDashoffset={step > i ? 0 : 160}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
        ))}
        {/* Arrow heads */}
        {[
          { x: 280, y: 93, r: 270 },
          { x: 183, y: 167, r: 190 },
          { x: 40, y: 115, r: 90 },
          { x: 138, y: 43, r: 10 },
        ].map((a, i) => (
          <polygon key={i}
            points={`${a.x},${a.y} ${a.x - 5},${a.y - 8} ${a.x + 5},${a.y - 8}`}
            fill="#ec4899"
            transform={`rotate(${a.r}, ${a.x}, ${a.y})`}
            style={{ opacity: step > i ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={28}
              fill={step === i + 1 ? '#ec4899' : '#fdf2f8'}
              stroke={step > 0 ? '#ec4899' : '#fce7f3'}
              strokeWidth={step === i + 1 ? 2.5 : 1}
              style={{ transition: 'all 0.4s ease' }} />
            <text x={n.cx} y={n.cy - 4} textAnchor="middle" dominantBaseline="middle"
              fontSize={8} fontWeight={700}
              fill={step === i + 1 ? '#fff' : '#be185d'}
              style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.4s ease' }}>
              {n.label}
            </text>
            <text x={n.cx} y={n.cy + 10} textAnchor="middle" dominantBaseline="middle"
              fontSize={6}
              fill={step === i + 1 ? '#fce7f3' : '#f9a8d4'}
              style={{ fontFamily: 'var(--font-montserrat-alternates)', transition: 'fill 0.4s ease' }}>
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 10, color: '#666', marginTop: 4 }}>
        The course ends. The practice doesn't.
      </p>
    </div>
  )
}
