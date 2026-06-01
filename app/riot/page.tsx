'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* ── Acid / brutalist palette ───────────────────────── */
const INK  = '#0A0A0A'
const BONE = '#EFEAE1'
const ACID = '#D6FF00'
const HOT  = '#FF2D6F'
const BLUE = '#1432F5'
const RED  = '#FF3B18'

/* ── Fonts ──────────────────────────────────────────── */
const ARCHIVO = "'Archivo Black', Impact, 'Helvetica Neue', sans-serif"
const P = 'var(--playfair), Georgia, serif'
const E = 'var(--elite), "Courier New", monospace'

/* ── Data (ported from home) ────────────────────────── */
const projects = [
  { id:'I',   name:'Kiko Navarro',   type:'Web Design · 2024',     img:'/img/portfolios/kikonavarro.jpg', url:'https://kikonavarro.es/' },
  { id:'II',  name:'Jessica Morari', type:'Branding & Web · 2023', img:'/img/portfolios/jesslnk.webp',    url:'https://jessicamorari.com/' },
  { id:'III', name:'Javi Beat',      type:'Identity · 2024',       img:'/img/portfolios/javibeat.jpg',    url:'https://javibeat.com/' },
  { id:'IV',  name:'Estrela Photo',  type:'Portfolio · 2023',      img:'/img/portfolios/estrela.jpg',     url:'https://estrela.photo/' },
  { id:'V',   name:'Manuel KevSax',  type:'Web Design · 2024',     img:'/img/portfolios/manusax.webp',    url:'https://manuelkevsax.com/' },
  { id:'VI',  name:'Sergio Trumpet', type:'Portfolio · 2024',      img:'/img/portfolios/sergio.jpg',      url:'https://sergiotrumpetdj.com/' },
  { id:'VII', name:'Julio Cuba',     type:'Identity · 2024',       img:'/img/portfolios/julio.webp',      url:'https://juliocuba.es/' },
]

const manifesto = [
  { text:'WE DON’T DO',        accent:'BORING.',      color:ACID },
  { text:'DESIGN SHOULD',            accent:'BITE.',        color:HOT  },
  { text:'MINIMAL IS A',             accent:'MYTH.',        color:BLUE },
  { text:'YOUR BRAND IS NOT A',      accent:'LOGO.',        color:RED  },
  { text:'GOOD TASTE IS',            accent:'REBELLIOUS.',  color:ACID },
]

const services = [
  { n:'01', name:'WEB',       tag:'SITES THAT HIT',            col:ACID, href:'/services/web-design' },
  { n:'02', name:'BRAND',     tag:'IDENTITY, NOT DECORATION',  col:HOT,  href:'/services/branding' },
  { n:'03', name:'APP',       tag:'PRODUCT, SHIPPED',          col:BLUE, href:'/services/app-development' },
  { n:'04', name:'GRAPHIC',   tag:'PRINT, POSTERS, SLEEVES',   col:RED,  href:'/services/graphic-design' },
  { n:'05', name:'DIRECTION', tag:'THE WHOLE THING',           col:BONE, href:'/services/branding' },
]

const workLayouts = [
  { col:'span 7',  rot:-1,   ratio:'16/10' },
  { col:'span 5',  rot:2,    ratio:'4/5'   },
  { col:'span 4',  rot:-2,   ratio:'3/4'   },
  { col:'span 8',  rot:1,    ratio:'16/9'  },
  { col:'span 6',  rot:-1.5, ratio:'4/3'   },
  { col:'span 6',  rot:1.5,  ratio:'4/3'   },
  { col:'span 12', rot:-0.5, ratio:'21/9'  },
]

