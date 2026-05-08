'use client'
import { useEffect, useRef } from 'react'

interface Particle { x: number; y: number; vx: number; vy: number; tx: number; ty: number }

export default function Hero02SkillHappens() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    const cols = 8, rows = 5
    const targets: {x:number;y:number}[] = []
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        targets.push({ x: (c + 1) * canvas.width / (cols + 1), y: (r + 1) * canvas.height / (rows + 1) })

    const particles: Particle[] = targets.map(t => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
      tx: t.x, ty: t.y,
    }))

    if (reduced) {
      ctx.fillStyle = '#020d10'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { ctx.beginPath(); ctx.arc(p.tx, p.ty, 2.5, 0, Math.PI*2); ctx.fillStyle = '#22d3ee'; ctx.fill() })
      window.removeEventListener('resize', resize); return
    }

    let elapsed = 0, last = performance.now(), raf = 0
    const CYCLE = 7000

    const draw = (now: number) => {
      if (document.visibilityState === 'hidden') { raf = requestAnimationFrame(draw); return }
      const dt = Math.min(now - last, 50); last = now; elapsed += dt
      if (elapsed > CYCLE) {
        elapsed = 0
        particles.forEach(p => { p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height; p.vx = (Math.random()-0.5)*2; p.vy = (Math.random()-0.5)*2 })
      }

      const snapAt = 4800
      const snapped = elapsed > snapAt

      ctx.fillStyle = 'rgba(2,13,16,0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        if (!snapped) {
          const attractStrength = elapsed < 3500 ? 0 : Math.min((elapsed - 3500) / 1300, 1) * 0.018
          const dx = p.tx - p.x, dy = p.ty - p.y, dist = Math.sqrt(dx*dx+dy*dy)+0.1
          p.vx += (dx/dist)*attractStrength; p.vy += (dy/dist)*attractStrength
          p.vx += (Math.random()-0.5)*0.3; p.vy += (Math.random()-0.5)*0.3
          p.vx *= 0.94; p.vy *= 0.94
          p.x += p.vx; p.y += p.vy
        } else {
          p.x += (p.tx - p.x) * 0.15; p.y += (p.ty - p.y) * 0.15
        }

        const alpha = snapped ? 0.9 : 0.45 + Math.random() * 0.15
        const radius = snapped ? 2.5 : 1.8
        ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI*2)
        ctx.fillStyle = `rgba(34,211,238,${alpha})`; ctx.fill()
      })

      if (elapsed > snapAt && elapsed < snapAt + 200) {
        ctx.fillStyle = `rgba(34,211,238,${0.12 * (1 - (elapsed - snapAt) / 200)})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: 'clamp(200px, 28vw, 300px)', display: 'block', marginBottom: '48px', borderRadius: '4px' }} />
}
