import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '../../components/ArticleLayout'
import { posts } from '../posts'

export const metadata: Metadata = {
  title: 'Web Design in the Age of AI: Why Handmade Still Wins — True Love Creative',
  description: 'AI builders can generate a website in minutes, and they all look the same. A designer\'s honest take on what AI changed, what it didn\'t, and why handmade design is worth more in 2026.',
  keywords: ['AI web design', 'AI website builder', 'custom web design Dubai', 'handmade website', 'AI generated websites', 'web designer Dubai 2026'],
  alternates: { canonical: 'https://truelovecreative.es/blog/web-design-in-the-age-of-ai' },
  openGraph: {
    title: 'Web Design in the Age of AI: Why Handmade Still Wins',
    description: 'Everyone can generate a website in 2026. That\'s exactly the problem.',
    type: 'article',
    publishedTime: '2026-07-07',
    authors: ['Javi Beat'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Web Design in the Age of AI: Why Handmade Still Wins',
  author: { '@type': 'Person', name: 'Javi Beat' },
  publisher: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
  datePublished: '2026-07-07',
  description: 'AI builders can generate a website in minutes, and they all look the same. What AI changed about web design, what it didn\'t, and why handmade is worth more in 2026.',
}

export default function ArticlePage() {
  const post = posts.find(p => p.slug === 'web-design-in-the-age-of-ai')!

  return (
    <ArticleLayout post={post} image="/img/blog/web-design-age-of-ai.png">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p>
        Let&rsquo;s get something out of the way first: I use AI every day. It helps me write code faster, test ideas faster, ship faster. Anyone in this industry telling you they don&rsquo;t is either lying or falling behind. So no, this is not one of those &ldquo;AI is ruining everything&rdquo; articles.
      </p>
      <p>
        But something has happened to the web in the last two years, and if you&rsquo;re about to invest in a website for your business or your music career, you need to understand it.
      </p>

      <h2>The sameness epidemic</h2>
      <p>
        In 2026 anyone can type a sentence into an AI builder and get a working website in three minutes. Millions of people have done exactly that. And here&rsquo;s the thing nobody mentions in the demo videos: those millions of websites all look like each other. Same layouts, same gradients, same rounded cards, same hero section with the same three feature columns underneath. The tools were trained on the same patterns, so they produce the same patterns. Endlessly.
      </p>
      <p>
        There&rsquo;s a name for this now — people call it AI slop. Your customers may not know the term, but they feel it. They land on a page and something in their brain whispers &ldquo;template.&rdquo; And a template says: this business is interchangeable with every other business.
      </p>

      <h2>What that did to the market</h2>
      <p>
        Here&rsquo;s the paradox: when everyone can generate a website, a generated website stops being worth anything. The baseline moved. Simply <em>having</em> a site no longer says a single thing about you — the same way having an email address stopped being impressive around 1999.
      </p>
      <p>
        What became scarce is distinctiveness. A site that could only belong to you. A site where the typography, the pacing, the images and the words feel like the person or the brand behind it. That was always the point of design, but for twenty years you could get away with decent-and-generic. Not anymore. Decent-and-generic is now free, instant, and everywhere.
      </p>

      <blockquote>&ldquo;When everyone has a website, the only thing worth paying for is a website that couldn&rsquo;t belong to anyone else.&rdquo;</blockquote>

      <h2>What AI is genuinely good at</h2>
      <p>
        Credit where it&rsquo;s due. In my own studio, AI has changed how I work:
      </p>
      <ul>
        <li><strong>Speed</strong> — technical work that took a week now takes a day. That saving goes to my clients, not against them.</li>
        <li><strong>Iteration</strong> — I can explore five directions in the time it used to take to build one. The bad ideas die faster, and the good one gets more attention.</li>
        <li><strong>Code quality</strong> — testing, accessibility checks, performance audits. The boring, important stuff gets done more thoroughly.</li>
      </ul>
      <p>
        Notice what&rsquo;s not on that list: taste. Deciding what a brand should feel like. Knowing when a page needs less, not more. Sitting with a client — a <a href="/work/kiko-navarro">DJ with thirty years of history</a>, a <a href="/work/estrela-photo">photographer</a>, a small business owner — and understanding what makes them different before a single pixel exists. AI executes. It doesn&rsquo;t care. Caring is the job.
      </p>

      <h2>How to tell the difference when you&rsquo;re buying</h2>
      <p>
        If you&rsquo;re hiring someone to build your site in 2026, the question is no longer &ldquo;can they build a website?&rdquo; Everyone can. The questions that matter now:
      </p>
      <ul>
        <li><strong>Does their portfolio look like one person made it all?</strong> If every project has the same layout with different colours, you&rsquo;re looking at a template operation — human or AI, doesn&rsquo;t matter.</li>
        <li><strong>Do they ask about your business before talking about pages?</strong> Design decisions should come from who you are, not from what the tool suggests first.</li>
        <li><strong>Can they explain why, not just what?</strong> Anyone can show you a nice page. Ask why the type is that size, why the page opens that way. If there&rsquo;s no answer, there was no thinking.</li>
      </ul>
      <p>
        I wrote a longer guide on this: <a href="/blog/what-to-look-for-when-hiring-a-web-designer-in-dubai">what to look for when hiring a web designer in Dubai</a>. All of it applies double now.
      </p>

      <h2>Where I&rsquo;ve landed</h2>
      <p>
        I&rsquo;ve been designing for over ten years, and I&rsquo;ve never felt more sure about the value of doing it by hand. Not by hand as in refusing the tools — by hand as in every decision passes through a human who knows your name, has heard your story, and will be embarrassed if the result looks like everyone else&rsquo;s.
      </p>
      <p>
        AI made average free. It made remarkable more valuable than it&rsquo;s ever been. That&rsquo;s not a threat to good design. It&rsquo;s the best argument for it.
      </p>

      <hr />

      {/* CTA */}
      <h2 style={{ textAlign: 'center' }}>Want a website that couldn&rsquo;t belong to anyone else?</h2>
      <p style={{ textAlign: 'center' }}>
        Tell me about your project and I&rsquo;ll tell you honestly what it needs — and what it doesn&rsquo;t.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Link href="/#contact" className="btn-poster">&mdash; Start Your Project</Link>
      </p>
    </ArticleLayout>
  )
}
