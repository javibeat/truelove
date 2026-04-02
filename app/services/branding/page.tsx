import type { Metadata } from 'next'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, RULE } from '../../lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brand Identity Dubai — Logo & Branding · True Love Creative',
  description:
    'Premium brand identity design in Dubai. Logo design, brand strategy, visual systems, and brand guidelines from a studio that builds identities with substance.',
  keywords: [
    'brand identity Dubai',
    'logo design Dubai',
    'branding agency Dubai',
    'brand strategy UAE',
    'visual identity Dubai',
    'brand guidelines Dubai',
    'logo designer Dubai',
    'corporate identity Dubai',
    'brand design agency',
    'rebranding Dubai',
  ],
  alternates: { canonical: 'https://truelovecreative.es/services/branding' },
  openGraph: {
    title: 'Brand Identity Dubai — Logo & Branding · True Love Creative',
    description:
      'Logo design, brand strategy, visual systems and guidelines. Brand identity from a Dubai studio that builds with substance.',
    url: 'https://truelovecreative.es/services/branding',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'website',
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Brand Identity Dubai',
  description:
    'Premium brand identity design services in Dubai including logo design, brand strategy, visual systems, and comprehensive brand guidelines.',
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
  serviceType: 'Brand Identity Design',
  url: 'https://truelovecreative.es/services/branding',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does a brand identity package include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our standard package includes brand strategy and positioning, primary and secondary logo designs, colour palette, typography system, brand guidelines document, and a starter kit of templates. We tailor each package to the client.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does branding take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A full brand identity typically takes 4 to 6 weeks from kick-off to final delivery. The strategy phase takes one week, design exploration takes two weeks, and refinement plus guidelines takes one to two weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer brand strategy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every branding project starts with strategy. We define your audience, positioning, tone of voice, and competitive differentiation before touching a single pixel. Strategy without design is a document. Design without strategy is decoration.',
      },
    },
  ],
}

export default function BrandingPage() {
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
        sectionNum="IV"
        title="Brand"
        titleAccent="Identity"
        subtitle="Logos are the tip of the iceberg. We build the whole iceberg."
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
              A brand is not a logo. A brand is a promise — the sum of every
              interaction, every touchpoint, every feeling your audience has
              when they encounter you. We design the system that makes that
              promise consistent, recognisable, and impossible to ignore.
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
              We have built identities for DJs, restaurants, tech startups,
              photographers, and luxury service providers across Dubai and
              beyond. The common thread is substance — every brand we create
              has a reason to exist.
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
              Strategy <em style={{ color: RED }}>First</em>
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
              Before we design anything, we ask the uncomfortable questions.
              Who are you for? Who are you not for? What do you believe that
              your competitors do not? The answers shape every visual decision
              that follows.
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
                Philosophy
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
                Design without strategy is decoration.
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
                We do not decorate. We build systems that scale.
              </p>
            </div>
          </div>
        </div>

        <div className="rule-thin" style={{ margin: '16px 0' }} />

        {/* ── What's Included ── */}
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
            What&apos;s <em style={{ color: RED }}>Included</em>
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
                title: 'Brand Strategy',
                text: 'Audience definition, competitive positioning, brand personality, tone of voice, and core messaging. The foundation everything else is built on.',
              },
              {
                title: 'Logo System',
                text: 'Primary logo, secondary mark, favicon, and responsive variations. Designed to work at every size — from a billboard to an app icon.',
              },
              {
                title: 'Visual Identity',
                text: 'Colour palette with Pantone and hex codes, typography system with primary and secondary typefaces, photography direction, and pattern/texture library.',
              },
              {
                title: 'Brand Guidelines',
                text: 'A comprehensive document that ensures consistency long after we are done. Logo usage rules, spacing, colour applications, do and do-not examples, and templates.',
              },
            ].map((item) => (
              <div key={item.title} style={{ padding: '16px 0' }}>
                <h3
                  style={{
                    fontFamily: P,
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: INK,
                    marginBottom: '8px',
                  }}
                >
                  {item.title}
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
                  {item.text}
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
            The <em style={{ color: RED }}>Process</em>
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
              {
                num: '01',
                title: 'Immersion',
                text: 'We study your industry, your competitors, and your audience. We interview you. We absorb everything before forming an opinion.',
              },
              {
                num: '02',
                title: 'Strategy',
                text: 'We define your positioning, personality, and messaging framework. This becomes the brief that guides all creative work.',
              },
              {
                num: '03',
                title: 'Design Exploration',
                text: 'We present 2 to 3 distinct creative directions — not variations of the same idea, but genuinely different approaches to your identity.',
              },
              {
                num: '04',
                title: 'Refinement & Delivery',
                text: 'The chosen direction is refined, systematised, and documented in a brand guidelines package you can hand to any designer or printer.',
              },
            ].map((step) => (
              <div key={step.num} style={{ padding: '16px 0' }}>
                <span
                  style={{
                    fontFamily: E,
                    fontSize: '9px',
                    letterSpacing: '.3em',
                    color: RED,
                  }}
                >
                  WEEK {step.num}
                </span>
                <h3
                  style={{
                    fontFamily: P,
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: INK,
                    marginTop: '4px',
                  }}
                >
                  {step.title}
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
                  {step.text}
                </p>
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
              q: 'What does a brand identity package include?',
              a: 'Our standard package includes brand strategy and positioning, primary and secondary logo designs, colour palette, typography system, brand guidelines document, and a starter kit of templates. We tailor each package to the client.',
            },
            {
              q: 'How long does branding take?',
              a: 'A full brand identity typically takes 4 to 6 weeks from kick-off to final delivery. The strategy phase takes one week, design exploration takes two weeks, and refinement plus guidelines takes one to two weeks.',
            },
            {
              q: 'Do you offer brand strategy?',
              a: 'Yes. Every branding project starts with strategy. We define your audience, positioning, tone of voice, and competitive differentiation before touching a single pixel. Strategy without design is a document. Design without strategy is decoration.',
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
            Your brand deserves more than a <em style={{ color: RED }}>logo</em>.
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
            Let us build an identity that works as hard as you do.
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
            Start Your Brand
          </Link>
        </div>
      </GazettePage>
    </>
  )
}
