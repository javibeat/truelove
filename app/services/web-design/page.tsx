import type { Metadata } from 'next'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, RULE } from '../../lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Web Design Dubai — Custom Websites · True Love Creative',
  description:
    'Premium custom web design in Dubai. We build high-performance websites with Next.js, React & Tailwind CSS. Bespoke digital experiences since 2015.',
  keywords: [
    'web design Dubai',
    'custom website Dubai',
    'Next.js developer Dubai',
    'React developer Dubai',
    'website design UAE',
    'responsive web design',
    'Tailwind CSS Dubai',
    'web development agency Dubai',
    'ecommerce website Dubai',
    'landing page design Dubai',
  ],
  alternates: { canonical: 'https://truelovecreative.es/services/web-design' },
  openGraph: {
    title: 'Web Design Dubai — Custom Websites · True Love Creative',
    description:
      'Premium custom web design in Dubai. Bespoke digital experiences built with Next.js, React & Tailwind CSS.',
    url: 'https://truelovecreative.es/services/web-design',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Web Design Dubai',
      description:
        'Premium custom web design and development services in Dubai. High-performance websites built with Next.js, React, and Tailwind CSS.',
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
      serviceType: 'Web Design',
      url: 'https://truelovecreative.es/services/web-design',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does a website take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most projects are delivered in 4 to 8 weeks depending on complexity. A single-page portfolio may take 2 to 3 weeks, while a full e-commerce platform can take 8 to 12 weeks. We provide a detailed timeline before starting.',
          },
        },
        {
          '@type': 'Question',
          name: 'What technologies do you use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We build with Next.js, React, TypeScript, and Tailwind CSS. Our sites are deployed on Vercel for global edge performance. For CMS needs we integrate Sanity, Contentful, or headless WordPress.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer SEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every website we build includes technical SEO foundations: structured data, semantic HTML, Core Web Vitals optimization, meta tags, and XML sitemaps. We also offer ongoing SEO strategy as an add-on service.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does a website cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Projects start from AED 8,000 for a single-page site. Multi-page custom builds typically range from AED 15,000 to AED 50,000 depending on scope. We provide a fixed quote after a discovery call so there are no surprises.',
          },
        },
      ],
    },
  ],
}

export default function WebDesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <GazettePage
        section="Services"
        sectionNum="I"
        title="Web"
        titleAccent="Design"
        subtitle="Custom websites that perform as good as they look. Built in Dubai since 2015."
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
              Your website is not a brochure. It is your hardest-working
              employee — selling, explaining and representing you 24 hours a
              day, 7 days a week. We build websites that do justice to that
              responsibility. Every pixel is intentional. Every interaction is
              earned.
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
              We do not use templates. We do not drag and drop. Every site we
              deliver is a bespoke piece of engineering — hand-coded, rigorously
              tested, and built for speed.
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
              The <em style={{ color: RED }}>Stack</em>
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
              Next.js. React. TypeScript. Tailwind CSS. Deployed on Vercel&apos;s
              global edge network. This is the same technology behind the
              world&apos;s fastest websites — and now it powers yours.
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
                Performance Standard
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
                100 / 100 Lighthouse Score
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
                We treat anything below perfect as a bug.
              </p>
            </div>
          </div>
        </div>

        <div className="rule-thin" style={{ margin: '16px 0' }} />

        {/* ── Process ── */}
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
            Our <em style={{ color: RED }}>Process</em>
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
                num: '01',
                title: 'Discovery',
                text: 'We start by understanding your business, your audience, and your goals. No assumptions — just questions until we see the full picture.',
              },
              {
                num: '02',
                title: 'Design',
                text: 'Wireframes become high-fidelity mockups. You see exactly what you are getting before a single line of code is written.',
              },
              {
                num: '03',
                title: 'Development',
                text: 'Clean, semantic, performant code. We build component by component, testing on every device and browser as we go.',
              },
              {
                num: '04',
                title: 'Launch & Support',
                text: 'DNS, SSL, analytics, structured data — we handle the details. Post-launch, we stay on call for edits and enhancements.',
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
                  STEP {step.num}
                </span>
                <h3
                  style={{
                    fontFamily: P,
                    fontSize: '1.3rem',
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

        <div className="rule-thin" style={{ margin: '16px 0' }} />

        {/* ── What We Build ── */}
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
            What We <em style={{ color: RED }}>Build</em>
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
              'Portfolio & personal sites',
              'E-commerce & booking platforms',
              'Landing pages & microsites',
              'Artist & musician websites',
              'SaaS dashboards & web apps',
              'Restaurant & hospitality sites',
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'baseline',
                  padding: '8px 0',
                  borderBottom: `1px solid ${RULE}`,
                }}
              >
                <span style={{ fontFamily: E, fontSize: '9px', color: RED }}>
                  ✦
                </span>
                <span
                  className="fell"
                  style={{ fontFamily: F, fontSize: '1rem', color: INK }}
                >
                  {item}
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
              q: 'How long does a website take?',
              a: 'Most projects are delivered in 4 to 8 weeks depending on complexity. A single-page portfolio may take 2 to 3 weeks, while a full e-commerce platform can take 8 to 12 weeks. We provide a detailed timeline before starting.',
            },
            {
              q: 'What technologies do you use?',
              a: 'We build with Next.js, React, TypeScript, and Tailwind CSS. Our sites are deployed on Vercel for global edge performance. For CMS needs we integrate Sanity, Contentful, or headless WordPress.',
            },
            {
              q: 'Do you offer SEO?',
              a: 'Every website we build includes technical SEO foundations: structured data, semantic HTML, Core Web Vitals optimization, meta tags, and XML sitemaps. We also offer ongoing SEO strategy as an add-on service.',
            },
            {
              q: 'How much does a website cost?',
              a: 'Projects start from AED 8,000 for a single-page site. Multi-page custom builds typically range from AED 15,000 to AED 50,000 depending on scope. We provide a fixed quote after a discovery call so there are no surprises.',
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
            Ready to build something <em style={{ color: RED }}>real</em>?
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
            Tell us about your project. No commitment, no nonsense.
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
            Get in Touch
          </Link>
        </div>
      </GazettePage>
    </>
  )
}
