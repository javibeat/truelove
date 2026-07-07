import type { Metadata } from 'next'
import CaseStudy from '../../components/CaseStudy'

export const metadata: Metadata = {
  title: 'Manuel KevSax — Web Design Case Study | True Love Creative',
  description: 'How we designed manuelkevsax.com — a luxury web experience for Dubai&apos;s premier saxophonist, built for high-end bookings and brand partnerships.',
  alternates: { canonical: 'https://truelovecreative.es/work/manuel-kevsax' },
  openGraph: {
    title: 'Manuel KevSax — Web Design Case Study',
    description: 'A luxury web experience for Dubai&apos;s premier saxophonist.',
    url: 'https://truelovecreative.es/work/manuel-kevsax',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'article',
    images: ['/img/portfolios/manusax.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manuel KevSax — Web Design Case Study',
    description: 'A luxury web experience for Dubai\'s premier saxophonist.',
    images: ['/img/portfolios/manusax.webp'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Manuel KevSax — Web Design Case Study',
  description: 'How we designed manuelkevsax.com — a luxury web experience for Dubai\'s premier saxophonist.',
  url: 'https://truelovecreative.es/work/manuel-kevsax',
  image: 'https://truelovecreative.es/img/portfolios/manusax.webp',
  datePublished: '2024-01-01',
  author: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  about: { '@type': 'Person', name: 'Manuel KevSax' },
}

export default function ManuelKevSaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy
        title="Manuel"
        accent="KevSax"
        subtitle="A luxury digital presence for a saxophonist who performs at the world's most exclusive stages."
        hero="/img/portfolios/manusax.webp"
        heroAlt="Manuel KevSax website design by True Love Creative"
        details={[
          ['Client', 'Manuel KevSax'],
          ['Year', '2024'],
          ['Services', 'Web Design & Development'],
          ['Tech Stack', 'HTML, CSS, JavaScript'],
          ['Industry', 'Music / Entertainment'],
        ]}
        liveUrl="https://manuelkevsax.com/"
        sections={[
          {
            label: 'The client',
            body: "Manuel KevSax is a luxury saxophonist and live performer based in Dubai, regularly appearing at five-star hotels, yacht parties, fashion shows, and corporate galas across the Gulf. His performances blend jazz, deep house, and electronic grooves into an unforgettable live experience. Manuel's client list reads like a who's-who of premium hospitality and international brands.",
          },
          {
            label: 'The challenge',
            body: 'Manuel needed a website that could serve as both a showcase and a sales tool, something event planners and brand managers could browse in seconds and immediately understand the calibre of his offering. The site had to feel luxurious without being heavy, and it needed to convert high-intent visitors into direct bookings.',
          },
          {
            label: 'Our approach',
            body: "We designed a cinematic, scroll-driven experience anchored by full-bleed video and photography. The site architecture is deliberately lean, hero, highlights reel, testimonials, and a direct booking enquiry, to respect the time-poor decision-makers who form Manuel's core audience. Gold and black accents reinforce the luxury positioning, while embedded audio samples let visitors experience the performance before making contact.",
          },
          {
            label: 'The result',
            body: 'A sleek, fast-loading website that positions Manuel at the top of the luxury entertainment market. The site has become his primary booking channel, with event planners frequently citing it as the deciding factor. Enquiry quality improved markedly, the site pre-qualifies visitors, attracting precisely the calibre of client Manuel wants to work with.',
          },
        ]}
        quote={{
          text: "Event managers tell me the website sold them before they even heard me play. That's exactly what I wanted.",
          by: 'Manuel KevSax',
        }}
        prev={{ name: 'Estrela Photo', slug: 'estrela-photo' }}
        next={{ name: 'Sergio Trumpet', slug: 'sergio-trumpet' }}
      />
    </>
  )
}
