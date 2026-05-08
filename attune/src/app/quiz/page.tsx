// src/app/quiz/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnerQuiz } from '@/components/quiz/LearnerQuiz'

export const metadata: Metadata = {
  title: 'Find Your Learner Archetype',
  description:
    'Eight questions. Discover whether you are an Epistemic, Techne, Phronetic, or Noetic learner — and what methods will actually work for you.',
}

export default function QuizPage() {
  return (
    <main style={{ background: '#000000', minHeight: '100vh', color: '#F0F0F0' }}>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px clamp(1.5rem, 5vw, 4rem)',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
      }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#555555',
            textDecoration: 'none',
          }}
        >
          ATTUNE
        </Link>
        <Link
          href="/"
          aria-label="Close quiz"
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#555555',
            textDecoration: 'none',
          }}
        >
          ← Back
        </Link>
      </header>

      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: 'clamp(8rem, 15vw, 12rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)',
      }}>
        <LearnerQuiz />
      </div>
    </main>
  )
}
