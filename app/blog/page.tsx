import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '../components/PageShell'
import NewsletterForm from '../components/NewsletterForm'
import { posts } from './posts'

export const metadata: Metadata = {
  title: 'Blog — True Love Creative · Design Insights from Dubai',
  description: 'Thoughts on web design, branding, and creative direction from a Dubai-based design studio. Real talk from a decade of building digital experiences.',
  keywords: ['web design blog', 'design insights Dubai', 'branding tips UAE', 'creative direction blog'],
  alternates: { canonical: 'https://truelovecreative.es/blog' },
}

export default function BlogPage() {
  return (
    <PageShell
      title="Blog"
      subtitle="Thoughts on design, branding, and building things that matter. Written from Dubai."
      wide
    >
      <div style={{ padding: 'clamp(40px,6vw,80px) 0 0' }}>
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="post-row reveal">
            <span className="post-date">{post.date}</span>
            <span>
              <span className="post-title" style={{ display: 'block' }}>{post.title}</span>
              <span style={{ display: 'block', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6, marginTop: '8px', maxWidth: '640px' }}>
                {post.subtitle}
              </span>
            </span>
            <span className="post-meta">{post.category} · {post.readTime}</span>
          </Link>
        ))}
      </div>

      {/* Newsletter signup */}
      <div className="reveal" style={{ maxWidth: '640px', margin: 'clamp(56px,8vw,88px) 0 0', paddingBottom: 'clamp(48px,7vw,80px)' }}>
        <NewsletterForm />
      </div>
    </PageShell>
  )
}
