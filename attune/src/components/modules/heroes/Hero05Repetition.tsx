'use client'
import { useEffect, useRef } from 'react'

export default function Hero05Repetition() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    if (reduced) {
      ctx.fillStyle = '#07040d'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(168,85,247,0.6)'; ctx.lineWidth = 1.5; ctx.setLineDash([])
      ctx.beginPath(); ctx.moveTo(40, canvas.height/2); ctx.bezierCurveTo(canvas.width*0.33, canvas.height*0.2, canvas.width*0.66, canvas.height*0.8, canvas.width-40, canvas.height/2); ctx.stroke()
      window.removeEventListener('resize', resize); return
    }

    let raf = 0, elapsed = 0, last = performance.now()
    const CYCLE = 5000
    const TRAIL_COUNT = 7

    const arcOffsets = Array.from({ length: TRAIL_COUNT }, (_, i) => (i - Math.floor(TRAIL_COUNT / 2)) * 0.18)

    const draw = (now: number) => {
      if (document.visibilityState === 'hidden') { raf = requestAnimationFrame(draw); return }
      const dt = Math.min(now - last, 50); last = now; elapsed += dt
      const W = canvas.width, H = canvas.height

      ctx.fillStyle = 'rgba(7,4,13,0.18)'
      ctx.fillRect(0, 0, W, H)

      const t = (elapsed % CYCLE) / CYCLE

      const ox = 50, oy = H / 2
      const dx = W - 50, dy = H / 2

      arcOffsets.forEach((offset, i) => {
        const cp1x = W * 0.33, cp1y = H * (0.5 + offset * 1.4)
        const cp2x = W * 0.66, cp2y = H * (0.5 - offset * 1.4)

        ctx.beginPath(); ctx.moveTo(ox, oy)
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, dx, dy)
        ctx.strokeStyle = 'rgba(168,85,247,0.12)'; ctx.lineWidth = 1; ctx.setLineDash([]); ctx.stroke()

        const pt = (t + i / TRAIL_COUNT) % 1
        const b = (t2: number) => {
          const mt = 1 - t2
          return {
            x: mt*mt*mt*ox + 3*mt*mt*t2*cp1x + 3*mt*t2*t2*cp2x + t2*t2*t2*dx,
            y: mt*mt*mt*oy + 3*mt*mt*t2*cp1y + 3*mt*t2*t2*cp2y + t2*t2*t2*dy,
          }
        }
        const pos = b(pt)
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 3, 0, Math.PI*2)
        ctx.fillStyle = 'rgba(168,85,247,0.85)'; ctx.fill()
      })

      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(dx, dy)
      ctx.strokeStyle = 'rgba(168,85,247,0.22)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]); ctx.stroke()
      ctx.setLineDash([])
      const rpos = { x: ox + (dx - ox) * t, y: oy }
      ctx.beginPath(); ctx.arc(rpos.x, rpos.y, 2, 0, Math.PI*2)
      ctx.fillStyle = 'rgba(168,85,247,0.35)'; ctx.fill()

      ;[{x:ox,y:oy},{x:dx,y:dy}].forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI*2)
        ctx.fillStyle = 'rgba(168,85,247,0.7)'; ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: 'clamp(200px, 28vw, 300px)', display: 'block', marginBottom: '48px', borderRadius: '4px' }} />
}
