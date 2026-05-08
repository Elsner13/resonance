// src/components/marketing/HeroSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export function HeroSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .fromTo(line1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, 0.5)
        .fromTo(line2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, 0.68)
        .fromTo(line3Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, 0.86)
        .fromTo(ruleRef.current, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.6 }, 1.3)
        .fromTo(bodyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.5)
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.8)
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.2)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 7vw, 8rem)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '900px' }}>
        <p
          ref={eyebrowRef}
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(240,240,240,0.35)',
            margin: '0 0 2.5rem',
            opacity: 0,
          }}
        >
          Sam Elsner
        </p>

        <h1 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
          fontWeight: 400,
          lineHeight: 0.92,
          letterSpacing: '-0.03em',
          color: '#F0F0F0',
          margin: 0,
          padding: 0,
        }}>
          <span ref={line1Ref} style={{ display: 'block', opacity: 0 }}>You were never behind.</span>
          <span ref={line2Ref} style={{ display: 'block', opacity: 0 }}>You were in the</span>
          <span ref={line3Ref} style={{ display: 'block', opacity: 0 }}>
            <span style={{ color: '#CC1133' }}>wrong</span> environment.
          </span>
        </h1>

        <div
          ref={ruleRef}
          style={{ width: '48px', height: '1px', background: '#CC1133', margin: '2.75rem 0', transform: 'scaleX(0)', transformOrigin: 'left' }}
        />

        <p
          ref={bodyRef}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(15px, 1.1vw, 18px)',
            lineHeight: 1.78,
            color: 'rgba(240,240,240,0.65)',
            maxWidth: '480px',
            margin: '0 0 2.5rem',
            opacity: 0,
          }}
        >
          Attune is not a program. It&apos;s a shift in how you see what&apos;s actually happening.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem', opacity: 0 }}>
          <Link
            href="/quiz"
            style={{
              display: 'inline-block',
              background: '#CC1133',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '15px 36px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(204,17,51,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Find your learner type →
          </Link>
          <Link
            href="/sign-in"
            style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(240,240,240,0.35)',
              textDecoration: 'none',
            }}
          >
            Already enrolled? Sign in
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          opacity: 0,
        }}
      >
        <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#555555', margin: 0 }}>
          SCROLL
        </p>
        <div style={{ width: '1px', height: '40px', background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#CC1133',
            animation: 'scroll-down 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}
