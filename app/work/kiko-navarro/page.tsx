import type { Metadata } from 'next'
import CaseStudy from '../../components/CaseStudy'

export const metadata: Metadata = {
  title: 'Kiko Navarro — Web Design Case Study | True Love Creative',
  description: 'How we designed and built kikonavarro.es — a premium web presence for legendary Ibiza DJ and producer Kiko Navarro. Web design case study by True Love Creative, Dubai.',
  alternates: { canonical: 'https://truelovecreative.es/work/kiko-navarro' },
  openGraph: {
    title: 'Kiko Navarro — Web Design Case Study',
    description: 'A premium web presence for the legendary DJ & producer.',
    url: 'https://truelovecreative.es/work/kiko-navarro',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'article',
    images: ['/img/portfolios/kikonavarro.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiko Navarro — Web Design Case Study',
    description: 'A premium web presence for the legendary DJ & producer.',
    images: ['/img/portfolios/kikonavarro.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Kiko Navarro — Web Design Case Study',
  description: 'How we designed and built kikonavarro.es — a premium web presence for legendary Ibiza DJ and producer Kiko Navarro.',
  url: 'https://truelovecreative.es/work/kiko-navarro',
  image: 'https://truelovecreative.es/img/portfolios/kikonavarro.jpg',
  datePublished: '2024-01-01',
  author: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  about: { '@type': 'Person', name: 'Kiko Navarro' },
}

export default function KikoNavarroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy
        title="Kiko"
        accent="Navarro"
        subtitle="A digital stage worthy of a legend. Web design for one of house music's most revered artists."
        hero="/img/portfolios/kikonavarro.jpg"
        heroAlt="Kiko Navarro website design by True Love Creative"
        details={[
          ['Client', 'Kiko Navarro'],
          ['Year', '2024'],
          ['Services', 'Web Design & Development'],
          ['Tech Stack', 'HTML, CSS, JavaScript'],
          ['Industry', 'Music / Entertainment'],
        ]}
        liveUrl="https://kikonavarro.es/"
        sections={[
          {
            label: 'The client',
            body: 'Kiko Navarro is a name that needs no introduction in the world of deep house, Afro-Latin, and soulful electronic music. With a career spanning over three decades, releases on Defected, BBE, and Local Talk, and residencies across Ibiza and beyond, Kiko is one of the most respected selectors and producers alive. His music bridges continents, from the streets of Barcelona to the beaches of Bahia.',
          },
          {
            label: 'The challenge',
            body: "Kiko's existing online presence didn't reflect the depth and prestige of his career. He needed a single destination that could house his extensive discography, upcoming tour dates, press kit, and booking information, all wrapped in a visual language that felt as warm and soulful as his music.",
          },
          {
            label: 'Our approach',
            body: "We designed a bold, immersive single-page experience with rich photography, integrated Spotify and SoundCloud players, and a clean tour-date module. The visual direction draws on vinyl sleeve aesthetics, warm tones, generous typography, and tactile textures that echo the analogue roots of Kiko's sound. Every interaction was crafted to feel effortless, so the music always takes centre stage.",
          },
          {
            label: 'The result',
            body: "A refined, performance-optimised website that serves as Kiko's global hub, unifying his releases, tour calendar, and brand identity. The site has become the go-to reference for promoters and press worldwide, reinforcing his status as one of the genre's true originals.",
          },
        ]}
        quote={{
          text: 'The site captures everything, my music, my story, my vibe. It finally feels like me.',
          by: 'Kiko Navarro',
        }}
        prev={{ name: 'Julio Cuba', slug: 'julio-cuba' }}
        next={{ name: 'Jessica Morari', slug: 'jessica-morari' }}
      />
    </>
  )
}
