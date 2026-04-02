import type { Metadata } from 'next'
import GazettePage from '../components/GazettePage'
import { P, E, F, INK, RED, FADE, RULE } from '../lib/constants'

export const metadata: Metadata = {
  title: 'About — True Love Creative · Design Studio Dubai',
  description: 'Founded in 2015 in Dubai, True Love Creative is a premium design studio led by Javi Beat. Over a decade of crafting high-end digital experiences for artists, startups, and brands worldwide.',
  keywords: ['design studio Dubai', 'creative agency UAE', 'Javi Beat designer', 'Dubai web designer', 'about True Love Creative'],
  alternates: { canonical: 'https://truelovecreative.es/about' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'True Love Creative',
    founder: { '@type': 'Person', name: 'Javi Beat', jobTitle: 'Creative Director & Founder' },
    foundingDate: '2015',
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    knowsLanguage: ['English', 'Spanish', 'Arabic'],
  },
}

export default function AboutPage() {
  return (
    <GazettePage section="The Studio" sectionNum="I" title="About" titleAccent="The Studio" subtitle="A decade of crafting digital experiences that refuse to be ordinary.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Two-column body */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'0', padding:'24px 0' }} className="grid-2">

        {/* Left — main story */}
        <div style={{ paddingRight:'32px', borderRight:`1px solid ${RULE}` }}>
          <p className="fell dropcap reveal" style={{ fontFamily:F, fontSize:'15px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'20px' }}>
            True Love Creative was born in 2015 from a simple conviction: that design is not decoration — it is decision. Based in Dubai, UAE, the studio has spent over a decade building digital experiences for those who refuse to settle for average.
          </p>

          <div className="rule-thin" style={{ margin:'24px 0' }} />
          <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'12px' }}>The Founder</div>

          <p className="fell reveal" style={{ fontFamily:F, fontSize:'15px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'16px' }}>
            <strong>Javi Beat</strong> is a designer, creative director, and DJ who has called Dubai home for over ten years. His dual perspective — rooted in European design tradition and sharpened by the ambition of the Gulf — gives the studio its distinctive voice: clean, powerful, and unmistakably intentional.
          </p>
          <p className="fell reveal" style={{ fontFamily:F, fontSize:'15px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'16px' }}>
            With a deep connection to the music and arts scene, Javi has built identities and platforms for internationally recognised DJs, musicians, photographers, and creative entrepreneurs. Every project is personal. Every pixel, considered.
          </p>

          <div className="rule-thin" style={{ margin:'24px 0' }} />
          <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'12px' }}>Philosophy</div>

          <p className="fell reveal" style={{ fontFamily:F, fontSize:'15px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'16px' }}>
            We work with a simple philosophy: fewer clients, deeper work. We don't run an assembly line. Each project receives the full attention of the studio — from concept to launch — because that is the only way to produce work that truly matters.
          </p>
          <p className="fell reveal" style={{ fontFamily:F, fontSize:'15px', lineHeight:1.9, color:INK, textAlign:'justify', marginBottom:'16px' }}>
            Our clients are artists, startups, and brands who understand that their digital presence is not a cost — it is their most powerful asset. We build things that last, that perform, and that make people stop scrolling.
          </p>

          <div className="rule-thin" style={{ margin:'24px 0' }} />
          <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.3em', textTransform:'uppercase', color:RED, marginBottom:'12px' }}>How We Work</div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', marginBottom:'20px' }} className="grid-2-form">
            {[
              { num:'01', title:'Discovery', desc:'We listen. We research your industry, your competitors, and your audience before sketching a single line.' },
              { num:'02', title:'Concept', desc:'Strategic direction and visual exploration. We present ideas, not templates.' },
              { num:'03', title:'Craft', desc:'Meticulous execution in code and pixel. Every detail serves a purpose.' },
              { num:'04', title:'Launch', desc:'Deployment, testing, and handover. We stay until everything is perfect — and beyond.' },
            ].map(step => (
              <div key={step.num} style={{ padding:'16px', border:`1px solid ${RULE}` }}>
                <div style={{ fontFamily:P, fontSize:'28px', fontWeight:900, color:'rgba(26,18,8,0.08)', marginBottom:'4px' }}>{step.num}</div>
                <div style={{ fontFamily:P, fontSize:'16px', fontWeight:700, color:INK, marginBottom:'6px' }}>{step.title}</div>
                <div style={{ fontFamily:F, fontSize:'13px', lineHeight:1.8, color:FADE }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — sidebar */}
        <div style={{ paddingLeft:'24px' }}>
          <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Quick Facts</div>
          <div className="rule-thin" style={{ marginBottom:'16px' }} />

          {[
            ['Founded', '2015'],
            ['Location', 'Dubai, UAE'],
            ['Founder', 'Javi Beat'],
            ['Languages', 'EN · ES · AR'],
            ['Clients Served', '30+'],
            ['Serving', 'Worldwide'],
          ].map(([label, value]) => (
            <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${RULE}` }}>
              <span style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.15em', textTransform:'uppercase', color:FADE }}>{label}</span>
              <span style={{ fontFamily:F, fontSize:'13px', fontStyle:'italic', color:INK }}>{value}</span>
            </div>
          ))}

          <div className="rule-thin" style={{ margin:'24px 0' }} />

          <div style={{ padding:'16px', border:`3px double ${INK}`, textAlign:'center', marginBottom:'24px' }}>
            <div style={{ fontFamily:P, fontSize:'18px', fontWeight:900, fontStyle:'italic', color:RED, lineHeight:1.3, marginBottom:'8px' }}>"We don't do average."</div>
            <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.2em', color:FADE }}>— The Studio Creed</div>
          </div>

          <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Specialities</div>
          <div className="rule-thin" style={{ marginBottom:'12px' }} />
          {['Web Design', 'Graphic Design', 'App Development', 'Brand Identity', 'Creative Direction'].map(s => (
            <div key={s} style={{ fontFamily:F, fontSize:'13px', color:INK, borderBottom:`1px solid ${RULE}`, padding:'6px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              {s}<span style={{ color:RED }}>→</span>
            </div>
          ))}

          <div className="rule-thin" style={{ margin:'24px 0' }} />

          <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Connect</div>
          <div className="rule-thin" style={{ marginBottom:'12px' }} />
          {[
            ['Email', 'info@truelovecreative.es', 'mailto:info@truelovecreative.es'],
            ['WhatsApp', '+971 58 532 4519', 'https://wa.me/971585324519'],
            ['Instagram', '@truelove.creative', 'https://www.instagram.com/truelove.creative'],
          ].map(([label, text, href]) => (
            <div key={label} style={{ marginBottom:'12px' }}>
              <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, marginBottom:'4px' }}>{label}</div>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ fontFamily:F, fontSize:'13px', fontStyle:'italic', color:INK, textDecoration:'none' }}>{text}</a>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ borderTop:`4px double ${INK}`, padding:'32px 0', textAlign:'center' }}>
        <div style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:FADE, marginBottom:'16px' }}>✦ &nbsp; Ready? &nbsp; ✦</div>
        <h2 className="playfair" style={{ fontFamily:P, fontSize:'clamp(2rem,6vw,5rem)', fontWeight:900, fontStyle:'italic', lineHeight:.88, color:INK, letterSpacing:'-.02em', marginBottom:'24px' }}>
          Let's build something<br /><span style={{ color:RED }}>remarkable.</span>
        </h2>
        <a href="/#contact"
          style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', background:INK, color:'#F4EFE0', padding:'16px 40px', textDecoration:'none', display:'inline-block' }}>
          Start Your Project →
        </a>
      </div>
    </GazettePage>
  )
}
