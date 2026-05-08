'use client'
import { useEffect, useRef } from 'react'

interface ArcParticle { t: number; speed: number; offset: number }

export default function Hero07Representative() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    const N = 14
    const particles: ArcParticle[] = Array.from({ length: N }, (_, i) => ({
      t: i / N, speed: 0.004 + Math.random() * 0.002, offset: (Math.random() - 0.5) * 30,
    }))

    let elapsed = 0, last = performance.now(), raf = 0
    const GAP_CYCLE = 4000

    if (reduced) {
      ctx.fillStyle = '#0d0b00'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#eab308'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(canvas.width*0.5, 0); ctx.lineTo(canvas.width*0.5, canvas.height)
      ctx.setLineDash([4,4]); ctx.stroke(); ctx.setLineDash([])
      window.removeEventListener('resize', resize); return
    }

    const draw = (now: number) => {
      if (document.visibilityState === 'hidden') { raf = requestAnimationFrame(draw); return }
      const dt = Math.min(now - last, 50); last = now; elapsed += dt
      const W = canvas.width, H = canvas.height
      const gapActive = (elapsed % (GAP_CYCLE * 2)) > GAP_CYCLE

      ctx.fillStyle = 'rgba(13,11,0,0.22)'
      ctx.fillRect(0, 0, W, H)

      ctx.beginPath(); ctx.moveTo(W/2, 20); ctx.lineTo(W/2, H-20)
      ctx.strokeStyle = 'rgba(234,179,8,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([4,4]); ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = 'rgba(234,179,8,0.45)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'
      ctx.fillText('Practice', W*0.25, 25)
      ctx.fillText('Performance', W*0.75, 25)

      particles.forEach(p => {
        p.t = (p.t + p.speed) % 1
        const ox = W * 0.08, oy = H * 0.5
        const midX = W * 0.5, midY = H * 0.35
        const dx = W * 0.92

        const mt = 1 - p.t
        const x = mt*mt*mt*ox + 3*mt*mt*p.t*(midX) + 3*mt*p.t*p.t*(midX) + p.t*p.t*p.t*dx
        const baseY = mt*mt*mt*oy + 3*mt*mt*p.t*midY + 3*mt*p.t*p.t*midY + p.t*p.t*p.t*oy
        const scatter = gapActive && p.t > 0.5 ? (p.offset * (p.t - 0.5) * 3) : 0
        const y = baseY + scatter

        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI*2)
        ctx.fillStyle = gapActive && p.t > 0.5
          ? `rgba(234,179,8,${0.3 + Math.random()*0.2})`
          : 'rgba(234,179,8,0.82)'
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: 'clamp(200px, 28vw, 300px)', display: 'block', marginBottom: '48px', borderRadius: '4px' }} />
}
