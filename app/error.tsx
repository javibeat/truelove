'use client'

import Link from 'next/link'
import { MUTED } from './lib/constants'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '560px' }}>
          <span className="eyebrow" style={{ marginBottom: '18px' }}>Technical difficulties</span>
          <h1 className="display" style={{ fontSize: 'clamp(2.2rem,6vw,3.6rem)' }}>
            Something went wrong
          </h1>
          <p className="lede" style={{ margin: '20px auto 32px' }}>
            Our apologies. An unexpected error has occurred.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-dark" onClick={() => reset()}>
              Try Again
            </button>
            <Link href="/" className="btn btn-ghost">Return Home</Link>
          </div>
        </div>
      </main>
      <footer style={{ borderTop: '1px solid var(--hairline)', padding: '20px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: '13px', color: MUTED }}>
          &copy; 2015&ndash;2026 &middot; True Love Creative &middot; Dubai, UAE
        </span>
      </footer>
    </div>
  )
}
