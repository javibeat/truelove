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
          {[['Home','/'],[`Services`,'/services/web-design'],['Portfolio','/work/kiko-navarro'],['About','/about'],['Journal','/blog'],['Contact','/#contact']].map(([l,h]) => (
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
        <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
          <a href="https://www.instagram.com/truelove.creative" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color:INK, transition:'color .15s' }} onMouseEnter={e=>(e.currentTarget.style.color=RED)} onMouseLeave={e=>(e.currentTarget.style.color=INK)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="mailto:info@truelovecreative.es" aria-label="Email" style={{ color:INK, transition:'color .15s' }} onMouseEnter={e=>(e.currentTarget.style.color=RED)} onMouseLeave={e=>(e.currentTarget.style.color=INK)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
          <a href="https://wa.me/971585324519?text=Hi%20True%20Love%20Creative%2C%20I%27d%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color:INK, transition:'color .15s' }} onMouseEnter={e=>(e.currentTarget.style.color='#25D366')} onMouseLeave={e=>(e.currentTarget.style.color=INK)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
        <span style={{ fontFamily:E, fontSize:'8px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE }}>© 2015–2026 · All Rights Reserved · Dubai, UAE</span>
      </footer>
    </div>
  )
}
