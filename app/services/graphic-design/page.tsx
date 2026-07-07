import type { Metadata } from 'next'
import Image from 'next/image'
import PageShell from '../../components/PageShell'
import { ServiceIntro, StepRows, FaqAccordion } from '../../components/ServiceSections'
import { LOVE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'Graphic Design Dubai — Visual Identity · True Love Creative',
  description:
    'Premium graphic design in Dubai. Vinyl covers, event flyers, social media visuals, and brand collateral from a studio that lives inside the music and nightlife scene.',
  keywords: [
    'graphic design Dubai',
    'vinyl cover design Dubai',
    'album artwork Dubai',
    'event flyer design Dubai',
    'social media design Dubai',
    'brand visuals UAE',
    'music artwork Dubai',
    'poster design Dubai',
    'creative studio Dubai',
    'nightlife graphic design',
  ],
  alternates: { canonical: 'https://truelovecreative.es/services/graphic-design' },
  openGraph: {
    title: 'Graphic Design Dubai — Visual Identity · True Love Creative',
    description:
      'Vinyl covers, event flyers, social media visuals and brand collateral. Graphic design from a Dubai studio embedded in the music scene.',
    url: 'https://truelovecreative.es/services/graphic-design',
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
      name: 'Graphic Design Dubai',
      description:
        'Premium graphic design services in Dubai including vinyl cover art, event flyers, social media visuals, and brand collateral.',
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
      serviceType: 'Graphic Design',
      url: 'https://truelovecreative.es/services/graphic-design',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What types of graphic design do you offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We specialise in vinyl and album cover art, event flyers and posters, social media content systems, brand collateral, editorial layouts, and merchandise design. If it is visual and it matters, we design it.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you design vinyl/album covers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. We have designed covers for internationally released records including collaborations with Grammy-nominated artists. We understand print specifications, Pantone requirements, and the creative expectations of the music industry.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you work with event promoters?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We work with promoters, venues, and artists across Dubai and internationally. From weekly residency flyers to full festival campaigns, we deliver on tight timelines without cutting corners on quality.',
          },
        },
      ],
    },
  ],
}

const services = [
  {
    title: 'Vinyl & Album Covers',
    text: 'Artwork that holds its own next to the music. We handle concept, illustration, typography, and print-ready production for physical and digital releases.',
  },
  {
    title: 'Event Flyers & Posters',
    text: 'Bold, scroll-stopping visuals for club nights, festivals, residencies, and pop-ups. Designed for Instagram grids, stories, print, and LED screens.',
  },
  {
    title: 'Social Media Systems',
    text: 'Not one-off posts but entire visual systems. Templates, grids, story frameworks, and content calendars that keep your brand consistent across platforms.',
  },
  {
    title: 'Brand Collateral',
    text: 'Business cards, letterheads, presentation decks, menus, signage, and packaging. Every touchpoint reinforces your identity.',
  },
]

const gallery = [
  { src: '/img/graphic/el-silencio.jpg', caption: 'El Silencio · vinyl cover · Buika × Kiko Navarro', span: 'b3' },
  { src: '/img/graphic/mama-calling.jpg', caption: 'Mama Calling · vinyl cover artwork', span: 'b3' },
  { src: '/img/graphic/varadero.jpg', caption: 'Varadero · release artwork', span: 'b2' },
  { src: '/img/graphic/varadero1.jpg', caption: 'Varadero · artwork variation I', span: 'b2' },
  { src: '/img/graphic/varadero2.jpg', caption: 'Varadero · artwork variation II', span: 'b2' },
]

const steps = [
  { num: '01', title: 'Brief', text: 'You tell us what you need and when you need it.' },
  { num: '02', title: 'Concepts', text: 'We present 2 to 3 directions within 48 hours.' },
  { num: '03', title: 'Refinement', text: 'One round of revisions is included; most clients need zero.' },
  { num: '04', title: 'Delivery', text: 'Final files in every format you will ever need.' },
]

const faqs = [
  {
    q: 'What types of graphic design do you offer?',
    a: 'We specialise in vinyl and album cover art, event flyers and posters, social media content systems, brand collateral, editorial layouts, and merchandise design. If it is visual and it matters, we design it.',
  },
  {
    q: 'Can you design vinyl/album covers?',
    a: 'Absolutely. We have designed covers for internationally released records including collaborations with Grammy-nominated artists. We understand print specifications, Pantone requirements, and the creative expectations of the music industry.',
  },
  {
    q: 'Do you work with event promoters?',
    a: 'Yes. We work with promoters, venues, and artists across Dubai and internationally. From weekly residency flyers to full festival campaigns, we deliver on tight timelines without cutting corners on quality.',
  },
]

export default function GraphicDesignPage() {
  return (
    <PageShell
      title="Graphic Design"
      subtitle="Vinyl covers, event flyers, and visual systems for artists who refuse to blend in."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceIntro
        lede="We come from the music industry. A decade inside Dubai's nightlife, studio and events scene, as participants, not observers."
        body="From the texture of a vinyl sleeve to the urgency of a last-minute flyer, we know what works because we have lived it. Every project gets the same attention, whether it is a global release or a Tuesday night event."
        aside={
          <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '24px' }}>
            <p className="display" style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)', marginBottom: '14px' }}>
              Buika × Kiko Navarro<span style={{ color: LOVE }}>.</span>
            </p>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>
              Cover artwork for internationally released records with Grammy-nominated artists.
            </p>
          </div>
        }
      />

      {/* Gallery — the work speaks first */}
      <div style={{ paddingBottom: 'clamp(56px,8vw,110px)' }}>
        <h2 className="display reveal" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.2rem)', marginBottom: 'clamp(28px,4vw,48px)' }}>
          Ink, sleeves &amp; artwork<span style={{ color: LOVE }}>.</span>
        </h2>
        <div className="bento">
          {gallery.map(item => (
            <figure key={item.src} className={item.span} style={{ margin: 0 }}>
              <div className="reveal-img" style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
                <Image src={item.src} alt={item.caption} fill sizes="(max-width: 900px) 100vw, 580px" style={{ objectFit: 'cover' }} />
              </div>
              <figcaption style={{ fontSize: '13px', color: 'var(--muted)', padding: '12px 0 0' }}>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Disciplines — 2-col hairline grid */}
      <div style={{ paddingBottom: 'clamp(56px,8vw,110px)' }}>
        <h2 className="display reveal" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.2rem)', marginBottom: 'clamp(28px,4vw,48px)' }}>
          What we create.
        </h2>
        <div className="grid-2" style={{ gap: '0 clamp(24px,4vw,64px)' }}>
          {services.map(service => (
            <div key={service.title} className="reveal" style={{ padding: '24px 0', borderTop: '1px solid var(--hairline)' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 640, letterSpacing: '-0.01em', marginBottom: '10px' }}>{service.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>{service.text}</p>
            </div>
          ))}
        </div>
      </div>

      <StepRows heading="How it works." steps={steps} />

      <FaqAccordion heading="Frequently asked questions." faqs={faqs} />
    </PageShell>
  )
}
