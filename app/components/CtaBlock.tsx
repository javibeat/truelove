import Link from 'next/link'
import { LOVE } from '../lib/constants'
import Strip from './Strip'

// Every page signs off the same way: red strip, black block, one ask.
export default function CtaBlock() {
  return (
    <>
      <Strip items={["Let's work together"]} />
      <section id="contact" className="cta-block">
        <div className="container-wide">
          <svg className="heartbeat reveal" width="26" height="26" viewBox="0 0 24 24" fill={LOVE} aria-hidden="true" style={{ margin: '0 auto' }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <h2 className="head-xl reveal" style={{ fontSize: 'clamp(2.2rem,6vw,5.4rem)', color: '#fff', margin: '24px auto 40px', maxWidth: '16ch' }}>
            Let&rsquo;s make you unforgettable
          </h2>
          <div className="reveal" style={{ display: 'flex', gap: '28px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/brief" className="btn-poster">&mdash; Start a project</Link>
            <a href="mailto:info@truelovecreative.es" className="cta-mail">info@truelovecreative.es</a>
          </div>
          <div className="reveal" style={{ marginTop: '36px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
            Dubai · Response within 24h · EN ES AR
          </div>
        </div>
      </section>
    </>
  )
}
