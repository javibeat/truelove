import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, PAPER, RULE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'Javi Beat — Identity Case Study | True Love Creative',
  description: 'How we crafted the brand identity and web presence for Javi Beat, a Dubai-based DJ building a distinctive visual language for the international circuit.',
  alternates: { canonical: 'https://truelovecreative.es/work/javi-beat' },
  openGraph: {
    title: 'Javi Beat — Identity Case Study',
    description: 'DJ identity and digital presence built for the international stage.',
    url: 'https://truelovecreative.es/work/javi-beat',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'article',
    images: ['/img/portfolios/javibeat.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Javi Beat — Identity Case Study',
    description: 'DJ identity and digital presence built for the international stage.',
    images: ['/img/portfolios/javibeat.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Javi Beat — Identity Case Study',
  description: 'How we crafted the brand identity and web presence for Javi Beat, a Dubai-based DJ.',
  url: 'https://truelovecreative.es/work/javi-beat',
  image: 'https://truelovecreative.es/img/portfolios/javibeat.jpg',
  datePublished: '2024-01-01',
  author: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  about: { '@type': 'Person', name: 'Javi Beat' },
}

export default function JaviBeatPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <GazettePage
      section="Case Study"
      sectionNum="III"
      title="Javi"
      titleAccent="Beat"
      subtitle="Forging a visual identity for a DJ who has called Dubai home for over a decade — and the world his dancefloor."
    >
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '32px', border: `1px solid ${RULE}` }}>
        <Image src="/img/portfolios/javibeat.jpg" alt="Javi Beat identity design by True Love Creative" fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Two-column content */}
      <div className="grid-2" style={{ gap: 'clamp(24px,4vw,48px)', marginBottom: '48px' }}>

        {/* Left — Project narrative */}
        <div>
          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CLIENT</p>
          <h2 style={{ fontFamily: P, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: INK, lineHeight: 1.1, marginBottom: '16px' }}>
            Javi Beat
          </h2>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Javi Beat is a Spanish DJ and selector who has been a fixture of Dubai's electronic music scene for more than a decade. Known for eclectic sets that weave house, Afro-Latin grooves, and disco into seamless journeys, Javi has performed at some of the city's most prestigious venues and private events. His sound is warm, rhythmic, and impossible to sit still to.
          </p>

          <div className="rule-thin" style={{ margin: '24px 0' }} />

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CHALLENGE</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Despite a strong reputation on the ground, Javi lacked a cohesive visual identity. His logo, social templates, and online presence were inconsistent, making it difficult for promoters and brands to quickly understand his positioning. The brief was clear: create an identity system that feels as polished as his performances.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>OUR APPROACH</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            We developed a complete identity package — logo, typographic system, colour palette, and a suite of social media templates. The design language draws on vintage record label aesthetics crossed with modern minimalism: bold serif typography, a restrained palette of ink-black and warm cream, with accents of deep red. The website was built as a fast, elegant one-page experience with integrated music players, a booking form, and a photo gallery.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE RESULT</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK }}>
            A unified brand that travels. Whether it's an Instagram story, an EPK sent to a festival, or the homepage itself, every touchpoint now speaks with the same confident voice. Javi's booking enquiries have grown steadily, and the brand has become instantly recognisable across Dubai's nightlife circuit.
          </p>
        </div>

        {/* Right — Sidebar */}
        <div>
          {/* Quick Facts Box */}
          <div style={{ border: `2px solid ${INK}`, padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase', color: RED, marginBottom: '16px' }}>PROJECT DETAILS</p>

            {[
              ['Client', 'Javi Beat'],
              ['Year', '2024'],
              ['Services', 'Identity & Web Design'],
              ['Tech Stack', 'HTML, CSS, JavaScript'],
              ['Industry', 'Music / DJing'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${RULE}`, padding: '8px 0' }}>
                <span style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.15em', color: FADE }}>{label}</span>
                <span style={{ fontFamily: F, fontSize: '0.9rem', color: INK }}>{value}</span>
              </div>
            ))}

            <div style={{ marginTop: '16px' }}>
              <a href="https://javibeat.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: RED, textDecoration: 'none', borderBottom: `1px solid ${RED}` }}>
                Visit Live Site &rarr;
              </a>
            </div>
          </div>

          {/* Quote Box */}
          <div style={{ border: `4px double ${INK}`, padding: '24px' }}>
            <p style={{ fontFamily: P, fontSize: 'clamp(1rem,2vw,1.3rem)', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '12px' }}>
              &ldquo;Finally, a brand that feels like who I am behind the decks — refined, bold, and unmistakably personal.&rdquo;
            </p>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE }}>
              &mdash; Javi Beat
            </p>
          </div>
        </div>
      </div>

      <div className="rule-h" style={{ margin: '32px 0' }} />

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <p style={{ fontFamily: F, fontSize: '1.1rem', fontStyle: 'italic', color: FADE, marginBottom: '16px' }}>
          Need an identity that moves with you?
        </p>
        <Link href="/#contact" style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
          Start a Project
        </Link>
      </div>

      <div className="rule-thin" style={{ margin: '24px 0' }} />

      {/* Prev / Next Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/work/jessica-morari" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          &larr; Jessica Morari
        </Link>
        <Link href="/work/estrela-photo" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          Estrela Photo &rarr;
        </Link>
      </div>
    </GazettePage>
    </>
  )
}
