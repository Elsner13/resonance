'use client'
import { useEffect, useRef, useState } from 'react'

// sIdx=11 — "What Most People Miss: The Feedback Loop Problem"
// Shows: open vs closed feedback loop
export default function Inline01_sIdx11() {
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

  const pathLen = 400

  return (
    <div ref={ref} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
        The Feedback Loop Gap
      </p>
      <svg width="100%" viewBox="0 0 400 160" style={{ overflow: 'visible' }}>
        {/* Broken loop (top) */}
        <text x={200} y={18} textAnchor="middle" fill="#999" fontSize={8} fontWeight={600} letterSpacing={2} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>BROKEN LOOP</text>
        <rect x={20} y={25} width={80} height={28} rx={4} fill="#f5f5f5" stroke="#ddd" strokeWidth={1} />
        <text x={60} y={39} textAnchor="middle" dominantBaseline="middle" fill="#888" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>PRACTICE</text>
        <line x1={100} y1={39} x2={180} y2={39} stroke="#ddd" strokeWidth={1.5} strokeDasharray="4,3" />
        <rect x={180} y={25} width={80} height={28} rx={4} fill="#f5f5f5" stroke="#ddd" strokeWidth={1} />
        <text x={220} y={39} textAnchor="middle" dominantBaseline="middle" fill="#888" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>OUTCOME</text>
        <text x={305} y={39} dominantBaseline="middle" fill="#ccc" fontSize={11}>?</text>
        {/* no return arrow */}

        {/* Closed loop (bottom) */}
        <text x={200} y={86} textAnchor="middle" fill="#ef4444" fontSize={8} fontWeight={600} letterSpacing={2} style={{ fontFamily: 'var(--font-montserrat-alternates)' }}>CLOSED LOOP</text>
        <rect x={20} y={95} width={80} height={28} rx={4} fill="#fef2f2" stroke="#ef4444" strokeWidth={1}
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 0ms' }} />
        <text x={60} y={109} textAnchor="middle" dominantBaseline="middle" fill="#ef4444" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 0ms' }}>PRACTICE</text>
        <line x1={100} y1={109} x2={180} y2={109} stroke="#ef4444" strokeWidth={1.5}
          strokeDasharray={pathLen} strokeDashoffset={active ? 0 : pathLen}
          style={{ transition: 'stroke-dashoffset 0.6s ease 300ms' }} />
        <rect x={180} y={95} width={80} height={28} rx={4} fill="#fef2f2" stroke="#ef4444" strokeWidth={1}
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 500ms' }} />
        <text x={220} y={109} textAnchor="middle" dominantBaseline="middle" fill="#ef4444" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 500ms' }}>OUTCOME</text>
        {/* Return arrow */}
        <path d="M 260,109 Q 310,109 310,135 Q 310,155 60,155 Q 20,155 20,135 L 20,123"
          fill="none" stroke="#ef4444" strokeWidth={1.5}
          strokeDasharray={pathLen} strokeDashoffset={active ? 0 : pathLen}
          style={{ transition: 'stroke-dashoffset 0.8s ease 700ms' }} />
        <polygon points="20,123 16,130 24,130" fill="#ef4444"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1300ms' }} />
        <text x={200} y={150} textAnchor="middle" fill="#ef4444" fontSize={8} style={{ fontFamily: 'var(--font-montserrat-alternates)', opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 1100ms' }}>mechanism feedback</text>
      </svg>
    </div>
  )
}
