// src/components/LoadingScreen.tsx
'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = ['Understand.', 'Practice.', 'Attune.']

interface Props {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 2700

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCount(100)
        setTimeout(onComplete, 400)
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % WORDS.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Top-left label */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 3vw, 2.5rem)',
          left: 'clamp(1.5rem, 5vw, 4rem)',
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#555555',
          margin: 0,
        }}
      >
        ATTUNE
      </motion.p>

      {/* Center: cycling word */}
      <div style={{ textAlign: 'center', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-playfair)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'rgba(240,240,240,0.75)',
              margin: 0,
            }}
          >
            {WORDS[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom-right: counter */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          right: 'clamp(1.5rem, 5vw, 4rem)',
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 400,
          lineHeight: 1,
          color: '#F0F0F0',
          margin: 0,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(count).padStart(3, '0')}
      </motion.p>

      {/* Bottom progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'rgba(26,26,26,0.5)',
      }}>
        <motion.div
          animate={{ scaleX: count / 100 }}
          style={{
            height: '100%',
            background: '#CC1133',
            transformOrigin: 'left',
            boxShadow: '0 0 8px rgba(204,17,51,0.35)',
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  )
}
