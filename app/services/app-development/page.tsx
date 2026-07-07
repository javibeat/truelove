import type { Metadata } from 'next'
import PageShell from '../../components/PageShell'
import { ServiceIntro, StepRows, CapabilityList, FaqAccordion } from '../../components/ServiceSections'
import { LOVE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'App Development Dubai — iOS & Android · True Love Creative',
  description:
    'Custom iOS and Android app development in Dubai. From concept to App Store, we build performant mobile experiences with React Native and native technologies.',
  keywords: [
    'app development Dubai',
    'iOS app developer Dubai',
    'Android app developer Dubai',
    'mobile app Dubai',
    'React Native Dubai',
    'app design UAE',
    'custom app development',
    'mobile UX design Dubai',
    'startup app Dubai',
    'app development agency UAE',
  ],
  alternates: { canonical: 'https://truelovecreative.es/services/app-development' },
  openGraph: {
    title: 'App Development Dubai — iOS & Android · True Love Creative',
    description:
      'Custom iOS and Android app development in Dubai. Performant mobile experiences from concept to App Store.',
    url: 'https://truelovecreative.es/services/app-development',
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
      name: 'App Development Dubai',
      description:
        'Custom iOS and Android mobile app development in Dubai. From concept and UX design to App Store deployment.',
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
      serviceType: 'App Development',
      url: 'https://truelovecreative.es/services/app-development',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do you build iOS and Android apps?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We build for both platforms. For most projects we use React Native, which allows us to ship a single codebase to both the App Store and Google Play without sacrificing performance or native feel.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is your development process?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We follow a four-phase process: Discovery and strategy, UX and UI design, development with iterative testing, and deployment with App Store optimisation. You are involved at every milestone.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does an app take to develop?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An MVP typically takes 8 to 14 weeks. A full-featured app with backend infrastructure, user authentication, and third-party integrations can take 4 to 6 months. We provide a detailed roadmap after the discovery phase.',
          },
        },
      ],
    },
  ],
}

const phases = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    text: 'We map your users, your competitors, and your business model. We define the MVP scope ruthlessly: ship what matters, learn from real users, iterate.',
  },
  {
    num: '02',
    title: 'UX & UI Design',
    text: 'Wireframes, user flows, and high-fidelity prototypes. You interact with the app before it is built. We validate assumptions early so we do not waste your budget.',
  },
  {
    num: '03',
    title: 'Development & Testing',
    text: 'Agile sprints with bi-weekly demos. React Native for cross-platform efficiency, native modules where performance demands it. Continuous integration, automated testing.',
  },
  {
    num: '04',
    title: 'Launch & Growth',
    text: 'App Store and Google Play submission, ASO optimisation, analytics setup, crash monitoring. Post-launch, we iterate based on real user data.',
  },
]

const capabilities = [
  'React Native cross-platform apps',
  'Native iOS (Swift) & Android (Kotlin)',
  'Backend APIs & database architecture',
  'Push notifications & real-time features',
  'Payment integration (Stripe, Apple Pay)',
  'Authentication & user management',
  'Maps, geolocation & GPS features',
  'App Store & Google Play deployment',
]

const faqs = [
  {
    q: 'Do you build iOS and Android apps?',
    a: 'Yes. We build for both platforms. For most projects we use React Native, which allows us to ship a single codebase to both the App Store and Google Play without sacrificing performance or native feel.',
  },
  {
    q: 'What is your development process?',
    a: 'We follow a four-phase process: Discovery and strategy, UX and UI design, development with iterative testing, and deployment with App Store optimisation. You are involved at every milestone.',
  },
  {
    q: 'How long does an app take to develop?',
    a: 'An MVP typically takes 8 to 14 weeks. A full-featured app with backend infrastructure, user authentication, and third-party integrations can take 4 to 6 months. We provide a detailed roadmap after the discovery phase.',
  },
]

export default function AppDevelopmentPage() {
  return (
    <PageShell
      title="App Development"
      subtitle="From concept to App Store. Mobile experiences that people actually want to use."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceIntro
        lede="The app graveyard is full of technically sound products that nobody wanted. We start with the problem, not the technology."
        body="We design for humans first and write code second, because a beautiful interface on a broken idea is still a broken idea. We have taken apps from napkin sketches to the App Store. We know what it takes, and more importantly, we know what to cut."
        aside={
          <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '24px' }}>
            <p className="display" style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)', marginBottom: '14px' }}>
              One team, first sketch to release build<span style={{ color: LOVE }}>.</span>
            </p>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>
              UX research, interface design, front-end and back-end architecture, and store deployment, all under one roof. Most projects ship from a single React Native codebase to both platforms.
            </p>
          </div>
        }
      />

      <StepRows heading={<>Development process<span style={{ color: LOVE }}>.</span></>} steps={phases} />

      <CapabilityList heading="Technical capabilities." items={capabilities} />

      <FaqAccordion heading="Frequently asked questions." faqs={faqs} />
    </PageShell>
  )
}
