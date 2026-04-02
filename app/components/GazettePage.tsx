'use client'

import Link from 'next/link'
import { P, E, F, INK, RED, FADE, PAPER, RULE } from '../lib/constants'

export default function GazettePage({
  section,
  sectionNum,
  title,
  titleAccent,
  subtitle,
  date,
  children,
}: {
  section: string
  sectionNum: string
  title: string
  titleAccent: string
  subtitle: string
  date?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'0 24px' }}>

      {/* Masthead — mini version */}
      <header style={{ padding:'24px 0 12px', textAlign:'center' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'6px' }}>
          <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', color:FADE }}>EST. MMXV · DUBAI, U.A.E.</span>
          <Link href="/" style={{ textDecoration:'none' }}>
            <span style={{ fontFamily:P, fontSize:'clamp(1.5rem,4vw,2.5rem)', fontWeight:900, color:INK }}>True Love <em style={{ color:RED }}>Creative</em></span>
          </Link>
          <span style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.2em', color:FADE }}>TRUELOVECREATIVE.ES</span>
        </div>
        <div className="rule-h2" style={{ marginTop:'12px' }} />
        <nav style={{ display:'flex', justifyContent:'center', gap:'clamp(16px,4vw,48px)', padding:'10px 0', flexWrap:'wrap' }}>
          {[['Home','/'],[`Services`,'/services/web-design'],['Portfolio','/work/kiko-navarro'],['About','/about'],['Contact','/#contact']].map(([l,h]) => (
            <Link key={l} href={h} style={{ fontFamily:E, fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:INK, textDecoration:'none' }}>{l}</Link>
          ))}
        </nav>
        <div className="rule-h" />
        <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', alignItems:'center', flexWrap:'wrap', gap:'6px' }}>
          <span style={{ fontFamily:E, fontSize:'8px', color:FADE, letterSpacing:'.15em' }}>{(date || new Date().toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'})).toUpperCase()}</span>
          <span style={{ fontFamily:E, fontSize:'8px', color:RED, letterSpacing:'.2em' }}>✦ {section.toUpperCase()} ✦</span>
          <span style={{ fontFamily:E, fontSize:'8px', color:FADE, letterSpacing:'.15em' }}>PRICE: FREE</span>
        </div>
        <div className="rule-thin" />
      </header>

      {/* Section header */}
      <section style={{ padding:'24px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-20px', right:'-10px', fontFamily:P, fontSize:'clamp(120px,18vw,240px)', fontWeight:900, color:'rgba(26,18,8,0.04)', lineHeight:1, pointerEvents:'none', userSelect:'none', zIndex:0 }}>{sectionNum}</div>
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:'16px', alignItems:'center', marginBottom:'10px' }}>
            <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.35em', textTransform:'uppercase', color:FADE, whiteSpace:'nowrap' }}>Section {sectionNum}</div>
            <div style={{ height:'1px', background:RULE }} />
            <div style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.2em', color:FADE, whiteSpace:'nowrap' }}>{section.toUpperCase()}</div>
          </div>
          <div className="rule-h" />
          <div style={{ padding:'20px 0 16px', textAlign:'center' }}>
            <h1 className="playfair" style={{ fontFamily:P, fontSize:'clamp(2.5rem,8vw,7rem)', fontWeight:900, lineHeight:.88, letterSpacing:'-.02em', color:INK }}>
              {title}<br /><em style={{ color:RED }}>{titleAccent}</em>
            </h1>
            <div style={{ fontFamily:F, fontSize:'clamp(0.85rem,1.8vw,1.1rem)', fontStyle:'italic', color:FADE, marginTop:'12px', maxWidth:'600px', margin:'12px auto 0' }}>
              {subtitle}
            </div>
          </div>
          <div className="rule-h" />
        </div>
      </section>

      {/* Page content */}
      {children}

      {/* Footer */}
      <footer style={{ borderTop:`2px solid ${INK}`, padding:'16px 0', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'8px', marginTop:'32px' }}>
        <Link href="/" style={{ fontFamily:P, fontSize:'14px', fontWeight:900, fontStyle:'italic', color:INK, textDecoration:'none' }}>True Love Creative</Link>
        <span style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE }}>© 2015–2026 · All Rights Reserved · Dubai, UAE</span>
        <span style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.15em', color:FADE }}>TRUELOVECREATIVE.ES</span>
      </footer>
    </div>
  )
}
