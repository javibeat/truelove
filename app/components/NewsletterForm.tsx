'use client'

import { useState } from 'react'
import { P, E, F, INK, RED, FADE, RULE } from '../lib/constants'

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
    <div style={{ border: `4px double ${INK}`, padding: '32px', textAlign: 'center' }}>
      <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase', color: RED, marginBottom: '8px' }}>
        THE GAZETTE DISPATCH
      </p>
      <h2 style={{ fontFamily: P, fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 900, color: INK, lineHeight: 1.1, marginBottom: '8px' }}>
        Design insights, straight to your inbox.
      </h2>
      <p style={{ fontFamily: F, fontSize: '0.95rem', fontStyle: 'italic', color: FADE, maxWidth: '480px', margin: '0 auto 20px' }}>
        No spam. No fluff. Just honest thoughts on design, branding, and building things that last. Unsubscribe anytime.
      </p>

      {status === 'success' ? (
        <div style={{ padding: '16px', border: `1px solid ${RULE}`, background: 'rgba(26,18,8,0.02)' }}>
          <p style={{ fontFamily: P, fontSize: '1.1rem', fontWeight: 700, color: INK }}>{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0', justifyContent: 'center', maxWidth: '460px', margin: '0 auto', flexWrap: 'wrap' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            style={{ flex: '1', minWidth: '200px', fontFamily: F, fontSize: '14px', padding: '12px 14px', border: `1px solid ${INK}`, borderRight: 'none', background: 'transparent', color: INK, outline: 'none', boxSizing: 'border-box' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', background: INK, color: '#F4EFE0', padding: '12px 24px', border: `1px solid ${INK}`, cursor: status === 'loading' ? 'wait' : 'pointer', whiteSpace: 'nowrap', opacity: status === 'loading' ? 0.7 : 1 }}
          >
            {status === 'loading' ? 'Sending...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p style={{ fontFamily: F, fontSize: '0.85rem', color: RED, marginTop: '12px' }}>{message}</p>
      )}
    </div>
  )
}
