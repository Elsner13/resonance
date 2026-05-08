# Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all public pages on attunemastery.com look correct on mobile devices (≥320px) — fixing the nav overflow, small text, and undersized logos.

**Architecture:** Single `640px` breakpoint. A shared `useIsMobile()` hook (SSR-safe, `useState` + `useEffect`) drives conditional rendering. TubelightNav renders a full-width bottom strip on mobile and the existing pill on desktop. Font-size `clamp()` floors are raised to legible minimums. No new dependencies.

**Tech Stack:** Next.js 16, React, TypeScript, inline React styles, framer-motion (TubelightNav desktop only)

**Spec:** `docs/superpowers/specs/2026-03-30-mobile-responsiveness-design.md`

---

### Task 1: Create shared `useIsMobile` hook

**Files:**
- Create: `src/hooks/useIsMobile.ts`

- [ ] **Create the hook file**

```typescript
// src/hooks/useIsMobile.ts
'use client'

import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint = 640): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return isMobile
}
```

- [ ] **Verify TypeScript compiles**

```bash
cd /Users/samelsner/attune && npx tsc --noEmit
```

Expected: no errors related to the new file.

- [ ] **Commit**

```bash
git add src/hooks/useIsMobile.ts
git commit -m "Add useIsMobile hook for responsive layouts"
```

---

### Task 2: Update TubelightNav — mobile full-width bar

**Files:**
- Modify: `src/components/TubelightNav.tsx`

The existing pill nav and tubelight animation stay intact for desktop. On mobile, a full-width frosted strip replaces it. Both branches share `navItems` and `activeIndex`.

- [ ] **Replace the full contents of `TubelightNav.tsx`**

```tsx
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
```

- [ ] **Verify build**

```bash
cd /Users/samelsner/attune && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Commit**

```bash
git add src/components/TubelightNav.tsx
git commit -m "TubelightNav: full-width bottom bar on mobile, pill unchanged on desktop"
```

---

### Task 3: Fix homepage — font floors + nav clearance

**Files:**
- Modify: `src/app/page.tsx`

Three changes: raise body text floor (10px → 15px), headline floor (12px → 16px), CTA button floor (10px → 12px), sign-in link floor (9px → 11px), add `paddingBottom: 80px` to outer container so content clears the mobile nav.

- [ ] **Update `src/app/page.tsx`**

The outer `div` gains `paddingBottom: 80px`. Four `clamp()` minimums are raised. Change only the values shown — everything else stays the same.

```tsx
// Outer container — add paddingBottom
<div
  style={{
    position: 'fixed',
    inset: 0,
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '80px',   // ← add this line
  }}
>
```

```tsx
// Headline — was clamp(12px, 1.4vw, 24px)
fontSize: 'clamp(16px, 1.4vw, 24px)',
```

```tsx
// Body paragraph — was clamp(10px, 1vw, 16px)
fontSize: 'clamp(15px, 1vw, 16px)',
```

```tsx
// CTA button anchor — was clamp(10px, 1vw, 14px)
fontSize: 'clamp(12px, 1vw, 14px)',
```

```tsx
// "Already a member?" sign-in link — was clamp(9px, 0.85vw, 12px)
fontSize: 'clamp(11px, 0.85vw, 12px)',
```

- [ ] **Verify build**

```bash
cd /Users/samelsner/attune && npm run build 2>&1 | tail -10
```

Expected: no errors.

- [ ] **Commit**

```bash
git add src/app/page.tsx
git commit -m "Homepage: raise mobile font floors, add nav clearance padding"
```

---

### Task 4: Fix Foundations page — font floors + nav clearance

**Files:**
- Modify: `src/app/foundations/page.tsx`

Same pattern as homepage: raise clamp floors, add paddingBottom to container.

- [ ] **Update `src/app/foundations/page.tsx`**

```tsx
// Outer container — add paddingBottom
<div
  style={{
    position: 'fixed',
    inset: 0,
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '80px',   // ← add this line
  }}
