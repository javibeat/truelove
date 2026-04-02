import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, PAPER, RULE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'Jessica Morari — Branding & Web Case Study | True Love Creative',
  description: 'How we built the brand identity and website for Jessica Morari, a Dubai-based coaching and wellness professional. Branding case study by True Love Creative.',
  openGraph: {
    title: 'Jessica Morari — Branding & Web Case Study',
    description: 'Brand identity and web platform for a coaching & wellness professional.',
    images: ['/img/portfolios/jesslnk.webp'],
  },
}

export default function JessicaMorariPage() {
  return (
    <GazettePage
      section="Case Study"
      sectionNum="II"
      title="Jessica"
      titleAccent="Morari"
      subtitle="A cohesive brand and digital platform for a coaching professional redefining wellness in the UAE."
    >
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '32px', border: `1px solid ${RULE}` }}>
        <Image src="/img/portfolios/jesslnk.webp" alt="Jessica Morari branding and website by True Love Creative" fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Two-column content */}
      <div className="grid-2" style={{ gap: 'clamp(24px,4vw,48px)', marginBottom: '48px' }}>

        {/* Left — Project narrative */}
        <div>
          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CLIENT</p>
          <h2 style={{ fontFamily: P, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: INK, lineHeight: 1.1, marginBottom: '16px' }}>
            Jessica Morari
          </h2>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Jessica Morari is a certified life coach and wellness practitioner based in Dubai. Her practice blends psychological insight with holistic methods — helping individuals and corporate teams unlock clarity, resilience, and purpose. With a growing client base across the Gulf and Europe, Jessica needed a brand that could match the sophistication of her work.
          </p>

          <div className="rule-thin" style={{ margin: '24px 0' }} />

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CHALLENGE</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Jessica's previous branding was fragmented — different visual languages across social media, print materials, and an outdated website. She needed a unified identity that communicated credibility and warmth in equal measure, alongside a digital hub to handle bookings, testimonials, and content marketing.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>OUR APPROACH</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            We began with a full brand audit and strategy session, defining Jessica's tone of voice, colour palette, and typographic system. The resulting identity balances softness with strength — muted earth tones, refined serif typography, and clean compositions. The website was designed as a conversion-focused platform with integrated scheduling, a blog framework, and responsive layouts optimised for mobile-first audiences.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE RESULT</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK }}>
            A polished, cohesive brand system and a high-performing website that positions Jessica as a premium practitioner. Enquiry volume increased significantly within the first quarter, and the new identity now extends seamlessly across all touchpoints — from LinkedIn to printed workshop materials.
          </p>
        </div>

        {/* Right — Sidebar */}
        <div>
          {/* Quick Facts Box */}
          <div style={{ border: `2px solid ${INK}`, padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase', color: RED, marginBottom: '16px' }}>PROJECT DETAILS</p>

            {[
              ['Client', 'Jessica Morari'],
              ['Year', '2023'],
              ['Services', 'Branding & Web Design'],
              ['Tech Stack', 'WordPress, Custom Theme'],
              ['Industry', 'Coaching / Wellness'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${RULE}`, padding: '8px 0' }}>
                <span style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.15em', color: FADE }}>{label}</span>
                <span style={{ fontFamily: F, fontSize: '0.9rem', color: INK }}>{value}</span>
              </div>
            ))}

            <div style={{ marginTop: '16px' }}>
              <a href="https://jessicamorari.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: RED, textDecoration: 'none', borderBottom: `1px solid ${RED}` }}>
                Visit Live Site &rarr;
              </a>
            </div>
          </div>

          {/* Quote Box */}
          <div style={{ border: `4px double ${INK}`, padding: '24px' }}>
            <p style={{ fontFamily: P, fontSize: 'clamp(1rem,2vw,1.3rem)', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '12px' }}>
              &ldquo;They understood my vision from day one. The brand feels authentic, elegant, and unmistakably mine.&rdquo;
            </p>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE }}>
              &mdash; Jessica Morari
            </p>
          </div>
        </div>
      </div>

      <div className="rule-h" style={{ margin: '32px 0' }} />

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <p style={{ fontFamily: F, fontSize: '1.1rem', fontStyle: 'italic', color: FADE, marginBottom: '16px' }}>
          Ready to build a brand that speaks for you?
        </p>
        <Link href="/#contact" style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
          Start a Project
        </Link>
      </div>

      <div className="rule-thin" style={{ margin: '24px 0' }} />

      {/* Prev / Next Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/work/kiko-navarro" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          &larr; Kiko Navarro
        </Link>
        <Link href="/work/javi-beat" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          Javi Beat &rarr;
        </Link>
      </div>
    </GazettePage>
  )
}
