'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fontBase = 'var(--font-montserrat-alternates)'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: fontBase,
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.1em',
  color: '#000000',
  textTransform: 'uppercase',
  marginBottom: '6px',
}

const sublabelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: fontBase,
  fontSize: '11px',
  letterSpacing: '0.01em',
  textTransform: 'none',
  color: '#999999',
  marginTop: '2px',
  marginBottom: '10px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: fontBase,
  fontSize: '14px',
  color: '#000000',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #d0d0d0',
  padding: '8px 0',
  outline: 'none',
  letterSpacing: '0.01em',
}

const textareaStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: fontBase,
  fontSize: '14px',
  color: '#000000',
  background: 'transparent',
  border: '1px solid #d0d0d0',
  padding: '12px 14px',
  outline: 'none',
  resize: 'none',
  letterSpacing: '0.01em',
  lineHeight: 1.7,
  boxSizing: 'border-box',
}

const fieldStyle: React.CSSProperties = { marginBottom: '36px' }

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div>
        <p style={{
          fontFamily: fontBase,
          fontSize: 'clamp(12px, 1.4vw, 20px)',
          fontWeight: 400,
          letterSpacing: '0.02em',
          color: '#000000',
          textTransform: 'uppercase',
          marginBottom: '14px',
        }}>
          Got it.
        </p>
        <p style={{
          fontFamily: fontBase,
          fontSize: '14px',
          color: '#555555',
          lineHeight: 1.85,
          letterSpacing: '0.01em',
        }}>
          I read every application personally. If it&apos;s a fit, I&apos;ll reach out within a few days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {/* Name + Email row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Name</label>
          <input name="name" required autoComplete="name" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" required autoComplete="email" style={inputStyle} />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>What are you working on right now?</label>
        <span style={sublabelStyle}>Not the category. The actual thing.</span>
        <textarea name="working_on" required rows={4} style={textareaStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>What have you already tried?</label>
        <span style={sublabelStyle}>What hasn&apos;t worked, and what has.</span>
        <textarea name="tried" required rows={4} style={textareaStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>What changes if this actually works?</label>
        <span style={sublabelStyle}>The real answer, not the polished one.</span>
        <textarea name="outcome" required rows={4} style={textareaStyle} />
      </div>

      <div style={{ ...fieldStyle, marginBottom: '44px' }}>
        <label style={{ ...labelStyle, color: '#888888' }}>
          Anything else I should know?{' '}
          <span style={{ textTransform: 'none', letterSpacing: '0.01em' }}>(optional)</span>
        </label>
        <textarea name="other" rows={3} style={textareaStyle} />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          fontFamily: fontBase,
          fontSize: '12px',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: status === 'submitting' ? '#999999' : '#000000',
          background: 'transparent',
          border: `1px solid ${status === 'submitting' ? '#cccccc' : '#000000'}`,
          padding: '10px 28px',
          cursor: status === 'submitting' ? 'default' : 'pointer',
        }}
      >
        {status === 'submitting' ? 'Sending...' : 'Send my application'}
      </button>

      {status === 'error' && (
        <p style={{
          fontFamily: fontBase,
          fontSize: '12px',
          letterSpacing: '0.05em',
          color: '#cc1133',
          marginTop: '16px',
        }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  )
}
