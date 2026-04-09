'use client'

import Link from 'next/link'
import { P, E, F, INK, RED, FADE, PAPER } from './lib/constants'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
      <header style={{ padding: '24px 0 12px', textAlign: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: P, fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 900, color: INK }}>
            True Love <em style={{ color: RED }}>Creative</em>
          </span>
        </Link>
        <div className="rule-h2" style={{ marginTop: '12px' }} />
      </header>

      <div style={{ textAlign: 'center', padding: '64px 0' }}>
        <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase', color: FADE, marginBottom: '12px' }}>
          TECHNICAL DIFFICULTIES
        </p>
        <h1 style={{ fontFamily: P, fontSize: 'clamp(2.5rem,8vw,5rem)', fontWeight: 900, color: INK, lineHeight: 0.9 }}>
          Something Went<br /><em style={{ color: RED }}>Wrong</em>
        </h1>
        <p style={{ fontFamily: F, fontSize: '1.1rem', fontStyle: 'italic', color: FADE, marginTop: '16px', marginBottom: '32px' }}>
          Our apologies. An unexpected error has occurred.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.25em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 32px', border: 'none', cursor: 'pointer' }}
          >
            Try Again
          </button>
          <Link href="/" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.25em', textTransform: 'uppercase', color: RED, border: `2px solid ${RED}`, padding: '12px 30px', textDecoration: 'none', display: 'inline-block' }}>
            Return Home
          </Link>
        </div>
      </div>

      <footer style={{ borderTop: `2px solid ${INK}`, padding: '16px 0', textAlign: 'center', marginTop: '32px' }}>
        <span style={{ fontFamily: E, fontSize: '8px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE }}>
          © 2015–2026 · True Love Creative · Dubai, UAE
        </span>
      </footer>
    </div>
  )
}
