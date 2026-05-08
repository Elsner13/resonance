'use client'
import { useEffect, useRef } from 'react'

interface Particle { x: number; y: number; vx: number; vy: number }

export default function Hero01WrongProblem() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const N = 55
    const mk = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    })
    const particles = Array.from({ length: N }, mk)

    if (reduced) {
      ctx.fillStyle = '#0d0505'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#ef4444'
      ctx.beginPath(); ctx.arc(canvas.width * 0.75, canvas.height * 0.5, 8, 0, Math.PI * 2); ctx.fill()
      window.removeEventListener('resize', resize)
      return
    }

    let elapsed = 0, last = performance.now(), raf = 0
    const CYCLE = 5500

    const draw = (now: number) => {
      if (document.visibilityState === 'hidden') { raf = requestAnimationFrame(draw); return }
      const dt = Math.min(now - last, 50); last = now; elapsed += dt
      if (elapsed > CYCLE) {
        elapsed = 0
        particles.forEach((p) => Object.assign(p, mk()))
      }
      const phase = elapsed < 2200 ? 0 : elapsed < 2700 ? 1 : 2
      const wt = { x: canvas.width * 0.25, y: canvas.height * 0.5 }
      const rt = { x: canvas.width * 0.75, y: canvas.height * 0.5 }

      ctx.fillStyle = 'rgba(13,5,5,0.22)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ;[{ t: wt, b: phase === 0 ? 0.55 : 0.12 }, { t: rt, b: phase === 2 ? 1 : phase === 1 ? 0.55 : 0.18 }]
        .forEach(({ t, b }) => {
          ctx.beginPath(); ctx.arc(t.x, t.y, 7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(239,68,68,${b})`; ctx.fill()
          ctx.beginPath(); ctx.arc(t.x, t.y, 14, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(239,68,68,${b * 0.2})`; ctx.fill()
        })

      particles.forEach(p => {
        const target = phase === 2 ? rt : wt
        const dx = target.x - p.x, dy = target.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.1
        const force = phase === 1 ? 0.025 : 0.007
        p.vx += (dx / dist) * force; p.vy += (dy / dist) * force
        p.vx *= 0.95; p.vy *= 0.95
        p.x += p.vx; p.y += p.vy
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = phase === 2 ? 'rgba(239,68,68,0.75)' : 'rgba(239,68,68,0.38)'
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: 'clamp(200px, 28vw, 300px)', display: 'block', marginBottom: '48px', borderRadius: '4px' }} />
}
