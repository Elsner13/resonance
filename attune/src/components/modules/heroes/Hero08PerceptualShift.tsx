'use client'
import { useEffect, useRef } from 'react'

interface ShiftParticle { x: number; y: number; vx: number; vy: number; tx: number; ty: number }

export default function Hero08PerceptualShift() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    const N = 60

    const afterPositions = Array.from({ length: N }, (_, i) => {
      const angle = (i / N) * Math.PI * 2
      const r = 30 + (i % 3) * 28
      return { x: canvas.width / 2 + Math.cos(angle) * r, y: canvas.height / 2 + Math.sin(angle) * r }
    })

    const particles: ShiftParticle[] = Array.from({ length: N }, (_, i) => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
      tx: afterPositions[i].x, ty: afterPositions[i].y,
    }))

    if (reduced) {
      ctx.fillStyle = '#0d0209'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      afterPositions.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI*2); ctx.fillStyle='#ec4899'; ctx.fill() })
      window.removeEventListener('resize', resize); return
    }

    let elapsed = 0, last = performance.now(), raf = 0
    const CYCLE = 8000
    const FLASH_AT = 5000

    const draw = (now: number) => {
      if (document.visibilityState === 'hidden') { raf = requestAnimationFrame(draw); return }
      const dt = Math.min(now - last, 50); last = now; elapsed += dt
      if (elapsed > CYCLE) {
        elapsed = 0
        particles.forEach(p => {
          p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height
          p.vx = (Math.random() - 0.5) * 2; p.vy = (Math.random() - 0.5) * 2
        })
      }

      const flashed = elapsed > FLASH_AT
      const agitation = Math.min(elapsed / FLASH_AT, 1)

      ctx.fillStyle = 'rgba(13,2,9,0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (elapsed > FLASH_AT && elapsed < FLASH_AT + 180) {
        const a = 1 - (elapsed - FLASH_AT) / 180
        ctx.fillStyle = `rgba(236,72,153,${a * 0.5})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      particles.forEach(p => {
        if (!flashed) {
          p.vx += (Math.random() - 0.5) * agitation * 0.6
          p.vy += (Math.random() - 0.5) * agitation * 0.6
          p.vx *= 0.96; p.vy *= 0.96
          p.x += p.vx; p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        } else {
          p.x += (p.tx - p.x) * 0.1
          p.y += (p.ty - p.y) * 0.1
        }

        ctx.beginPath(); ctx.arc(p.x, p.y, flashed ? 2.5 : 1.8, 0, Math.PI * 2)
        ctx.fillStyle = flashed ? 'rgba(236,72,153,0.85)' : `rgba(236,72,153,${0.3 + agitation * 0.3})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: 'clamp(200px, 28vw, 300px)', display: 'block', marginBottom: '48px', borderRadius: '4px' }} />
}
