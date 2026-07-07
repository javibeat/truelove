import type { Metadata } from 'next'
import PageShell from '../components/PageShell'
import WorkGrid, { type WorkItem } from '../components/WorkGrid'

export const metadata: Metadata = {
  title: 'Work — True Love Creative · Selected Projects',
  description: 'Selected web design, branding and identity projects for DJs, musicians, photographers and businesses. Crafted in Dubai since 2015.',
  alternates: { canonical: 'https://truelovecreative.es/work' },
}

const projects: WorkItem[] = [
  { name: 'Kiko Navarro', type: 'Web Design', year: '2024', img: '/img/portfolios/kikonavarro.jpg', slug: 'kiko-navarro' },
  { name: 'Jessica Morari', type: 'Branding & Web', year: '2023', img: '/img/portfolios/jesslnk.webp', slug: 'jessica-morari' },
  { name: 'Javi Beat', type: 'Identity', year: '2024', img: '/img/portfolios/javibeat.jpg', slug: 'javi-beat' },
  { name: 'Estrela Photo', type: 'Portfolio', year: '2023', img: '/img/portfolios/estrela.jpg', slug: 'estrela-photo' },
  { name: 'Manuel KevSax', type: 'Web Design', year: '2024', img: '/img/portfolios/manusax.webp', slug: 'manuel-kevsax' },
  { name: 'Sergio Trumpet', type: 'Portfolio', year: '2024', img: '/img/portfolios/sergio.jpg', slug: 'sergio-trumpet' },
  { name: 'Julio Cuba', type: 'Identity', year: '2024', img: '/img/portfolios/julio.webp', slug: 'julio-cuba' },
]

export default function WorkPage() {
  return (
    <PageShell
      title="Work"
      subtitle="Seven projects, seven stories. Websites, brands and identities for people who refuse to be forgettable."
      wide
    >
      <div style={{ padding: 'clamp(40px,6vw,80px) 0 clamp(64px,9vw,120px)' }}>
        <WorkGrid items={projects} feature />
      </div>
    </PageShell>
  )
}
