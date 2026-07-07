import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '../../components/ArticleLayout'
import { posts } from '../posts'

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
  const post = posts.find(p => p.slug === 'why-every-dj-needs-a-website')!

  return (
    <ArticleLayout post={post} image="/img/blog/dj-needs-website.png">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p>
        I&rsquo;m going to tell you something that might sting a little. You&rsquo;ve got thousands of followers, your mixes get shared, you play at the best venues — and when someone googles your name, what comes up? An Instagram profile and maybe a SoundCloud page. That&rsquo;s it. That&rsquo;s your entire digital identity, and you don&rsquo;t own any of it.
      </p>
      <p>
        I know this because I&rsquo;m a DJ myself. I play in Dubai. And I&rsquo;ve also built websites for musicians for the past 10 years — Kiko Navarro, Manuel KevSax, Sergio Trumpet, Julio Cuba. I&rsquo;ve seen what happens before and after a DJ gets a proper site. It&rsquo;s a different conversation entirely.
      </p>

      <h2>Instagram is rented land</h2>
      <p>
        Let me put it bluntly: Instagram is not yours. The algorithm changes, your reach drops overnight, your account gets hacked or flagged, and suddenly your entire &ldquo;brand&rdquo; is gone. It happens. I&rsquo;ve seen it happen to people with 100k+ followers.
      </p>
      <p>
        Your website is your land. You own it. You control what goes on it, how it looks, what people see first. No algorithm deciding if your content gets shown. No competing with memes and reels for attention. Someone types your name, they find you.
      </p>

      <h2>The booking question</h2>
      <p>
        Here&rsquo;s what actually happens in the real world. A hotel events manager is putting together a lineup for the season. They need a saxophonist. Someone recommends Manuel KevSax. The manager googles him.
      </p>
      <p>
        Scenario A: They find his Instagram. They scroll through some posts, maybe a reel. They can&rsquo;t find his booking info. They DM him. Maybe he sees it, maybe he doesn&rsquo;t. They move on to the next name on the list.
      </p>
      <p>
        Scenario B: They find <a href="/work/manuel-kevsax">manuelkevsax.com</a>. Professional photos, video reels, a clear list of past venues, testimonials, and a booking form. They fill it out in two minutes. Done. Booked.
      </p>
      <p>
        Which scenario do you think gets the gig? I don&rsquo;t have to tell you.
      </p>

      <h2>What I&rsquo;ve seen happen</h2>
      <p>
        When I built <a href="/work/kiko-navarro">Kiko Navarro&rsquo;s website</a>, it wasn&rsquo;t just about having a nice page. Kiko is a legend — he&rsquo;s been producing and performing for decades. But his online presence didn&rsquo;t reflect that. Now when a promoter, a label, or a journalist looks him up, they find a site that matches who he actually is. That changes how people approach him. It changes the money on the table.
      </p>
      <p>
        Same story with <a href="/work/sergio-trumpet">Sergio Trumpet</a>. Same with <a href="/work/julio-cuba">Julio Cuba</a>. Every time, the site became the thing that elevated the conversation from &ldquo;how much for a gig?&rdquo; to &ldquo;we want to work with you — what&rsquo;s your availability?&rdquo;
      </p>

      <h2>What a DJ website actually needs</h2>
      <p>
        It doesn&rsquo;t need to be complicated. A good musician website has:
      </p>
      <ul>
        <li><strong>A strong visual identity</strong> — this is your brand, not a generic template. Your site should feel like your music sounds.</li>
        <li><strong>Bio and press kit</strong> — a proper bio, high-res photos that promoters can download, and your key achievements. Make it easy for people to book you.</li>
        <li><strong>Music and video</strong> — embedded mixes, live performance clips, maybe a Spotify integration. Let the work speak.</li>
        <li><strong>A booking form or contact</strong> — make it dead simple for someone to reach you. Not a DM. Not a &ldquo;link in bio.&rdquo; A real form.</li>
        <li><strong>Upcoming dates</strong> — if you&rsquo;re playing somewhere, show it. Social proof is everything in this industry.</li>
      </ul>

      <h2>The investment</h2>
      <p>
        A professional DJ website starts from <a href="/blog/how-much-does-a-website-cost-in-dubai">AED 1,500 for a landing page</a>. That&rsquo;s less than what you make from one decent gig. And unlike that gig, the website works for you 24/7, 365 days a year. It&rsquo;s there when the promoter googles you at 2am. It&rsquo;s there when someone in another country hears your mix and wants to know more.
      </p>
      <p>
        I&rsquo;ve been on both sides of this — as a DJ who needed a site, and as the person who builds them. Trust me when I say: this is the one investment that pays for itself over and over.
      </p>

      <blockquote>&ldquo;Your website is your stage when you&rsquo;re not on stage.&rdquo;</blockquote>

      <hr />

      {/* CTA */}
      <h2 style={{ textAlign: 'center' }}>Need a website for your music career?</h2>
      <p style={{ textAlign: 'center' }}>
        I build sites for DJs and musicians across Dubai and Europe. Let&rsquo;s talk about yours.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Link href="/#contact" className="btn-poster">&mdash; Start Your Project</Link>
      </p>
    </ArticleLayout>
  )
}
