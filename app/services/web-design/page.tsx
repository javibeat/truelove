import type { Metadata } from 'next'
import PageShell from '../../components/PageShell'
import { ServiceIntro, StepRows, CapabilityList, FaqAccordion } from '../../components/ServiceSections'
import { LOVE } from '../../lib/constants'

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

const steps = [
  {
    num: '01',
    title: 'Discovery',
    text: 'We start by understanding your business, your audience, and your goals. No assumptions, just questions until we see the full picture.',
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
    text: 'DNS, SSL, analytics, structured data: we handle the details. Post-launch, we stay on call for edits and enhancements.',
  },
]

const buildItems = [
  'Portfolio & personal sites',
  'E-commerce & booking platforms',
  'Landing pages & microsites',
  'Artist & musician websites',
  'SaaS dashboards & web apps',
  'Restaurant & hospitality sites',
]

const faqs = [
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
]

const stack: [string, string][] = [
  ['Framework', 'Next.js + React'],
  ['Language', 'TypeScript'],
  ['Styling', 'Tailwind CSS'],
  ['Hosting', 'Vercel edge network'],
]

export default function WebDesignPage() {
  return (
    <PageShell
      title="Web Design"
      subtitle="Custom websites that perform as good as they look. Built in Dubai since 2015."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceIntro
        lede="Your website is not a brochure. It is your hardest-working employee: selling, explaining and representing you 24 hours a day."
        body="We do not use templates. We do not drag and drop. Every site we deliver is a bespoke piece of engineering, hand-coded, rigorously tested, and built for speed."
        aside={
          <dl style={{ margin: 0 }}>
            {stack.map(([k, v]) => (
              <div key={k} className="detail-row">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '20px', marginTop: '4px' }}>
              <div className="mega" style={{ fontSize: 'clamp(2rem,3.6vw,3rem)' }}>
                100<span style={{ color: LOVE }}>/</span>100
              </div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '6px' }}>
                Lighthouse score. We treat anything below perfect as a bug.
              </p>
            </div>
          </dl>
        }
      />

      <StepRows heading={<>Our process<span style={{ color: LOVE }}>.</span></>} steps={steps} />

      <CapabilityList heading="What we build." items={buildItems} />

      <FaqAccordion heading="Frequently asked questions." faqs={faqs} />
    </PageShell>
  )
}
