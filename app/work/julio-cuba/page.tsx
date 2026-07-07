import type { Metadata } from 'next'
import CaseStudy from '../../components/CaseStudy'

export const metadata: Metadata = {
  title: 'Julio Cuba — Identity Case Study | True Love Creative',
  description: 'How we designed the artistic identity and portfolio for Julio Cuba, a virtuoso violinist performing at luxury events across Europe and the Middle East.',
  alternates: { canonical: 'https://truelovecreative.es/work/julio-cuba' },
  openGraph: {
    title: 'Julio Cuba — Identity Case Study',
    description: 'Artistic identity for a virtuoso violinist on the international stage.',
    url: 'https://truelovecreative.es/work/julio-cuba',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'article',
    images: ['/img/portfolios/julio.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julio Cuba — Identity Case Study',
    description: 'Artistic identity for a virtuoso violinist on the international stage.',
    images: ['/img/portfolios/julio.webp'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Julio Cuba — Identity Case Study',
  description: 'How we designed the artistic identity and portfolio for Julio Cuba, a virtuoso violinist.',
  url: 'https://truelovecreative.es/work/julio-cuba',
  image: 'https://truelovecreative.es/img/portfolios/julio.webp',
  datePublished: '2024-01-01',
  author: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  about: { '@type': 'Person', name: 'Julio Cuba' },
}

export default function JulioCubaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy
        title="Julio"
        accent="Cuba"
        subtitle="An artistic identity and digital portfolio for a violinist whose performances turn moments into memories."
        hero="/img/portfolios/julio.webp"
        heroAlt="Julio Cuba identity and portfolio by True Love Creative"
        details={[
          ['Client', 'Julio Cuba'],
          ['Year', '2024'],
          ['Services', 'Identity & Web Design'],
          ['Tech Stack', 'HTML, CSS, JavaScript'],
          ['Industry', 'Music / Performing Arts'],
        ]}
        liveUrl="https://juliocuba.es/"
        sections={[
          {
            label: 'The client',
            body: 'Julio Cuba is a Cuban-born violinist whose performances transcend genre, from classical recitals and tango evenings to high-energy collaborations with DJs at luxury events. Now based between Spain and Dubai, Julio brings a raw emotional intensity to every stage he graces. His playing is the kind that stops conversations and fills rooms with goosebumps.',
          },
          {
            label: 'The challenge',
            body: "Julio's artistry is deeply emotional and physical, translating that into a digital experience was the core challenge. He needed a brand identity that felt as passionate as his playing, not corporate or clinical. Additionally, he required a bilingual platform (Spanish and English) that could serve both European and Gulf-based audiences.",
          },
          {
            label: 'Our approach',
            body: "We crafted an identity rooted in contrast, the precision of classical music meets the spontaneity of improvisation. The logo plays with negative space, suggesting both a bow stroke and a musical note. The colour palette draws from concert-hall warmth: deep blacks, antique golds, and parchment whites. The website features full-screen performance photography, embedded video, and an elegant repertoire section that showcases Julio's range. Every detail was designed to make the visitor feel as though they've just stepped into a private recital.",
          },
          {
            label: 'The result',
            body: "An identity and website that resonate with the same emotion as Julio's music. The new brand has elevated his positioning in the luxury events market, and the site serves as a powerful introduction for agents and event planners who discover him online. It's art, not just a website, and that's exactly the point.",
          },
        ]}
        quote={{
          text: "They didn't just design a website, they understood my music and turned it into something you can see and feel.",
          by: 'Julio Cuba',
        }}
        prev={{ name: 'Sergio Trumpet', slug: 'sergio-trumpet' }}
        next={{ name: 'Kiko Navarro', slug: 'kiko-navarro' }}
      />
    </>
  )
}
