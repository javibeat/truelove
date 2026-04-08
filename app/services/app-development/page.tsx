import type { Metadata } from 'next'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, RULE } from '../../lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'App Development Dubai — iOS & Android · True Love Creative',
  description:
    'Custom iOS and Android app development in Dubai. From concept to App Store, we build performant mobile experiences with React Native and native technologies.',
  keywords: [
    'app development Dubai',
    'iOS app developer Dubai',
    'Android app developer Dubai',
    'mobile app Dubai',
    'React Native Dubai',
    'app design UAE',
    'custom app development',
    'mobile UX design Dubai',
    'startup app Dubai',
    'app development agency UAE',
  ],
  alternates: { canonical: 'https://truelovecreative.es/services/app-development' },
  openGraph: {
    title: 'App Development Dubai — iOS & Android · True Love Creative',
    description:
      'Custom iOS and Android app development in Dubai. Performant mobile experiences from concept to App Store.',
    url: 'https://truelovecreative.es/services/app-development',
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
      name: 'App Development Dubai',
      description:
        'Custom iOS and Android mobile app development in Dubai. From concept and UX design to App Store deployment.',
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
      serviceType: 'App Development',
      url: 'https://truelovecreative.es/services/app-development',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do you build iOS and Android apps?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We build for both platforms. For most projects we use React Native, which allows us to ship a single codebase to both the App Store and Google Play without sacrificing performance or native feel.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is your development process?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We follow a four-phase process: Discovery and strategy, UX and UI design, development with iterative testing, and deployment with App Store optimisation. You are involved at every milestone.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does an app take to develop?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An MVP typically takes 8 to 14 weeks. A full-featured app with backend infrastructure, user authentication, and third-party integrations can take 4 to 6 months. We provide a detailed roadmap after the discovery phase.',
          },
        },
      ],
    },
  ],
}

export default function AppDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <GazettePage
        section="Services"
        sectionNum="III"
        title="App"
        titleAccent="Development"
        subtitle="From concept to App Store. Mobile experiences that people actually want to use."
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
              The app graveyard is full of technically sound products that nobody
              wanted to use. We start with the problem, not the technology. We
              design for humans first and write code second — because a beautiful
              interface on a broken idea is still a broken idea.
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
              We have taken apps from napkin sketches to the App Store. We know
              what it takes — and more importantly, we know what to cut.
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
              Case Study: <em style={{ color: RED }}>Nibango</em>
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
              Nibango is a community-driven mobile platform we designed and
              developed from the ground up — UX research, interface design,
              front-end and back-end architecture, and App Store deployment.
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
                Platform
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
                iOS + Android — React Native
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
                One codebase. Two platforms. Zero compromise.
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
            Development <em style={{ color: RED }}>Process</em>
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
                title: 'Discovery & Strategy',
                text: 'We map your users, your competitors, and your business model. We define the MVP scope ruthlessly — ship what matters, learn from real users, iterate.',
              },
              {
                num: '02',
                title: 'UX & UI Design',
                text: 'Wireframes, user flows, and high-fidelity prototypes. You interact with the app before it is built. We validate assumptions early so we do not waste your budget.',
              },
              {
                num: '03',
                title: 'Development & Testing',
                text: 'Agile sprints with bi-weekly demos. React Native for cross-platform efficiency, native modules where performance demands it. Continuous integration, automated testing.',
              },
              {
                num: '04',
                title: 'Launch & Growth',
                text: 'App Store and Google Play submission, ASO optimisation, analytics setup, crash monitoring. Post-launch, we iterate based on real user data.',
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
                  PHASE {step.num}
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

        {/* ── Capabilities ── */}
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
            Technical <em style={{ color: RED }}>Capabilities</em>
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
              'React Native cross-platform apps',
              'Native iOS (Swift) & Android (Kotlin)',
              'Backend APIs & database architecture',
              'Push notifications & real-time features',
              'Payment integration (Stripe, Apple Pay)',
              'Authentication & user management',
              'Maps, geolocation & GPS features',
              'App Store & Google Play deployment',
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
              q: 'Do you build iOS and Android apps?',
              a: 'Yes. We build for both platforms. For most projects we use React Native, which allows us to ship a single codebase to both the App Store and Google Play without sacrificing performance or native feel.',
            },
            {
              q: 'What is your development process?',
              a: 'We follow a four-phase process: Discovery and strategy, UX and UI design, development with iterative testing, and deployment with App Store optimisation. You are involved at every milestone.',
            },
            {
              q: 'How long does an app take to develop?',
              a: 'An MVP typically takes 8 to 14 weeks. A full-featured app with backend infrastructure, user authentication, and third-party integrations can take 4 to 6 months. We provide a detailed roadmap after the discovery phase.',
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
            Got an app idea? Let&apos;s make it <em style={{ color: RED }}>real</em>.
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
            We will tell you honestly if it is worth building — and exactly how to build it.
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
            Book a Discovery Call
          </Link>
        </div>
      </GazettePage>
    </>
  )
}
