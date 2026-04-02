import type { Metadata } from 'next'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, RULE } from '../../lib/constants'

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
  return (
    <GazettePage section="The Journal" sectionNum="VIII" title="How Much Does a Website" titleAccent="Cost in Dubai?" subtitle="The honest answer from someone who's been quoting them for 10 years.">
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      {/* Article meta */}
      <div style={{ display:'flex', gap:'24px', alignItems:'center', padding:'16px 0', borderBottom:`1px solid ${RULE}`, marginBottom:'32px' }}>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:RED }}>Web Design</span>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>2 APRIL 2026</span>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>6 MIN READ</span>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>BY JAVI BEAT</span>
      </div>

      {/* Article body */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:'0' }} className="grid-2">

        {/* Main content */}
        <div style={{ paddingRight:'32px', borderRight:`1px solid ${RULE}` }}>

          <p className="fell dropcap" style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Everyone asks this. It&apos;s usually the first question I get — before &quot;what&apos;s your process&quot; or &quot;can I see your portfolio.&quot; Just straight to: how much? And honestly, I get it. You&apos;re running a business, you need to budget, and most agencies make you fill out a form and wait three days for a PDF that still doesn&apos;t give you a number.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            So here&apos;s the real answer. No fluff, no &quot;it depends&quot; without context. These are the actual ranges I work with after 10 years of building websites in Dubai.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>The Prices</div>

          {/* Price table */}
          <div style={{ marginBottom:'32px' }}>
            {[
              { type:'Landing Page / One-Pager', price:'AED 1,500 – 2,000', note:'A single scrollable page. Think of it as your digital business card — but one that actually works. Ideal for DJs, freelancers, or anyone who needs a clean online presence fast.' },
              { type:'Full Website (5–10 pages)', price:'From AED 3,000', note:'This is what most businesses need. A proper site with services, portfolio, about, contact — everything structured for SEO. This is what I built for Kiko Navarro.' },
              { type:'E-commerce / Online Store', price:'From AED 5,500', note:'Product catalog, payment gateway, shopping cart, the works. If you\'re selling something online, this is where you start.' },
              { type:'Mobile App (iOS / Android)', price:'From AED 15,000', note:'A real app, properly designed and developed. Not a template. Not a no-code hack. An actual product you can put on the App Store.' },
            ].map(item => (
              <div key={item.type} style={{ padding:'20px 0', borderBottom:`1px solid ${RULE}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'8px', flexWrap:'wrap', gap:'8px' }}>
                  <span style={{ fontFamily:P, fontSize:'18px', fontWeight:700, color:INK }}>{item.type}</span>
                  <span style={{ fontFamily:E, fontSize:'11px', letterSpacing:'.1em', color:RED, fontWeight:700 }}>{item.price}</span>
                </div>
                <p style={{ fontFamily:F, fontSize:'14px', lineHeight:1.8, color:FADE }}>{item.note}</p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            All prices are plus extras — things like professional copywriting, photography, custom animations, or third-party integrations. I always quote these separately so you know exactly what you&apos;re paying for.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Why the range is so wild</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            If you google &quot;website cost Dubai&quot; you&apos;ll find quotes from AED 500 to AED 500,000. That&apos;s not helpful. The reason is simple: a &quot;website&quot; can mean a hundred different things. A Wix template with your logo on it is a website. A custom-built platform with user accounts, payments, and a CMS is also a website. Same word, completely different products.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            What I build sits in the middle — premium quality without the agency markup. I&apos;m not a freelancer on Fiverr and I&apos;m not a 50-person agency in Media City charging you for their office rent. I&apos;m a studio of one with 10 years of experience, and you work directly with me.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>What affects the price</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'12px' }}>
            There are a few things that move the needle:
          </p>
          <div style={{ paddingLeft:'20px', marginBottom:'20px' }}>
            {[
              'Number of pages — more pages, more design, more development time.',
              'Custom features — booking systems, galleries, dashboards, user accounts. Anything beyond static content adds complexity.',
              'Content — do you have your text and images ready, or do we need to create them? Copywriting and photography are separate line items.',
              'Animations and interactions — subtle motion adds polish but takes time to get right.',
              'Urgency — need it in two weeks instead of six? That\'s a rush job and it costs more.',
            ].map((item, i) => (
              <p key={i} style={{ fontFamily:F, fontSize:'15px', lineHeight:1.8, color:INK, marginBottom:'8px', paddingLeft:'12px', borderLeft:`2px solid ${RULE}` }}>{item}</p>
            ))}
          </div>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>The cheap option trap</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            I&apos;ll be straight with you. You can get a website for AED 500. Someone on Fiverr will take a template, change the colors, put your logo on it, and hand it over. And it will look like exactly that.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            I&apos;ve had clients come to me after spending money twice — once on the cheap version that didn&apos;t work, and then again on doing it properly. That&apos;s not saving money. That&apos;s spending double.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            A website is not an expense — it&apos;s the thing that makes people take you seriously. When someone googles your name or your business, what shows up is your first impression. You don&apos;t get a second one.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>What you actually get</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'12px' }}>
            When you work with me, every project includes:
          </p>
          <div style={{ paddingLeft:'20px', marginBottom:'20px' }}>
            {[
              'Custom design — no templates, no themes. Designed from scratch for your brand.',
              'Responsive development — looks perfect on every screen, from phone to desktop.',
              'SEO setup — proper metadata, structured data, sitemap, fast loading times. Built to be found.',
              'Performance — I build with Next.js and modern tools. Your site will be fast.',
              'Handover — you own everything. Domain, code, content. It\'s yours.',
            ].map((item, i) => (
              <p key={i} style={{ fontFamily:F, fontSize:'15px', lineHeight:1.8, color:INK, marginBottom:'8px', paddingLeft:'12px', borderLeft:`2px solid ${RED}` }}>{item}</p>
            ))}
          </div>

          {/* FAQ */}
          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Frequently Asked</div>

          {[
            { q:'How long does a website take?', a:'A landing page takes 1–2 weeks. A full site takes 3–6 weeks depending on complexity and how fast you deliver content. I\'ll give you a timeline before we start.' },
            { q:'Do I pay everything upfront?', a:'No. I work with a 50% deposit to start and 50% on delivery. For larger projects we can split it into milestones.' },
            { q:'Can I update the site myself?', a:'Yes. I can set up a CMS so you can edit text and images without touching code. Or I offer maintenance packages if you\'d rather not deal with it.' },
            { q:'Do you work with clients outside Dubai?', a:'All the time. Most of my workflow is remote. I\'ve built sites for clients in Spain, UK, and across the Gulf. Location doesn\'t matter — communication does.' },
          ].map((faq, i) => (
            <div key={i} style={{ padding:'16px 0', borderBottom:`1px solid ${RULE}` }}>
              <p style={{ fontFamily:P, fontSize:'16px', fontWeight:700, color:INK, marginBottom:'8px' }}>{faq.q}</p>
              <p style={{ fontFamily:F, fontSize:'14px', lineHeight:1.8, color:FADE }}>{faq.a}</p>
            </div>
          ))}

          {/* CTA */}
          <div style={{ padding:'32px 0', textAlign:'center' }}>
            <div style={{ padding:'24px', border:`3px double ${INK}` }}>
              <p style={{ fontFamily:P, fontSize:'20px', fontWeight:900, fontStyle:'italic', color:INK, marginBottom:'12px' }}>Ready to talk about your project?</p>
              <p style={{ fontFamily:F, fontSize:'14px', color:FADE, marginBottom:'16px' }}>Tell me what you need and I&apos;ll send you a proper quote within 24 hours.</p>
              <a href="/#contact" style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', background:INK, color:'#F4EFE0', padding:'14px 36px', textDecoration:'none', display:'inline-block' }}>Get a Quote →</a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ paddingLeft:'24px' }}>
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>About the Author</div>
          <div className="rule-thin" style={{ marginBottom:'16px' }} />
          <p style={{ fontFamily:F, fontSize:'13px', lineHeight:1.8, color:INK, marginBottom:'16px' }}>
            <strong>Javi Beat</strong> is a designer and creative director based in Dubai. He&apos;s been building websites and brands for artists, musicians, and startups since 2015.
          </p>

          <div className="rule-thin" style={{ margin:'20px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Price Summary</div>
          <div className="rule-thin" style={{ marginBottom:'12px' }} />
          {[
            ['Landing Page', 'AED 1,500–2,000'],
            ['Full Website', 'From AED 3,000'],
            ['E-commerce', 'From AED 5,500'],
            ['Mobile App', 'From AED 15,000'],
          ].map(([type, price]) => (
            <div key={type} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${RULE}` }}>
              <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.1em', color:FADE }}>{type}</span>
              <span style={{ fontFamily:F, fontSize:'13px', fontStyle:'italic', color:RED }}>{price}</span>
            </div>
          ))}

          <div className="rule-thin" style={{ margin:'20px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Related Work</div>
          <div className="rule-thin" style={{ marginBottom:'12px' }} />
          {[
            { name:'Kiko Navarro', slug:'kiko-navarro', type:'Web Design' },
            { name:'Manuel KevSax', slug:'manuel-kevsax', type:'Web Design' },
            { name:'Jessica Morari', slug:'jessica-morari', type:'Branding & Web' },
          ].map(p => (
            <Link key={p.slug} href={`/work/${p.slug}`} style={{ display:'block', padding:'8px 0', borderBottom:`1px solid ${RULE}`, textDecoration:'none' }}>
              <span style={{ fontFamily:F, fontSize:'13px', color:INK }}>{p.name}</span>
              <span style={{ fontFamily:E, fontSize:'9px', color:FADE, marginLeft:'8px' }}>{p.type}</span>
            </Link>
          ))}

          <div className="rule-thin" style={{ margin:'20px 0' }} />
          <div style={{ padding:'16px', border:`3px double ${INK}`, textAlign:'center' }}>
            <div style={{ fontFamily:P, fontSize:'16px', fontWeight:900, fontStyle:'italic', color:RED, lineHeight:1.3, marginBottom:'6px' }}>&quot;You don&apos;t get a second first impression.&quot;</div>
            <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', color:FADE }}>— Javi Beat</div>
          </div>
        </div>
      </div>

    </GazettePage>
  )
}
