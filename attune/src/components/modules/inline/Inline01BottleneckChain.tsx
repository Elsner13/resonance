'use client'
import { useEffect, useRef, useState } from 'react'

export default function Inline01BottleneckChain() {
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

  const nodes = [
    { x: 60, label: 'effort', w: 28 },
    { x: 150, label: 'volume', w: 28 },
    { x: 240, label: 'BOTTLENECK', w: 52, accent: true },
    { x: 340, label: 'output', w: 28 },
  ]

  return (
    <div ref={ref} style={{ maxWidth: '480px', margin: '32px auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#aaaaaa', marginBottom: '16px' }}>
        The system runs at its slowest link
      </p>
      <svg viewBox="0 0 420 90" style={{ width: '100%', height: 'auto' }}>
        {nodes.map((n, i) => {
          const isBottleneck = n.accent
          return (
            <g key={i}>
              {i < nodes.length - 1 && (
                <line
                  x1={n.x + n.w / 2} y1={45}
                  x2={nodes[i + 1].x - nodes[i + 1].w / 2} y2={45}
                  stroke={isBottleneck ? '#ef4444' : '#cccccc'}
                  strokeWidth="1.5"
                  strokeDasharray="60"
                  strokeDashoffset={active ? 0 : 60}
                  style={{ transition: `stroke-dashoffset 0.5s ease ${i * 200}ms` }}
                />
              )}
              <rect
                x={n.x - n.w / 2} y={isBottleneck ? 28 : 33}
                width={n.w} height={isBottleneck ? 34 : 24}
                rx="3"
                fill={isBottleneck ? '#ef4444' : 'none'}
                stroke={isBottleneck ? '#ef4444' : '#cccccc'}
                strokeWidth={isBottleneck ? 0 : 1}
                opacity={active ? 1 : 0}
                style={{ transition: `opacity 0.4s ease ${i * 200 + 100}ms` }}
              />
              <text
                x={n.x} y={isBottleneck ? 47 : 49}
                textAnchor="middle"
                fill={isBottleneck ? '#ffffff' : '#888888'}
                fontSize={isBottleneck ? 8 : 8}
                fontFamily="sans-serif"
                opacity={active ? 1 : 0}
                style={{ transition: `opacity 0.4s ease ${i * 200 + 200}ms` }}
              >
                {n.label}
              </text>
            </g>
          )
        })}
        <text x="240" y="78" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="sans-serif"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.4s ease 0.9s' }}>
          ↑ fix this first
        </text>
      </svg>
    </div>
  )
}
