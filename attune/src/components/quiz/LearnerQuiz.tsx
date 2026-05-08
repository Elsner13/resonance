// src/components/quiz/LearnerQuiz.tsx
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { QUESTIONS, calculateArchetype, getScores } from './archetypes'
import type { ArchetypeKey } from './archetypes'
import { QuizQuestion } from './QuizQuestion'
import { QuizEmailCapture } from './QuizEmailCapture'
import { QuizResults } from './QuizResults'

type Step = { type: 'question'; index: number } | { type: 'email' } | { type: 'results' }

interface State {
  answers: (ArchetypeKey | null)[]
  step: Step
  email: string
  archetype: ArchetypeKey | null
  isLoading: boolean
  direction: 1 | -1
}

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({ x: direction > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -48 : 48, opacity: 0 }),
}

export function LearnerQuiz() {
  const [state, setState] = useState<State>({
    answers: Array(8).fill(null),
    step: { type: 'question', index: 0 },
    email: '',
    archetype: null,
    isLoading: false,
    direction: 1,
  })

  const progressValue =
    state.step.type === 'question'
      ? state.step.index / 9
      : state.step.type === 'email'
      ? 8 / 9
      : 1

  function handleAnswer(archetype: ArchetypeKey) {
    if (state.step.type !== 'question') return
    const index = state.step.index
    const newAnswers = [...state.answers]
    newAnswers[index] = archetype

    setState(prev => ({ ...prev, answers: newAnswers }))

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        direction: 1,
        step: index < 7 ? { type: 'question', index: index + 1 } : { type: 'email' },
      }))
    }, 280)
  }

  async function handleEmailSubmit(firstName: string, email: string) {
    setState(prev => ({ ...prev, isLoading: true }))
    const archetype = calculateArchetype(state.answers)
    const scores = getScores(state.answers)

    try {
      await fetch('/api/quiz-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, archetype, scores }),
      })
    } catch (err) {
      console.error('[LearnerQuiz] API call failed:', err)
    }

    setState(prev => ({
      ...prev,
      email,
      archetype,
      isLoading: false,
      direction: 1,
      step: { type: 'results' },
    }))
  }

  const stepKey =
    state.step.type === 'question' ? `q-${state.step.index}` : state.step.type

  return (
    <div style={{ width: '100%' }}>
      {/* Progress bar — hidden on results */}
      {state.step.type !== 'results' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: '#1a1a1a', zIndex: 10 }}>
          <motion.div
            animate={{ width: `${progressValue * 100}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '100%', background: '#CC1133' }}
          />
        </div>
      )}

      {/* Step counter */}
      {state.step.type === 'question' && (
        <p style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#555555',
          margin: '0 0 2rem',
        }}>
          0{state.step.index + 1} / 08
        </p>
      )}

      {/* Animated step content */}
      <AnimatePresence mode="wait" custom={state.direction}>
        <motion.div
          key={stepKey}
          custom={state.direction}
          variants={SLIDE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {state.step.type === 'question' && (
            <QuizQuestion
              question={QUESTIONS[state.step.index]}
              selectedAnswer={state.answers[state.step.index]}
              onSelect={handleAnswer}
            />
          )}
          {state.step.type === 'email' && (
            <QuizEmailCapture onSubmit={handleEmailSubmit} isLoading={state.isLoading} />
          )}
          {state.step.type === 'results' && state.archetype && (
            <QuizResults archetype={state.archetype} email={state.email} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
