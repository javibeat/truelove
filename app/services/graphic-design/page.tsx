import type { Metadata } from 'next'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, RULE } from '../../lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Graphic Design Dubai — Visual Identity · True Love Creative',
  description:
    'Premium graphic design in Dubai. Vinyl covers, event flyers, social media visuals, and brand collateral from a studio that lives inside the music and nightlife scene.',
  keywords: [
    'graphic design Dubai',
    'vinyl cover design Dubai',
    'album artwork Dubai',
    'event flyer design Dubai',
    'social media design Dubai',
    'brand visuals UAE',
    'music artwork Dubai',
    'poster design Dubai',
    'creative studio Dubai',
    'nightlife graphic design',
  ],
  alternates: { canonical: 'https://truelovecreative.es/services/graphic-design' },
  openGraph: {
    title: 'Graphic Design Dubai — Visual Identity · True Love Creative',
    description:
      'Vinyl covers, event flyers, social media visuals and brand collateral. Graphic design from a Dubai studio embedded in the music scene.',
    url: 'https://truelovecreative.es/services/graphic-design',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'website',
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Graphic Design Dubai',
  description:
    'Premium graphic design services in Dubai including vinyl cover art, event flyers, social media visuals, and brand collateral.',
  provider: {
    '@type': 'ProfessionalService',
    name: 'True Love Creative',
    url: 'https://truelovecreative.es',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
  },
  areaServed: { '@type': 'City', name: 'Dubai' },
  serviceType: 'Graphic Design',
  url: 'https://truelovecreative.es/services/graphic-design',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of graphic design do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We specialise in vinyl and album cover art, event flyers and posters, social media content systems, brand collateral, editorial layouts, and merchandise design. If it is visual and it matters, we design it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you design vinyl/album covers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We have designed covers for internationally released records including collaborations with Grammy-nominated artists. We understand print specifications, Pantone requirements, and the creative expectations of the music industry.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with event promoters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We work with promoters, venues, and artists across Dubai and internationally. From weekly residency flyers to full festival campaigns, we deliver on tight timelines without cutting corners on quality.',
      },
    },
  ],
}

