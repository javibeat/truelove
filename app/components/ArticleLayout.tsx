import Image from 'next/image'
import Link from 'next/link'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import WhatsAppButton from './WhatsAppButton'
import NewsletterForm from './NewsletterForm'
import { getAdjacentPosts, type BlogPost } from '../blog/posts'

// Shared layout for /blog/* articles. Children are rendered inside .prose.
export default function ArticleLayout({ post, image, children }: { post: BlogPost; image?: string; children: React.ReactNode }) {
  const { prev, next } = getAdjacentPosts(post.slug)

  return (
    <>
      <SiteNav />
      <main>
        <header className="container-wide page-head" style={{ paddingBottom: 'clamp(32px,5vw,48px)' }}>
          <div className="rise" style={{ display: 'flex', gap: '14px', alignItems: 'baseline', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span className="eyebrow">{post.category}</span>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{post.date} · {post.readTime}</span>
          </div>
          <h1 className="display rise" style={{ fontSize: 'clamp(2rem,5.4vw,4.4rem)', maxWidth: '1000px', animationDelay: '0.08s' }}>
            {post.title}
          </h1>
          <p className="lede rise" style={{ maxWidth: '620px', margin: '20px 0 0', animationDelay: '0.16s' }}>
            {post.subtitle}
          </p>
        </header>

        <div className="container">
          {image && (
            <figure className="reveal-img" style={{ margin: '0 0 clamp(40px,6vw,64px)', position: 'relative', aspectRatio: '16/8', overflow: 'hidden' }}>
              <Image src={image} alt={post.title} fill sizes="(max-width: 1200px) 100vw, 1152px" style={{ objectFit: 'cover' }} priority />
            </figure>
          )}

          <article className="prose">
            {children}
          </article>

          {/* Author */}
          <div className="prose" style={{ marginTop: '56px' }}>
            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.7, borderTop: '1px solid var(--hairline)', paddingTop: '20px' }}>
              Written by <strong style={{ color: 'var(--ink)' }}>Javi Beat</strong>, founder of True Love Creative, a design studio in Dubai crafting websites, brands and apps since 2015.
            </p>
          </div>

          {/* Newsletter */}
          <div style={{ maxWidth: '680px', margin: 'clamp(48px,6vw,64px) auto 0' }}>
            <NewsletterForm />
          </div>

          {/* Prev / next */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: 'clamp(40px,6vw,56px) 0 64px', flexWrap: 'wrap' }}>
            <Link href={`/blog/${prev.slug}`} className="link-arrow" style={{ maxWidth: '45%' }}><span className="arr">←</span> {prev.title}</Link>
            <Link href={`/blog/${next.slug}`} className="link-arrow" style={{ maxWidth: '45%', textAlign: 'right' }}>{next.title} <span className="arr">→</span></Link>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  )
}
