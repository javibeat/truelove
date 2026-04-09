import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, PAPER, RULE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'Sergio Trumpet — Portfolio Case Study | True Love Creative',
  description: 'How we designed sergiotrumpetdj.com — a dynamic portfolio for a professional trumpet player and DJ performing across the Middle East and Europe.',
  alternates: { canonical: 'https://truelovecreative.es/work/sergio-trumpet' },
  openGraph: {
    title: 'Sergio Trumpet — Portfolio Case Study',
    description: 'A dynamic portfolio for a trumpet player and DJ.',
    url: 'https://truelovecreative.es/work/sergio-trumpet',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'article',
    images: ['/img/portfolios/sergio.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sergio Trumpet — Portfolio Case Study',
    description: 'A dynamic portfolio for a trumpet player and DJ.',
    images: ['/img/portfolios/sergio.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Sergio Trumpet — Portfolio Case Study',
  description: 'How we designed sergiotrumpetdj.com — a dynamic portfolio for a professional trumpet player and DJ.',
  url: 'https://truelovecreative.es/work/sergio-trumpet',
  image: 'https://truelovecreative.es/img/portfolios/sergio.jpg',
  datePublished: '2024-01-01',
  author: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  about: { '@type': 'Person', name: 'Sergio Trumpet' },
}

export default function SergioTrumpetPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <GazettePage
      section="Case Study"
      sectionNum="VI"
      title="Sergio"
      titleAccent="Trumpet"
      subtitle="A bold digital portfolio for a musician who brings the house down — trumpet in one hand, the crowd in the other."
    >
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '32px', border: `1px solid ${RULE}` }}>
        <Image src="/img/portfolios/sergio.jpg" alt="Sergio Trumpet portfolio website by True Love Creative" fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Two-column content */}
      <div className="grid-2" style={{ gap: 'clamp(24px,4vw,48px)', marginBottom: '48px' }}>

        {/* Left — Project narrative */}
        <div>
          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CLIENT</p>
          <h2 style={{ fontFamily: P, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: INK, lineHeight: 1.1, marginBottom: '16px' }}>
            Sergio Trumpet
          </h2>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Sergio is a rare breed — a classically trained trumpet player who moonlights as a DJ, delivering hybrid live sets that fuse brass with electronic beats. Based between Dubai and Spain, he performs at beach clubs, rooftop bars, and private events, bringing a visceral energy that DJs alone simply cannot replicate. His sound is explosive, theatrical, and unforgettable.
          </p>

          <div className="rule-thin" style={{ margin: '24px 0' }} />

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CHALLENGE</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Sergio's dual identity as both a trumpet player and a DJ made positioning tricky. The website needed to communicate both skills without diluting either, while also serving as a professional booking tool for venues and event agencies across multiple time zones. Previous online efforts were scattered across social media with no central hub.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>OUR APPROACH</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            We built a high-energy, video-forward portfolio that opens with a full-screen performance reel — immediately establishing Sergio's unique stage presence. The site architecture separates his trumpet and DJ work into distinct sections while maintaining a unified visual identity. Embedded video clips, a curated photo gallery, and a streamlined booking form create a complete experience that moves at the same tempo as his sets.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE RESULT</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK }}>
            A portfolio that lands with impact. Sergio now sends a single link to promoters and the site does the rest — showcasing his versatility, professionalism, and stage energy within seconds. International bookings have increased, and the site has become an essential part of his pitch to new venues and festival organisers.
          </p>
        </div>

        {/* Right — Sidebar */}
        <div>
          {/* Quick Facts Box */}
          <div style={{ border: `2px solid ${INK}`, padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase', color: RED, marginBottom: '16px' }}>PROJECT DETAILS</p>

            {[
              ['Client', 'Sergio Trumpet'],
              ['Year', '2024'],
              ['Services', 'Portfolio & Web Design'],
              ['Tech Stack', 'HTML, CSS, JavaScript'],
              ['Industry', 'Music / Entertainment'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${RULE}`, padding: '8px 0' }}>
                <span style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.15em', color: FADE }}>{label}</span>
                <span style={{ fontFamily: F, fontSize: '0.9rem', color: INK }}>{value}</span>
              </div>
            ))}

            <div style={{ marginTop: '16px' }}>
              <a href="https://sergiotrumpetdj.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: RED, textDecoration: 'none', borderBottom: `1px solid ${RED}` }}>
                Visit Live Site &rarr;
              </a>
            </div>
          </div>

          {/* Quote Box */}
          <div style={{ border: `4px double ${INK}`, padding: '24px' }}>
            <p style={{ fontFamily: P, fontSize: 'clamp(1rem,2vw,1.3rem)', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '12px' }}>
              &ldquo;People used to ask what I do. Now I send them the site and they book me on the spot.&rdquo;
            </p>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE }}>
              &mdash; Sergio Trumpet
            </p>
          </div>
        </div>
      </div>

      <div className="rule-h" style={{ margin: '32px 0' }} />

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <p style={{ fontFamily: F, fontSize: '1.1rem', fontStyle: 'italic', color: FADE, marginBottom: '16px' }}>
          Make your first impression unforgettable.
        </p>
        <Link href="/#contact" style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
          Start a Project
        </Link>
      </div>

      <div className="rule-thin" style={{ margin: '24px 0' }} />

      {/* Prev / Next Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/work/manuel-kevsax" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          &larr; Manuel KevSax
        </Link>
        <Link href="/work/julio-cuba" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          Julio Cuba &rarr;
        </Link>
      </div>
    </GazettePage>
    </>
  )
}
