import type { Metadata } from 'next'
import PageShell from '../../components/PageShell'
import { ServiceIntro, StepRows, FaqAccordion } from '../../components/ServiceSections'
import { LOVE } from '../../lib/constants'

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
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
    },
    {
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
    },
  ],
}

const included = [
  {
    title: 'Brand Strategy',
    text: 'Audience definition, competitive positioning, brand personality, tone of voice, and core messaging. The foundation everything else is built on.',
  },
  {
    title: 'Logo System',
    text: 'Primary logo, secondary mark, favicon, and responsive variations. Designed to work at every size, from a billboard to an app icon.',
  },
  {
    title: 'Visual Identity',
    text: 'Colour palette with Pantone and hex codes, typography system with primary and secondary typefaces, photography direction, and pattern/texture library.',
  },
  {
    title: 'Brand Guidelines',
    text: 'A comprehensive document that ensures consistency long after we are done. Logo usage rules, spacing, colour applications, do and do-not examples, and templates.',
  },
]

const process = [
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
    text: 'We present 2 to 3 distinct creative directions. Not variations of the same idea, but genuinely different approaches to your identity.',
  },
  {
    num: '04',
    title: 'Refinement & Delivery',
    text: 'The chosen direction is refined, systematised, and documented in a brand guidelines package you can hand to any designer or printer.',
  },
]

const faqs = [
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
]

export default function BrandingPage() {
  return (
    <PageShell
      title="Brand Identity"
      subtitle="Logos are the tip of the iceberg. We build the whole iceberg."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceIntro
        lede="A brand is not a logo. A brand is a promise: the sum of every interaction your audience has when they encounter you."
        body="We have built identities for DJs, restaurants, tech startups, photographers, and luxury service providers across Dubai and beyond. The common thread is substance. Every brand we create has a reason to exist."
        aside={
          <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '24px' }}>
            <p className="display" style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)', marginBottom: '14px' }}>
              Design without strategy is decoration<span style={{ color: LOVE }}>.</span>
            </p>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>
              Before we design anything, we ask the uncomfortable questions. Who are you for? Who are you not for? What do you believe that your competitors do not?
            </p>
          </div>
        }
      />

      {/* Deliverables — 2-col hairline grid */}
      <div style={{ paddingBottom: 'clamp(56px,8vw,110px)' }}>
        <h2 className="display reveal" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.2rem)', marginBottom: 'clamp(28px,4vw,48px)' }}>
          What&rsquo;s included<span style={{ color: LOVE }}>.</span>
        </h2>
        <div className="grid-2" style={{ gap: '0 clamp(24px,4vw,64px)' }}>
          {included.map(item => (
            <div key={item.title} className="reveal" style={{ padding: '24px 0', borderTop: '1px solid var(--hairline)' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 640, letterSpacing: '-0.01em', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <StepRows heading="The process, week by week." steps={process} />

      <FaqAccordion heading="Frequently asked questions." faqs={faqs} />
    </PageShell>
  )
}
