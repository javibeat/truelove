'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const P = 'var(--playfair),Georgia,serif'
const E = 'var(--elite),"Courier New",monospace'
const F = 'var(--fell),Georgia,serif'
const IB = '"Ibrand","Playfair Display",Georgia,serif'
const INK = '#1A1208'
const RED = '#8B1A1A'
const FADE = '#7A6A4A'
const PAPER = '#F4EFE0'
const RULE = 'rgba(26,18,8,0.15)'

const projects = [
  { id:'I',   name:'Kiko Navarro',   type:'Web Design · 2024',     img:'/img/portfolios/kikonavarro.jpg', url:'https://kikonavarro.es/',       desc:'Legendary DJ & producer.',       slug:'kiko-navarro' },
  { id:'II',  name:'Jessica Morari', type:'Branding & Web · 2023', img:'/img/portfolios/jesslnk.webp',   url:'https://jessicamorari.com/',    desc:'Coaching & wellness platform.', slug:'jessica-morari' },
  { id:'III', name:'Javi Beat',      type:'Identity · 2024',       img:'/img/portfolios/javibeat.jpg',    url:'https://javibeat.com/',         desc:'DJ identity from Dubai.',       slug:'javi-beat' },
  { id:'IV',  name:'Estrela Photo',  type:'Portfolio · 2023',      img:'/img/portfolios/estrela.jpg',     url:'https://estrela.photo/',        desc:'Photography studio portfolio.', slug:'estrela-photo' },
  { id:'V',   name:'Manuel KevSax',  type:'Web Design · 2024',     img:'/img/portfolios/manusax.webp',   url:'https://manuelkevsax.com/',     desc:'Luxury saxophonist booking.',   slug:'manuel-kevsax' },
  { id:'VI',  name:'Sergio Trumpet', type:'Portfolio · 2024',      img:'/img/portfolios/sergio.jpg',      url:'https://sergiotrumpetdj.com/', desc:'Professional trumpet player.',  slug:'sergio-trumpet' },
  { id:'VII', name:'Julio Cuba',     type:'Identity · 2024',       img:'/img/portfolios/julio.webp',      url:'https://juliocuba.es/',         desc:'Violinist artistic portfolio.', slug:'julio-cuba' },
]

const graphicSlides = [
  { img:'/img/graphic/el-silencio.jpg',  title:'EL SILENCIO',  sub:'Buika × Kiko Navarro', cat:'Vinyl Cover' },
  { img:'/img/graphic/mama-calling.jpg', title:'MAMA CALLING', sub:'Buika × Kiko Navarro', cat:'Vinyl Cover' },
  { img:'/img/graphic/varadero.jpg',     title:'VARADERO',     sub:'Event Series, Dubai 2023', cat:'Flyer' },
  { img:'/img/graphic/varadero1.jpg',    title:'VARADERO II',  sub:'Event Series, Dubai 2023', cat:'Flyer' },
  { img:'/img/graphic/varadero2.jpg',    title:'VARADERO III', sub:'Event Series, Dubai 2023', cat:'Flyer' },
]

const nibangoSlides = [
  '/img/portfolios/nibango-mockup-1.jpg',
  '/img/portfolios/nibango-mockup-2.jpg',
  '/img/portfolios/nibango-mockup-3.jpg',
]

