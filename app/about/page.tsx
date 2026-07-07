import type { Metadata } from 'next'
import PageShell from '../components/PageShell'
import { MUTED } from '../lib/constants'

export const metadata: Metadata = {
  title: 'About — True Love Creative · Design Studio Dubai',
  description: 'Founded in 2015 in Dubai, True Love Creative is a premium design studio led by Javi Beat. Over a decade of crafting high-end digital experiences for artists, startups, and brands worldwide.',
  keywords: ['design studio Dubai', 'creative agency UAE', 'Javi Beat designer', 'Dubai web designer', 'about True Love Creative'],
  alternates: { canonical: 'https://truelovecreative.es/about' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'True Love Creative',
    founder: { '@type': 'Person', name: 'Javi Beat', jobTitle: 'Creative Director & Founder' },
    foundingDate: '2015',
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    knowsLanguage: ['English', 'Spanish', 'Arabic'],
  },
}

const steps = [
  { num: '01', title: 'Discovery', desc: 'We listen. We research your industry, your competitors, and your audience before sketching a single line.' },
  { num: '02', title: 'Concept', desc: 'Strategic direction and visual exploration. We present ideas, not templates.' },
  { num: '03', title: 'Craft', desc: 'Meticulous execution in code and pixel. Every detail serves a purpose.' },
  { num: '04', title: 'Launch', desc: 'Deployment, testing, and handover. We stay until everything is perfect, and beyond.' },
]

const facts: [string, string][] = [
  ['Founded', '2015'],
  ['Location', 'Dubai, UAE'],
  ['Founder', 'Javi Beat'],
  ['Languages', 'EN · ES · AR'],
  ['Clients served', '30+'],
  ['Serving', 'Worldwide'],
]

export default function AboutPage() {
  return (
    <PageShell title="About" subtitle="A decade of crafting digital experiences that refuse to be ordinary." wide>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Opening statement */}
      <div style={{ padding: 'clamp(48px,7vw,96px) 0 clamp(40px,6vw,72px)' }}>
        <p className="display reveal" style={{ fontSize: 'clamp(1.6rem,3.6vw,3rem)', maxWidth: '980px' }}>
          True Love Creative was born in 2015 from a simple conviction: design is not decoration. It is decision.
        </p>
      </div>

      {/* Narrative + facts */}
      <div className="cs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'clamp(32px,5vw,80px)', paddingBottom: 'clamp(56px,8vw,110px)', alignItems: 'start' }}>
        <div style={{ maxWidth: '640px' }}>
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '12px' }}>The founder</h2>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--ink)' }}>Javi Beat</strong> is a designer, creative director, and DJ who has called Dubai home for over ten years. His dual perspective, rooted in European design tradition and sharpened by the ambition of the Gulf, gives the studio its distinctive voice: clean, powerful, and unmistakably intentional.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--muted)' }}>
              With a deep connection to the music and arts scene, Javi has built identities and platforms for internationally recognised DJs, musicians, photographers, and creative entrepreneurs. Every project is personal. Every pixel, considered.
            </p>
          </div>

          <div className="reveal">
            <h2 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '12px' }}>Philosophy</h2>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '16px' }}>
              We work with a simple philosophy: <strong style={{ color: 'var(--ink)' }}>fewer clients, deeper work</strong>. We don&rsquo;t run an assembly line. Each project receives the full attention of the studio, from concept to launch, because that is the only way to produce work that truly matters.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--muted)' }}>
              Our clients are artists, startups, and brands who understand that their digital presence is not a cost. It is their most powerful asset. We build things that last, that perform, and that make people stop scrolling.
            </p>
          </div>
        </div>

        <dl className="reveal" style={{ margin: 0 }}>
          {facts.map(([k, v]) => (
            <div key={k} className="detail-row">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <a href="mailto:info@truelovecreative.es" className="quiet-link">info@truelovecreative.es</a>
            <a href="https://wa.me/971585324519" target="_blank" rel="noopener noreferrer" className="quiet-link">WhatsApp +971 58 532 4519</a>
            <a href="https://www.instagram.com/truelove.creative" target="_blank" rel="noopener noreferrer" className="quiet-link">@truelove.creative</a>
          </div>
        </dl>
      </div>

      {/* How we work — numbered index rows */}
      <div style={{ paddingBottom: 'clamp(64px,9vw,120px)' }}>
        <h2 className="display reveal" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.2rem)', marginBottom: 'clamp(28px,4vw,48px)' }}>
          Four steps. <span style={{ color: MUTED }}>No shortcuts.</span>
        </h2>
        {steps.map((s, i) => (
          <div key={s.num} className="reveal" style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '20px', padding: 'clamp(20px,3vw,32px) 0', borderTop: '1px solid var(--hairline)', borderBottom: i === steps.length - 1 ? '1px solid var(--hairline)' : 'none', alignItems: 'baseline' }}>
            <span className="ix-num">{s.num}</span>
            <div>
              <h3 className="mega" style={{ fontSize: 'clamp(1.5rem,4vw,3.2rem)', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '520px' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