>
```

```tsx
// Headline — was clamp(12px, 1.4vw, 24px)
fontSize: 'clamp(16px, 1.4vw, 24px)',
```

```tsx
// Body paragraph — was clamp(10px, 1vw, 16px)
fontSize: 'clamp(15px, 1vw, 16px)',
```

```tsx
// "Enroll" CTA button — was clamp(10px, 1vw, 14px)
fontSize: 'clamp(12px, 1vw, 14px)',
```

```tsx
// "Already enrolled? Sign in" link — was clamp(9px, 0.85vw, 12px)
fontSize: 'clamp(11px, 0.85vw, 12px)',
```

- [ ] **Verify build**

```bash
cd /Users/samelsner/attune && npm run build 2>&1 | tail -10
```

- [ ] **Commit**

```bash
git add src/app/foundations/page.tsx
git commit -m "Foundations: raise mobile font floors, add nav clearance padding"
```

---

### Task 5: Fix About page — font floors + nav clearance

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Update `src/app/about/page.tsx`**

The outer `div` currently has all styles inline on one line. Add `paddingBottom: '80px'` to the existing style object, and update the three `clamp()` values:

```tsx
// Outer container — add paddingBottom: '80px' to the existing style object
<div style={{ position: 'fixed', inset: 0, background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '80px' }}>
```

```tsx
// Headline — was clamp(12px, 1.4vw, 24px)
fontSize: 'clamp(16px, 1.4vw, 24px)',
```

```tsx
// Body paragraph — was clamp(10px, 1vw, 16px)
fontSize: 'clamp(15px, 1vw, 16px)',
```

```tsx
// "Read Signal/Noise" button — was clamp(10px, 1vw, 14px)
fontSize: 'clamp(12px, 1vw, 14px)',
```

- [ ] **Verify build**

```bash
cd /Users/samelsner/attune && npm run build 2>&1 | tail -10
```

- [ ] **Commit**

```bash
git add src/app/about/page.tsx
git commit -m "About: raise mobile font floors, add nav clearance padding"
```

---

### Task 6: Fix Coaching page — logo size + headline floor

**Files:**
- Modify: `src/app/coaching/page.tsx`

Two changes: logo `min(140px, 14vw)` → `min(140px, max(80px, 14vw))`, headline floor 14px → 16px.

- [ ] **Update `src/app/coaching/page.tsx`**

```tsx
// Logo Link — was width: 'min(140px, 14vw)'
<Link
  href="/"
  style={{
    position: 'relative',
    width: 'min(140px, max(80px, 14vw))',   // ← updated
    aspectRatio: '1 / 1',
    marginBottom: '56px',
    display: 'block',
  }}
>
```

```tsx
// Page headline — was clamp(14px, 1.6vw, 26px)
fontSize: 'clamp(16px, 1.6vw, 26px)',
```

- [ ] **Verify build**

```bash
cd /Users/samelsner/attune && npm run build 2>&1 | tail -10
```

- [ ] **Commit**

```bash
git add src/app/coaching/page.tsx
git commit -m "Coaching: fix logo min-size and headline font floor on mobile"
```

---

### Task 7: Fix Apply page — logo size + font floors

**Files:**
- Modify: `src/app/apply/page.tsx`

Same logo fix as coaching. Also raise headline and body text floors.

- [ ] **Update `src/app/apply/page.tsx`**

```tsx
// Logo Link — was width: 'min(140px, 14vw)'
<Link
  href="/"
  style={{
    position: 'relative',
    width: 'min(140px, max(80px, 14vw))',   // ← updated
    aspectRatio: '1 / 1',
    marginBottom: '56px',
    display: 'block',
  }}
>
```

```tsx
// "Before we talk." headline — was clamp(12px, 1.4vw, 22px)
fontSize: 'clamp(16px, 1.4vw, 22px)',
```

```tsx
// Pre-form qualifier paragraph — was clamp(10px, 1vw, 15px)
fontSize: 'clamp(14px, 1vw, 15px)',
```

- [ ] **Verify build**

```bash
cd /Users/samelsner/attune && npm run build 2>&1 | tail -10
```

- [ ] **Commit**

```bash
git add src/app/apply/page.tsx
git commit -m "Apply: fix logo min-size and raise mobile font floors"
```

---

### Task 8: CompleteButton — full-width on mobile

**Files:**
- Modify: `src/app/dashboard/[slug]/CompleteButton.tsx`

On mobile, the Mark Complete / Next Module / Back to Dashboard buttons become full-width for easier tapping. Uses `useIsMobile()`.

- [ ] **Update `src/app/dashboard/[slug]/CompleteButton.tsx`**

Add the import and hook at the top, then add `width` and `boxSizing` to each button's style:

```tsx
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
```

- [ ] **Verify build**

```bash
cd /Users/samelsner/attune && npm run build 2>&1 | tail -10
```

Expected: `✓ Compiled successfully`.

- [ ] **Commit**

```bash
git add src/app/dashboard/[slug]/CompleteButton.tsx
git commit -m "CompleteButton: full-width on mobile for better tap target"
```

---

### Task 9: Final verification + push

- [ ] **Clean build**

```bash
cd /Users/samelsner/attune && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`, no TypeScript errors, no warnings about missing exports.

- [ ] **Spot-check in browser at 375px**

Start dev server and open Chrome DevTools → toggle device toolbar → iPhone SE (375×667):

```bash
cd /Users/samelsner/attune && npm run dev
```

Check each page:
- `/` — text readable, content above nav, CTA visible
- `/foundations` — same
- `/about` — same
- `/coaching` — logo ≥80px, text readable
- `/apply` — logo ≥80px, text readable
- Nav on all pages — full-width strip, items spread evenly, active underline shows
- `/dashboard/module-1` — CompleteButton full-width, no overflow

- [ ] **Push to main**

```bash
git push origin main
```