// ── Graphic lightbox carousel ─────────────────────────────────────
function GraphicCarousel() {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<number|null>(null)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % graphicSlides.length), 3200)
    return () => clearInterval(t)
  }, [])

  const s = graphicSlides[current]

  return (
    <div>
      {/* Main slide */}
      <div style={{ position:'relative', aspectRatio:'3/4', background:'#111', cursor:'zoom-in', overflow:'hidden' }}
        onClick={() => setLightbox(current)}>
        <Image src={s.img} alt={s.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit:'cover', animation:'hp-shimmer 5s ease-in-out infinite' }} />
        {/* scanlines */}
        <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)', pointerEvents:'none', zIndex:2 }} />
        {/* streak */}
        <div style={{ position:'absolute', top:'-20%', width:'18%', height:'140%', background:'linear-gradient(90deg,transparent,rgba(244,239,224,0.1),transparent)', transform:'skewX(-20deg)', animation:'hp-streak 6s ease-in-out infinite', zIndex:3, pointerEvents:'none' }} />
        {/* caption overlay */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'12px', background:'linear-gradient(transparent,rgba(26,18,8,0.7))', zIndex:4 }}>
          <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(244,239,224,0.6)', marginBottom:'2px' }}>{s.cat}</div>
          <div style={{ fontFamily:P, fontSize:'16px', fontWeight:700, color:PAPER }}>{s.title}</div>
          <div style={{ fontFamily:F, fontSize:'14px', fontStyle:'italic', color:'rgba(244,239,224,0.6)' }}>{s.sub}</div>
        </div>
        {/* zoom hint */}
        <div style={{ position:'absolute', top:'10px', right:'10px', fontFamily:E, fontSize:'10px', letterSpacing:'.15em', color:'rgba(244,239,224,0.4)', zIndex:4 }}>CLICK TO EXPAND</div>
      </div>

      {/* Thumbnails */}
      <div style={{ display:'flex', gap:'4px', marginTop:'4px' }}>
        {graphicSlides.map((sl, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{ flex:1, aspectRatio:'1/1', overflow:'hidden', cursor:'pointer', opacity: i === current ? 1 : 0.45, outline: i === current ? `2px solid ${RED}` : 'none', transition:'opacity .2s', position:'relative' }}>
            <Image src={sl.img} alt={sl.title} fill sizes="20vw" style={{ objectFit:'cover' }} />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(26,18,8,0.94)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'zoom-out' }}>
          <div style={{ position:'relative', maxWidth:'90vw', maxHeight:'90vh' }} onClick={e => e.stopPropagation()}>
            <Image src={graphicSlides[lightbox].img} alt={graphicSlides[lightbox].title} width={1200} height={642} sizes="90vw" style={{ maxWidth:'90vw', maxHeight:'85vh', objectFit:'contain', display:'block', width:'auto', height:'auto' }} />
            <div style={{ textAlign:'center', marginTop:'12px' }}>
              <div style={{ fontFamily:P, fontSize:'18px', fontWeight:700, color:PAPER }}>{graphicSlides[lightbox].title}</div>
              <div style={{ fontFamily:F, fontSize:'14px', fontStyle:'italic', color:'rgba(244,239,224,0.5)', marginTop:'4px' }}>{graphicSlides[lightbox].sub}</div>
            </div>
            {/* Prev / Next */}
            {[[-1,'←'],[1,'→']].map(([dir, arrow]) => (
              <button key={String(dir)} className={dir === -1 ? 'lightbox-nav-prev' : 'lightbox-nav-next'} onClick={() => setLightbox(lb => ((lb! + Number(dir) + graphicSlides.length) % graphicSlides.length))}
                style={{ position:'absolute', top:'50%', transform:'translateY(-50%)', [dir === -1 ? 'left' : 'right']:'-60px', background:'rgba(26,18,8,0.6)', border:`1px solid ${FADE}`, color:PAPER, fontFamily:E, fontSize:'18px', width:'44px', height:'44px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{arrow}</button>
            ))}
            <button onClick={() => setLightbox(null)} style={{ position:'absolute', top:'-40px', right:0, background:'none', border:'none', color:PAPER, fontFamily:E, fontSize:'14px', letterSpacing:'.2em', cursor:'pointer' }}>CLOSE ✕</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Nibango auto-carousel ─────────────────────────────────────────
function NibangoCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % nibangoSlides.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <div>
      <div className="hp-photo" style={{ position:'relative', aspectRatio:'9/16', background:PAPER, overflow:'hidden' }}>
        {nibangoSlides.map((src, i) => (
          <Image key={src} src={src} alt="Nibango app screen" fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit:'cover', objectPosition:'center top', transition:'opacity .6s ease', opacity: i === current ? 1 : 0 }} />
        ))}
      </div>
      {/* Dots */}
      <div style={{ display:'flex', justifyContent:'center', gap:'8px', marginTop:'10px' }}>
        {nibangoSlides.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{ width:'6px', height:'6px', borderRadius:'50%', background: i === current ? RED : FADE, cursor:'pointer', transition:'background .2s' }} />
        ))}
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries =>
      entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 60) }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Ibrand font */}
      <style>{`@font-face { font-family: 'Ibrand'; src: url('/fonts/Ibrand.otf') format('opentype'); font-display: swap; }`}</style>

      <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'0 24px' }}>

        {/* ══ MASTHEAD ══════════════════════════════════════════ */}
        <header style={{ padding:'32px 0 16px', textAlign:'center' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px', flexWrap:'wrap', gap:'6px' }}>
            <span style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', color:FADE }}>EST. MMXV · DUBAI, U.A.E.</span>
            <span style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', color:FADE }}>WEB · GRAPHIC · APP</span>
            <span style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', color:FADE }}>VOL. XI · FREE OF CHARGE</span>
          </div>
          <div className="rule-h2" />
          <div style={{ padding:'20px 0 16px' }}>
            <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.5em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>✦ &nbsp; The Creative Gazette &nbsp; ✦</div>
            <h1 className="playfair" style={{ fontFamily:P, fontSize:'clamp(3.5rem,12vw,10rem)', fontWeight:900, lineHeight:.88, letterSpacing:'-.02em', color:INK }}>
              True Love<br /><em style={{ color:RED }}>Creative</em>
            </h1>
            <div style={{ fontFamily:F, fontSize:'clamp(0.9rem,2vw,1.2rem)', fontStyle:'italic', color:FADE, marginTop:'8px' }}>
              "High-end digital experiences. Minimalist design, premium execution. From Dubai to the world."
            </div>
          </div>
          <div className="rule-h" />
          <nav style={{ display:'flex', justifyContent:'center', gap:'clamp(16px,4vw,48px)', padding:'10px 0', flexWrap:'wrap' }}>
            {[['Selected Works','#selected'],['Graphic Design','#graphic'],['App Development','#app'],['About the Studio','/about'],['Journal','/blog'],['Contact Us','#contact']].map(([l,h]) => (
              <a key={l} href={h} style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', color:INK, textDecoration:'none' }}
                onMouseEnter={e=>(e.currentTarget.style.color=RED)} onMouseLeave={e=>(e.currentTarget.style.color=INK)}>{l}</a>
            ))}
          </nav>
          <div className="rule-h" />
          <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', alignItems:'center', flexWrap:'wrap', gap:'6px' }}>
            <span style={{ fontFamily:E, fontSize:'10px', color:FADE, letterSpacing:'.15em' }}>
              {new Date().toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).toUpperCase()}
            </span>
            <span style={{ fontFamily:E, fontSize:'10px', color:RED, letterSpacing:'.2em' }}>✦ TRUELOVECREATIVE.ES ✦</span>
            <span style={{ fontFamily:E, fontSize:'10px', color:FADE, letterSpacing:'.15em' }}>PRICE: FREE</span>
          </div>
          <div className="rule-thin" />
        </header>

        {/* ══ FRONT PAGE — 3 cols ════════════════════════════════ */}
        <section style={{ display:'grid', gridTemplateColumns:'1fr 2fr 1fr', gap:'0', borderBottom:`1px solid ${RULE}`, padding:'24px 0' }} className="grid-3">

          {/* Left */}
          <div className="front-col" style={{ padding:'0 20px 0 0', borderRight:`1px solid ${RULE}` }}>
            <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Studio</div>
            <div className="rule-thin" style={{ marginBottom:'12px' }} />
            <p className="fell reveal" style={{ fontFamily:F, fontSize:'14px', lineHeight:1.9, color:INK }}>
              Founded in <strong>2015</strong>, True Love Creative has quietly become one of the most trusted design studios operating out of <strong>Dubai, UAE.</strong>
            </p>
            <div style={{ margin:'16px 0', textAlign:'center' }}>
              <span className="stamp">Est. 2015</span>
            </div>
            <p className="fell reveal" style={{ fontFamily:F, fontSize:'14px', lineHeight:1.9, color:INK, marginTop:'12px' }}>
              We work with artists, startups, and brands who believe that design is not decoration — it is decision.
            </p>
            <div style={{ marginTop:'20px', padding:'12px', border:`1px solid ${RULE}`, background:'rgba(139,26,26,0.04)' }}>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, marginBottom:'8px' }}>Services</div>
              {[['Web Design','/services/web-design'],['Graphic Design','/services/graphic-design'],['App Development','/services/app-development'],['Brand Identity','/services/branding'],['Creative Direction','/services/branding']].map(([s,href])=>(
                <a key={s} href={href} style={{ fontFamily:F, fontSize:'14px', color:INK, borderBottom:`1px solid ${RULE}`, padding:'5px 0', display:'flex', justifyContent:'space-between', alignItems:'center', textDecoration:'none', transition:'color .15s' }}
                  onMouseEnter={e=>(e.currentTarget.style.color=RED)} onMouseLeave={e=>(e.currentTarget.style.color=INK)}>
                  {s}<span style={{ color:RED }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Centre — hero HP photo with link */}
          <div className="front-col-center" style={{ padding:'0 24px' }}>
            <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px', textAlign:'center' }}>Featured — Kiko Navarro</div>
            <div className="rule-thin" style={{ marginBottom:'12px' }} />
            <a href="/work/kiko-navarro" style={{ textDecoration:'none', display:'block' }}>
              <div className="hp-photo" style={{ width:'100%', aspectRatio:'4/3', position:'relative', marginBottom:'16px' }}>
                <Image src="/img/portfolios/kikonavarro.jpg" alt="Kiko Navarro" fill style={{ objectFit:'cover' }} />
              </div>
            </a>
            <p className="fell dropcap reveal" style={{ fontFamily:F, fontSize:'16px', lineHeight:1.85, color:INK, textAlign:'justify' }}>
              Kiko Navarro — legendary DJ, musician and producer. His new website, crafted entirely by True Love Creative, stands as testament to what digital presence ought to be: clean, powerful, and unmistakably him.
            </p>
            <div style={{ marginTop:'12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontFamily:E, fontSize:'10px', color:FADE, letterSpacing:'.1em', fontStyle:'italic' }}>— Web Design · Dubai, 2024</div>
              <a href="/work/kiko-navarro" style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, textDecoration:'none' }}>Read Case Study →</a>
            </div>
          </div>

          {/* Right */}
          <div className="front-col" style={{ padding:'0 0 0 20px', borderLeft:`1px solid ${RULE}` }}>
            <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Latest</div>
            <div className="rule-thin" style={{ marginBottom:'12px' }} />
            {[
              { img:'/img/portfolios/jesslnk.webp', name:'Jessica Morari', type:'Branding & Web', slug:'jessica-morari' },
              { img:'/img/portfolios/javibeat.jpg',  name:'Javi Beat',      type:'Identity',      slug:'javi-beat' },
            ].map(p=>(
              <div key={p.name} style={{ marginBottom:'20px' }}>
                <a href={`/work/${p.slug}`} style={{ display:'block', textDecoration:'none' }}>
                  <div className="hp-photo" style={{ width:'100%', aspectRatio:'3/2', position:'relative', marginBottom:'8px' }}>
                    <Image src={p.img} alt={p.name} fill style={{ objectFit:'cover', filter:'grayscale(20%)' }} />
                  </div>
                </a>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                  <div>
                    <div style={{ fontFamily:P, fontSize:'14px', fontWeight:700, color:INK }}>{p.name}</div>
                    <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', color:FADE }}>{p.type}</div>
                  </div>
                  <a href={`/work/${p.slug}`} style={{ fontFamily:E, fontSize:'10px', color:RED, textDecoration:'none', letterSpacing:'.1em' }}>→</a>
                </div>
              </div>
            ))}
            <div className="rule-thin" style={{ margin:'16px 0' }} />
            <div style={{ padding:'12px', border:`3px double ${INK}`, textAlign:'center' }}>
              <div style={{ fontFamily:P, fontSize:'18px', fontWeight:900, fontStyle:'italic', color:RED, lineHeight:1.2, marginBottom:'8px' }}>"We don't do average."</div>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', color:FADE }}>— The Studio Creed</div>
            </div>
          </div>
        </section>

        {/* ══ MARQUEE ═══════════════════════════════════════════ */}
        <div style={{ borderTop:`2px solid ${INK}`, borderBottom:`2px solid ${INK}`, padding:'8px 0', overflow:'hidden', background:INK }}>
          <div className="marquee">
            {Array(3).fill(['SELECTED WORKS','✦','KIKO NAVARRO','✦','JESSICA MORARI','✦','JAVI BEAT','✦','ESTRELA PHOTO','✦','MANUEL KEVSAX','✦','JULIO CUBA','✦','NIBANGO','✦']).flat().map((t,i)=>(
              <span key={i} style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', padding:'0 20px', color: t==='✦' ? RED : 'rgba(244,239,224,0.5)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ══ SELECTED WORKS ════════════════════════════════════ */}
        <section id="selected" style={{ padding:'32px 0', position:'relative', overflow:'hidden' }}>

          {/* Watermark number */}
          <div style={{ position:'absolute', top:'-20px', right:'-10px', fontFamily:P, fontSize:'clamp(120px,18vw,240px)', fontWeight:900, color:'rgba(26,18,8,0.04)', lineHeight:1, pointerEvents:'none', userSelect:'none', zIndex:0 }}>II</div>

          {/* Header — full width with thick rule top + bottom */}
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:'16px', alignItems:'center', marginBottom:'10px' }}>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:FADE, whiteSpace:'nowrap' }}>Section II</div>
              <div style={{ height:'1px', background:RULE }} />
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', color:FADE, whiteSpace:'nowrap' }}>MMXXIII — MMXXIV</div>
            </div>
            <div className="rule-h" />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', padding:'16px 0 12px', alignItems:'end' }} className="grid-2">
              <h2 className="playfair" style={{ fontFamily:P, fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:900, letterSpacing:'-.02em', lineHeight:.88 }}>
                Selected<br /><em style={{ color:RED }}>Works</em>
              </h2>
              <p className="fell" style={{ fontFamily:F, fontSize:'14px', lineHeight:1.9, color:FADE, borderLeft:`2px solid ${RED}`, paddingLeft:'14px' }}>
                Seven projects. Seven stories. Each one built with the same conviction — that good design is the difference between being remembered and being ignored.
              </p>
            </div>
            <div className="rule-h" />
          </div>

          {/* Main body — 2 cols: list left, classifieds right */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 180px', gap:'0', position:'relative', zIndex:1 }} className="grid-2">

            {/* Left — work list */}
            <div className="works-list-col" style={{ borderRight:`1px solid ${RULE}`, paddingRight:'24px' }}>
              {projects.map((p, i) => (
                <a key={p.id} href={`/work/${p.slug}`}
                  style={{ textDecoration:'none', display:'grid', gridTemplateColumns:'28px 52px 1fr auto', gap:'12px', alignItems:'center', padding:'12px 0', borderBottom:`1px solid ${RULE}`, cursor:'crosshair', transition:'background .15s' }}
                  onMouseEnter={e=>(e.currentTarget.style.background='rgba(139,26,26,0.04)')}
                  onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
                >
                  <span style={{ fontFamily:E, fontSize:'10px', color:FADE, letterSpacing:'.08em', fontStyle:'italic' }}>{p.id}</span>
                  <div style={{ width:'52px', height:'38px', position:'relative', overflow:'hidden', flexShrink:0 }}>
                    <Image src={p.img} alt={p.name} fill style={{ objectFit:'cover', filter:'grayscale(50%)' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily:P, fontSize:'clamp(1rem,2vw,1.8rem)', fontWeight:700, color:INK, lineHeight:1.1 }}>{p.name}</div>
                    <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE, marginTop:'2px' }}>{p.type}</div>
                  </div>
                  <span style={{ fontSize:'14px', color:FADE, transition:'all .15s' }} className="wr-arr">→</span>
                </a>
              ))}

              {/* Pull quote between list and photos */}
              <div style={{ padding:'20px 0 16px', borderBottom:`1px solid ${RULE}` }}>
                <div style={{ fontFamily:P, fontSize:'clamp(1rem,2.2vw,1.5rem)', fontWeight:900, fontStyle:'italic', color:RED, lineHeight:1.3 }}>
                  "Good design is the difference between being remembered and being ignored."
                </div>
                <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', color:FADE, marginTop:'8px' }}>— Studio Philosophy</div>
              </div>
            </div>

            {/* Right — classifieds column */}
            <div className="works-index-col" style={{ paddingLeft:'16px' }}>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px', paddingTop:'12px' }}>Index</div>
              <div style={{ height:'1px', background:RULE, marginBottom:'10px' }} />
              {projects.map(p=>(
                <div key={p.id} style={{ padding:'7px 0', borderBottom:`1px solid ${RULE}` }}>
                  <div style={{ fontFamily:P, fontSize:'14px', fontWeight:700, color:INK, lineHeight:1.2 }}>{p.name}</div>
                  <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.1em', textTransform:'uppercase', color:FADE, marginTop:'2px' }}>{p.type.split('·')[0].trim()}</div>
                </div>
              ))}
              <div style={{ marginTop:'14px', padding:'10px', border:`1px solid ${RULE}`, background:'rgba(139,26,26,0.04)' }}>
                <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, marginBottom:'4px' }}>Studio</div>
                <div style={{ fontFamily:F, fontSize:'14px', fontStyle:'italic', color:INK, lineHeight:1.6 }}>Web · Graphic<br />App · Brand<br />Est. 2015</div>
              </div>
            </div>
          </div>

          {/* Photo strip — broadsheet style */}
          <div style={{ marginTop:'24px', position:'relative', zIndex:1 }}>
            <div className="rule-h" style={{ marginBottom:'10px' }} />
            <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:FADE, marginBottom:'10px', textAlign:'center' }}>✦ &nbsp; Portrait Gallery &nbsp; ✦</div>
            <div className="rule-thin" />
            <div className="portrait-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'0' }}>
              {projects.slice(0,4).map((p, i) => (
                <a key={p.id} href={`/work/${p.slug}`} style={{ textDecoration:'none', color:'inherit', borderLeft: i > 0 ? `1px solid ${RULE}` : 'none' }}>
                  <div style={{ padding:'7px 10px 5px', borderBottom:`1px solid ${RULE}` }}>
                    <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE }}>{p.type.split('·')[0].trim()}</div>
                  </div>
                  <div className="hp-photo" style={{ position:'relative', aspectRatio:'3/4' }}>
                    <Image src={p.img} alt={p.name} fill style={{ objectFit:'cover' }} />
                  </div>
                  <div style={{ padding:'7px 10px', borderTop:`1px solid ${RULE}` }}>
                    <div style={{ fontFamily:P, fontSize:'14px', fontWeight:700, color:INK, lineHeight:1.2 }}>{p.name}</div>
                    <div style={{ fontFamily:F, fontSize:'10px', fontStyle:'italic', color:FADE, marginTop:'2px', lineHeight:1.5 }}>{p.desc}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="rule-h" />
          </div>
        </section>


        {/* ══ TESTIMONIALS ══════════════════════════════════════ */}
        <section style={{ padding:'32px 0', borderTop:`4px double ${INK}`, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'-10px', left:'-8px', fontFamily:P, fontSize:'clamp(100px,15vw,200px)', fontWeight:900, color:'rgba(26,18,8,0.04)', lineHeight:1, pointerEvents:'none', userSelect:'none' }}>"</div>
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:'16px', alignItems:'center', marginBottom:'10px' }}>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:FADE, whiteSpace:'nowrap' }}>Client Voices</div>
              <div style={{ height:'1px', background:RULE }} />
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', color:FADE, whiteSpace:'nowrap' }}>On the Record</div>
            </div>
            <div className="rule-h" style={{ marginBottom:'0' }} />
            <div className="testimonials-grid" style={{ display:'grid', gridTemplateColumns:'1px 1fr 1px 1fr 1px 1fr 1px', marginTop:'0' }}>
              <div className="testimonials-divider" style={{ background:RULE }} />
              <div key="t1" style={{ padding:'28px 24px', borderBottom:`1px solid ${RULE}` }}>
                <div style={{ fontFamily:P, fontSize:'clamp(1rem,1.8vw,1.4rem)', fontWeight:700, fontStyle:'italic', color:INK, lineHeight:1.6, marginBottom:'20px' }}>"True Love Creative understood my brand immediately — and built something I couldn't have imagined myself. My audience felt it straight away."</div>
                <div style={{ borderTop:`1px solid ${RULE}`, paddingTop:'12px' }}>
                  <div style={{ fontFamily:P, fontSize:'14px', fontWeight:700, color:RED }}>Kiko Navarro</div>
                  <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', color:FADE, marginTop:'3px' }}>DJ & Producer · kikonavarro.es</div>
                </div>
              </div>
              <div key="r1" className="testimonials-divider" style={{ background:RULE }} />
              <div key="t2" style={{ padding:'28px 24px', borderBottom:`1px solid ${RULE}` }}>
                <div style={{ fontFamily:P, fontSize:'clamp(1rem,1.8vw,1.4rem)', fontWeight:700, fontStyle:'italic', color:INK, lineHeight:1.6, marginBottom:'20px' }}>"Working with TLC was the first time I felt truly heard by a design studio. The result speaks for itself — my clients book faster and trust me more."</div>
                <div style={{ borderTop:`1px solid ${RULE}`, paddingTop:'12px' }}>
                  <div style={{ fontFamily:P, fontSize:'14px', fontWeight:700, color:RED }}>Jessica Morari</div>
                  <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', color:FADE, marginTop:'3px' }}>Wellness Coach · jessicamorari.com</div>
                </div>
              </div>
              <div key="r2" className="testimonials-divider" style={{ background:RULE }} />
              <div key="t3" style={{ padding:'28px 24px' }}>
                <div style={{ fontFamily:P, fontSize:'clamp(1rem,1.8vw,1.4rem)', fontWeight:700, fontStyle:'italic', color:INK, lineHeight:1.6, marginBottom:'20px' }}>"They didn't just build a portfolio — they built a statement. Clean, fast, and unmistakably mine. My photography finally has a home worthy of it."</div>
                <div style={{ borderTop:`1px solid ${RULE}`, paddingTop:'12px' }}>
                  <div style={{ fontFamily:P, fontSize:'14px', fontWeight:700, color:RED }}>Estrela Photo</div>
                  <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', color:FADE, marginTop:'3px' }}>Photography Studio · estrela.photo</div>
                </div>
              </div>
              <div className="testimonials-divider" style={{ background:RULE }} />
            </div>
            <div className="rule-h" />
          </div>
        </section>

        {/* ══ GRAPHIC DESIGN ════════════════════════════════════ */}
        <section id="graphic" style={{ padding:'32px 0', borderTop:`4px double ${INK}` }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px' }} className="grid-2">
            <div>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Section III</div>
              <h2 className="playfair" style={{ fontFamily:P, fontSize:'clamp(2rem,5vw,4rem)', fontWeight:900, fontStyle:'italic', lineHeight:1, marginBottom:'16px' }}>
                Graphic<br /><span style={{ color:RED }}>Design</span>
              </h2>
              <div className="rule-thin" />
              <p className="fell reveal" style={{ fontFamily:F, fontSize:'14px', lineHeight:1.9, color:INK, marginTop:'16px' }}>
                From vinyl sleeves to event flyers — our graphic work lives in the real world. Buika, Kiko Navarro, Varadero. Each piece crafted to be immediately legible and endlessly remembered.
              </p>
              <div style={{ marginTop:'24px' }}>
                {graphicSlides.slice(0,3).map(g=>(
                  <div key={g.title} style={{ padding:'10px 0', borderBottom:`1px solid ${RULE}`, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                    <div>
                      <div style={{ fontFamily:P, fontSize:'18px', fontWeight:700, color:INK }}>{g.title}</div>
                      <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', color:FADE }}>{g.cat}</div>
                    </div>
                    <div style={{ fontFamily:F, fontSize:'14px', fontStyle:'italic', color:FADE, textAlign:'right', maxWidth:'140px' }}>{g.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Graphic carousel with lightbox */}
            <div>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Graphic Works · Click to expand</div>
              <GraphicCarousel />
            </div>
          </div>
        </section>

        {/* ══ APP — NIBANGO ══════════════════════════════════════ */}
        <section id="app" style={{ borderTop:`4px double ${INK}`, padding:'32px 0' }}>
          <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px', textAlign:'center' }}>Section IV · App Development</div>
          <div className="rule-thin" style={{ marginBottom:'24px' }} />

          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'32px' }} className="grid-2">
            <div>
              {/* Ibrand font title */}
              <h2 style={{ fontFamily:IB, fontSize:'clamp(3.5rem,10vw,10rem)', fontWeight:400, lineHeight:.85, letterSpacing:'-.01em', marginBottom:'16px', color:INK }}>
                nibango
              </h2>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, marginBottom:'16px' }}>
                Live · iOS · Android · Web · Zero Commission
              </div>
              <div className="cols-2">
                <p className="fell dropcap" style={{ fontFamily:F, fontSize:'14px', lineHeight:1.85, color:INK, textAlign:'justify' }}>
                  The marketplace that actually works. Six categories, four pricing models, real-time chat, and absolutely zero commission on any transaction.
                  Built for the real economy — for people who buy, sell, bid, and donate without needing a middleman to take his cut.
                </p>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginTop:'24px', padding:'16px', border:`1px solid ${RULE}` }}>
                {[['6','Categories'],['4','Pricing Models'],['3','Platforms'],['0%','Commission']].map(([n,l])=>(
                  <div key={l} style={{ textAlign:'center', borderRight:`1px solid ${RULE}`, paddingRight:'8px' }}>
                    <div style={{ fontFamily:P, fontSize:'2.5rem', fontWeight:900, color:RED, lineHeight:1 }}>{n}</div>
                    <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', color:FADE, marginTop:'4px' }}>{l}</div>
                  </div>
                ))}
              </div>
              <a href="https://nibango.com/uiapp/" target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-block', marginTop:'24px', fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', background:INK, color:PAPER, padding:'12px 24px', textDecoration:'none', transition:'background .15s' }}
                onMouseEnter={e=>(e.currentTarget.style.background=RED)} onMouseLeave={e=>(e.currentTarget.style.background=INK)}>
                View App →
              </a>
            </div>

            {/* Nibango carousel */}
            <div>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px', textAlign:'center' }}>App Screens</div>
              <NibangoCarousel />
            </div>
          </div>
        </section>

        {/* ══ HOME AGENT ════════════════════════════════════════ */}
        <section style={{ borderTop:`4px double ${INK}`, padding:'32px 0' }}>
          <div style={{ background:`repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(139,26,26,0.03) 10px,rgba(139,26,26,0.03) 20px)`, border:`1px solid ${RULE}`, padding:'24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'24px' }}>
              <div style={{ flex:'1', minWidth:'280px' }}>
                <span className="stamp" style={{ marginBottom:'16px', display:'inline-block' }}>★ For Sale</span>
                <h3 className="playfair" style={{ fontFamily:P, fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:900, lineHeight:.88, marginTop:'12px', marginBottom:'16px' }}>
                  HOME <em style={{ color:RED }}>AGENT</em>
                </h3>
                <p className="fell" style={{ fontFamily:F, fontSize:'14px', lineHeight:1.85, color:INK, maxWidth:'440px' }}>
                  A fully-designed real estate portfolio platform — listings, proforma calculator, lead capture. Built, tested, and ready for acquisition. No development required.
                </p>
                <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginTop:'20px' }}>
                  <a href="https://home-agent-eight.vercel.app" target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-block', fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', background:INK, color:PAPER, padding:'12px 24px', textDecoration:'none', transition:'background .15s' }}
                    onMouseEnter={e=>(e.currentTarget.style.background=RED)} onMouseLeave={e=>(e.currentTarget.style.background=INK)}>
                    View Demo →
                  </a>
                  <a href="https://home-agent-eight.vercel.app/admin" target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-block', fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', border:`1px solid ${INK}`, color:INK, padding:'12px 24px', textDecoration:'none', transition:'all .15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background=INK;e.currentTarget.style.color=PAPER}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=INK}}>
                    Dashboard →
                  </a>
                  <a href="mailto:info@truelovecreative.es?subject=Home Agent"
                    style={{ display:'inline-block', fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', border:`1px solid ${RED}`, color:RED, padding:'12px 24px', textDecoration:'none', transition:'all .15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background=RED;e.currentTarget.style.color=PAPER}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=RED}}>
                    Acquire →
                  </a>
                </div>
              </div>
              <div style={{ position:'relative', width:'min(100%,320px)', aspectRatio:'4/3', flexShrink:0 }}>
                <Image src="/img/portfolios/homeagent.jpg" alt="Home Agent" fill style={{ objectFit:'contain' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ══ ABOUT ═════════════════════════════════════════════ */}
        <section id="about" style={{ borderTop:`4px double ${INK}`, padding:'32px 0' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2px 1fr', gap:'32px', alignItems:'start' }} className="grid-2">
            <div>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>About the Studio</div>
              <div className="rule-thin" style={{ marginBottom:'16px' }} />
              <h2 className="playfair" style={{ fontFamily:P, fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:900, lineHeight:.9, marginBottom:'24px' }}>
                Design with<br /><em style={{ color:RED }}>conviction.</em>
              </h2>
              <div className="cols-2">
                <p className="fell dropcap" style={{ fontFamily:F, fontSize:'14px', lineHeight:1.85, textAlign:'justify', color:INK }}>
                  True Love Creative was founded in 2015. Not in a WeWork, not in a coffee shop — in a room with too many screens and an obsession with getting things right.
                  We have since worked with musicians, therapists, photographers, app developers and restaurateurs across Europe and the Middle East.
                  Each project is treated as if it were the only one.
                </p>
              </div>
            </div>
            <div style={{ background:RULE, alignSelf:'stretch' }} className="hide-mobile" />
            <div>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Studio Facts</div>
              <div className="rule-thin" style={{ marginBottom:'0' }} />
              {[['Founded','2015'],['Headquarters','Dubai, UAE'],['Clients','Musicians · Brands · Startups'],['Services','Web · Graphic · App'],['Languages','ES · EN · AR'],['Email','info@truelovecreative.es'],['Phone','+971 58 532 4519']].map(([l,v])=>(
                <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'10px 0', borderBottom:`1px solid ${RULE}` }}>
                  <span style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE }}>{l}</span>
                  <span style={{ fontFamily:F, fontSize:'14px', fontStyle:'italic', color:INK, textAlign:'right', maxWidth:'200px' }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop:'24px', padding:'16px', border:`1px solid ${RULE}`, background:`rgba(139,26,26,0.03)` }}>
                <div style={{ fontFamily:P, fontSize:'1.1rem', fontWeight:700, fontStyle:'italic', color:INK, lineHeight:1.5 }}>
                  "We don't do average.<br />We do work we're proud to sign."
                </div>
                <div style={{ fontFamily:E, fontSize:'10px', color:FADE, marginTop:'8px', letterSpacing:'.15em' }}>— True Love Creative, Est. 2015</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CONTACT — CTA ══════════════════════════════════════ */}
        <section id="contact" style={{ borderTop:`4px double ${INK}`, padding:'32px 0 0', textAlign:'center' }}>
          <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.4em', textTransform:'uppercase', color:FADE, marginBottom:'16px' }}>✦ &nbsp; Commissions Open &nbsp; ✦</div>
          <h2 className="playfair" style={{ fontFamily:P, fontSize:'clamp(3.5rem,13vw,13rem)', fontWeight:900, fontStyle:'italic', lineHeight:.82, color:INK, letterSpacing:'-.03em', marginBottom:'24px' }}>
            Let's make<br />something<br /><span style={{ color:RED }}>great.</span>
          </h2>
        </section>

        {/* ══ ENQUIRY FORM — Gazette style ═════════════════════════ */}
        <section style={{ padding:'32px 0 48px', position:'relative', overflow:'hidden' }}>

          {/* Watermark */}
          <div className="watermark-envelope" style={{ position:'absolute', top:'-20px', right:'-10px', fontFamily:P, fontSize:'clamp(120px,18vw,240px)', fontWeight:900, color:'rgba(26,18,8,0.04)', lineHeight:1, pointerEvents:'none', userSelect:'none', zIndex:0 }}>✉</div>

          {/* Section header */}
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:'16px', alignItems:'center', marginBottom:'10px' }}>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:FADE, whiteSpace:'nowrap' }}>Section VII</div>
              <div style={{ height:'1px', background:RULE }} />
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', color:FADE, whiteSpace:'nowrap' }}>ENQUIRIES</div>
            </div>
            <div className="rule-h" />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', padding:'16px 0 12px', alignItems:'end' }} className="grid-2">
              <h2 className="playfair" style={{ fontFamily:P, fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:900, letterSpacing:'-.02em', lineHeight:.88 }}>
                Start Your<br /><em style={{ color:RED }}>Project</em>
              </h2>
              <p className="fell" style={{ fontFamily:F, fontSize:'14px', lineHeight:1.9, color:FADE, borderLeft:`2px solid ${RED}`, paddingLeft:'14px' }}>
                Fill in the details below and we shall respond within 24 hours. Every great collaboration begins with a single message.
              </p>
            </div>
            <div className="rule-h" />
          </div>

          {/* Two-column layout: form left, info right */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:'0', marginTop:'24px', position:'relative', zIndex:1 }} className="grid-2">

            {/* Left — form */}
            <div className="contact-form-col" style={{ paddingRight:'32px', borderRight:`1px solid ${RULE}` }}>
              <form action="https://formspree.io/f/mwvwnkow" method="POST" style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
                <input type="text" name="_gotcha" style={{ display:'none' }} tabIndex={-1} autoComplete="off" />
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }} className="grid-2-form">
                  <div>
                    <label style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE, display:'block', marginBottom:'8px' }}>Name</label>
                    <input type="text" name="name" required placeholder="Your full name" style={{ width:'100%', fontFamily:F, fontSize:'14px', padding:'12px 14px', border:`1px solid ${RULE}`, borderBottom:`2px solid ${INK}`, background:'transparent', color:INK, outline:'none', boxSizing:'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE, display:'block', marginBottom:'8px' }}>Email</label>
                    <input type="email" name="email" required placeholder="your@email.com" style={{ width:'100%', fontFamily:F, fontSize:'14px', padding:'12px 14px', border:`1px solid ${RULE}`, borderBottom:`2px solid ${INK}`, background:'transparent', color:INK, outline:'none', boxSizing:'border-box' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE, display:'block', marginBottom:'8px' }}>Type of project</label>
                  <select name="project_type" required style={{ width:'100%', fontFamily:F, fontSize:'14px', padding:'12px 14px', border:`1px solid ${RULE}`, borderBottom:`2px solid ${INK}`, background:'transparent', color:INK, outline:'none', boxSizing:'border-box' }}>
                    <option value="">Select one...</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="App Development">App Development</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE, display:'block', marginBottom:'8px' }}>Tell us about your project</label>
                  <textarea name="message" rows={5} required placeholder="Describe your vision, timeline, and any details you'd like to share..." style={{ width:'100%', fontFamily:F, fontSize:'14px', padding:'12px 14px', border:`1px solid ${RULE}`, borderBottom:`2px solid ${INK}`, background:'transparent', color:INK, outline:'none', resize:'vertical', boxSizing:'border-box' }} />
                </div>
                <div style={{ borderTop:`1px solid ${RULE}`, paddingTop:'20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', color:FADE }}>ALL FIELDS REQUIRED</span>
                  <button type="submit"
                    style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', background:INK, color:PAPER, padding:'16px 40px', border:'none', cursor:'pointer', transition:'background .15s' }}
                    onMouseEnter={e=>(e.currentTarget.style.background=RED)} onMouseLeave={e=>(e.currentTarget.style.background=INK)}>
                    Send Enquiry →
                  </button>
                </div>
              </form>
            </div>

            {/* Right — contact info sidebar */}
            <div className="contact-info-col" style={{ paddingLeft:'24px' }}>
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:FADE, marginBottom:'8px' }}>Direct Contact</div>
              <div className="rule-thin" style={{ marginBottom:'16px' }} />

              <div style={{ marginBottom:'24px' }}>
                <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, marginBottom:'8px' }}>Email</div>
                <a href="mailto:info@truelovecreative.es" style={{ fontFamily:F, fontSize:'14px', fontStyle:'italic', color:INK, textDecoration:'none', transition:'color .15s' }}
                  onMouseEnter={e=>(e.currentTarget.style.color=RED)} onMouseLeave={e=>(e.currentTarget.style.color=INK)}>
                  info@truelovecreative.es
                </a>
              </div>

              <div style={{ marginBottom:'24px' }}>
                <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, marginBottom:'8px' }}>Telephone</div>
                <span style={{ fontFamily:F, fontSize:'14px', fontStyle:'italic', color:INK }}>+971 58 532 4519</span>
              </div>

              <div style={{ marginBottom:'24px' }}>
                <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, marginBottom:'8px' }}>Location</div>
                <span style={{ fontFamily:F, fontSize:'14px', fontStyle:'italic', color:INK }}>Dubai, United Arab Emirates</span>
              </div>

              <div style={{ marginBottom:'24px' }}>
                <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:RED, marginBottom:'8px' }}>Instagram</div>
                <a href="https://www.instagram.com/truelove.creative" target="_blank" rel="noopener noreferrer" style={{ fontFamily:F, fontSize:'14px', fontStyle:'italic', color:INK, textDecoration:'none', transition:'color .15s' }}
                  onMouseEnter={e=>(e.currentTarget.style.color=RED)} onMouseLeave={e=>(e.currentTarget.style.color=INK)}>
                  @truelove.creative
                </a>
              </div>

              <div className="rule-thin" style={{ margin:'16px 0' }} />

              <div style={{ padding:'16px', border:`3px double ${INK}`, textAlign:'center' }}>
                <div style={{ fontFamily:P, fontSize:'16px', fontWeight:900, fontStyle:'italic', color:RED, lineHeight:1.3, marginBottom:'6px' }}>"Every great project<br />starts with a conversation."</div>
                <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', color:FADE }}>— The Studio</div>
              </div>

              <div className="rule-thin" style={{ margin:'16px 0' }} />
              <div style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', color:FADE, lineHeight:2 }}>
                RESPONSE TIME: 24H<br />
                LANGUAGES: EN · ES · AR<br />
                SERVING CLIENTS WORLDWIDE
              </div>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ════════════════════════════════════════════ */}
        <footer style={{ borderTop:`2px solid ${INK}`, padding:'16px 0', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'8px' }}>
          <span style={{ fontFamily:P, fontSize:'14px', fontWeight:900, fontStyle:'italic', color:INK }}>True Love Creative</span>
          <span style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:FADE }}>© 2015–2026 · All Rights Reserved · Dubai, UAE</span>
          <span style={{ fontFamily:E, fontSize:'10px', letterSpacing:'.15em', color:FADE }}>TRUELOVECREATIVE.ES</span>
        </footer>

      </div>

      {/* ══ WHATSAPP FLOATING BUTTON ═══════════════════════ */}
      <a href="https://wa.me/971585324519?text=Hi%20True%20Love%20Creative%2C%20I%27d%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer"
        style={{ position:'fixed', bottom:'24px', right:'24px', width:'56px', height:'56px', borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,0,0,0.25)', zIndex:9000, transition:'transform .2s' }}
        onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.1)')} onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* HP animations as global styles */}
      <style>{`
        @keyframes hp-shimmer {
          0%   { transform: scale(1.00) translate(0,0);      filter: brightness(1.00) contrast(1.02); }
          25%  { transform: scale(1.015) translate(-1px,-2px); filter: brightness(1.05) contrast(1.05); }
          60%  { transform: scale(1.02) translate(1px,-3px);  filter: brightness(0.97) contrast(1.07); }
          100% { transform: scale(1.00) translate(0,0);      filter: brightness(1.00) contrast(1.02); }
        }
        @keyframes hp-streak {
          0%   { left: -40%; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        @keyframes hp-scan {
          0%,100% { opacity: 0; }
          40%,60% { opacity: 1; }
        }
        .hp-photo { position: relative; overflow: hidden; background: #111; }
        .hp-photo img { display: block; width: 100%; height: 100%; object-fit: cover; animation: hp-shimmer 5s ease-in-out infinite; }
        .hp-photo::before {
          content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px);
          animation: hp-scan 4s ease-in-out infinite;
        }
        .hp-photo::after {
          content: ''; position: absolute; top: -20%; width: 18%; height: 140%;
          background: linear-gradient(90deg, transparent, rgba(244,239,224,0.1), transparent);
          transform: skewX(-20deg);
          animation: hp-streak 6s ease-in-out infinite;
          z-index: 3; pointer-events: none;
        }
      `}</style>
    </>
  )
}
