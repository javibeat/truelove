import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '../components/PageShell'

export const metadata: Metadata = {
  title: 'Services — True Love Creative · Web, Brand, Graphic & App Design',
  description: 'Web design, brand identity, graphic design and app development. Bespoke digital work crafted by hand in Dubai since 2015.',
  alternates: { canonical: 'https://truelovecreative.es/services' },
}

const services = [
  { name: 'Web Design', desc: 'Fast, precise websites, built by hand', href: '/services/web-design' },
  { name: 'Brand Identity', desc: 'Logo, type, colour & voice', href: '/services/branding' },
  { name: 'Graphic Design', desc: 'Vinyl covers, posters, art direction', href: '/services/graphic-design' },
  { name: 'App Development', desc: 'iOS, Android & web, end to end', href: '/services/app-development' },
]

export default function ServicesPage() {
  return (
    <PageShell
      title="Services"
      subtitle="Four disciplines, one standard: work made by hand, made to last, made to be remembered."
      wide
    >
      <div style={{ padding: 'clamp(40px,6vw,80px) 0 clamp(64px,9vw,120px)' }}>
        {services.map((s, i) => (
          <Link key={s.name} href={s.href} className="ix-row reveal">
            <span className="ix-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="ix-name">{s.name}</span>
            <span className="ix-meta hide-mobile">{s.desc}</span>
          </Link>
        ))}
      </div>
    </PageShell>
  )
}
