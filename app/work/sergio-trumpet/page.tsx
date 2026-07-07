import type { Metadata } from 'next'
import CaseStudy from '../../components/CaseStudy'

export const metadata: Metadata = {
  title: 'Sergio Trumpet — Portfolio Case Study | True Love Creative',
  description: 'How we designed sergiotrumpetdj.com — a dynamic portfolio for a professional trumpet player and DJ performing across the Middle East and Europe.',
  alternates: { canonical: 'https://truelovecreative.es/work/sergio-trumpet' },
  openGraph: {
    title: 'Sergio Trumpet — Portfolio Case Study',
    description: 'A dynamic portfolio for a trumpet player and DJ.',
    url: 'https://truelovecreative.es/work/sergio-trumpet',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'article',
    images: ['/img/portfolios/sergio.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sergio Trumpet — Portfolio Case Study',
    description: 'A dynamic portfolio for a trumpet player and DJ.',
    images: ['/img/portfolios/sergio.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Sergio Trumpet — Portfolio Case Study',
  description: 'How we designed sergiotrumpetdj.com — a dynamic portfolio for a professional trumpet player and DJ.',
  url: 'https://truelovecreative.es/work/sergio-trumpet',
  image: 'https://truelovecreative.es/img/portfolios/sergio.jpg',
  datePublished: '2024-01-01',
  author: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  about: { '@type': 'Person', name: 'Sergio Trumpet' },
}

export default function SergioTrumpetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy
        title="Sergio"
        accent="Trumpet"
        subtitle="A bold digital portfolio for a musician who brings the house down, trumpet in one hand, the crowd in the other."
        hero="/img/portfolios/sergio.jpg"
        heroAlt="Sergio Trumpet portfolio website by True Love Creative"
        details={[
          ['Client', 'Sergio Trumpet'],
          ['Year', '2024'],
          ['Services', 'Portfolio & Web Design'],
          ['Tech Stack', 'HTML, CSS, JavaScript'],
          ['Industry', 'Music / Entertainment'],
        ]}
        liveUrl="https://sergiotrumpetdj.com/"
        sections={[
          {
            label: 'The client',
            body: 'Sergio is a rare breed, a classically trained trumpet player who moonlights as a DJ, delivering hybrid live sets that fuse brass with electronic beats. Based between Dubai and Spain, he performs at beach clubs, rooftop bars, and private events, bringing a visceral energy that DJs alone simply cannot replicate. His sound is explosive, theatrical, and unforgettable.',
          },
          {
            label: 'The challenge',
            body: "Sergio's dual identity as both a trumpet player and a DJ made positioning tricky. The website needed to communicate both skills without diluting either, while also serving as a professional booking tool for venues and event agencies across multiple time zones. Previous online efforts were scattered across social media with no central hub.",
          },
          {
            label: 'Our approach',
            body: "We built a high-energy, video-forward portfolio that opens with a full-screen performance reel, immediately establishing Sergio's unique stage presence. The site architecture separates his trumpet and DJ work into distinct sections while maintaining a unified visual identity. Embedded video clips, a curated photo gallery, and a streamlined booking form create a complete experience that moves at the same tempo as his sets.",
          },
          {
            label: 'The result',
            body: 'A portfolio that lands with impact. Sergio now sends a single link to promoters and the site does the rest, showcasing his versatility, professionalism, and stage energy within seconds. International bookings have increased, and the site has become an essential part of his pitch to new venues and festival organisers.',
          },
        ]}
        quote={{
          text: 'People used to ask what I do. Now I send them the site and they book me on the spot.',
          by: 'Sergio Trumpet',
        }}
        prev={{ name: 'Manuel KevSax', slug: 'manuel-kevsax' }}
        next={{ name: 'Julio Cuba', slug: 'julio-cuba' }}
      />
    </>
  )
}