export default function Riot() {
  /* Word cycler — WOW hook in the hero */
  const words = ['LOVE','RIOT','FIRE','HEAT','KISS','NOISE']
  const [wIdx, setWIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setWIdx(i => (i + 1) % words.length), 1800)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Dubai clock */
  const [clock, setClock] = useState('')
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-GB',{ hour12:false, timeZone:'Asia/Dubai' }))
    tick()
    const i = setInterval(tick, 1000)
    return () => clearInterval(i)
  }, [])

  /* Cursor glow — difference blend */
  const cursorRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = cursorRef.current
    if (!el) return
    let raf = 0
    let x = 0, y = 0, tx = window.innerWidth/2, ty = window.innerHeight/2
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      el.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    loop()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      {/* Google Font — Archivo Black (squat brutalist sans) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet" />

      <main style={{ background: BONE, color: INK, overflowX: 'hidden', position: 'relative' }}>
        {/* Cursor glow */}
        <div ref={cursorRef} className="riot-cursor" aria-hidden />

        {/* ═══ TOP MARQUEE ═════════════════════════════════ */}
        <div className="riot-ticker" style={{ background: INK, color: ACID }}>
          <div className="riot-ticker-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>TRUE LOVE CREATIVE&nbsp;&nbsp;✦&nbsp;&nbsp;DESIGN RIOT&nbsp;&nbsp;✦&nbsp;&nbsp;DUBAI&nbsp;↗&nbsp;WORLD&nbsp;&nbsp;✦&nbsp;&nbsp;EST. MMXV&nbsp;&nbsp;✦&nbsp;&nbsp;NO RULES NO MERCY&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
            ))}
          </div>
        </div>

        {/* Sticky mini-nav */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: BONE, borderBottom: `3px solid ${INK}`,
          padding: '14px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
          fontFamily: E, fontSize: '11px', letterSpacing: '.25em',
        }}>
          <Link href="/" style={{ color: INK, textDecoration: 'none' }}>← THE GAZETTE</Link>
          <span style={{ background: HOT, color: BONE, padding: '4px 10px' }}>/RIOT · B-SIDE</span>
          <span>{clock || '—:—:—'} DXB</span>
        </nav>

        {/* ═══ HERO ════════════════════════════════════════ */}
        <section style={{ position: 'relative', padding: 'clamp(48px,8vw,120px) 24px clamp(60px,8vw,120px)', minHeight: '100vh' }}>
          <div className="riot-noise" />

          {/* eyebrow */}
          <div style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.4em', color: INK, position: 'relative', zIndex: 2, marginBottom: 'clamp(24px,4vw,48px)' }}>
            §&nbsp;&nbsp;TRUE LOVE CREATIVE&nbsp;&nbsp;·&nbsp;&nbsp;B-SIDE&nbsp;&nbsp;·&nbsp;&nbsp;VOL. XI
          </div>

          {/* stacked massive headline */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{
              fontFamily: ARCHIVO, margin: 0,
              fontSize: 'clamp(5rem, 24vw, 28rem)', lineHeight: .82,
              letterSpacing: '-.045em', textTransform: 'uppercase',
              color: INK,
            }}>
              True
            </h1>
            <h1 style={{ margin: 0, position: 'relative', lineHeight: .82 }}>
              <span style={{
                fontFamily: ARCHIVO,
                fontSize: 'clamp(5rem, 24vw, 28rem)',
                letterSpacing: '-.045em', textTransform: 'uppercase',
                background: ACID, color: INK,
                padding: '0 .12em',
                display: 'inline-block',
                transform: 'translateX(clamp(8px, 4vw, 72px))',
              }}>
                <span key={wIdx} className="riot-swap">{words[wIdx]}</span>
              </span>
            </h1>
            <div style={{
              fontFamily: P, fontStyle: 'italic', fontWeight: 900,
              fontSize: 'clamp(3.2rem, 13vw, 13rem)', lineHeight: .9,
              color: HOT, letterSpacing: '-.02em',
              textAlign: 'right', marginTop: '-.05em',
            }}>
              Creative.
            </div>
          </div>

          {/* strike-through tagline */}
          <div style={{
            marginTop: 'clamp(40px,6vw,80px)',
            display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '32px',
            alignItems: 'end', position: 'relative', zIndex: 2,
          }} className="riot-hero-foot">
            <p style={{
              fontFamily: P, fontStyle: 'italic',
              fontSize: 'clamp(1.3rem, 2.6vw, 2.2rem)', lineHeight: 1.2,
              maxWidth: '760px', margin: 0, color: INK,
            }}>
              High-end digital experiences.<br />
              <span style={{ textDecoration: 'line-through', opacity: .35 }}>
                Minimalist design, premium execution.
              </span><br />
              <span style={{ background: INK, color: ACID, padding: '0 .2em', display: 'inline-block', transform: 'rotate(-.5deg)' }}>
                We make sites that bite.
              </span>
            </p>
            <div style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', textAlign: 'right', lineHeight: 2 }}>
              DUBAI&nbsp;↗&nbsp;WORLD<br />
              EST.&nbsp;2015<br />
              <span style={{ color: HOT }}>VOL. XI · RIOT ED.</span>
            </div>
          </div>

          {/* spinning badge */}
          <div className="riot-spin" aria-hidden style={{
            position: 'absolute', right: 'clamp(16px,4vw,64px)', top: 'clamp(120px,18vw,220px)',
            zIndex: 3,
          }}>
            <svg viewBox="0 0 200 200" width="clamp(100px,14vw,180px)" height="clamp(100px,14vw,180px)">
              <defs>
                <path id="riot-circle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
              </defs>
              <circle cx="100" cy="100" r="88" fill={INK} />
              <circle cx="100" cy="100" r="60" fill={HOT} />
              <text fill={ACID} style={{ fontFamily: 'Archivo Black', fontSize: '16px', letterSpacing: '.25em' }}>
                <textPath href="#riot-circle">HAND-MADE IN DUBAI · SINCE MMXV · HAND-MADE IN DUBAI · </textPath>
              </text>
              <text x="100" y="108" textAnchor="middle" fill={BONE} style={{ fontFamily: 'Archivo Black', fontSize: '28px', letterSpacing: '-.02em' }}>★ RIOT ★</text>
            </svg>
          </div>

          {/* scroll hint */}
          <div style={{ position: 'absolute', bottom: '18px', left: '24px', fontFamily: E, fontSize: '11px', letterSpacing: '.35em', color: INK, zIndex: 2 }}>
            ↓&nbsp;&nbsp;KEEP&nbsp;GOING
          </div>
        </section>

        {/* ═══ MANIFESTO ═══════════════════════════════════ */}
        <section style={{ background: INK, color: BONE, padding: 'clamp(60px,10vw,160px) 24px', position: 'relative' }}>
          <div style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.4em', color: ACID, marginBottom: 'clamp(24px,4vw,48px)' }}>
            §&nbsp;&nbsp;MANIFESTO&nbsp;&nbsp;·&nbsp;&nbsp;NO. 01&nbsp;&nbsp;——————————————
          </div>
          {manifesto.map((m, i) => (
            <div key={i} className="riot-manifest" style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'baseline',
              columnGap: '.35em', rowGap: '.1em',
              borderBottom: `2px solid ${BONE}`,
              padding: 'clamp(16px,2.4vw,36px) 0',
            }}>
              <span style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', color: m.color, width: '44px', alignSelf: 'center' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontFamily: P, fontStyle: 'italic', fontWeight: 900,
                fontSize: 'clamp(2rem,7vw,6.5rem)', lineHeight: 1,
                letterSpacing: '-.02em',
              }}>
                {m.text}
              </span>
              <span style={{
                fontFamily: ARCHIVO,
                fontSize: 'clamp(2rem,7vw,6.5rem)', lineHeight: 1,
                letterSpacing: '-.04em', color: m.color,
              }}>
                {m.accent}
              </span>
            </div>
          ))}
        </section>

        {/* ═══ SERVICES ════════════════════════════════════ */}
        <section style={{ background: BONE, borderTop: `6px solid ${INK}` }}>
          <div style={{ padding: 'clamp(60px,10vw,160px) 24px clamp(32px,5vw,60px)' }}>
            <div style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.4em', color: INK, marginBottom: '16px' }}>
              §&nbsp;&nbsp;WHAT WE DO&nbsp;&nbsp;·&nbsp;&nbsp;NO. 02&nbsp;&nbsp;——————————————
            </div>
            <h2 style={{ fontFamily: ARCHIVO, fontSize: 'clamp(2.8rem,10vw,8rem)', margin: 0, lineHeight: .9, letterSpacing: '-.03em', textTransform: 'uppercase' }}>
              Services,&nbsp;
              <span style={{ fontFamily: P, fontStyle: 'italic', color: HOT, fontWeight: 900 }}>
                minus the fluff.
              </span>
            </h2>
          </div>

          {services.map((s, i) => (
            <Link key={s.n} href={s.href} className="riot-srv" style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(60px,8vw,140px) 1fr auto',
              gap: 'clamp(16px,4vw,60px)', alignItems: 'center',
              padding: 'clamp(24px,4vw,56px) 24px',
              borderTop: `3px solid ${INK}`,
              borderBottom: i === services.length - 1 ? `6px solid ${INK}` : undefined,
              color: INK, textDecoration: 'none', background: BONE,
              ['--riot-acc' as string]: s.col,
            } as React.CSSProperties}>
              <div style={{ fontFamily: ARCHIVO, fontSize: 'clamp(2rem,6vw,5rem)', lineHeight: 1 }}>{s.n}</div>
              <div className="riot-srv-name" style={{ fontFamily: ARCHIVO, fontSize: 'clamp(2.6rem,10vw,9rem)', lineHeight: .9, letterSpacing: '-.035em' }}>
                {s.name}
              </div>
              <div style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', textAlign: 'right' }}>
                {s.tag}<br />
                <span className="riot-srv-arrow" style={{ fontFamily: ARCHIVO, fontSize: '24px', display: 'inline-block', marginTop: '10px', transition: 'transform .3s ease' }}>→</span>
              </div>
            </Link>
          ))}
        </section>

        {/* ═══ WORKS ═══════════════════════════════════════ */}
        <section style={{ background: INK, color: BONE, padding: 'clamp(60px,10vw,160px) 24px' }}>
          <div style={{ marginBottom: 'clamp(40px,6vw,80px)' }}>
            <div style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.4em', color: ACID, marginBottom: '16px' }}>
              §&nbsp;&nbsp;SELECTED WORKS&nbsp;&nbsp;·&nbsp;&nbsp;NO. 03&nbsp;&nbsp;——————————————
            </div>
            <h2 style={{ fontFamily: ARCHIVO, fontSize: 'clamp(3rem,12vw,9rem)', margin: 0, lineHeight: .88, letterSpacing: '-.035em', textTransform: 'uppercase' }}>
              Receipts.&nbsp;
              <span style={{ fontFamily: P, fontStyle: 'italic', color: ACID, fontWeight: 900 }}>Loud ones.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(18px,2.4vw,40px)' }} className="riot-works-grid">
            {projects.map((p, i) => {
              const l = workLayouts[i % workLayouts.length]
              return (
                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="riot-work" style={{
                  gridColumn: l.col, textDecoration: 'none', color: BONE,
                  transform: `rotate(${l.rot}deg)`,
                }}>
                  <div className="riot-work-frame" style={{ position: 'relative', aspectRatio: l.ratio, background: '#181818', overflow: 'hidden', border: `3px solid ${BONE}` }}>
                    <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw"
                      className="riot-work-img"
                      style={{ objectFit: 'cover', filter: 'grayscale(1) contrast(1.08)', transition: 'filter .35s ease, transform .6s ease' }} />
                    <div style={{
                      position: 'absolute', top: '8px', left: '14px',
                      fontFamily: ARCHIVO, fontSize: 'clamp(3rem,9vw,7rem)', lineHeight: .8,
                      color: ACID, pointerEvents: 'none', mixBlendMode: 'difference',
                    }}>{p.id}</div>
                    <div className="riot-work-hover" style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '16px',
                      background: 'linear-gradient(transparent, rgba(10,10,10,.75))',
                      opacity: 0, transition: 'opacity .3s ease',
                    }}>
                      <span style={{ fontFamily: ARCHIVO, fontSize: 'clamp(1rem,2vw,1.6rem)', color: ACID }}>VIEW LIVE →</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontFamily: ARCHIVO, fontSize: 'clamp(1.3rem,2.8vw,2rem)', textTransform: 'uppercase' }}>{p.name}</span>
                    <span style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.3em', color: '#888' }}>{p.type.toUpperCase()}</span>
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        {/* ═══ CONTACT ═════════════════════════════════════ */}
        <section style={{ background: ACID, color: INK, padding: 'clamp(60px,10vw,160px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.4em', marginBottom: '20px' }}>
            §&nbsp;&nbsp;TALK TO US&nbsp;&nbsp;·&nbsp;&nbsp;NO. 04&nbsp;&nbsp;——————————————
          </div>
          <h2 style={{
            fontFamily: ARCHIVO, fontSize: 'clamp(5rem,22vw,20rem)', margin: 0,
            lineHeight: .84, letterSpacing: '-.045em', textTransform: 'uppercase',
          }}>
            Let&apos;s&nbsp;
            <span style={{ fontFamily: P, fontStyle: 'italic', color: HOT, fontWeight: 900 }}>make</span><br />
            noise.
          </h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(18px,2vw,28px)',
            marginTop: 'clamp(40px,6vw,80px)', paddingTop: 'clamp(30px,4vw,50px)', borderTop: `4px solid ${INK}`,
          }}>
            {[
              { label: 'EMAIL', val: 'info@truelovecreative.es', line: 'info@truelove\ncreative.es', href: 'mailto:info@truelovecreative.es', ext: false },
              { label: 'WHATSAPP / PHONE', val: '+971 58 532 4519', line: '+971 58\n532 4519', href: 'https://wa.me/971585324519?text=Hi%20True%20Love%20Creative%2C%20I%27d%20like%20to%20discuss%20a%20project', ext: true },
              { label: 'INSTAGRAM', val: '@truelove.creative', line: '@truelove\n.creative', href: 'https://www.instagram.com/truelove.creative', ext: true },
              { label: 'START A BRIEF', val: '/brief', line: 'fire the\nbrief →', href: '/brief', ext: false },
            ].map(c => (
              <a key={c.label} href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="riot-link">
                <div style={{ fontFamily: E, fontSize: '11px', letterSpacing: '.3em', marginBottom: '12px' }}>{c.label}</div>
                <div style={{ fontFamily: ARCHIVO, fontSize: 'clamp(1.4rem,3vw,2.3rem)', lineHeight: 1, whiteSpace: 'pre-line' }}>
                  {c.line}
                </div>
              </a>
            ))}
          </div>

          {/* stamp */}
          <div style={{
            fontFamily: E, fontSize: '11px', letterSpacing: '.3em', color: INK, opacity: .7,
            marginTop: 'clamp(40px,5vw,60px)', display: 'flex', gap: '12px', flexWrap: 'wrap',
          }}>
            <span>RESPONSE TIME&nbsp;&lt;&nbsp;24H</span>
            <span>·</span>
            <span>LANGUAGES: EN · ES · AR</span>
            <span>·</span>
            <span>WORLDWIDE</span>
          </div>
        </section>

        {/* ═══ BOTTOM MARQUEE ══════════════════════════════ */}
        <div className="riot-ticker" style={{ background: INK, color: HOT, borderTop: `6px solid ${INK}` }}>
          <div className="riot-ticker-track" style={{ animationDuration: '36s', animationDirection: 'reverse' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>© 2015–2026&nbsp;&nbsp;·&nbsp;&nbsp;TRUE LOVE CREATIVE&nbsp;&nbsp;·&nbsp;&nbsp;DUBAI, UAE&nbsp;&nbsp;·&nbsp;&nbsp;NO COPYING&nbsp;&nbsp;·&nbsp;&nbsp;NO MERCY&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            ))}
          </div>
        </div>

        {/* Back-home footer note */}
        <div style={{
          background: BONE, color: INK, textAlign: 'center',
          padding: '24px', fontFamily: E, fontSize: '11px', letterSpacing: '.25em',
        }}>
          You&apos;re on the B-SIDE.&nbsp;&nbsp;<Link href="/" style={{ color: INK, textDecoration: 'underline' }}>Return to the Gazette →</Link>
        </div>
      </main>

      {/* ── Styles ───────────────────────────────────────── */}
      <style>{`
        /* Cursor glow */
        .riot-cursor {
          position: fixed; top: 0; left: 0; width: 360px; height: 360px;
          border-radius: 50%; pointer-events: none; z-index: 9999;
          background: radial-gradient(closest-side, ${ACID} 0%, rgba(214,255,0,0) 70%);
          mix-blend-mode: difference; filter: blur(16px);
          will-change: transform;
        }
        @media (hover: none) { .riot-cursor { display: none; } }

        /* Marquee */
        .riot-ticker {
          overflow: hidden; padding: 14px 0;
          font-family: 'Archivo Black', Impact, sans-serif;
          font-size: clamp(14px, 2.2vw, 22px); letter-spacing: .08em; text-transform: uppercase;
          border-top: 6px solid ${INK}; border-bottom: 6px solid ${INK};
        }
        .riot-ticker-track { display: inline-flex; white-space: nowrap; animation: riot-marq 28s linear infinite; }
        .riot-ticker-track span { padding-right: 24px; }
        @keyframes riot-marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* Noise overlay */
        .riot-noise {
          position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: .22;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }

        /* Word swap in hero */
        .riot-swap { display: inline-block; animation: riot-swap-in .45s ease; }
        @keyframes riot-swap-in {
          0% { opacity: 0; transform: translateY(-30%) skewX(-10deg); filter: blur(6px); }
          60% { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) skewX(0); }
        }

        /* Spinning badge */
        .riot-spin svg { animation: riot-rotate 18s linear infinite; transform-origin: 50% 50%; }
        @keyframes riot-rotate { from { transform: rotate(0); } to { transform: rotate(360deg); } }

        /* Services row */
        .riot-srv { transition: background .25s ease, color .25s ease; position: relative; }
        .riot-srv::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 6px; background: var(--riot-acc, ${ACID});
          transform: scaleY(0); transform-origin: top; transition: transform .3s ease;
        }
        .riot-srv:hover { background: ${INK} !important; color: ${BONE} !important; }
        .riot-srv:hover::before { transform: scaleY(1); }
        .riot-srv:hover .riot-srv-name {
          font-family: var(--playfair), Georgia, serif; font-style: italic; font-weight: 900;
          color: var(--riot-acc, ${ACID});
        }
        .riot-srv:hover .riot-srv-arrow { transform: translateX(8px); color: var(--riot-acc, ${ACID}); }

        /* Works */
        .riot-work { display: block; transition: transform .4s ease; will-change: transform; }
        .riot-work:hover { transform: rotate(0deg) scale(1.02) !important; }
        .riot-work:hover .riot-work-img { filter: grayscale(0) contrast(1) !important; transform: scale(1.05); }
        .riot-work:hover .riot-work-hover { opacity: 1 !important; }

        /* Contact links */
        .riot-link {
          color: inherit; text-decoration: none; display: block;
          border: 3px solid ${INK}; padding: 22px; background: ${ACID};
          transition: transform .2s ease, background .2s ease, color .2s ease, box-shadow .2s ease;
        }
        .riot-link:hover {
          background: ${INK}; color: ${ACID};
          transform: translate(-6px, -6px); box-shadow: 10px 10px 0 ${HOT};
        }

        /* Manifesto lines shift */
        .riot-manifest { transition: transform .3s ease; }
        .riot-manifest:hover { transform: translateX(16px); }

        /* Smaller screens — pull down works grid chaos */
        @media (max-width: 640px) {
          .riot-work { transform: none !important; }
          .riot-works-grid > a { grid-column: span 12 !important; }
          .riot-hero-foot { grid-template-columns: 1fr !important; }
          .riot-spin { display: none; }
        }
      `}</style>
    </>
  )
}
