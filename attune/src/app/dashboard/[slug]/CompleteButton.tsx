'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'

interface CompleteButtonProps {
  slug: string
  isCompleted: boolean
  nextSlug: string | null
}

export default function CompleteButton({ slug, isCompleted, nextSlug }: CompleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(isCompleted)
  const isMobile = useIsMobile()

  const mobileFullWidth = isMobile
    ? { width: '100%' as const, boxSizing: 'border-box' as const }
    : {}

  async function handleComplete() {
    if (done || loading) return
    setLoading(true)
    try {
      await fetch('/api/complete-module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      setDone(true)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  function handleNext() {
    if (nextSlug) {
      router.push(`/dashboard/${nextSlug}`)
    } else {
      router.push('/dashboard')
    }
  }

  if (done) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: isMobile ? '100%' : 'auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#999999',
          }}
        >
          <div
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              background: '#000000',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <polyline
                points="1,3 3,5 7,1"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Complete
        </div>

        {nextSlug && (
          <button
            onClick={handleNext}
            style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '10px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#000000',
              textDecoration: 'none',
              border: '1px solid #000000',
              background: 'transparent',
              padding: '10px 28px',
              cursor: 'pointer',
              ...mobileFullWidth,
            }}
          >
            Next Module →
          </button>
        )}

        {!nextSlug && (
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '10px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#000000',
              textDecoration: 'none',
              border: '1px solid #000000',
              background: 'transparent',
              padding: '10px 28px',
              cursor: 'pointer',
              ...mobileFullWidth,
            }}
          >
            Back to Dashboard
          </button>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={handleComplete}
      disabled={loading}
      style={{
        fontFamily: 'var(--font-montserrat-alternates)',
        fontSize: '10px',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: loading ? '#999999' : '#000000',
        border: `1px solid ${loading ? '#cccccc' : '#000000'}`,
        background: 'transparent',
        padding: '10px 28px',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 150ms',
        ...mobileFullWidth,
      }}
    >
      {loading ? 'Saving...' : 'Mark Complete'}
    </button>
  )
}
