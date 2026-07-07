import Image from 'next/image'
import Link from 'next/link'
import PageShell from './PageShell'

export interface CaseStudyProps {
  label?: string
  title: string
  accent?: string
  subtitle: string
  hero: string
  heroAlt: string
  details: [string, string][]
  liveUrl?: string
  sections: { label: string; body: string }[]
  quote?: { text: string; by: string }
  prev: { name: string; slug: string }
  next: { name: string; slug: string }
}

// Shared layout for /work/* case studies — Kinetic Swiss voice.
export default function CaseStudy({ label = 'Case study', title, accent, subtitle, hero, heroAlt, details, liveUrl, sections, quote, prev, next }: CaseStudyProps) {
  return (
    <PageShell label={label} title={title} accent={accent} subtitle={subtitle} bare>

      {/* Hero image — full bleed, curtain reveal */}
      <div className="reveal-img" style={{ position: 'relative', aspectRatio: '21/10', marginTop: 'clamp(32px,5vw,56px)', overflow: 'hidden' }}>
        <Image src={hero} alt={heroAlt} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
      </div>

      <div className="container-wide">
        {/* Narrative + details */}
        <div className="cs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'clamp(32px,5vw,80px)', padding: 'clamp(48px,7vw,96px) 0', alignItems: 'start' }}>

          <div style={{ maxWidth: '640px' }}>
            {sections.map(s => (
              <div key={s.label} className="reveal" style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '10px' }}>{s.label}</h2>
                <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--muted)' }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ position: 'sticky', top: '96px' }}>
            <dl style={{ margin: 0 }}>
              {details.map(([k, v]) => (
                <div key={k} className="detail-row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ width: '100%', marginTop: '24px' }}>
                Visit live site ↗
              </a>
            )}
          </div>
        </div>

        {/* Client quote */}
        {quote && (
          <figure className="reveal" style={{ margin: 0, borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: 'clamp(40px,6vw,72px) 0', marginBottom: 'clamp(48px,7vw,96px)' }}>
            <blockquote style={{ margin: 0 }}>
              <p className="display" style={{ fontSize: 'clamp(1.5rem,3.2vw,2.6rem)', maxWidth: '900px', marginBottom: '20px' }}>
                &ldquo;{quote.text}&rdquo;
              </p>
            </blockquote>
            <figcaption style={{ fontSize: '14px', fontWeight: 500, color: 'var(--muted)' }}>{quote.by}</figcaption>
          </figure>
        )}

        {/* Prev / next — giant index rows */}
        <div style={{ paddingBottom: 'clamp(48px,7vw,88px)' }}>
          <Link href={`/work/${prev.slug}`} className="ix-row reveal">
            <span className="ix-num">←</span>
            <span className="ix-name" style={{ fontSize: 'clamp(1.5rem,4vw,3.2rem)' }}>{prev.name}</span>
            <span className="ix-meta hide-mobile">Previous</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="ix-row reveal">
            <span className="ix-num">→</span>
            <span className="ix-name" style={{ fontSize: 'clamp(1.5rem,4vw,3.2rem)' }}>{next.name}</span>
            <span className="ix-meta hide-mobile">Next</span>
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
