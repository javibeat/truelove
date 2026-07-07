import type { Metadata } from 'next'
import CaseStudy from '../../components/CaseStudy'

export const metadata: Metadata = {
  title: 'Estrela Photo — Portfolio Case Study | True Love Creative',
  description: 'How we designed estrela.photo — a refined portfolio website for a photography studio capturing life across the UAE. Case study by True Love Creative, Dubai.',
  alternates: { canonical: 'https://truelovecreative.es/work/estrela-photo' },
  openGraph: {
    title: 'Estrela Photo — Portfolio Case Study',
    description: 'A refined portfolio for a photography studio in the UAE.',
    url: 'https://truelovecreative.es/work/estrela-photo',
    siteName: 'True Love Creative',
    locale: 'en_US',
    type: 'article',
    images: ['/img/portfolios/estrela.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estrela Photo — Portfolio Case Study',
    description: 'A refined portfolio for a photography studio in the UAE.',
    images: ['/img/portfolios/estrela.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Estrela Photo — Portfolio Case Study',
  description: 'How we designed estrela.photo — a refined portfolio website for a photography studio capturing life across the UAE.',
  url: 'https://truelovecreative.es/work/estrela-photo',
  image: 'https://truelovecreative.es/img/portfolios/estrela.jpg',
  datePublished: '2023-01-01',
  author: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  about: { '@type': 'Organization', name: 'Estrela Photo' },
}

export default function EstrelaPhotoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy
        title="Estrela"
        accent="Photo"
        subtitle="A portfolio that lets the photographs speak. Clean, fast, and designed to convert browsers into clients."
        hero="/img/portfolios/estrela.jpg"
        heroAlt="Estrela Photo portfolio website by True Love Creative"
        details={[
          ['Client', 'Estrela Photo'],
          ['Year', '2023'],
          ['Services', 'Portfolio Web Design'],
          ['Tech Stack', 'HTML, CSS, JavaScript'],
          ['Industry', 'Photography'],
        ]}
        liveUrl="https://estrela.photo/"
        sections={[
          {
            label: 'The client',
            body: "Estrela Photo is a boutique photography studio operating across the UAE, specialising in lifestyle, portrait, and event photography. With a client roster spanning luxury hospitality, fashion brands, and private celebrations, Estrela's work demands a digital showcase that is as visually meticulous as the images themselves.",
          },
          {
            label: 'The challenge',
            body: 'Photographers face a paradox: their portfolios must be visually rich yet lightning-fast. Estrela needed a site that could display high-resolution galleries without sacrificing load times, while also providing a clear path to enquiry. The previous site was gallery-heavy but lacked structure, making it difficult for potential clients to navigate or take action.',
          },
          {
            label: 'Our approach',
            body: 'We designed a minimal, gallery-centric portfolio with aggressive image optimisation, lazy loading, responsive srcsets, and modern formats, to keep the experience fluid on any device. The layout follows a grid-masonry hybrid that lets the photographs dictate the rhythm. A subtle category filter allows visitors to browse by genre, and every gallery ends with a clear booking prompt.',
          },
          {
            label: 'The result',
            body: 'A portfolio that loads in under two seconds and looks stunning on every screen. Session bookings through the website more than doubled in the first three months, and the site has become a powerful sales tool that Estrela shares directly with prospective clients.',
          },
        ]}
        quote={{
          text: "The new site does what my photos do, it captures attention instantly and doesn't let go.",
          by: 'Estrela Photo',
        }}
        prev={{ name: 'Javi Beat', slug: 'javi-beat' }}
        next={{ name: 'Manuel KevSax', slug: 'manuel-kevsax' }}
      />
    </>
  )
}
