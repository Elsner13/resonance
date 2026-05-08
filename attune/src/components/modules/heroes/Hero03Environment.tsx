'use client'
import { useEffect, useRef } from 'react'

interface LoopParticle { t: number; speed: number }

export default function Hero03Environment() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    let broken = false, raf = 0
    canvas.addEventListener('mouseenter', () => { broken = true })
    canvas.addEventListener('mouseleave', () => { broken = false })
    canvas.addEventListener('touchstart', () => { broken = true })
    canvas.addEventListener('touchend', () => { broken = false })

    const N = 18
    const particles: LoopParticle[] = Array.from({ length: N }, (_, i) => ({ t: i / N, speed: 0.003 + Math.random() * 0.001 }))

    const bezier = (t: number, p0: {x:number;y:number}, p1: {x:number;y:number}, p2: {x:number;y:number}, p3: {x:number;y:number}) => ({
      x: Math.pow(1-t,3)*p0.x + 3*Math.pow(1-t,2)*t*p1.x + 3*(1-t)*t*t*p2.x + Math.pow(t,3)*p3.x,
      y: Math.pow(1-t,3)*p0.y + 3*Math.pow(1-t,2)*t*p1.y + 3*(1-t)*t*t*p2.y + Math.pow(t,3)*p3.y,
    })

    if (reduced) {
      ctx.fillStyle = '#030d05'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2, cy = canvas.height / 2
      ctx.beginPath(); ctx.arc(cx * 0.3, cy, 20, 0, Math.PI*2); ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2; ctx.stroke()
      ctx.beginPath(); ctx.arc(cx * 1.7, cy, 20, 0, Math.PI*2); ctx.stroke()
      window.removeEventListener('resize', resize); return
    }

    const draw = () => {
      const W = canvas.width, H = canvas.height
      const you = { x: W * 0.22, y: H * 0.5 }
      const env = { x: W * 0.78, y: H * 0.5 }

      ctx.fillStyle = 'rgba(3,13,5,0.25)'
      ctx.fillRect(0, 0, W, H)

      const pulse = 0.6 + 0.4 * Math.sin(Date.now() * 0.002)
      const nodeBrightness = broken ? 0.25 : 0.85

      ;[{ node: you, label: 'You' }, { node: env, label: 'Environment' }].forEach(({ node, label }) => {
        ctx.beginPath(); ctx.arc(node.x, node.y, 18 + pulse * 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,197,94,${nodeBrightness * 0.12 * pulse})`; ctx.fill()
        ctx.beginPath(); ctx.arc(node.x, node.y, 16, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(34,197,94,${nodeBrightness})`; ctx.lineWidth = 1.5; ctx.stroke()
        ctx.fillStyle = `rgba(34,197,94,${nodeBrightness})`
        ctx.font = '10px sans-serif'; ctx.textAlign = 'center'
        ctx.fillText(label, node.x, node.y + 34)
      })

      if (!broken) {
        particles.forEach(p => {
          p.t = (p.t + p.speed) % 1
          let pos: {x:number;y:number}
          if (p.t < 0.5) {
            const lt = p.t * 2
            pos = bezier(lt, env, { x: env.x, y: H * 0.15 }, { x: you.x, y: H * 0.15 }, you)
          } else {
            const lt = (p.t - 0.5) * 2
            pos = bezier(lt, you, { x: you.x, y: H * 0.85 }, { x: env.x, y: H * 0.85 }, env)
          }
          ctx.beginPath(); ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(34,197,94,0.8)`; ctx.fill()
        })
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: 'clamp(200px, 28vw, 300px)', display: 'block', marginBottom: '48px', borderRadius: '4px', cursor: 'pointer' }} />
}
