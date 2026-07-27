import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '../../components/ArticleLayout'
import { posts } from '../posts'

export const metadata: Metadata = {
  title: '7 Signs Your Website Is Costing You Clients — True Love Creative',
  description: 'Your website might be quietly turning people away. Seven honest checks to run on your site today — speed, mobile, outdated info, AI readability and more — from a Dubai web designer.',
  keywords: ['website redesign', 'signs you need a new website', 'website losing customers', 'outdated website', 'website redesign Dubai', 'web designer Dubai'],
  alternates: { canonical: 'https://truelovecreative.es/blog/signs-your-website-is-costing-you-clients' },
  openGraph: {
    title: '7 Signs Your Website Is Costing You Clients',
    description: 'Your site might be quietly turning people away. Here\'s how to know — and what to do about it.',
    type: 'article',
    publishedTime: '2026-07-21',
    authors: ['Javi Beat'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '7 Signs Your Website Is Costing You Clients',
  author: { '@type': 'Person', name: 'Javi Beat' },
  publisher: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  datePublished: '2026-07-21',
  description: 'Seven honest checks to know if your website is quietly losing you business — and what actually fixes each one.',
}

export default function ArticlePage() {
  const post = posts.find(p => p.slug === 'signs-your-website-is-costing-you-clients')!

  return (
    <ArticleLayout post={post} image="/img/blog/website-costing-you-clients.png">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p>
        Here&rsquo;s an uncomfortable fact about your website: you almost never look at it, and everyone deciding whether to hire you looks at it first. Before they call, before they message, before they walk in — they check. And if something feels off, they don&rsquo;t email you about it. They just quietly choose someone else, and you never find out why.
      </p>
      <p>
        After ten years of building and rebuilding sites, I can usually tell within a minute whether a website is helping or hurting. These are the seven checks I run. Do them on your own site today — honestly — and you&rsquo;ll know where you stand.
      </p>

      <h2>1. It takes more than three seconds to load</h2>
      <p>
        Pull up your site on your phone, on mobile data, not your office wifi. Count. If you&rsquo;re still watching a spinner at three seconds, a real chunk of your visitors already left — most people abandon slow pages before they render. Speed isn&rsquo;t a technical vanity metric; it&rsquo;s the first impression before any design is even visible. Common culprits: huge uncompressed photos, bloated themes, and twelve plugins nobody remembers installing.
      </p>

      <h2>2. It falls apart on a phone</h2>
      <p>
        Well over half your visitors are on a phone — for restaurants, salons and events, it&rsquo;s nearly all of them. Tiny text you have to pinch-zoom, buttons too small to tap, forms that fight you: each one is a person who gave up. &ldquo;Technically responsive&rdquo; isn&rsquo;t the bar. The bar is: can someone standing in the street, holding a coffee, find your prices and contact you in under a minute, one-handed?
      </p>

      <h2>3. Something on it is out of date</h2>
      <p>
        A menu from last year. A &ldquo;news&rdquo; section whose latest entry is 2024. Opening hours that don&rsquo;t match your door. An event that already happened. It feels minor, but visitors read it as a single loud message: <em>nobody&rsquo;s home</em>. And if the website is abandoned, they wonder what else is. An outdated site can genuinely be worse than no site — it actively broadcasts neglect.
      </p>

      <h2>4. A stranger can&rsquo;t tell what you do in five seconds</h2>
      <p>
        Open your homepage and pretend you know nothing about your business. In five seconds, can you answer: what does this company do, for whom, and what should I do next? If the answer is buried under a vague slogan and a stock photo of a handshake, you&rsquo;re losing the people who were ready to buy. Clarity beats cleverness every single time.
      </p>

      <h2>5. It looks like a template — because it is one</h2>
      <p>
        Here&rsquo;s the 2026 twist on an old problem. It&rsquo;s never been easier to have a website: AI builders generate one in minutes. Which means the internet is now flooded with sites that share the same layouts, the same gradients, the same three-column features section. Visitors have developed an instinct for it. When your site looks interchangeable, your <em>business</em> reads as interchangeable — and interchangeable businesses compete on price alone. I&rsquo;ve written more about that trap in <a href="/blog/web-design-in-the-age-of-ai">Web Design in the Age of AI</a>.
      </p>

      <h2>6. Contacting you takes effort</h2>
      <p>
        Count the taps between landing on your site and actually reaching you. If your phone number isn&rsquo;t tappable, if the contact form has nine fields, if WhatsApp — where your customers actually live — is nowhere to be found, you&rsquo;re making interested people work to give you money. Some will. Most won&rsquo;t. Every extra step is a percentage of clients gone.
      </p>

      <h2>7. You&rsquo;re invisible when people ask AI</h2>
      <p>
        The newest one, and most business owners haven&rsquo;t noticed it yet. People increasingly ask ChatGPT or Perplexity for recommendations instead of googling — &ldquo;best wedding photographer in Dubai,&rdquo; &ldquo;who can build my restaurant&rsquo;s website.&rdquo; If your site is a wall of images with no real text, no structure and no substance, AI simply can&rsquo;t read you, and you don&rsquo;t exist in those answers. Ask an AI assistant about your own business category in your city. If you&rsquo;re not there, that&rsquo;s a pipeline of future clients flowing straight past you. I covered the fix in detail in <a href="/blog/how-to-get-found-in-ai-search">How to Get Found in AI Search</a>.
      </p>

      <h2>Scored yourself? Here&rsquo;s what the results mean</h2>
      <p>
        <strong>Zero or one sign:</strong> your site is doing its job — keep it updated and move on. <strong>Two or three:</strong> you don&rsquo;t need a rebuild, you need targeted fixes, and they&rsquo;re usually quick. <strong>Four or more:</strong> your website is actively working against you, and every month of &ldquo;we&rsquo;ll deal with it later&rdquo; has a real cost in clients who never called.
      </p>
      <p>
        One honest warning from someone in the business: the answer isn&rsquo;t automatically &ldquo;pay for a big redesign.&rdquo; Sometimes it is, sometimes it&rsquo;s three small fixes. If you&rsquo;re unsure which camp you&rsquo;re in, that&rsquo;s precisely the question to ask a professional <em>before</em> spending anything — a short conversation sorts it out, and you&rsquo;ll know the difference between a AED 2,000 problem and a AED 15,000 one. If you do end up needing the full rebuild, <a href="/blog/how-much-does-a-website-cost-in-dubai">here&rsquo;s what websites actually cost in Dubai</a>, and <a href="/blog/what-to-look-for-when-hiring-a-web-designer-in-dubai">here&rsquo;s how to choose who builds it</a>.
      </p>

      <hr />

      {/* CTA */}
      <h2 style={{ textAlign: 'center' }}>Want a second pair of eyes on your site?</h2>
      <p style={{ textAlign: 'center' }}>
        Send me your URL and I&rsquo;ll run these seven checks for you — free, no obligation, and I&rsquo;ll tell you honestly if you don&rsquo;t need me.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Link href="/#contact" className="btn-poster">&mdash; Get a Free Website Check</Link>
      </p>
    </ArticleLayout>
  )
}
