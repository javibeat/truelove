import type { Metadata } from 'next'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, RULE } from '../../lib/constants'
import { getAdjacentPosts } from '../posts'

export const metadata: Metadata = {
  title: 'Why Every DJ and Musician Needs a Professional Website — True Love Creative',
  description: 'Instagram is not your website. After building sites for DJs across Dubai and Europe, here\'s why a professional web presence changes everything for musicians.',
  keywords: ['DJ website', 'musician website', 'DJ branding Dubai', 'musician web design', 'DJ online presence', 'artist website Dubai'],
  alternates: { canonical: 'https://truelovecreative.es/blog/why-every-dj-needs-a-website' },
  openGraph: {
    title: 'Why Every DJ and Musician Needs a Professional Website',
    description: 'Instagram is not your website. Here\'s why that matters.',
    type: 'article',
    publishedTime: '2026-04-02',
    authors: ['Javi Beat'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Why Every DJ and Musician Needs a Professional Website',
  author: { '@type': 'Person', name: 'Javi Beat' },
  publisher: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  datePublished: '2026-04-02',
  description: 'After building sites for DJs across Dubai and Europe, here\'s why a professional web presence matters more than social media.',
}

export default function ArticlePage() {
  return (
    <GazettePage section="The Journal" sectionNum="VIII" title="Why Every DJ Needs" titleAccent="a Website" subtitle="Instagram is not your website. Here's why that matters.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Article meta */}
      <div style={{ display:'flex', gap:'24px', alignItems:'center', padding:'16px 0', borderBottom:`1px solid ${RULE}`, marginBottom:'32px', flexWrap:'wrap' }}>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:RED }}>Branding</span>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>2 APRIL 2026</span>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>5 MIN READ</span>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>BY JAVI BEAT</span>
      </div>

      {/* Article body */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:'0' }} className="grid-2">

        {/* Main content */}
        <div style={{ paddingRight:'32px', borderRight:`1px solid ${RULE}` }}>

          <p className="fell dropcap" style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            I&apos;m going to tell you something that might sting a little. You&apos;ve got thousands of followers, your mixes get shared, you play at the best venues — and when someone googles your name, what comes up? An Instagram profile and maybe a SoundCloud page. That&apos;s it. That&apos;s your entire digital identity, and you don&apos;t own any of it.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            I know this because I&apos;m a DJ myself. I play in Dubai. And I&apos;ve also built websites for musicians for the past 10 years — Kiko Navarro, Manuel KevSax, Sergio Trumpet, Julio Cuba. I&apos;ve seen what happens before and after a DJ gets a proper site. It&apos;s a different conversation entirely.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Instagram is rented land</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Let me put it bluntly: Instagram is not yours. The algorithm changes, your reach drops overnight, your account gets hacked or flagged, and suddenly your entire &quot;brand&quot; is gone. It happens. I&apos;ve seen it happen to people with 100k+ followers.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Your website is your land. You own it. You control what goes on it, how it looks, what people see first. No algorithm deciding if your content gets shown. No competing with memes and reels for attention. Someone types your name, they find you.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>The booking question</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Here&apos;s what actually happens in the real world. A hotel events manager is putting together a lineup for the season. They need a saxophonist. Someone recommends Manuel KevSax. The manager googles him.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Scenario A: They find his Instagram. They scroll through some posts, maybe a reel. They can&apos;t find his booking info. They DM him. Maybe he sees it, maybe he doesn&apos;t. They move on to the next name on the list.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Scenario B: They find <a href="/work/manuel-kevsax" style={{ color:RED }}>manuelkevsax.com</a>. Professional photos, video reels, a clear list of past venues, testimonials, and a booking form. They fill it out in two minutes. Done. Booked.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Which scenario do you think gets the gig? I don&apos;t have to tell you.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>What I&apos;ve seen happen</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            When I built <a href="/work/kiko-navarro" style={{ color:RED }}>Kiko Navarro&apos;s website</a>, it wasn&apos;t just about having a nice page. Kiko is a legend — he&apos;s been producing and performing for decades. But his online presence didn&apos;t reflect that. Now when a promoter, a label, or a journalist looks him up, they find a site that matches who he actually is. That changes how people approach him. It changes the money on the table.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Same story with <a href="/work/sergio-trumpet" style={{ color:RED }}>Sergio Trumpet</a>. Same with <a href="/work/julio-cuba" style={{ color:RED }}>Julio Cuba</a>. Every time, the site became the thing that elevated the conversation from &quot;how much for a gig?&quot; to &quot;we want to work with you — what&apos;s your availability?&quot;
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>What a DJ website actually needs</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'12px' }}>
            It doesn&apos;t need to be complicated. A good musician website has:
          </p>
          <div style={{ paddingLeft:'20px', marginBottom:'20px' }}>
            {[
              'A strong visual identity — this is your brand, not a generic template. Your site should feel like your music sounds.',
              'Bio and press kit — a proper bio, high-res photos that promoters can download, and your key achievements. Make it easy for people to book you.',
              'Music and video — embedded mixes, live performance clips, maybe a Spotify integration. Let the work speak.',
              'A booking form or contact — make it dead simple for someone to reach you. Not a DM. Not a "link in bio." A real form.',
              'Upcoming dates — if you\'re playing somewhere, show it. Social proof is everything in this industry.',
            ].map((item, i) => (
              <p key={i} style={{ fontFamily:F, fontSize:'15px', lineHeight:1.8, color:INK, marginBottom:'8px', paddingLeft:'12px', borderLeft:`2px solid ${RED}` }}>{item}</p>
            ))}
          </div>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>The investment</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            A professional DJ website starts from <a href="/blog/how-much-does-a-website-cost-in-dubai" style={{ color:RED }}>AED 1,500 for a landing page</a>. That&apos;s less than what you make from one decent gig. And unlike that gig, the website works for you 24/7, 365 days a year. It&apos;s there when the promoter googles you at 2am. It&apos;s there when someone in another country hears your mix and wants to know more.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            I&apos;ve been on both sides of this — as a DJ who needed a site, and as the person who builds them. Trust me when I say: this is the one investment that pays for itself over and over.
          </p>

          <div style={{ padding:'24px', border:`3px double ${INK}`, margin:'32px 0', textAlign:'center' }}>
            <p style={{ fontFamily:P, fontSize:'18px', fontWeight:900, fontStyle:'italic', color:RED, lineHeight:1.3, marginBottom:'6px' }}>&quot;Your website is your stage when you&apos;re not on stage.&quot;</p>
          </div>

          {/* CTA */}
          <div style={{ padding:'32px 0', textAlign:'center' }}>
            <div style={{ padding:'24px', border:`3px double ${INK}` }}>
              <p style={{ fontFamily:P, fontSize:'20px', fontWeight:900, fontStyle:'italic', color:INK, marginBottom:'12px' }}>Need a website for your music career?</p>
              <p style={{ fontFamily:F, fontSize:'14px', color:FADE, marginBottom:'16px' }}>I build sites for DJs and musicians across Dubai and Europe. Let&apos;s talk about yours.</p>
              <a href="/#contact" style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', background:INK, color:'#F4EFE0', padding:'14px 36px', textDecoration:'none', display:'inline-block' }}>Start Your Project →</a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ paddingLeft:'24px' }}>
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>About the Author</div>
          <div className="rule-thin" style={{ marginBottom:'16px' }} />
          <p style={{ fontFamily:F, fontSize:'13px', lineHeight:1.8, color:INK, marginBottom:'16px' }}>
            <strong>Javi Beat</strong> is a designer, creative director, and DJ based in Dubai. He&apos;s built websites and brand identities for musicians across the Middle East and Europe since 2015.
          </p>

          <div className="rule-thin" style={{ margin:'20px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Musicians I&apos;ve Worked With</div>
          <div className="rule-thin" style={{ marginBottom:'12px' }} />
          {[
            { name:'Kiko Navarro', slug:'kiko-navarro', type:'Web Design' },
            { name:'Manuel KevSax', slug:'manuel-kevsax', type:'Web Design' },
            { name:'Sergio Trumpet', slug:'sergio-trumpet', type:'Portfolio' },
            { name:'Julio Cuba', slug:'julio-cuba', type:'Identity' },
            { name:'Javi Beat', slug:'javi-beat', type:'Identity' },
          ].map(p => (
            <Link key={p.slug} href={`/work/${p.slug}`} style={{ display:'block', padding:'8px 0', borderBottom:`1px solid ${RULE}`, textDecoration:'none' }}>
              <span style={{ fontFamily:F, fontSize:'13px', color:INK }}>{p.name}</span>
              <span style={{ fontFamily:E, fontSize:'9px', color:FADE, marginLeft:'8px' }}>{p.type}</span>
            </Link>
          ))}

          <div className="rule-thin" style={{ margin:'20px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Also Read</div>
          <div className="rule-thin" style={{ marginBottom:'12px' }} />
          <Link href="/blog/how-much-does-a-website-cost-in-dubai" style={{ display:'block', padding:'12px 0', textDecoration:'none', borderBottom:`1px solid ${RULE}` }}>
            <span style={{ fontFamily:P, fontSize:'14px', fontWeight:700, color:INK, lineHeight:1.3, display:'block' }}>How Much Does a Website Cost in Dubai?</span>
            <span style={{ fontFamily:E, fontSize:'9px', color:FADE, marginTop:'4px', display:'block' }}>6 MIN READ</span>
          </Link>

          <div className="rule-thin" style={{ margin:'20px 0' }} />
          <div style={{ padding:'16px', border:`3px double ${INK}`, textAlign:'center' }}>
            <div style={{ fontFamily:P, fontSize:'16px', fontWeight:900, fontStyle:'italic', color:RED, lineHeight:1.3, marginBottom:'6px' }}>&quot;Your site should feel like your music sounds.&quot;</div>
            <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', color:FADE }}>— Javi Beat</div>
          </div>
        </div>
      </div>

      {/* Prev / Next navigation */}
      {(() => {
        const { prev, next } = getAdjacentPosts('why-every-dj-needs-a-website')
        return (
          <div style={{ borderTop:`4px double ${INK}`, marginTop:'32px', padding:'24px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }} className="grid-2">
            <Link href={`/blog/${prev.slug}`} style={{ textDecoration:'none' }}>
              <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>← Previous Article</div>
              <div style={{ fontFamily:P, fontSize:'18px', fontWeight:700, color:INK, lineHeight:1.3 }}>{prev.title}</div>
              <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE, marginTop:'6px' }}>{prev.category.toUpperCase()} · {prev.readTime.toUpperCase()}</div>
            </Link>
            <Link href={`/blog/${next.slug}`} style={{ textDecoration:'none', textAlign:'right' }}>
              <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Next Article →</div>
              <div style={{ fontFamily:P, fontSize:'18px', fontWeight:700, color:INK, lineHeight:1.3 }}>{next.title}</div>
              <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE, marginTop:'6px' }}>{next.category.toUpperCase()} · {next.readTime.toUpperCase()}</div>
            </Link>
          </div>
        )
      })()}

    </GazettePage>
  )
}
