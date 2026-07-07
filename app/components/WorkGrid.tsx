import Image from 'next/image'
import Link from 'next/link'
import { LOVE } from '../lib/constants'

export interface WorkItem {
  name: string
  type: string
  year: string
  img: string
  slug: string
}

// Two-column poster grid: big crops, loud captions, a View link per card.
export default function WorkGrid({ items, feature }: { items: WorkItem[]; feature?: boolean }) {
  return (
    <div className="wk-grid">
      {items.map((p, i) => {
        const isFeat = feature && i === 0
        return (
          <Link key={p.slug} href={`/work/${p.slug}`} className="wk-card reveal" style={isFeat ? { gridColumn: '1 / -1' } : undefined}>
            <figure className="wk-media reveal-img" style={{ margin: 0, ...(isFeat ? { aspectRatio: '16 / 8' } : {}) }}>
              <Image
                src={p.img}
                alt={`${p.name} — ${p.type}`}
                fill
                sizes={isFeat ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                priority={i === 0}
                style={{ objectFit: 'cover' }}
              />
            </figure>
            <div className="wk-cap">
              <span>
                <span className="wk-name">{p.name}</span>
                <br />
                <span className="wk-type">{p.type} · {p.year}</span>
              </span>
              <span className="wk-view">View <span style={{ color: LOVE }}>→</span></span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
