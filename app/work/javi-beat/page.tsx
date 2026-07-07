import type { Metadata } from 'next'
import CaseStudy from '../../components/CaseStudy'

export const metadata: Metadata = {
  title: 'Javi Beat — Identity Case Study | True Love Creative',
  description: 'How we crafted the brand identity and web presence for Javi Beat, a Dubai-based DJ building a distinctive visual language for the international circuit.',
  alternates: { canonical: 'https://truelovecreative.es/work/javi-beat' },
  openGraph: {
    title: 'Javi Beat — Identity Case Study',
    description: 'DJ identity and digital presence built for the international stage.',
    url: 'https://truelovecreative.es/work/javi-beat',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'article',
    images: ['/img/portfolios/javibeat.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Javi Beat — Identity Case Study',
    description: 'DJ identity and digital presence built for the international stage.',
    images: ['/img/portfolios/javibeat.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Javi Beat — Identity Case Study',
  description: 'How we crafted the brand identity and web presence for Javi Beat, a Dubai-based DJ.',
  url: 'https://truelovecreative.es/work/javi-beat',
  image: 'https://truelovecreative.es/img/portfolios/javibeat.jpg',
  datePublished: '2024-01-01',
  author: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  about: { '@type': 'Person', name: 'Javi Beat' },
}

export default function JaviBeatPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy
        title="Javi"
        accent="Beat"
        subtitle="Forging a visual identity for a DJ who has called Dubai home for over a decade, and the world his dancefloor."
        hero="/img/portfolios/javibeat.jpg"
        heroAlt="Javi Beat identity design by True Love Creative"
        details={[
          ['Client', 'Javi Beat'],
          ['Year', '2024'],
          ['Services', 'Identity & Web Design'],
          ['Tech Stack', 'HTML, CSS, JavaScript'],
          ['Industry', 'Music / DJing'],
        ]}
        liveUrl="https://javibeat.com/"
        sections={[
          {
            label: 'The client',
            body: "Javi Beat is a Spanish DJ and selector who has been a fixture of Dubai's electronic music scene for more than a decade. Known for eclectic sets that weave house, Afro-Latin grooves, and disco into seamless journeys, Javi has performed at some of the city's most prestigious venues and private events. His sound is warm, rhythmic, and impossible to sit still to.",
          },
          {
            label: 'The challenge',
            body: 'Despite a strong reputation on the ground, Javi lacked a cohesive visual identity. His logo, social templates, and online presence were inconsistent, making it difficult for promoters and brands to quickly understand his positioning. The brief was clear: create an identity system that feels as polished as his performances.',
          },
          {
            label: 'Our approach',
            body: 'We developed a complete identity package, logo, typographic system, colour palette, and a suite of social media templates. The design language draws on vintage record label aesthetics crossed with modern minimalism: bold serif typography, a restrained palette of ink-black and warm cream, with accents of deep red. The website was built as a fast, elegant one-page experience with integrated music players, a booking form, and a photo gallery.',
          },
          {
            label: 'The result',
            body: "A unified brand that travels. Whether it's an Instagram story, an EPK sent to a festival, or the homepage itself, every touchpoint now speaks with the same confident voice. Javi's booking enquiries have grown steadily, and the brand has become instantly recognisable across Dubai's nightlife circuit.",
          },
        ]}
        quote={{
          text: 'Finally, a brand that feels like who I am behind the decks, refined, bold, and unmistakably personal.',
          by: 'Javi Beat',
        }}
        prev={{ name: 'Jessica Morari', slug: 'jessica-morari' }}
        next={{ name: 'Estrela Photo', slug: 'estrela-photo' }}
      />
    </>
  )
}
