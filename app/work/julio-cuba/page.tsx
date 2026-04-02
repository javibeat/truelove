import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, PAPER, RULE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'Julio Cuba — Identity Case Study | True Love Creative',
  description: 'How we designed the artistic identity and portfolio for Julio Cuba, a virtuoso violinist performing at luxury events across Europe and the Middle East.',
  openGraph: {
    title: 'Julio Cuba — Identity Case Study',
    description: 'Artistic identity for a virtuoso violinist on the international stage.',
    images: ['/img/portfolios/julio.webp'],
  },
}

export default function JulioCubaPage() {
  return (
    <GazettePage
      section="Case Study"
      sectionNum="VII"
      title="Julio"
      titleAccent="Cuba"
      subtitle="An artistic identity and digital portfolio for a violinist whose performances turn moments into memories."
    >
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '32px', border: `1px solid ${RULE}` }}>
        <Image src="/img/portfolios/julio.webp" alt="Julio Cuba identity and portfolio by True Love Creative" fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Two-column content */}
      <div className="grid-2" style={{ gap: 'clamp(24px,4vw,48px)', marginBottom: '48px' }}>

        {/* Left — Project narrative */}
        <div>
          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CLIENT</p>
          <h2 style={{ fontFamily: P, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: INK, lineHeight: 1.1, marginBottom: '16px' }}>
            Julio Cuba
          </h2>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Julio Cuba is a Cuban-born violinist whose performances transcend genre — from classical recitals and tango evenings to high-energy collaborations with DJs at luxury events. Now based between Spain and Dubai, Julio brings a raw emotional intensity to every stage he graces. His playing is the kind that stops conversations and fills rooms with goosebumps.
          </p>

          <div className="rule-thin" style={{ margin: '24px 0' }} />

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CHALLENGE</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Julio's artistry is deeply emotional and physical — translating that into a digital experience was the core challenge. He needed a brand identity that felt as passionate as his playing, not corporate or clinical. Additionally, he required a bilingual platform (Spanish and English) that could serve both European and Gulf-based audiences.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>OUR APPROACH</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            We crafted an identity rooted in contrast — the precision of classical music meets the spontaneity of improvisation. The logo plays with negative space, suggesting both a bow stroke and a musical note. The colour palette draws from concert-hall warmth: deep blacks, antique golds, and parchment whites. The website features full-screen performance photography, embedded video, and an elegant repertoire section that showcases Julio's range. Every detail was designed to make the visitor feel as though they've just stepped into a private recital.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE RESULT</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK }}>
            An identity and website that resonate with the same emotion as Julio's music. The new brand has elevated his positioning in the luxury events market, and the site serves as a powerful introduction for agents and event planners who discover him online. It's art, not just a website — and that's exactly the point.
          </p>
        </div>

        {/* Right — Sidebar */}
        <div>
          {/* Quick Facts Box */}
          <div style={{ border: `2px solid ${INK}`, padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase', color: RED, marginBottom: '16px' }}>PROJECT DETAILS</p>

            {[
              ['Client', 'Julio Cuba'],
              ['Year', '2024'],
              ['Services', 'Identity & Web Design'],
              ['Tech Stack', 'HTML, CSS, JavaScript'],
              ['Industry', 'Music / Performing Arts'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${RULE}`, padding: '8px 0' }}>
                <span style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.15em', color: FADE }}>{label}</span>
                <span style={{ fontFamily: F, fontSize: '0.9rem', color: INK }}>{value}</span>
              </div>
            ))}

            <div style={{ marginTop: '16px' }}>
              <a href="https://juliocuba.es/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: RED, textDecoration: 'none', borderBottom: `1px solid ${RED}` }}>
                Visit Live Site &rarr;
              </a>
            </div>
          </div>

          {/* Quote Box */}
          <div style={{ border: `4px double ${INK}`, padding: '24px' }}>
            <p style={{ fontFamily: P, fontSize: 'clamp(1rem,2vw,1.3rem)', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '12px' }}>
              &ldquo;They didn't just design a website — they understood my music and turned it into something you can see and feel.&rdquo;
            </p>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE }}>
              &mdash; Julio Cuba
            </p>
          </div>
        </div>
      </div>

      <div className="rule-h" style={{ margin: '32px 0' }} />

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <p style={{ fontFamily: F, fontSize: '1.1rem', fontStyle: 'italic', color: FADE, marginBottom: '16px' }}>
          Let your art set the tone. We'll design the rest.
        </p>
        <Link href="/#contact" style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
          Start a Project
        </Link>
      </div>

      <div className="rule-thin" style={{ margin: '24px 0' }} />

      {/* Prev / Next Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/work/sergio-trumpet" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          &larr; Sergio Trumpet
        </Link>
        <Link href="/work/kiko-navarro" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          Kiko Navarro &rarr;
        </Link>
      </div>
    </GazettePage>
  )
}
