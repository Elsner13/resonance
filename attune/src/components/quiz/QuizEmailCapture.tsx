// src/components/quiz/QuizEmailCapture.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onSubmit: (firstName: string, email: string) => void
  isLoading: boolean
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #1a1a1a',
  fontFamily: 'var(--font-inter)',
  fontSize: '16px',
  color: '#F0F0F0',
  padding: '12px 0',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  marginBottom: '2rem',
}

export function QuizEmailCapture({ onSubmit, isLoading }: Props) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [firstNameFocused, setFirstNameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!firstName.trim() || !email.trim()) return
    onSubmit(firstName.trim(), email.trim())
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-montserrat-alternates)',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#CC1133',
          margin: '0 0 1.5rem',
        }}
      >
        Your archetype is ready.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-playfair)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#F0F0F0',
          margin: '0 0 1.25rem',
        }}
      >
        Where should we send your full breakdown?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '15px',
          lineHeight: 1.78,
          color: '#888888',
          margin: '0 0 2.5rem',
          maxWidth: '480px',
        }}
      >
        You&apos;ll see your result immediately. Your PDF profile — with the specific
        methods, theories, and frameworks built for your archetype — arrives in your inbox.
      </motion.p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '420px' }}>
        <label style={{ display: 'block', fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#555555', marginBottom: '8px' }}>
          First name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="Your first name"
          required
          style={{
            ...inputStyle,
            borderBottomColor: firstNameFocused ? '#CC1133' : '#1a1a1a',
          }}
          onFocus={() => setFirstNameFocused(true)}
          onBlur={() => setFirstNameFocused(false)}
        />

        <label style={{ display: 'block', fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#555555', marginBottom: '8px' }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            ...inputStyle,
            borderBottomColor: emailFocused ? '#CC1133' : '#1a1a1a',
          }}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />

        <button
          type="submit"
          disabled={isLoading || !firstName.trim() || !email.trim()}
          style={{
            display: 'inline-block',
            background: isLoading ? '#555555' : '#CC1133',
            color: '#ffffff',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding: '15px 36px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(204,17,51,0.4)'
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {isLoading ? 'Sending...' : 'Reveal my archetype \u2192'}
        </button>

        <p style={{ fontFamily: 'var(--font-montserrat-alternates)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555555', marginTop: '1.25rem' }}>
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </motion.div>
  )
}
