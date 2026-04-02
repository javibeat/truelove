import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, PAPER, RULE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'Estrela Photo — Portfolio Case Study | True Love Creative',
  description: 'How we designed estrela.photo — a refined portfolio website for a photography studio capturing life across the UAE. Case study by True Love Creative, Dubai.',
  openGraph: {
    title: 'Estrela Photo — Portfolio Case Study',
    description: 'A refined portfolio for a photography studio in the UAE.',
    images: ['/img/portfolios/estrela.jpg'],
  },
}

export default function EstrelaPhotoPage() {
  return (
    <GazettePage
      section="Case Study"
      sectionNum="IV"
      title="Estrela"
      titleAccent="Photo"
      subtitle="A portfolio that lets the photographs speak — clean, fast, and designed to convert browsers into clients."
    >
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '32px', border: `1px solid ${RULE}` }}>
        <Image src="/img/portfolios/estrela.jpg" alt="Estrela Photo portfolio website by True Love Creative" fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Two-column content */}
      <div className="grid-2" style={{ gap: 'clamp(24px,4vw,48px)', marginBottom: '48px' }}>

        {/* Left — Project narrative */}
        <div>
          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CLIENT</p>
          <h2 style={{ fontFamily: P, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: INK, lineHeight: 1.1, marginBottom: '16px' }}>
            Estrela Photo
          </h2>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Estrela Photo is a boutique photography studio operating across the UAE, specialising in lifestyle, portrait, and event photography. With a client roster spanning luxury hospitality, fashion brands, and private celebrations, Estrela's work demands a digital showcase that is as visually meticulous as the images themselves.
          </p>

          <div className="rule-thin" style={{ margin: '24px 0' }} />

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE CHALLENGE</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            Photographers face a paradox: their portfolios must be visually rich yet lightning-fast. Estrela needed a site that could display high-resolution galleries without sacrificing load times, while also providing a clear path to enquiry. The previous site was gallery-heavy but lacked structure, making it difficult for potential clients to navigate or take action.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>OUR APPROACH</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK, marginBottom: '20px' }}>
            We designed a minimal, gallery-centric portfolio with aggressive image optimisation — lazy loading, responsive srcsets, and modern formats — to keep the experience fluid on any device. The layout follows a grid-masonry hybrid that lets the photographs dictate the rhythm. A subtle category filter allows visitors to browse by genre, and every gallery ends with a clear booking prompt.
          </p>

          <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: FADE, marginBottom: '6px' }}>THE RESULT</p>
          <p style={{ fontFamily: F, fontSize: '1rem', lineHeight: 1.75, color: INK }}>
            A portfolio that loads in under two seconds and looks stunning on every screen. Session bookings through the website more than doubled in the first three months, and the site has become a powerful sales tool that Estrela shares directly with prospective clients.
          </p>
        </div>

        {/* Right — Sidebar */}
        <div>
          {/* Quick Facts Box */}
          <div style={{ border: `2px solid ${INK}`, padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase', color: RED, marginBottom: '16px' }}>PROJECT DETAILS</p>

            {[
              ['Client', 'Estrela Photo'],
              ['Year', '2023'],
              ['Services', 'Portfolio Web Design'],
              ['Tech Stack', 'HTML, CSS, JavaScript'],
              ['Industry', 'Photography'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${RULE}`, padding: '8px 0' }}>
                <span style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.15em', color: FADE }}>{label}</span>
                <span style={{ fontFamily: F, fontSize: '0.9rem', color: INK }}>{value}</span>
              </div>
            ))}

            <div style={{ marginTop: '16px' }}>
              <a href="https://estrela.photo/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: RED, textDecoration: 'none', borderBottom: `1px solid ${RED}` }}>
                Visit Live Site &rarr;
              </a>
            </div>
          </div>

          {/* Quote Box */}
          <div style={{ border: `4px double ${INK}`, padding: '24px' }}>
            <p style={{ fontFamily: P, fontSize: 'clamp(1rem,2vw,1.3rem)', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '12px' }}>
              &ldquo;The new site does what my photos do — it captures attention instantly and doesn't let go.&rdquo;
            </p>
            <p style={{ fontFamily: E, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE }}>
              &mdash; Estrela Photo
            </p>
          </div>
        </div>
      </div>

      <div className="rule-h" style={{ margin: '32px 0' }} />

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <p style={{ fontFamily: F, fontSize: '1.1rem', fontStyle: 'italic', color: FADE, marginBottom: '16px' }}>
          Your work deserves a portfolio that converts.
        </p>
        <Link href="/#contact" style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
          Start a Project
        </Link>
      </div>

      <div className="rule-thin" style={{ margin: '24px 0' }} />

      {/* Prev / Next Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/work/javi-beat" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          &larr; Javi Beat
        </Link>
        <Link href="/work/manuel-kevsax" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: FADE, textDecoration: 'none' }}>
          Manuel KevSax &rarr;
        </Link>
      </div>
    </GazettePage>
  )
}
