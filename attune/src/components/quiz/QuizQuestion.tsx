'use client'

import { motion } from 'framer-motion'
import type { Question, ArchetypeKey } from './archetypes'

interface Props {
  question: Question
  selectedAnswer: ArchetypeKey | null
  onSelect: (archetype: ArchetypeKey) => void
}

export function QuizQuestion({ question, selectedAnswer, onSelect }: Props) {
  return (
    <div>
      {/* Question text */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-playfair)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
          fontWeight: 400,
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          color: '#F0F0F0',
          margin: '0 0 2.5rem',
        }}
      >
        {question.text}
      </motion.h2>

      {/* Answer options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {question.answers.map((answer, i) => {
          const isSelected = selectedAnswer === answer.archetype
          return (
            <motion.button
              key={answer.archetype}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelect(answer.archetype)}
              style={{
                textAlign: 'left',
                background: isSelected ? 'rgba(204,17,51,0.06)' : 'rgba(8,0,1,0.5)',
                border: `1px solid ${isSelected ? 'rgba(204,17,51,0.5)' : '#1a1a1a'}`,
                borderRadius: '2px',
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background 0.15s ease',
                fontFamily: 'var(--font-inter)',
                fontSize: '15px',
                lineHeight: 1.65,
                color: isSelected ? '#F0F0F0' : '#888888',
                width: '100%',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(204,17,51,0.3)'
                  e.currentTarget.style.color = '#F0F0F0'
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#1a1a1a'
                  e.currentTarget.style.color = '#888888'
                }
              }}
            >
              {answer.text}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
