import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, PAPER, RULE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'Kiko Navarro — Web Design Case Study | True Love Creative',
  description: 'How we designed and built kikonavarro.es — a premium web presence for legendary Ibiza DJ and producer Kiko Navarro. Web design case study by True Love Creative, Dubai.',
  openGraph: {
    title: 'Kiko Navarro — Web Design Case Study',
    description: 'A premium web presence for the legendary DJ & producer.',
    images: ['/img/portfolios/kikonavarro.jpg'],
  },
}

export default function KikoNavarroPage() {
  return (
    <GazettePage
      section="Case Study"
      sectionNum="I"
      title="Kiko"
      titleAccent="Navarro"
      subtitle="A digital stage worthy of a legend — web design for one of house music's most revered artists."
    >
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '32px', border: `1px solid ${RULE}` }}>
        <Image src="/img/portfolios/kikonavarro.jpg" alt="Kiko Navarro website design by True Love Creative" fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Two-column content */}
      <div className="grid-2" style={{ gap: 'clamp(24px,4vw,48px)', marginBottom: '48px' }}>

        {/* Left — Project narrative */}
        <div>
          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CLIENT</p>
          <h2 style={{ fontFamily: P, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: INK, lineHeight: 1.1, marginBottom: '16px' }}>
            Kiko Navarro
          </h2>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Kiko Navarro is a name that needs no introduction in the world of deep house, Afro-Latin, and soulful electronic music. With a career spanning over three decades, releases on Defected, BBE, and Local Talk, and residencies across Ibiza and beyond, Kiko is one of the most respected selectors and producers alive. His music bridges continents — from the streets of Barcelona to the beaches of Bahia.
          </p>

          <div className="rule-thin" style={{ margin: '24px 0' }} />

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CHALLENGE</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Kiko's existing online presence didn't reflect the depth and prestige of his career. He needed a single destination that could house his extensive discography, upcoming tour dates, press kit, and booking information — all wrapped in a visual language that felt as warm and soulful as his music.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>OUR APPROACH</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            We designed a bold, immersive single-page experience with rich photography, integrated Spotify and SoundCloud players, and a clean tour-date module. The visual direction draws on vinyl sleeve aesthetics — warm tones, generous typography, and tactile textures that echo the analogue roots of Kiko's sound. Every interaction was crafted to feel effortless, so the music always takes centre stage.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE RESULT</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK }}>
            A refined, performance-optimised website that serves as Kiko's global hub — unifying his releases, tour calendar, and brand identity. The site has become the go-to reference for promoters and press worldwide, reinforcing his status as one of the genre's true originals.
          </p>
        </div>

        {/* Right — Sidebar */}
        <div>
          {/* Quick Facts Box */}
          <div style={{ border: `2px solid ${INK}`, padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase', color: RED, marginBottom: '16px' }}>PROJECT DETAILS</p>

            {[
              ['Client', 'Kiko Navarro'],
              ['Year', '2024'],
              ['Services', 'Web Design & Development'],
              ['Tech Stack', 'HTML, CSS, JavaScript'],
              ['Industry', 'Music / Entertainment'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${RULE}`, padding: '8px 0' }}>
                <span style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.15em', color: FADE }}>{label}</span>
                <span style={{ fontFamily: F, fontSize: '0.9rem', color: INK }}>{value}</span>
              </div>
            ))}

            <div style={{ marginTop: '16px' }}>
              <a href="https://kikonavarro.es/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: RED, textDecoration: 'none', borderBottom: `1px solid ${RED}` }}>
                Visit Live Site &rarr;
              </a>
            </div>
          </div>

          {/* Quote Box */}
          <div style={{ border: `4px double ${INK}`, padding: '24px' }}>
            <p style={{ fontFamily: P, fontSize: 'clamp(1rem,2vw,1.3rem)', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '12px' }}>
              &ldquo;The site captures everything — my music, my story, my vibe. It finally feels like me.&rdquo;
            </p>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE }}>
              &mdash; Kiko Navarro
            </p>
          </div>
        </div>
      </div>

      <div className="rule-h" style={{ margin: '32px 0' }} />

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <p style={{ fontFamily: F, fontSize: '1.1rem', fontStyle: 'italic', color: FADE, marginBottom: '16px' }}>
          Ready to elevate your digital presence?
        </p>
        <Link href="/#contact" style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
          Start a Project
        </Link>
      </div>

      <div className="rule-thin" style={{ margin: '24px 0' }} />

      {/* Prev / Next Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/work/julio-cuba" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          &larr; Julio Cuba
        </Link>
        <Link href="/work/jessica-morari" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          Jessica Morari &rarr;
        </Link>
      </div>
    </GazettePage>
  )
}