export default function GraphicDesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <GazettePage
        section="Services"
        sectionNum="II"
        title="Graphic"
        titleAccent="Design"
        subtitle="Vinyl covers, event flyers, and visual systems for artists who refuse to blend in."
      >
        {/* ── Intro ── */}
        <div
          className="grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            padding: '24px 0',
          }}
        >
          <div>
            <p
              className="fell dropcap"
              style={{
                fontFamily: F,
                fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
                lineHeight: 1.7,
                color: INK,
              }}
            >
              We come from the music industry. We have spent over a decade
              inside Dubai&apos;s nightlife, studio, and events scene — not as
              observers, but as participants. That context is impossible to fake
              and it shows in everything we design.
            </p>
            <p
              className="fell"
              style={{
                fontFamily: F,
                fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                lineHeight: 1.7,
                color: INK,
                marginTop: '16px',
              }}
            >
              From the texture of a vinyl sleeve to the urgency of a last-minute
              flyer, we know what works — because we have lived it.
            </p>
          </div>
          <div>
            <h2
              style={{
                fontFamily: P,
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontWeight: 900,
                color: INK,
                marginBottom: '12px',
              }}
            >
              We Don&apos;t Do <em style={{ color: RED }}>Average</em>
            </h2>
            <p
              className="fell"
              style={{
                fontFamily: F,
                fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                lineHeight: 1.7,
                color: INK,
              }}
            >
              Every project gets the same attention whether it is a global
              release or a Tuesday night event. We approach graphic design the
              way a musician approaches a set — with intention, energy, and
              respect for the audience.
            </p>
            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                border: `1px solid ${RULE}`,
                background: 'rgba(26,18,8,0.02)',
              }}
            >
              <span
                style={{
                  fontFamily: E,
                  fontSize: '8px',
                  letterSpacing: '.25em',
                  textTransform: 'uppercase',
                  color: FADE,
                }}
              >
                Notable Work
              </span>
              <p
                style={{
                  fontFamily: P,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: RED,
                  marginTop: '4px',
                }}
              >
                Buika x Kiko Navarro — Vinyl Covers
              </p>
              <p
                className="fell"
                style={{
                  fontFamily: F,
                  fontSize: '0.85rem',
                  color: FADE,
                  fontStyle: 'italic',
                  marginTop: '4px',
                }}
              >
                Artwork for internationally released records with Grammy-nominated artists.
              </p>
            </div>
          </div>
        </div>

        <div className="rule-thin" style={{ margin: '16px 0' }} />

        {/* ── Services ── */}
        <div style={{ padding: '24px 0' }}>
          <h2
            style={{
              fontFamily: P,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 900,
              color: INK,
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            What We <em style={{ color: RED }}>Create</em>
          </h2>
          <div
            className="grid-2"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
            }}
          >
            {[
              {
                title: 'Vinyl & Album Covers',
                text: 'Artwork that holds its own next to the music. We handle concept, illustration, typography, and print-ready production for physical and digital releases.',
              },
              {
                title: 'Event Flyers & Posters',
                text: 'Bold, scroll-stopping visuals for club nights, festivals, residencies, and pop-ups. Designed for Instagram grids, stories, print, and LED screens.',
              },
              {
                title: 'Social Media Systems',
                text: 'Not one-off posts — entire visual systems. Templates, grids, story frameworks, and content calendars that keep your brand consistent across platforms.',
              },
              {
                title: 'Brand Collateral',
                text: 'Business cards, letterheads, presentation decks, menus, signage, and packaging. Every touchpoint reinforces your identity.',
              },
            ].map((service) => (
              <div key={service.title} style={{ padding: '16px 0' }}>
                <h3
                  style={{
                    fontFamily: P,
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: INK,
                    marginBottom: '8px',
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="fell"
                  style={{
                    fontFamily: F,
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: INK,
                  }}
                >
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rule-thin" style={{ margin: '16px 0' }} />

        {/* ── Process ── */}
        <div style={{ padding: '24px 0' }}>
          <h2
            style={{
              fontFamily: P,
              fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
              fontWeight: 900,
              color: INK,
              marginBottom: '16px',
            }}
          >
            How It <em style={{ color: RED }}>Works</em>
          </h2>
          <div
            className="grid-2"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            {[
              { num: '01', label: 'Brief — You tell us what you need and when you need it.' },
              { num: '02', label: 'Concepts — We present 2 to 3 directions within 48 hours.' },
              { num: '03', label: 'Refinement — One round of revisions is included; most clients need zero.' },
              { num: '04', label: 'Delivery — Final files in every format you will ever need.' },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'baseline',
                  padding: '10px 0',
                  borderBottom: `1px solid ${RULE}`,
                }}
              >
                <span
                  style={{
                    fontFamily: E,
                    fontSize: '9px',
                    letterSpacing: '.2em',
                    color: RED,
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </span>
                <span
                  className="fell"
                  style={{ fontFamily: F, fontSize: '1rem', color: INK }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rule-h" style={{ margin: '24px 0' }} />

        {/* ── FAQ ── */}
        <div style={{ padding: '24px 0' }}>
          <h2
            style={{
              fontFamily: P,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 900,
              color: INK,
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            Frequently Asked <em style={{ color: RED }}>Questions</em>
          </h2>
          {[
            {
              q: 'What types of graphic design do you offer?',
              a: 'We specialise in vinyl and album cover art, event flyers and posters, social media content systems, brand collateral, editorial layouts, and merchandise design. If it is visual and it matters, we design it.',
            },
            {
              q: 'Can you design vinyl/album covers?',
              a: 'Absolutely. We have designed covers for internationally released records including collaborations with Grammy-nominated artists. We understand print specifications, Pantone requirements, and the creative expectations of the music industry.',
            },
            {
              q: 'Do you work with event promoters?',
              a: 'Yes. We work with promoters, venues, and artists across Dubai and internationally. From weekly residency flyers to full festival campaigns, we deliver on tight timelines without cutting corners on quality.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              style={{
                padding: '16px 0',
                borderBottom: `1px solid ${RULE}`,
              }}
            >
              <h3
                style={{
                  fontFamily: P,
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: INK,
                }}
              >
                {faq.q}
              </h3>
              <p
                className="fell"
                style={{
                  fontFamily: F,
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: INK,
                  marginTop: '8px',
                }}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="rule-h" style={{ margin: '24px 0' }} />

        {/* ── CTA ── */}
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <p
            style={{
              fontFamily: P,
              fontSize: 'clamp(1.3rem, 3vw, 2rem)',
              fontWeight: 900,
              color: INK,
            }}
          >
            Have a vision? We will <em style={{ color: RED }}>make it visible</em>.
          </p>
          <p
            className="fell"
            style={{
              fontFamily: F,
              fontSize: '1rem',
              fontStyle: 'italic',
              color: FADE,
              marginTop: '8px',
            }}
          >
            Send us a brief. Turnaround is faster than you think.
          </p>
          <Link
            href="/#contact"
            style={{
              display: 'inline-block',
              marginTop: '20px',
              fontFamily: E,
              fontSize: '10px',
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: RED,
              border: `2px solid ${RED}`,
              padding: '12px 32px',
              textDecoration: 'none',
              transition: 'all .2s',
            }}
          >
            Start a Project
          </Link>
        </div>
      </GazettePage>
    </>
  )
}
