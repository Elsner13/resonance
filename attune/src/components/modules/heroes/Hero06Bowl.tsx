'use client'
import { useEffect, useRef } from 'react'

interface BowlParticle { x: number; y: number; vx: number; vy: number }

export default function Hero06Bowl() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    const N = 70
    const mk = (W: number, H: number): BowlParticle => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3,
    })
    let particles = Array.from({ length: N }, () => mk(canvas.width, canvas.height))

    if (reduced) {
      ctx.fillStyle = '#02050d'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      particles.forEach(() => { ctx.beginPath(); ctx.arc(canvas.width/2 + (Math.random()-0.5)*60, canvas.height*0.65 + (Math.random()-0.5)*30, 2, 0, Math.PI*2); ctx.fillStyle = '#6366f1'; ctx.fill() })
      window.removeEventListener('resize', resize); return
    }

    let elapsed = 0, last = performance.now(), raf = 0
    const ATTRACT_START = 1000

    const bowlForce = (p: BowlParticle, W: number, H: number, strength: number) => {
      const cx = W / 2, cy = H * 0.65
      const dx = cx - p.x
      const bowl_y = cy + ((p.x - cx) ** 2) / (W * 0.8) - H * 0.2
      return { fx: dx * strength * 0.4, fy: (bowl_y - p.y) * strength }
    }

    canvas.addEventListener('click', () => {
      const W = canvas.width, H = canvas.height
      particles = Array.from({ length: N }, () => mk(W, H))
      elapsed = 0
    })

    const draw = (now: number) => {
      if (document.visibilityState === 'hidden') { raf = requestAnimationFrame(draw); return }
      const dt = Math.min(now - last, 50); last = now; elapsed += dt
      const W = canvas.width, H = canvas.height

      ctx.fillStyle = 'rgba(2,5,13,0.2)'
      ctx.fillRect(0, 0, W, H)

      const attractAge = Math.max(0, elapsed - ATTRACT_START)
      const strength = Math.min(attractAge / 4000, 1) * 0.022

      particles.forEach(p => {
        const { fx, fy } = bowlForce(p, W, H, strength)
        p.vx += fx + (Math.random() - 0.5) * 0.1
        p.vy += fy + (Math.random() - 0.5) * 0.1
        p.vx *= 0.97; p.vy *= 0.97
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,102,241,${0.4 + strength * 20})`; ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: 'clamp(200px, 28vw, 300px)', display: 'block', marginBottom: '48px', borderRadius: '4px', cursor: 'pointer' }} title="Click to scatter" />
}
