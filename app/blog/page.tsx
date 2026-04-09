import type { Metadata } from 'next'
import Link from 'next/link'
import GazettePage from '../components/GazettePage'
import NewsletterForm from '../components/NewsletterForm'
import { P, E, F, INK, RED, FADE, RULE } from '../lib/constants'
import { posts } from './posts'

export const metadata: Metadata = {
  title: 'Blog — True Love Creative · Design Insights from Dubai',
  description: 'Thoughts on web design, branding, and creative direction from a Dubai-based design studio. Real talk from a decade of building digital experiences.',
  keywords: ['web design blog', 'design insights Dubai', 'branding tips UAE', 'creative direction blog'],
  alternates: { canonical: 'https://truelovecreative.es/blog' },
}

export default function BlogPage() {
  return (
    <GazettePage section="The Journal" sectionNum="VIII" title="The" titleAccent="Journal" subtitle="Thoughts on design, branding, and building things that matter. Written from Dubai.">

      {/* Newsletter signup */}
      <NewsletterForm />

      <div className="rule-thin" style={{ margin:'16px 0' }} />

      {/* Posts list */}
      <div style={{ padding:'24px 0' }}>
        {posts.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration:'none', display:'block' }}>
            <article style={{ display:'grid', gridTemplateColumns:'1fr', gap:'0', padding:'24px 0', borderBottom:`1px solid ${RULE}`, transition:'background .15s', cursor:'crosshair' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
                <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
                  <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:RED }}>{post.category}</span>
                  <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>{post.date.toUpperCase()}</span>
                </div>
                <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>{post.readTime.toUpperCase()}</span>
              </div>
              <h2 style={{ fontFamily:P, fontSize:'clamp(1.5rem,3vw,2.5rem)', fontWeight:900, color:INK, lineHeight:1.1, marginBottom:'8px' }}>{post.title}</h2>
              <p style={{ fontFamily:F, fontSize:'15px', fontStyle:'italic', color:FADE, lineHeight:1.6, marginBottom:'8px' }}>{post.subtitle}</p>
              <p style={{ fontFamily:F, fontSize:'14px', color:INK, lineHeight:1.7 }}>{post.excerpt}</p>
              <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, marginTop:'12px', display:'inline-block' }}>Read Article →</span>
            </article>
          </Link>
        ))}
      </div>

    </GazettePage>
  )
}
