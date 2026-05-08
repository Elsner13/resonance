'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Foundations', href: '/foundations' },
  { label: 'Coaching', href: '/coaching' },
  { label: 'About', href: '/about' },
  { label: 'Signal/Noise', href: 'https://findthesignal.substack.com', external: true },
]

const MARQUEE_TEXT = 'LEARN SMARTER • NOT HARDER • CHANGE THE CONDITIONS • '

export function SiteFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.attune-marquee-track', {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1,
      })
    }, marqueeRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer>
      {/* Marquee band */}
      <div
        ref={marqueeRef}
        style={{
          borderTop: '1px solid #1a1a1a',
          padding: '1.5rem 0',
          overflow: 'hidden',
        }}
      >
        <div
          className="attune-marquee-track"
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            width: 'max-content',
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-montserrat-alternates)',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#333333',
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Original footer content */}
      <div
        style={{
          padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 7vw, 8rem)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25rem 0',
          }}
        >
          {navLinks.map((link, i) => (
            <span key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} style={linkStyle}>
                  {link.label}
                </Link>
              )}
              {i < navLinks.length - 1 && (
                <span
                  style={{
                    fontFamily: 'var(--font-montserrat-alternates)',
                    fontSize: '10px',
                    color: 'rgba(240,240,240,0.15)',
                    margin: '0 0.75rem',
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </nav>

        <p
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'rgba(240,240,240,0.2)',
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Attune
        </p>
      </div>
    </footer>
  )
}

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat-alternates)',
  fontSize: '10px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(240,240,240,0.30)',
  textDecoration: 'none',
}
