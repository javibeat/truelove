import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GazettePage from '../../components/GazettePage'
import { P, E, F, INK, RED, FADE, RULE } from '../../lib/constants'
import { getAdjacentPosts } from '../posts'

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
  return (
    <GazettePage section="The Journal" sectionNum="VIII" title="What to Look for When Hiring" titleAccent="a Web Designer in Dubai" subtitle="Red flags, smart questions, and how to tell the difference between good and great.">
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      {/* Article meta */}
      <div style={{ display:'flex', gap:'24px', alignItems:'center', padding:'16px 0', borderBottom:`1px solid ${RULE}`, marginBottom:'32px', flexWrap:'wrap' }}>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:RED }}>Web Design</span>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>9 APRIL 2026</span>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>7 MIN READ</span>
        <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE }}>BY JAVI BEAT</span>
      </div>

      {/* Hero image */}
      <div style={{ margin:'0 0 32px', border:`1px solid ${RULE}` }}>
        <Image src="/img/blog/hiring-web-designer-dubai.png" alt="Red flags vs green flags when hiring a web designer in Dubai — infographic" width={1200} height={630} style={{ width:'100%', height:'auto', display:'block' }} priority />
      </div>

      {/* Article body */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:'0' }} className="grid-2">

        {/* Main content */}
        <div style={{ paddingRight:'32px', borderRight:`1px solid ${RULE}` }}>

          <p className="fell dropcap" style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            You&apos;ve decided you need a website. You&apos;ve googled &quot;web designer Dubai&quot; and now you&apos;re drowning in options. Agencies, freelancers, &quot;full-service digital solutions&quot; — everyone promises the world. Beautiful portfolios, big claims, five-star reviews that all sound weirdly similar. And you&apos;re sitting there thinking: how do I actually tell who&apos;s good?
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            I&apos;ve been building websites in Dubai for over 10 years. I&apos;m also a DJ, which means I&apos;ve been on both sides — hiring creatives and being hired as one. I&apos;ve seen every trick in the book. So here&apos;s the guide I wish someone had given me before I started working with designers myself. No fluff. Just the stuff that actually matters.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>The Dubai problem</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Dubai has a unique problem when it comes to web design: there&apos;s too much of everything. You&apos;ve got Media City agencies with glass offices and 30-person teams charging AED 50,000 for a site that a good independent could build for AED 5,000. You&apos;ve got Fiverr freelancers charging AED 500 and delivering a WordPress template with your logo slapped on it. And you&apos;ve got everything in between.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            The noise is deafening. Everyone&apos;s got a website that says &quot;award-winning&quot; and &quot;results-driven.&quot; Everyone&apos;s portfolio looks incredible — because portfolios are curated. The question isn&apos;t who looks good on paper. It&apos;s who actually delivers.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Here&apos;s how you cut through the noise.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Look at live sites, not mockups</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            This is the biggest red flag in the industry and barely anyone talks about it. If a designer only shows you Figma mockups, Behance shots, or PDFs — run. A mockup is a promise. A live website is proof. They are not the same thing.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Ask for URLs. Click around. Open them on your phone. Check how fast they load. Try to find the contact page. Fill out a form. If the designer can&apos;t give you links to real, live, working websites — that tells you everything you need to know.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            When someone asks me for examples, I send them to <a href="/work/kiko-navarro" style={{ color:RED }}>kikonavarro.com</a> or <a href="/work/manuel-kevsax" style={{ color:RED }}>manuelkevsax.com</a>. Real sites. Live right now. Go ahead, click them, resize the window, check the speed. That&apos;s the standard I hold myself to, and it&apos;s the standard you should hold your designer to as well.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Ask who actually does the work</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            This one catches a lot of people off guard. You meet with an agency. The guy across the table is polished, articulate, knows exactly what to say. You sign the contract. And then you never hear from that guy again. Your project gets handed off to a team you&apos;ve never met, often in a completely different country.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            There&apos;s nothing inherently wrong with remote teams. Some of the best developers I know work from different continents. But you should know who&apos;s building your site. You should be able to talk to them. If the person selling you the project and the person building it are two completely different people with zero overlap — that&apos;s a recipe for miscommunication.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            When you work with me, you work with me. I design it. I build it. I&apos;m the one answering your messages at 11pm because something needs to be tweaked before your launch. That&apos;s not a pitch — it&apos;s just how I operate.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Check the tech, not just the design</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            A beautiful website that takes 8 seconds to load is worthless. I mean that literally — Google will bury it in search results and visitors will leave before they see a single word. Pretty is not enough.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Ask your designer about performance. Ask about mobile responsiveness. Ask about SEO — not the buzzword version, the real one. Can they explain what structured data is? Do they know what a Lighthouse score means? Have they ever optimised a Core Web Vital?
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Here&apos;s a simple test: take one of their live sites and run it through Google PageSpeed Insights. If it scores below 70 on mobile, they&apos;re not paying attention to what matters. Most agencies don&apos;t even know this tool exists. I build every site to score 90+.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Read the contract before you pay</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            I&apos;ve heard horror stories. A client paid AED 15,000 for a website, and when they wanted to move to a different host, they found out the agency owned the code. Another client discovered that &quot;unlimited revisions&quot; actually meant three rounds — it was buried in the fine print. Another one got hit with a AED 500/month &quot;maintenance fee&quot; for a site that didn&apos;t need maintaining.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'12px' }}>
            Before you sign anything, make sure you know:
          </p>
          <div style={{ paddingLeft:'20px', marginBottom:'20px' }}>
            {[
              'How many revisions are included — and what counts as a revision.',
              'Who owns the code and the design when it\'s done.',
              'What happens after launch — is there a handover? Is support included? For how long?',
              'What the payment schedule looks like — deposits, milestones, final payment.',
              'Whether there are any recurring fees you didn\'t expect.',
            ].map((item, i) => (
              <p key={i} style={{ fontFamily:F, fontSize:'15px', lineHeight:1.8, color:INK, marginBottom:'8px', paddingLeft:'12px', borderLeft:`2px solid ${RED}` }}>{item}</p>
            ))}
          </div>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            A good designer will be upfront about all of this before you even ask. If they&apos;re vague about money, they&apos;ll be vague about everything else too.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>The portfolio test</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Don&apos;t just look at screenshots. Visit the actual sites. This is the single most important thing you can do and it takes five minutes.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Are those portfolio sites still live? Do they still look good? Are they fast? Do they work on mobile? A designer who built five great sites that are still running two years later is infinitely better than one who built fifty sites that are all broken, offline, or look like they were last updated in 2019.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Longevity matters. If all their past work has disappeared, ask yourself why. Did the clients move on? Did the sites break? Did the designer use tools or platforms that didn&apos;t last? A well-built site should still be running years after launch with minimal intervention.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Price is not quality</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            I wrote a whole article about <a href="/blog/how-much-does-a-website-cost-in-dubai" style={{ color:RED }}>how much a website costs in Dubai</a>, so I won&apos;t repeat all of it here. But the short version: expensive does not mean good, and cheap definitely means bad.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            The agencies charging AED 40,000 aren&apos;t necessarily building you a better website. They&apos;re paying for their office in Business Bay, their sales team, their project managers, their account executives. You&apos;re funding their overhead, not your website. On the other end, the AED 500 freelancer is giving you a template and a prayer.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            The sweet spot is an experienced independent who doesn&apos;t carry agency overhead but has the skills and portfolio to back up their price. Someone who&apos;s done this enough times to know what works, and honest enough to tell you what you actually need instead of what makes the invoice bigger.
          </p>

          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Trust your gut</div>

          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            This might sound soft, but it&apos;s the most practical advice I can give you. If the communication is bad before you&apos;ve paid, it will be worse after. If they take five days to reply to an email during the sales process — when they&apos;re trying to impress you — imagine what happens when you need an urgent fix on your live site.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            Pay attention to how they talk to you. Do they ask questions about your business, or just talk about themselves? Do they listen, or do they push their own ideas? Do they explain things clearly, or hide behind jargon? A website project is a relationship. It lasts weeks, sometimes months. You need to actually enjoy working with this person.
          </p>
          <p style={{ fontFamily:F, fontSize:'16px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            I&apos;ve turned down projects because the fit wasn&apos;t right. And I&apos;d rather a client tells me honestly that we&apos;re not the right match than waste both our time pretending otherwise. That honesty — on both sides — is what makes a project work.
          </p>

          <div style={{ padding:'24px', border:`3px double ${INK}`, margin:'32px 0', textAlign:'center' }}>
            <p style={{ fontFamily:P, fontSize:'18px', fontWeight:900, fontStyle:'italic', color:RED, lineHeight:1.3, marginBottom:'6px' }}>&quot;A good designer doesn&apos;t just build what you ask for. They tell you what you actually need.&quot;</p>
          </div>

          {/* FAQ */}
          <div className="rule-thin" style={{ margin:'28px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>Frequently Asked</div>

          {[
            { q:'How do I check if a web designer is good?', a:'Ask for live URLs, not mockups. Visit their portfolio sites on your phone. Run them through Google PageSpeed Insights. Check if the sites are still live and maintained. That tells you more than any sales pitch.' },
            { q:'Is it better to hire an agency or a freelancer in Dubai?', a:'Neither is automatically better. Agencies have overhead that inflates prices. Cheap freelancers cut corners. The best option is often an experienced independent who works directly with you and has a strong portfolio of live work.' },
            { q:'What should a web design contract include?', a:'Number of revisions, who owns the code and design, payment schedule, post-launch support terms, and any recurring fees. If the contract is vague on any of these, ask before you sign.' },
            { q:'How long does it take to build a website in Dubai?', a:'A landing page takes 1-2 weeks. A full site with 5-10 pages takes 3-6 weeks. Complex projects with custom features can take longer. Your designer should give you a clear timeline before starting.' },
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
              <p style={{ fontFamily:F, fontSize:'14px', color:FADE, marginBottom:'16px' }}>Tell me what you need and I&apos;ll give you an honest answer — not a sales pitch.</p>
              <a href="/#contact" style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', background:INK, color:'#F4EFE0', padding:'14px 36px', textDecoration:'none', display:'inline-block' }}>Get in Touch &rarr;</a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ paddingLeft:'24px' }}>
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>About the Author</div>
          <div className="rule-thin" style={{ marginBottom:'16px' }} />
          <p style={{ fontFamily:F, fontSize:'13px', lineHeight:1.8, color:INK, marginBottom:'16px' }}>
            <strong>Javi Beat</strong> is a designer, creative director, and DJ based in Dubai since 2015. He&apos;s built 50+ websites and brand identities for artists, musicians, and businesses across the Middle East and Europe.
          </p>

          <div className="rule-thin" style={{ margin:'20px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Red Flags Checklist</div>
          <div className="rule-thin" style={{ marginBottom:'12px' }} />
          <div style={{ padding:'16px', border:`1px solid ${RULE}`, marginBottom:'20px' }}>
            {[
              'Only shows mockups, no live URLs',
              'Won\'t say who builds the site',
              'No mention of performance or SEO',
              'Vague contract or hidden fees',
              'Slow replies before you\'ve paid',
              'Portfolio sites are offline or broken',
              'Can\'t explain their own tech stack',
            ].map((item, i) => (
              <p key={i} style={{ fontFamily:F, fontSize:'12px', lineHeight:1.7, color:INK, marginBottom:'6px', paddingLeft:'12px', borderLeft:`2px solid ${RED}` }}>{item}</p>
            ))}
          </div>

          <div className="rule-thin" style={{ margin:'20px 0' }} />
          <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Related Work</div>
          <div className="rule-thin" style={{ marginBottom:'12px' }} />
          {[
            { name:'Kiko Navarro', slug:'kiko-navarro', type:'Web Design' },
            { name:'Jessica Morari', slug:'jessica-morari', type:'Branding & Web' },
            { name:'Estrela Photo', slug:'estrela-photo', type:'Portfolio' },
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
          <Link href="/blog/why-every-dj-needs-a-website" style={{ display:'block', padding:'12px 0', textDecoration:'none', borderBottom:`1px solid ${RULE}` }}>
            <span style={{ fontFamily:P, fontSize:'14px', fontWeight:700, color:INK, lineHeight:1.3, display:'block' }}>Why Every DJ Needs a Professional Website</span>
            <span style={{ fontFamily:E, fontSize:'9px', color:FADE, marginTop:'4px', display:'block' }}>5 MIN READ</span>
          </Link>

          <div className="rule-thin" style={{ margin:'20px 0' }} />
          <div style={{ padding:'16px', border:`3px double ${INK}`, textAlign:'center' }}>
            <div style={{ fontFamily:P, fontSize:'16px', fontWeight:900, fontStyle:'italic', color:RED, lineHeight:1.3, marginBottom:'6px' }}>&quot;A good designer doesn&apos;t just build what you ask for. They tell you what you actually need.&quot;</div>
            <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', color:FADE }}>— Javi Beat</div>
          </div>
        </div>
      </div>

      {/* Prev / Next navigation */}
      {(() => {
        const { prev, next } = getAdjacentPosts('what-to-look-for-when-hiring-a-web-designer-in-dubai')
        return (
          <div style={{ borderTop:`4px double ${INK}`, marginTop:'32px', padding:'24px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }} className="grid-2">
            <Link href={`/blog/${prev.slug}`} style={{ textDecoration:'none' }}>
              <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>&larr; Previous Article</div>
              <div style={{ fontFamily:P, fontSize:'18px', fontWeight:700, color:INK, lineHeight:1.3 }}>{prev.title}</div>
              <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE, marginTop:'6px' }}>{prev.category.toUpperCase()} &middot; {prev.readTime.toUpperCase()}</div>
            </Link>
            <Link href={`/blog/${next.slug}`} style={{ textDecoration:'none', textAlign:'right' }}>
              <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Next Article &rarr;</div>
              <div style={{ fontFamily:P, fontSize:'18px', fontWeight:700, color:INK, lineHeight:1.3 }}>{next.title}</div>
              <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.15em', color:FADE, marginTop:'6px' }}>{next.category.toUpperCase()} &middot; {next.readTime.toUpperCase()}</div>
            </Link>
          </div>
        )
      })()}

    </GazettePage>
  )
}
