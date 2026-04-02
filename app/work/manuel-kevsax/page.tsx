import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, PAPER, RULE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'Manuel KevSax — Web Design Case Study | True Love Creative',
  description: 'How we designed manuelkevsax.com — a luxury web experience for Dubai&apos;s premier saxophonist, built for high-end bookings and brand partnerships.',
  openGraph: {
    title: 'Manuel KevSax — Web Design Case Study',
    description: 'A luxury web experience for Dubai&apos;s premier saxophonist.',
    images: ['/img/portfolios/manusax.webp'],
  },
}

export default function ManuelKevSaxPage() {
  return (
    <GazettePage
      section="Case Study"
      sectionNum="V"
      title="Manuel"
      titleAccent="KevSax"
      subtitle="A luxury digital presence for a saxophonist who performs at the world's most exclusive stages."
    >
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '32px', border: `1px solid ${RULE}` }}>
        <Image src="/img/portfolios/manusax.webp" alt="Manuel KevSax website design by True Love Creative" fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Two-column content */}
      <div className="grid-2" style={{ gap: 'clamp(24px,4vw,48px)', marginBottom: '48px' }}>

        {/* Left — Project narrative */}
        <div>
          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CLIENT</p>
          <h2 style={{ fontFamily: P, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: INK, lineHeight: 1.1, marginBottom: '16px' }}>
            Manuel KevSax
          </h2>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Manuel KevSax is a luxury saxophonist and live performer based in Dubai, regularly appearing at five-star hotels, yacht parties, fashion shows, and corporate galas across the Gulf. His performances blend jazz, deep house, and electronic grooves into an unforgettable live experience. Manuel's client list reads like a who's-who of premium hospitality and international brands.
          </p>

          <div className="rule-thin" style={{ margin: '24px 0' }} />

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CHALLENGE</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Manuel needed a website that could serve as both a showcase and a sales tool — something event planners and brand managers could browse in seconds and immediately understand the calibre of his offering. The site had to feel luxurious without being heavy, and it needed to convert high-intent visitors into direct bookings.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>OUR APPROACH</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            We designed a cinematic, scroll-driven experience anchored by full-bleed video and photography. The site architecture is deliberately lean — hero, highlights reel, testimonials, and a direct booking enquiry — to respect the time-poor decision-makers who form Manuel's core audience. Gold and black accents reinforce the luxury positioning, while embedded audio samples let visitors experience the performance before making contact.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE RESULT</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK }}>
            A sleek, fast-loading website that positions Manuel at the top of the luxury entertainment market. The site has become his primary booking channel, with event planners frequently citing it as the deciding factor. Enquiry quality improved markedly — the site pre-qualifies visitors, attracting precisely the calibre of client Manuel wants to work with.
          </p>
        </div>

        {/* Right — Sidebar */}
        <div>
          {/* Quick Facts Box */}
          <div style={{ border: `2px solid ${INK}`, padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase', color: RED, marginBottom: '16px' }}>PROJECT DETAILS</p>

            {[
              ['Client', 'Manuel KevSax'],
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
              <a href="https://manuelkevsax.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: RED, textDecoration: 'none', borderBottom: `1px solid ${RED}` }}>
                Visit Live Site &rarr;
              </a>
            </div>
          </div>

          {/* Quote Box */}
          <div style={{ border: `4px double ${INK}`, padding: '24px' }}>
            <p style={{ fontFamily: P, fontSize: 'clamp(1rem,2vw,1.3rem)', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '12px' }}>
              &ldquo;Event managers tell me the website sold them before they even heard me play. That's exactly what I wanted.&rdquo;
            </p>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE }}>
              &mdash; Manuel KevSax
            </p>
          </div>
        </div>
      </div>

      <div className="rule-h" style={{ margin: '32px 0' }} />

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <p style={{ fontFamily: F, fontSize: '1.1rem', fontStyle: 'italic', color: FADE, marginBottom: '16px' }}>
          Let your website do the selling for you.
        </p>
        <Link href="/#contact" style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
          Start a Project
        </Link>
      </div>

      <div className="rule-thin" style={{ margin: '24px 0' }} />

      {/* Prev / Next Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/work/estrela-photo" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          &larr; Estrela Photo
        </Link>
        <Link href="/work/sergio-trumpet" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          Sergio Trumpet &rarr;
        </Link>
      </div>
    </GazettePage>
  )
}
