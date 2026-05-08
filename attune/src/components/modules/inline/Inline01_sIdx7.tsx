'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=7 — "Why Self-Diagnosis Is So Hard"
// Shows: Dunning-Kruger arc — confidence vs actual competence
export default function Inline01_sIdx7() {
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

  // Path: confidence curve (high early, dips, rises again)
  // Competence line: steady rise
  const w = 360, h = 120
  const confidencePts = [
    [0, 90], [60, 20], [120, 100], [180, 80], [240, 50], [300, 30], [360, 10]
  ]
  const competencePts = [
    [0, 110], [90, 95], [180, 75], [270, 50], [360, 20]
  ]

  function toPath(pts: number[][]) {
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  }

  const confPath = toPath(confidencePts)
  const compPath = toPath(competencePts)
  const totalLen = 600

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        Confidence vs. Actual Competence
      </p>
      <svg width="100%" viewBox={`0 0 ${w + 40} ${h + 30}`} style={{ overflow: 'visible' }}>
        <g transform="translate(20,10)">
          {/* Axes */}
          <line x1={0} y1={0} x2={0} y2={h} stroke="#ddd" strokeWidth={1} />
          <line x1={0} y1={h} x2={w} y2={h} stroke="#ddd" strokeWidth={1} />
          <text x={-4} y={h / 2} textAnchor="end" fill="#aaa" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>high</text>
          <text x={-4} y={h} textAnchor="end" fill="#aaa" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>low</text>
          <text x={0} y={h + 14} fill="#aaa" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>beginner</text>
          <text x={w} y={h + 14} textAnchor="end" fill="#aaa" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>expert</text>

          {/* Competence line */}
          <path
            d={compPath}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray={totalLen}
            strokeDashoffset={active ? 0 : totalLen}
            style={{ transition: 'stroke-dashoffset 1.4s ease 0ms' }}
          />
          {/* Confidence line */}
          <path
            d={confPath}
            fill="none"
            stroke="#fca5a5"
            strokeWidth={1.5}
            strokeDasharray={totalLen}
            strokeDashoffset={active ? 0 : totalLen}
            style={{ transition: 'stroke-dashoffset 1.4s ease 300ms' }}
          />

          {/* Legend */}
          <rect x={w - 100} y={5} width={10} height={3} fill="#ef4444" rx={1} />
          <text x={w - 85} y={9} fill="#ef4444" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>actual skill</text>
          <rect x={w - 100} y={18} width={10} height={1.5} fill="#fca5a5" rx={1} />
          <text x={w - 85} y={22} fill="#fca5a5" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>self-assessment</text>
        </g>
      </svg>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 10, color: '#666', marginTop: 8 }}>
        The gap between perceived and actual competence is widest when you need honest diagnosis most.
      </p>
    </div>
  )
}
