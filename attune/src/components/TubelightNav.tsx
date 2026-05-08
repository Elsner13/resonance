'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

const navItems = [
  { label: 'Foundations', href: '/foundations' },
  { label: 'Coaching', href: '/coaching' },
  { label: 'About', href: '/about' },
  { label: 'Signal/Noise', href: 'https://findthesignal.substack.com', external: true },
]

export function TubelightNav() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const activeIndex = navItems.findIndex(item => !item.external && item.href === pathname)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<Array<HTMLAnchorElement | null>>([])
  const [indicatorStyle, setIndicatorStyle] = React.useState<{ left: number; width: number } | null>(null)
  const [isReady, setIsReady] = React.useState(false)

  const updateIndicator = React.useCallback(() => {
    const container = containerRef.current
    const activeItem = activeIndex >= 0 ? itemRefs.current[activeIndex] : null
    if (!container || !activeItem) return
    const containerRect = container.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()
    setIndicatorStyle({
      left: itemRect.left - containerRect.left,
      width: itemRect.width,
    })
    if (!isReady) setTimeout(() => setIsReady(true), 50)
  }, [activeIndex, isReady])

  React.useLayoutEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  const mobileItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    fontFamily: 'var(--font-montserrat-alternates)',
    fontSize: '11px',
    fontWeight: isActive ? 500 : 400,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: isActive ? '#000000' : 'rgba(0,0,0,0.38)',
    textDecoration: 'none',
    padding: '4px 8px',
  })

  if (isMobile) {
    return (
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(0,0,0,0.09)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: '10px',
          paddingBottom: 'max(14px, env(safe-area-inset-bottom))',
        }}
      >
        {navItems.map((item, index) => {
          const isActive = index === activeIndex
          const style = mobileItemStyle(isActive)
          const underline = isActive ? (
            <div style={{ width: '20px', height: '2px', background: '#000000', borderRadius: '9999px' }} />
          ) : null

          return item.external ? (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" style={style}>
              {item.label}
              {underline}
            </a>
          ) : (
            <Link key={item.href} href={item.href} style={style}>
              {item.label}
              {underline}
            </Link>
          )
        })}
      </nav>
    )
  }

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: '9999px',
          padding: '8px 8px',
        }}
      >
        {navItems.map((item, index) => {
          const isActive = index === activeIndex
          const sharedStyle: React.CSSProperties = {
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '12px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: isActive ? '#000000' : 'rgba(0,0,0,0.45)',
            textDecoration: 'none',
            padding: '6px 20px',
            borderRadius: '9999px',
            position: 'relative',
            zIndex: 10,
            transition: 'color 150ms',
            whiteSpace: 'nowrap',
            display: 'block',
          }

          return item.external ? (
            <a
              key={item.href}
              ref={el => { itemRefs.current[index] = el }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={sharedStyle}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.href}
              ref={el => { itemRefs.current[index] = el }}
              href={item.href}
              style={sharedStyle}
            >
              {item.label}
            </Link>
          )
        })}

        {indicatorStyle && activeIndex >= 0 && (
          <motion.div
            initial={false}
            animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'absolute',
              bottom: -5,
              height: 8,
              pointerEvents: 'none',
              opacity: isReady ? 1 : 0,
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: '3px',
              background: '#000000',
              borderRadius: '9999px',
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '8px',
              background: 'rgba(0,0,0,0.18)',
              borderRadius: '9999px',
              filter: 'blur(4px)',
            }} />
          </motion.div>
        )}
      </div>
    </nav>
  )
}
