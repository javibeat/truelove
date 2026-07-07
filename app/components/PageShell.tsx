import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import WhatsAppButton from './WhatsAppButton'
import LetterRise from './LetterRise'
import CtaBlock from './CtaBlock'

// Shared shell for interior pages — Poster voice:
// left-aligned condensed mega header, hairline rule, dark CTA finale.
export default function PageShell({
  label,
  title,
  accent,
  subtitle,
  children,
  wide,
  bare,
  noFinale,
}: {
  label?: string
  title: string
  accent?: string
  subtitle?: string
  children: React.ReactNode
  wide?: boolean
  bare?: boolean
  noFinale?: boolean
}) {
  return (
    <>
      <SiteNav />
      <main>
        <header className="container-wide page-head">
          {label && <span className="eyebrow rise" style={{ marginBottom: '20px' }}>{label}</span>}
          <h1 className="mega" aria-label={accent ? `${title} ${accent}` : title} style={{ overflow: 'hidden' }}>
            <LetterRise text={title} />
            {accent && (
              <>
                {' '}
                <span style={{ color: 'var(--muted)' }}><LetterRise text={accent} from={title.length} /></span>
              </>
            )}
          </h1>
          {subtitle && (
            <div className="rise" style={{ borderTop: '1px solid var(--hairline)', marginTop: 'clamp(20px,3vw,32px)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', gap: '24px', animationDelay: '0.35s' }}>
              <p className="lede">{subtitle}</p>
            </div>
          )}
        </header>

        <div className={bare ? undefined : (wide ? 'container-wide' : 'container')}>
          {children}
        </div>
      </main>

      {!noFinale && <CtaBlock />}

      <SiteFooter />
      <WhatsAppButton />
    </>
  )
}
