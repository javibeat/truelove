import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '../../components/ArticleLayout'
import { posts } from '../posts'

export const metadata: Metadata = {
  title: 'How Much Does a Website Cost in Dubai? (2026) — True Love Creative',
  description: 'Honest pricing for websites in Dubai from a studio that\'s been building them for 10 years. Landing pages from AED 1,500, full sites from AED 3,000, e-commerce from AED 5,500.',
  keywords: ['website cost Dubai', 'web design price UAE', 'how much website Dubai', 'web designer Dubai price', 'website quote Dubai'],
  alternates: { canonical: 'https://truelovecreative.es/blog/how-much-does-a-website-cost-in-dubai' },
  openGraph: {
    title: 'How Much Does a Website Cost in Dubai? (2026)',
    description: 'Honest pricing from a studio that\'s been quoting them for 10 years.',
    type: 'article',
    publishedTime: '2026-04-02',
    authors: ['Javi Beat'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Does a Website Cost in Dubai?',
    author: { '@type': 'Person', name: 'Javi Beat' },
    publisher: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
    datePublished: '2026-04-02',
    description: 'Honest website pricing in Dubai — landing pages, full sites, e-commerce, and apps.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How much does a landing page cost in Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'A professional landing page in Dubai typically costs between AED 1,500 and AED 2,000, plus extras like copywriting, photography, or animations.' } },
      { '@type': 'Question', name: 'How much does a full website cost in Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'A full website with 5-10 pages starts from AED 3,000 in Dubai. This includes custom design, responsive development, SEO setup, and basic integrations.' } },
      { '@type': 'Question', name: 'How much does an e-commerce website cost in Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'An e-commerce website in Dubai starts from AED 5,500. This covers product catalog, payment gateway integration, and a custom shopping experience.' } },
      { '@type': 'Question', name: 'How much does an app cost in Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'Mobile app development in Dubai starts from AED 15,000 for a well-built, professionally designed application.' } },
    ],
  },
]

export default function ArticlePage() {
  const post = posts.find(p => p.slug === 'how-much-does-a-website-cost-in-dubai')!

  return (
    <ArticleLayout post={post} image="/img/blog/website-cost-dubai.png">
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      <p>
        Everyone asks this. It&rsquo;s usually the first question I get — before &ldquo;what&rsquo;s your process&rdquo; or &ldquo;can I see your portfolio.&rdquo; Just straight to: how much? And honestly, I get it. You&rsquo;re running a business, you need to budget, and most agencies make you fill out a form and wait three days for a PDF that still doesn&rsquo;t give you a number.
      </p>
      <p>
        So here&rsquo;s the real answer. No fluff, no &ldquo;it depends&rdquo; without context. These are the actual ranges I work with after 10 years of building websites in Dubai.
      </p>

      <h2>The Prices</h2>

      <h3>Landing Page / One-Pager — AED 1,500 – 2,000</h3>
      <p>
        A single scrollable page. Think of it as your digital business card — but one that actually works. Ideal for DJs, freelancers, or anyone who needs a clean online presence fast.
      </p>

      <h3>Full Website (5–10 pages) — From AED 3,000</h3>
      <p>
        This is what most businesses need. A proper site with services, portfolio, about, contact — everything structured for SEO. This is what I built for Kiko Navarro.
      </p>

      <h3>E-commerce / Online Store — From AED 5,500</h3>
      <p>
        Product catalog, payment gateway, shopping cart, the works. If you&rsquo;re selling something online, this is where you start.
      </p>

      <h3>Mobile App (iOS / Android) — From AED 15,000</h3>
      <p>
        A real app, properly designed and developed. Not a template. Not a no-code hack. An actual product you can put on the App Store.
      </p>

      <p>
        All prices are plus extras — things like professional copywriting, photography, custom animations, or third-party integrations. I always quote these separately so you know exactly what you&rsquo;re paying for.
      </p>

      <h2>Why the range is so wild</h2>
      <p>
        If you google &ldquo;website cost Dubai&rdquo; you&rsquo;ll find quotes from AED 500 to AED 500,000. That&rsquo;s not helpful. The reason is simple: a &ldquo;website&rdquo; can mean a hundred different things. A Wix template with your logo on it is a website. A custom-built platform with user accounts, payments, and a CMS is also a website. Same word, completely different products.
      </p>
      <p>
        What I build sits in the middle — premium quality without the agency markup. I&rsquo;m not a freelancer on Fiverr and I&rsquo;m not a 50-person agency in Media City charging you for their office rent. I&rsquo;m a studio of one with 10 years of experience, and you work directly with me.
      </p>

      <h2>What affects the price</h2>
      <p>
        There are a few things that move the needle:
      </p>
      <ul>
        <li><strong>Number of pages</strong> — more pages, more design, more development time.</li>
        <li><strong>Custom features</strong> — booking systems, galleries, dashboards, user accounts. Anything beyond static content adds complexity.</li>
        <li><strong>Content</strong> — do you have your text and images ready, or do we need to create them? Copywriting and photography are separate line items.</li>
        <li><strong>Animations and interactions</strong> — subtle motion adds polish but takes time to get right.</li>
        <li><strong>Urgency</strong> — need it in two weeks instead of six? That&rsquo;s a rush job and it costs more.</li>
      </ul>

      <h2>The cheap option trap</h2>
      <p>
        I&rsquo;ll be straight with you. You can get a website for AED 500. Someone on Fiverr will take a template, change the colors, put your logo on it, and hand it over. And it will look like exactly that.
      </p>
      <p>
        I&rsquo;ve had clients come to me after spending money twice — once on the cheap version that didn&rsquo;t work, and then again on doing it properly. That&rsquo;s not saving money. That&rsquo;s spending double.
      </p>
      <p>
        A website is not an expense — it&rsquo;s the thing that makes people take you seriously. When someone googles your name or your business, what shows up is your first impression. You don&rsquo;t get a second one.
      </p>

      <blockquote>&ldquo;You don&rsquo;t get a second first impression.&rdquo;</blockquote>

      <h2>What you actually get</h2>
      <p>
        When you work with me, every project includes:
      </p>
      <ul>
        <li><strong>Custom design</strong> — no templates, no themes. Designed from scratch for your brand.</li>
        <li><strong>Responsive development</strong> — looks perfect on every screen, from phone to desktop.</li>
        <li><strong>SEO setup</strong> — proper metadata, structured data, sitemap, fast loading times. Built to be found.</li>
        <li><strong>Performance</strong> — I build with Next.js and modern tools. Your site will be fast.</li>
        <li><strong>Handover</strong> — you own everything. Domain, code, content. It&rsquo;s yours.</li>
      </ul>

      <h2>Frequently Asked</h2>

      <h3>How long does a website take?</h3>
      <p>
        A landing page takes 1–2 weeks. A full site takes 3–6 weeks depending on complexity and how fast you deliver content. I&rsquo;ll give you a timeline before we start.
      </p>

      <h3>Do I pay everything upfront?</h3>
      <p>
        No. I work with a 50% deposit to start and 50% on delivery. For larger projects we can split it into milestones.
      </p>

      <h3>Can I update the site myself?</h3>
      <p>
        Yes. I can set up a CMS so you can edit text and images without touching code. Or I offer maintenance packages if you&rsquo;d rather not deal with it.
      </p>

      <h3>Do you work with clients outside Dubai?</h3>
      <p>
        All the time. Most of my workflow is remote. I&rsquo;ve built sites for clients in Spain, UK, and across the Gulf. Location doesn&rsquo;t matter — communication does.
      </p>

      <hr />

      {/* CTA */}
      <h2 style={{ textAlign: 'center' }}>Ready to talk about your project?</h2>
      <p style={{ textAlign: 'center' }}>
        Tell me what you need and I&rsquo;ll send you a proper quote within 24 hours.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Link href="/#contact" className="btn-poster">&mdash; Get a Quote</Link>
      </p>
    </ArticleLayout>
  )
}
