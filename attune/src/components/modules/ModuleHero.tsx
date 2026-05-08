// src/components/modules/ModuleHero.tsx
'use client'
import type React from 'react'
import dynamic from 'next/dynamic'

const heroes: Record<string, React.ComponentType> = {
  'module-1': dynamic(() => import('./heroes/Hero01WrongProblem')),
  'module-2': dynamic(() => import('./heroes/Hero02SkillHappens')),
  'module-3': dynamic(() => import('./heroes/Hero03Environment')),
  'module-4': dynamic(() => import('./heroes/Hero04Constraints')),
  'module-5': dynamic(() => import('./heroes/Hero05Repetition')),
  'module-6': dynamic(() => import('./heroes/Hero06Bowl')),
  'module-7': dynamic(() => import('./heroes/Hero07Representative')),
  'module-8': dynamic(() => import('./heroes/Hero08PerceptualShift')),
}

export default function ModuleHero({ slug }: { slug: string }) {
  const Hero = heroes[slug]
  if (!Hero) return null
  return <Hero />
}
