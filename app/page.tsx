import Image from 'next/image'
import Link from 'next/link'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import WhatsAppButton from './components/WhatsAppButton'
import WorkGrid, { type WorkItem } from './components/WorkGrid'
import Strip from './components/Strip'
import CtaBlock from './components/CtaBlock'
import LetterRise from './components/LetterRise'
import { LOVE } from './lib/constants'

const projects: WorkItem[] = [
  { name: 'Kiko Navarro', type: 'Web Design', year: '2024', img: '/img/portfolios/kikonavarro.jpg', slug: 'kiko-navarro' },
  { name: 'Jessica Morari', type: 'Branding & Web', year: '2023', img: '/img/portfolios/jesslnk.webp', slug: 'jessica-morari' },
  { name: 'Javi Beat', type: 'Identity', year: '2024', img: '/img/portfolios/javibeat.jpg', slug: 'javi-beat' },
  { name: 'Estrela Photo', type: 'Portfolio', year: '2023', img: '/img/portfolios/estrela.jpg', slug: 'estrela-photo' },
  { name: 'Manuel KevSax', type: 'Web Design', year: '2024', img: '/img/portfolios/manusax.webp', slug: 'manuel-kevsax' },
  { name: 'Sergio Trumpet', type: 'Portfolio', year: '2024', img: '/img/portfolios/sergio.jpg', slug: 'sergio-trumpet' },
]

const services = [
  { name: 'Web Design', desc: 'Fast, precise websites built by hand. No templates, no page builders — code written for your brand and nothing else.', href: '/services/web-design' },
  { name: 'Brand Identity', desc: 'Logo, type, colour and voice. The full kit a brand needs to be recognised at a glance and remembered after.', href: '/services/branding' },
  { name: 'Graphic Design', desc: 'Vinyl covers, posters, flyers and art direction for artists and events that need to look as good as they sound.', href: '/services/graphic-design' },
  { name: 'App Development', desc: 'iOS, Android and web apps, end to end — from the first wireframe to the store release.', href: '/services/app-development' },
]

const clients = ['Kiko Navarro', 'Jessica Morari', 'Estrela Photo', 'Manuel KevSax', 'Sergio Trumpet', 'Julio Cuba', 'Javi Beat']

const stats: { num: string; suffix: string; label: string }[] = [
  { num: '10', suffix: '+', label: 'Years of craft' },
  { num: '30', suffix: '+', label: 'Clients worldwide' },
  { num: '7', suffix: '', label: 'Featured projects' },
  { num: '3', suffix: '', label: 'Languages spoken' },
]

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>

        {/* ── Poster hero — the full name fills the sheet, both lines ── */}
        <header style={{ paddingTop: 'calc(64px + var(--frame) + clamp(20px,3.5vw,48px))' }}>
          <div className="container-wide">
            <h1 className="mega" aria-label="True Love Creative">
              <span className="hero-line" style={{ fontSize: 'min(calc((100vw - 56px) * 0.228), 318px)' }}>
                <LetterRise text="TRUE LOVE" />
              </span>
              <span className="hero-line" style={{ fontSize: 'min(calc((100vw - 56px) * 0.2555), 356px)' }}>
                <LetterRise text="CREATIVE" from={8} />
              </span>
            </h1>
            <div className="rise" style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', margin: 'clamp(20px,2.6vw,36px) 0 clamp(20px,2.6vw,36px)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', animationDelay: '0.55s' }}>
              <span>Independent design studio</span>
              <span style={{ color: 'var(--muted)' }}>Dubai · Est. 2015 · Working worldwide</span>
            </div>
          </div>
        </header>

        <div className="rise" style={{ animationDelay: '0.65s' }}>
          <Strip items={['Web Design', 'Branding', 'Graphic Design', 'App Development']} />
        </div>

        {/* ── Opening triptych — three frames, staggered ── */}
        <section className="container-wide" style={{ paddingTop: 'clamp(32px,4.5vw,64px)' }}>
          <div className="mosaic">
            {[
              { img: '/img/portfolios/julio.webp', name: 'Julio Cuba', type: 'Identity', slug: 'julio-cuba' },
              { img: '/img/portfolios/estrela.jpg', name: 'Estrela Photo', type: 'Portfolio', slug: 'estrela-photo' },
              { img: '/img/portfolios/javibeat.jpg', name: 'Javi Beat', type: 'Identity', slug: 'javi-beat' },
            ].map((m, i) => (
              <Link key={m.slug} href={`/work/${m.slug}`} className="mosaic-item">
                <figure className="mosaic-media reveal-img" style={{ margin: 0 }}>
                  <Image src={m.img} alt={`${m.name} — ${m.type}`} fill sizes="33vw" priority={i === 0} style={{ objectFit: 'cover' }} />
                </figure>
                <span className="mosaic-cap"><span style={{ color: LOVE }} aria-hidden="true">♥</span> {m.name} — {m.type}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────── */}
        <section className="container-wide" style={{ padding: 'clamp(56px,8vw,110px) 24px' }}>
          <div className="stat-grid">
            {stats.map(s => (
              <div key={s.label} className="stat reveal">
                <div className="stat-label">{s.label}</div>
                <div className="stat-num">{s.num}<em>{s.suffix || '.'}</em></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Clients ticker ────────────────────────────── */}
        <Strip items={clients} variant="ghost" heart />

        {/* ── Services — heading left, cards right ──────── */}
        <section id="services" className="container-wide" style={{ padding: 'clamp(64px,9vw,130px) 24px' }}>
          <div className="sv-grid cs-grid">
            <div>
              <h2 className="head-xl reveal" style={{ fontSize: 'clamp(2.4rem,5.2vw,4.6rem)' }}>
                What we<br />do best<span style={{ color: LOVE }}>.</span>
              </h2>
              <p className="reveal" style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '340px', marginTop: '20px' }}>
                A small studio, on purpose. Fewer clients, deeper work — every project signed by hand since 2015.
              </p>
            </div>
            <div>
              {services.map(s => (
                <Link key={s.name} href={s.href} className="sv-card reveal">
                  <span className="sv-title">
                    <span style={{ color: LOVE }} aria-hidden="true">♥</span> {s.name}
                  </span>
                  <p className="sv-desc">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Selected work ─────────────────────────────── */}
        <Strip items={['Selected Work']} variant="ghost" big />
        <section id="work" className="container-wide" style={{ padding: 'clamp(48px,6vw,80px) 24px clamp(64px,9vw,120px)' }}>
          <WorkGrid items={projects} />
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', paddingTop: 'clamp(48px,6vw,72px)' }}>
            <Link href="/work" className="btn-poster">&mdash; All projects</Link>
          </div>
        </section>

        <CtaBlock />
      </main>

      <SiteFooter />
      <WhatsAppButton />
    </>
  )
}
