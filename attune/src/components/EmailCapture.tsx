'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Kit form action — stubbed
    const form = e.currentTarget as HTMLFormElement
    form.submit()
  }

  return (
    <div>
      <form
        action="https://app.kit.com/forms/PLACEHOLDER/subscriptions"
        method="post"
        onSubmit={handleSubmit}
        style={{ display: 'flex', maxWidth: '420px' }}
      >
        <input
          type="email"
          name="email_address"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            flex: 1,
            background: '#111111',
            border: '0.5px solid #2a2a2a',
            borderRight: 'none',
            borderRadius: 0,
            padding: '12px 16px',
            color: '#F0F0F0',
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            background: '#CC1133',
            border: 'none',
            borderRadius: 0,
            padding: '12px 20px',
            color: '#000000',
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'background 150ms',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#AA0F28'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#CC1133'
          }}
        >
          Enter →
        </button>
      </form>
      <p
        style={{
          marginTop: '10px',
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          color: '#333333',
          letterSpacing: '0.05em',
        }}
      >
        Weekly signal. No noise.
      </p>
    </div>
  )
}
