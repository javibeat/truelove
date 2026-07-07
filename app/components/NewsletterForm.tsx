'use client'

import { useState } from 'react'
import { LOVE } from '../lib/constants'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('You are in. Welcome to the dispatch.')
        setEmail('')
      } else {
        const data = await res.json()
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  return (
    <div style={{ borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: 'clamp(28px,4vw,40px) 0' }}>
      <h2 className="display" style={{ fontSize: 'clamp(1.3rem,2.4vw,1.8rem)', marginBottom: '10px' }}>
        Design insights, straight to your inbox<span style={{ color: LOVE }}>.</span>
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--muted)', maxWidth: '480px', marginBottom: '24px', lineHeight: 1.7 }}>
        No spam. No fluff. Just honest thoughts on design, branding, and building things that last. Unsubscribe anytime.
      </p>

      {status === 'success' ? (
        <p style={{ fontSize: '16px', fontWeight: 600 }}>{message}</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '480px', flexWrap: 'wrap' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-label="Email address"
            placeholder="your@email.com"
            className="field field-on-white"
            style={{ flex: 1, minWidth: '200px' }}
          />
          <button type="submit" disabled={status === 'loading'} className="btn btn-dark" style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
            {status === 'loading' ? 'Sending…' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p style={{ fontSize: '14px', color: LOVE, marginTop: '12px' }}>{message}</p>
      )}
    </div>
  )
}
