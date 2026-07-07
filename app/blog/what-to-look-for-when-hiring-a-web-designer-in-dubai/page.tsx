import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '../../components/ArticleLayout'
import { posts } from '../posts'

export const metadata: Metadata = {
  title: 'What to Look for When Hiring a Web Designer in Dubai (2026) — True Love Creative',
  description: 'A practical guide to choosing the right web designer in Dubai. Red flags, what to ask, and how to tell the difference between good and great. Written by a designer with 10 years in the game.',
  keywords: ['hire web designer Dubai', 'web design company Dubai', 'choose web designer UAE', 'freelance web designer Dubai', 'best web designer Dubai', 'web design agency Dubai'],
  alternates: { canonical: 'https://truelovecreative.es/blog/what-to-look-for-when-hiring-a-web-designer-in-dubai' },
  openGraph: {
    title: 'What to Look for When Hiring a Web Designer in Dubai',
    description: 'Red flags, what to ask, and how to find a designer who actually delivers.',
    type: 'article',
    publishedTime: '2026-04-09',
    authors: ['Javi Beat'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What to Look for When Hiring a Web Designer in Dubai',
    author: { '@type': 'Person', name: 'Javi Beat' },
    publisher: { '@type': 'Organization', name: 'True Love Creative', url: 'https://truelovecreative.es' },
    datePublished: '2026-04-09',
    description: 'A practical guide to choosing the right web designer in Dubai — red flags, what to ask, and how to find someone who actually delivers.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I choose a web designer in Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'Look at live websites they have built (not just mockups), ask who actually does the work, check site performance and SEO scores, read the contract carefully, and trust your gut on communication quality.' } },
      { '@type': 'Question', name: 'What are red flags when hiring a web designer in Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'Red flags include only showing Figma mockups with no live URLs, unclear about who does the actual work, no mention of performance or SEO, vague contracts with hidden fees, and slow communication before you have even paid.' } },
      { '@type': 'Question', name: 'Should I hire a freelance web designer or an agency in Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'Neither option is automatically better. Agencies carry overhead that inflates prices, while cheap freelancers often deliver templates. The sweet spot is an experienced independent designer who works directly with you and has a proven portfolio of live sites.' } },
      { '@type': 'Question', name: 'How much should I pay for a web designer in Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'Prices range from AED 500 on Fiverr to AED 50,000+ at agencies. A quality independent designer typically charges AED 1,500 for a landing page and from AED 3,000 for a full website — premium work without the agency markup.' } },
    ],
  },
]

export default function ArticlePage() {
  const post = posts.find(p => p.slug === 'what-to-look-for-when-hiring-a-web-designer-in-dubai')!

  return (
    <ArticleLayout post={post} image="/img/blog/hiring-web-designer-dubai.png">
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      <p>
        You&rsquo;ve decided you need a website. You&rsquo;ve googled &ldquo;web designer Dubai&rdquo; and now you&rsquo;re drowning in options. Agencies, freelancers, &ldquo;full-service digital solutions&rdquo; — everyone promises the world. Beautiful portfolios, big claims, five-star reviews that all sound weirdly similar. And you&rsquo;re sitting there thinking: how do I actually tell who&rsquo;s good?
      </p>
      <p>
        I&rsquo;ve been building websites in Dubai for over 10 years. I&rsquo;m also a DJ, which means I&rsquo;ve been on both sides — hiring creatives and being hired as one. I&rsquo;ve seen every trick in the book. So here&rsquo;s the guide I wish someone had given me before I started working with designers myself. No fluff. Just the stuff that actually matters.
      </p>

      <h2>The Dubai problem</h2>
      <p>
        Dubai has a unique problem when it comes to web design: there&rsquo;s too much of everything. You&rsquo;ve got Media City agencies with glass offices and 30-person teams charging AED 50,000 for a site that a good independent could build for AED 5,000. You&rsquo;ve got Fiverr freelancers charging AED 500 and delivering a WordPress template with your logo slapped on it. And you&rsquo;ve got everything in between.
      </p>
      <p>
        The noise is deafening. Everyone&rsquo;s got a website that says &ldquo;award-winning&rdquo; and &ldquo;results-driven.&rdquo; Everyone&rsquo;s portfolio looks incredible — because portfolios are curated. The question isn&rsquo;t who looks good on paper. It&rsquo;s who actually delivers.
      </p>
      <p>
        Here&rsquo;s how you cut through the noise.
      </p>

      <h2>Look at live sites, not mockups</h2>
      <p>
        This is the biggest red flag in the industry and barely anyone talks about it. If a designer only shows you Figma mockups, Behance shots, or PDFs — run. A mockup is a promise. A live website is proof. They are not the same thing.
      </p>
      <p>
        Ask for URLs. Click around. Open them on your phone. Check how fast they load. Try to find the contact page. Fill out a form. If the designer can&rsquo;t give you links to real, live, working websites — that tells you everything you need to know.
      </p>
      <p>
        When someone asks me for examples, I send them to <a href="/work/kiko-navarro">kikonavarro.com</a> or <a href="/work/manuel-kevsax">manuelkevsax.com</a>. Real sites. Live right now. Go ahead, click them, resize the window, check the speed. That&rsquo;s the standard I hold myself to, and it&rsquo;s the standard you should hold your designer to as well.
      </p>

      <h2>Ask who actually does the work</h2>
      <p>
        This one catches a lot of people off guard. You meet with an agency. The guy across the table is polished, articulate, knows exactly what to say. You sign the contract. And then you never hear from that guy again. Your project gets handed off to a team you&rsquo;ve never met, often in a completely different country.
      </p>
      <p>
        There&rsquo;s nothing inherently wrong with remote teams. Some of the best developers I know work from different continents. But you should know who&rsquo;s building your site. You should be able to talk to them. If the person selling you the project and the person building it are two completely different people with zero overlap — that&rsquo;s a recipe for miscommunication.
      </p>
      <p>
        When you work with me, you work with me. I design it. I build it. I&rsquo;m the one answering your messages at 11pm because something needs to be tweaked before your launch. That&rsquo;s not a pitch — it&rsquo;s just how I operate.
      </p>

      <h2>Check the tech, not just the design</h2>
      <p>
        A beautiful website that takes 8 seconds to load is worthless. I mean that literally — Google will bury it in search results and visitors will leave before they see a single word. Pretty is not enough.
      </p>
      <p>
        Ask your designer about performance. Ask about mobile responsiveness. Ask about SEO — not the buzzword version, the real one. Can they explain what structured data is? Do they know what a Lighthouse score means? Have they ever optimised a Core Web Vital?
      </p>
      <p>
        Here&rsquo;s a simple test: take one of their live sites and run it through Google PageSpeed Insights. If it scores below 70 on mobile, they&rsquo;re not paying attention to what matters. Most agencies don&rsquo;t even know this tool exists. I build every site to score 90+.
      </p>

      <h2>Read the contract before you pay</h2>
      <p>
        I&rsquo;ve heard horror stories. A client paid AED 15,000 for a website, and when they wanted to move to a different host, they found out the agency owned the code. Another client discovered that &ldquo;unlimited revisions&rdquo; actually meant three rounds — it was buried in the fine print. Another one got hit with a AED 500/month &ldquo;maintenance fee&rdquo; for a site that didn&rsquo;t need maintaining.
      </p>
      <p>
        Before you sign anything, make sure you know:
      </p>
      <ul>
        <li>How many revisions are included — and what counts as a revision.</li>
        <li>Who owns the code and the design when it&rsquo;s done.</li>
        <li>What happens after launch — is there a handover? Is support included? For how long?</li>
        <li>What the payment schedule looks like — deposits, milestones, final payment.</li>
        <li>Whether there are any recurring fees you didn&rsquo;t expect.</li>
      </ul>
      <p>
        A good designer will be upfront about all of this before you even ask. If they&rsquo;re vague about money, they&rsquo;ll be vague about everything else too.
      </p>

      <h2>The portfolio test</h2>
      <p>
        Don&rsquo;t just look at screenshots. Visit the actual sites. This is the single most important thing you can do and it takes five minutes.
      </p>
      <p>
        Are those portfolio sites still live? Do they still look good? Are they fast? Do they work on mobile? A designer who built five great sites that are still running two years later is infinitely better than one who built fifty sites that are all broken, offline, or look like they were last updated in 2019.
      </p>
      <p>
        Longevity matters. If all their past work has disappeared, ask yourself why. Did the clients move on? Did the sites break? Did the designer use tools or platforms that didn&rsquo;t last? A well-built site should still be running years after launch with minimal intervention.
      </p>

      <h2>Price is not quality</h2>
      <p>
        I wrote a whole article about <a href="/blog/how-much-does-a-website-cost-in-dubai">how much a website costs in Dubai</a>, so I won&rsquo;t repeat all of it here. But the short version: expensive does not mean good, and cheap definitely means bad.
      </p>
      <p>
        The agencies charging AED 40,000 aren&rsquo;t necessarily building you a better website. They&rsquo;re paying for their office in Business Bay, their sales team, their project managers, their account executives. You&rsquo;re funding their overhead, not your website. On the other end, the AED 500 freelancer is giving you a template and a prayer.
      </p>
      <p>
        The sweet spot is an experienced independent who doesn&rsquo;t carry agency overhead but has the skills and portfolio to back up their price. Someone who&rsquo;s done this enough times to know what works, and honest enough to tell you what you actually need instead of what makes the invoice bigger.
      </p>

      <h2>Trust your gut</h2>
      <p>
        This might sound soft, but it&rsquo;s the most practical advice I can give you. If the communication is bad before you&rsquo;ve paid, it will be worse after. If they take five days to reply to an email during the sales process — when they&rsquo;re trying to impress you — imagine what happens when you need an urgent fix on your live site.
      </p>
      <p>
        Pay attention to how they talk to you. Do they ask questions about your business, or just talk about themselves? Do they listen, or do they push their own ideas? Do they explain things clearly, or hide behind jargon? A website project is a relationship. It lasts weeks, sometimes months. You need to actually enjoy working with this person.
      </p>
      <p>
        I&rsquo;ve turned down projects because the fit wasn&rsquo;t right. And I&rsquo;d rather a client tells me honestly that we&rsquo;re not the right match than waste both our time pretending otherwise. That honesty — on both sides — is what makes a project work.
      </p>

      <blockquote>&ldquo;A good designer doesn&rsquo;t just build what you ask for. They tell you what you actually need.&rdquo;</blockquote>

      <h2>Red Flags Checklist</h2>
      <ul>
        <li>Only shows mockups, no live URLs</li>
        <li>Won&rsquo;t say who builds the site</li>
        <li>No mention of performance or SEO</li>
        <li>Vague contract or hidden fees</li>
        <li>Slow replies before you&rsquo;ve paid</li>
        <li>Portfolio sites are offline or broken</li>
        <li>Can&rsquo;t explain their own tech stack</li>
      </ul>

      <h2>Frequently Asked</h2>

      <h3>How do I check if a web designer is good?</h3>
      <p>
        Ask for live URLs, not mockups. Visit their portfolio sites on your phone. Run them through Google PageSpeed Insights. Check if the sites are still live and maintained. That tells you more than any sales pitch.
      </p>

      <h3>Is it better to hire an agency or a freelancer in Dubai?</h3>
      <p>
        Neither is automatically better. Agencies have overhead that inflates prices. Cheap freelancers cut corners. The best option is often an experienced independent who works directly with you and has a strong portfolio of live work.
      </p>

      <h3>What should a web design contract include?</h3>
      <p>
        Number of revisions, who owns the code and design, payment schedule, post-launch support terms, and any recurring fees. If the contract is vague on any of these, ask before you sign.
      </p>

      <h3>How long does it take to build a website in Dubai?</h3>
      <p>
        A landing page takes 1-2 weeks. A full site with 5-10 pages takes 3-6 weeks. Complex projects with custom features can take longer. Your designer should give you a clear timeline before starting.
      </p>

      <hr />

      {/* CTA */}
      <h2 style={{ textAlign: 'center' }}>Ready to talk about your project?</h2>
      <p style={{ textAlign: 'center' }}>
        Tell me what you need and I&rsquo;ll give you an honest answer — not a sales pitch.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Link href="/#contact" className="btn-poster">&mdash; Get in Touch</Link>
      </p>
    </ArticleLayout>
  )
}
