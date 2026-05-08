'use client'
import { useEffect, useRef } from 'react'

interface FlowParticle { x: number; y: number; speed: number }

export default function Hero04Constraints() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    if (reduced) {
      ctx.fillStyle = '#0d0700'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(0, canvas.height*0.35); ctx.lineTo(canvas.width*0.45, canvas.height*0.45); ctx.lineTo(canvas.width, canvas.height*0.35); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, canvas.height*0.65); ctx.lineTo(canvas.width*0.45, canvas.height*0.55); ctx.lineTo(canvas.width, canvas.height*0.65); ctx.stroke()
      window.removeEventListener('resize', resize); return
    }

    const N = 40
    const particles: FlowParticle[] = Array.from({ length: N }, () => ({
      x: -Math.random() * canvas.width,
      y: canvas.height * (0.4 + Math.random() * 0.2),
      speed: 1.2 + Math.random() * 0.8,
    }))

    let elapsed = 0, last = performance.now(), raf = 0
    const CYCLE = 7000

    const draw = (now: number) => {
      if (document.visibilityState === 'hidden') { raf = requestAnimationFrame(draw); return }
      const dt = Math.min(now - last, 50); last = now; elapsed += dt
      if (elapsed > CYCLE) { elapsed = 0; particles.forEach(p => { p.x = -Math.random() * canvas.width * 0.5 }) }

      const W = canvas.width, H = canvas.height
      const open = elapsed > 4500

      const pipeTop = (x: number) => {
        const pinch = W * 0.45
        const narrowness = open ? 0.05 : 0.2
        if (x < pinch) return H * (0.25 + narrowness * (x / pinch))
        return H * (0.25 + narrowness * (1 - (x - pinch) / (W - pinch)) + narrowness * (x - pinch) / (W - pinch))
      }
      const pipeBot = (x: number) => H - pipeTop(x)

      ctx.fillStyle = 'rgba(13,7,0,0.25)'
      ctx.fillRect(0, 0, W, H)

      ctx.beginPath(); ctx.moveTo(0, pipeTop(0))
      for (let x = 0; x <= W; x += 4) ctx.lineTo(x, pipeTop(x))
      ctx.strokeStyle = 'rgba(249,115,22,0.35)'; ctx.lineWidth = 1.5; ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, pipeBot(0))
      for (let x = 0; x <= W; x += 4) ctx.lineTo(x, pipeBot(x))
      ctx.stroke()

      if (!open) {
        const pinchX = W * 0.45
        const glow = ctx.createRadialGradient(pinchX, H / 2, 0, pinchX, H / 2, 30)
        glow.addColorStop(0, 'rgba(249,115,22,0.4)')
        glow.addColorStop(1, 'rgba(249,115,22,0)')
        ctx.fillStyle = glow; ctx.fillRect(pinchX - 30, H / 2 - 30, 60, 60)
      }

      particles.forEach(p => {
        const pinchX = W * 0.45
        const nearPinch = Math.abs(p.x - pinchX) < 60
        const speedMult = (!open && nearPinch) ? 0.15 : (open ? 1.8 : 1)
        p.x += p.speed * speedMult

        const top = pipeTop(Math.max(0, Math.min(p.x, W))) + 3
        const bot = pipeBot(Math.max(0, Math.min(p.x, W))) - 3
        p.y = Math.max(top, Math.min(p.y + (Math.random() - 0.5) * 0.8, bot))

        if (p.x > W + 10) p.x = -10 - Math.random() * 20

        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249,115,22,${open ? 0.85 : nearPinch ? 0.9 : 0.55})`; ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: 'clamp(200px, 28vw, 300px)', display: 'block', marginBottom: '48px', borderRadius: '4px' }} />
}
