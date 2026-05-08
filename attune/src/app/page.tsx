'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LoadingScreen } from '@/components/LoadingScreen'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ProblemSection } from '@/components/marketing/ProblemSection'
import { QuizSection } from '@/components/marketing/QuizSection'
import { FoundationsSection } from '@/components/marketing/FoundationsSection'
import { StatsSection } from '@/components/marketing/StatsSection'
import { CoachingSection } from '@/components/marketing/CoachingSection'
import { SignalSection } from '@/components/marketing/SignalSection'
import { SiteFooter } from '@/components/SiteFooter'
import { TubelightNav } from '@/components/TubelightNav'

const SESSION_KEY = 'attune_loaded'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem(SESSION_KEY)
    if (!hasLoaded) {
      setIsLoading(true)
    }
  }, [])

  function handleLoadComplete() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setIsLoading(false)
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <main style={{ background: '#000000', minHeight: '100vh', paddingBottom: '100px' }}>
        <HeroSection />
        <ProblemSection />
        <QuizSection />
        <FoundationsSection />
        <StatsSection />
        <CoachingSection />
        <SignalSection />
        <SiteFooter />
        <TubelightNav />
      </main>
    </>
  )
}
