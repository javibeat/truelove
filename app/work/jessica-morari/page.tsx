import type { Metadata } from 'next'
import CaseStudy from '../../components/CaseStudy'

export const metadata: Metadata = {
  title: 'Jessica Morari — Branding & Web Case Study | True Love Creative',
  description: 'How we built the brand identity and website for Jessica Morari, a Dubai-based coaching and wellness professional. Branding case study by True Love Creative.',
  alternates: { canonical: 'https://truelovecreative.es/work/jessica-morari' },
  openGraph: {
    title: 'Jessica Morari — Branding & Web Case Study',
    description: 'Brand identity and web platform for a coaching & wellness professional.',
    url: 'https://truelovecreative.es/work/jessica-morari',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'article',
    images: ['/img/portfolios/jesslnk.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jessica Morari — Branding & Web Case Study',
    description: 'Brand identity and web platform for a coaching & wellness professional.',
    images: ['/img/portfolios/jesslnk.webp'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Jessica Morari — Branding & Web Case Study',
  description: 'How we built the brand identity and website for Jessica Morari, a Dubai-based coaching and wellness professional.',
  url: 'https://truelovecreative.es/work/jessica-morari',
  image: 'https://truelovecreative.es/img/portfolios/jesslnk.webp',
  datePublished: '2023-01-01',
  author: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  about: { '@type': 'Person', name: 'Jessica Morari' },
}

export default function JessicaMorariPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy
        title="Jessica"
        accent="Morari"
        subtitle="A cohesive brand and digital platform for a coaching professional redefining wellness in the UAE."
        hero="/img/portfolios/jesslnk.webp"
        heroAlt="Jessica Morari branding and website by True Love Creative"
        details={[
          ['Client', 'Jessica Morari'],
          ['Year', '2023'],
          ['Services', 'Branding & Web Design'],
          ['Tech Stack', 'WordPress, Custom Theme'],
          ['Industry', 'Coaching / Wellness'],
        ]}
        liveUrl="https://jessicamorari.com/"
        sections={[
          {
            label: 'The client',
            body: 'Jessica Morari is a certified life coach and wellness practitioner based in Dubai. Her practice blends psychological insight with holistic methods, helping individuals and corporate teams unlock clarity, resilience, and purpose. With a growing client base across the Gulf and Europe, Jessica needed a brand that could match the sophistication of her work.',
          },
          {
            label: 'The challenge',
            body: "Jessica's previous branding was fragmented, different visual languages across social media, print materials, and an outdated website. She needed a unified identity that communicated credibility and warmth in equal measure, alongside a digital hub to handle bookings, testimonials, and content marketing.",
          },
          {
            label: 'Our approach',
            body: "We began with a full brand audit and strategy session, defining Jessica's tone of voice, colour palette, and typographic system. The resulting identity balances softness with strength, muted earth tones, refined serif typography, and clean compositions. The website was designed as a conversion-focused platform with integrated scheduling, a blog framework, and responsive layouts optimised for mobile-first audiences.",
          },
          {
            label: 'The result',
            body: 'A polished, cohesive brand system and a high-performing website that positions Jessica as a premium practitioner. Enquiry volume increased significantly within the first quarter, and the new identity now extends seamlessly across all touchpoints, from LinkedIn to printed workshop materials.',
          },
        ]}
        quote={{
          text: 'They understood my vision from day one. The brand feels authentic, elegant, and unmistakably mine.',
          by: 'Jessica Morari',
        }}
        prev={{ name: 'Kiko Navarro', slug: 'kiko-navarro' }}
        next={{ name: 'Javi Beat', slug: 'javi-beat' }}
      />
    </>
  )
}
