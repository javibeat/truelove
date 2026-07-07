import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '../../components/ArticleLayout'
import { posts } from '../posts'

export const metadata: Metadata = {
  title: 'How to Get Found When People Ask AI Instead of Google — True Love Creative',
  description: 'ChatGPT, Perplexity and AI Overviews are answering the questions your customers used to google. A practical guide for Dubai businesses on staying visible in AI search.',
  keywords: ['AI search optimization', 'ChatGPT SEO', 'AI Overviews', 'AEO', 'GEO', 'get cited by AI', 'SEO Dubai 2026', 'AI search Dubai business'],
  alternates: { canonical: 'https://truelovecreative.es/blog/how-to-get-found-in-ai-search' },
  openGraph: {
    title: 'How to Get Found When People Ask AI Instead of Google',
    description: 'Your next client might never see a results page. Here\'s how to stay visible.',
    type: 'article',
    publishedTime: '2026-06-23',
    authors: ['Javi Beat'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Get Found When People Ask AI Instead of Google',
  author: { '@type': 'Person', name: 'Javi Beat' },
  publisher: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  datePublished: '2026-06-23',
  description: 'ChatGPT, Perplexity and AI Overviews are answering the questions your customers used to google. How Dubai businesses stay visible in AI search.',
}

export default function ArticlePage() {
  const post = posts.find(p => p.slug === 'how-to-get-found-in-ai-search')!

  return (
    <ArticleLayout post={post} image="/img/blog/ai-search-visibility.png">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p>
        Try something. Ask a friend how they found the last restaurant they booked, the last service they hired, the last product they researched. A couple of years ago the answer was always &ldquo;I googled it.&rdquo; Now, more and more often, the answer is &ldquo;I asked ChatGPT&rdquo; — or Perplexity, or whatever assistant lives in their phone.
      </p>
      <p>
        And even the people who still google don&rsquo;t see what they used to see. Google&rsquo;s AI Overviews answer the question right at the top of the page, before any website link. A huge share of searches now end without a single click. The industry calls it zero-click search. I call it the biggest change to being found online since Google itself.
      </p>

      <h2>What actually changed</h2>
      <p>
        The old game was: rank on page one, get the click, make your case on your own website. The new game has an extra player in the middle. An AI reads a bunch of websites, forms an answer, and <em>recommends</em>. Your future client may hear about you — or not — from a machine that read your website on your behalf.
      </p>
      <p>
        That has a brutal consequence: <strong>if AI can&rsquo;t read your site, you don&rsquo;t exist in that conversation.</strong> And plenty of sites, especially the ones thrown together with page builders, are genuinely hard for these systems to read. Text buried in images, no structure, vague copy that never states plainly what the business does, where it operates, or what it costs.
      </p>

      <h2>The good news</h2>
      <p>
        Here&rsquo;s what surprised me when I started optimizing client sites for AI search: almost everything that works is just honest, old-fashioned clarity. AI assistants recommend businesses they can understand and verify. So the checklist looks like this:
      </p>
      <ul>
        <li><strong>Say what you do in plain words.</strong> &ldquo;Web design studio in Dubai, established 2015, working with musicians and small businesses&rdquo; beats &ldquo;we craft transformative digital experiences&rdquo; every single time. An AI can quote the first sentence. It can do nothing with the second.</li>
        <li><strong>Answer real questions on your site.</strong> When someone asks an assistant &ldquo;how much does a website cost in Dubai?&rdquo;, it looks for pages that answer exactly that. I know because <a href="/blog/how-much-does-a-website-cost-in-dubai">my pricing article</a> gets cited for it. Publish your prices, your process, your FAQ. The businesses that hide information become invisible.</li>
        <li><strong>Structured data.</strong> This is the machine-readable label on your site: your name, location, services, opening hours in a format assistants trust. Invisible to humans, decisive for machines.</li>
        <li><strong>Fast, clean, crawlable pages.</strong> AI crawlers give up on slow, bloated sites even faster than humans do. A well-built site is readable by everything — that&rsquo;s the whole point of building it properly.</li>
        <li><strong>Be mentioned elsewhere.</strong> Assistants cross-check. Reviews, directories, press, your clients linking back to you. If the only place you exist is your own website, you&rsquo;re a rumour, not a fact.</li>
      </ul>

      <blockquote>&ldquo;AI search rewards the businesses with nothing to hide and punishes the ones hiding behind buzzwords.&rdquo;</blockquote>

      <h2>What I do on every site I build</h2>
      <p>
        Every website that leaves this studio ships with the full package: structured data describing the business, semantic markup, a sitemap, fast load times, and copy written to answer the questions clients actually ask. Some of it — like <code>llms.txt</code>, a file written specifically for AI crawlers — didn&rsquo;t even exist a few years ago. This site has one. Most of my competitors&rsquo; sites don&rsquo;t.
      </p>
      <p>
        None of this is magic, and be suspicious of anyone selling it as magic. There&rsquo;s no secret trick that makes ChatGPT recommend you. There&rsquo;s only being genuinely findable, readable, and worth recommending — and most businesses in Dubai haven&rsquo;t done even the basics yet. That&rsquo;s the opportunity.
      </p>

      <h2>The part nobody wants to hear</h2>
      <p>
        Visibility gets you into the conversation. It doesn&rsquo;t win it. When an assistant shows someone three options and they open yours, you have a few seconds of human attention — and then it&rsquo;s back to the oldest question in the game: does this site make me trust these people?
      </p>
      <p>
        That&rsquo;s design. That&rsquo;s the part <a href="/blog/web-design-in-the-age-of-ai">no machine does for you</a>. Getting found is the new front door, but people still buy from people.
      </p>

      <hr />

      {/* CTA */}
      <h2 style={{ textAlign: 'center' }}>Is your website invisible to AI?</h2>
      <p style={{ textAlign: 'center' }}>
        I&rsquo;ll take a look and tell you honestly where you stand — no jargon, no scare tactics.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Link href="/#contact" className="btn-poster">&mdash; Get an Honest Audit</Link>
      </p>
    </ArticleLayout>
  )
}
