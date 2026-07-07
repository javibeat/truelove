import Link from 'next/link'
import { LOVE } from '../lib/constants'

const FG = 'rgba(244,244,241,0.55)'

const cols: { title: string; items: [string, string][] }[] = [
  {
    title: 'Studio',
    items: [
      ['About', '/about'],
      ['Blog', '/blog'],
      ['Start a project', '/brief'],
    ],
  },
  {
    title: 'Services',
    items: [
      ['Web Design', '/services/web-design'],
      ['Graphic Design', '/services/graphic-design'],
      ['Brand Identity', '/services/branding'],
      ['App Development', '/services/app-development'],
    ],
  },
  {
    title: 'Selected Work',
    items: [
      ['Kiko Navarro', '/work/kiko-navarro'],
      ['Jessica Morari', '/work/jessica-morari'],
      ['Estrela Photo', '/work/estrela-photo'],
      ['All projects', '/work'],
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer style={{ background: '#0A0A0B', color: '#F2F2EF', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="container-wide" style={{ padding: 'clamp(48px,7vw,80px) 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px' }}>

          <div style={{ maxWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <svg className="heartbeat" width="15" height="15" viewBox="0 0 24 24" fill={LOVE} aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span style={{ fontSize: '15px', fontWeight: 700, fontStretch: '115%', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>True Love</span>
            </div>
            <p style={{ fontSize: '14px', color: FG, lineHeight: 1.7 }}>
              Independent creative studio. Dubai, est. 2015. Working worldwide.
            </p>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.items.map(([label, href]) => (
                  <Link key={label} href={href} className="contact-link" style={{ fontSize: '14px' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <a href="mailto:info@truelovecreative.es" className="contact-link">info@truelovecreative.es</a>
              <a href="https://wa.me/971585324519" target="_blank" rel="noopener noreferrer" className="contact-link">+971 58 532 4519</a>
              <a href="https://www.instagram.com/truelove.creative" target="_blank" rel="noopener noreferrer" className="contact-link">@truelove.creative</a>
              <span style={{ color: FG }}>Dubai, United Arab Emirates</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.14)', marginTop: '48px', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: FG }}>© 2015-2026 True Love Creative. All rights reserved.</span>
          <span style={{ fontSize: '13px', color: FG }}>Made with <span style={{ color: LOVE }}>♥</span> in Dubai</span>
        </div>
      </div>
    </footer>
  )
}
