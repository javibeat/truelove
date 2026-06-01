'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'

/* ── Strike line at 72% (Guitar Hero position) ──────── */
const STRIKE_PCT = 72

/* ── Dark monochrome palette ────────────────────────── */
const BG   = '#050508'
const TEXT = '#F5F3ED'
const DIM  = 'rgba(245,243,237,0.55)'
const FAINT= 'rgba(245,243,237,0.32)'
const LINE = 'rgba(245,243,237,0.12)'

/* ── Fonts ──────────────────────────────────────────── */
const HEAD = "'Bebas Neue', 'Oswald', Impact, sans-serif"
const BODY = "'Inter', system-ui, -apple-system, 'Segoe UI', Helvetica, sans-serif"

/* ── Data ───────────────────────────────────────────── */
const projects = [
  { n: '01', name: 'Kiko Navarro',   type: 'Web Design',  year: '2024', url: 'https://kikonavarro.es/' },
  { n: '02', name: 'Jessica Morari', type: 'Brand + Web', year: '2023', url: 'https://jessicamorari.com/' },
  { n: '03', name: 'Javi Beat',      type: 'Identity',    year: '2024', url: 'https://javibeat.com/' },
  { n: '04', name: 'Estrela Photo',  type: 'Portfolio',   year: '2023', url: 'https://estrela.photo/' },
  { n: '05', name: 'Manuel KevSax',  type: 'Web Design',  year: '2024', url: 'https://manuelkevsax.com/' },
  { n: '06', name: 'Sergio Trumpet', type: 'Portfolio',   year: '2024', url: 'https://sergiotrumpetdj.com/' },
  { n: '07', name: 'Julio Cuba',     type: 'Identity',    year: '2024', url: 'https://juliocuba.es/' },
]

const services = [
  { n: '01', name: 'Web Design' },
  { n: '02', name: 'Graphic Design' },
  { n: '03', name: 'App Development' },
  { n: '04', name: 'Brand Identity' },
  { n: '05', name: 'Creative Direction' },
]

/* ── Track hook: triggers hit when top crosses strike line (going up) ── */
function useTrack() {
  const ref = useRef<HTMLElement | null>(null)
  const [hit, setHit] = useState(false)
  const hitRef = useRef(false)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const strikeY = vh * (STRIKE_PCT / 100)

      // distBelow > 0 means track top is below strike line (not yet hit)
      const distBelow = rect.top - strikeY
      // p = 0 when track is one viewport below strike, 1 when at/above strike
      let p = 1 - Math.max(0, Math.min(1, distBelow / (vh * 0.8)))
      if (hitRef.current) p = 1
      el.style.setProperty('--p', p.toFixed(3))

      if (distBelow <= 0 && !hitRef.current) {
        hitRef.current = true
        setHit(true)
      }
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick) }
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { ref, hit }
}

function Track({ num, label, children }: { num: string; label: string; children: ReactNode }) {
  const { ref, hit } = useTrack()
  return (
    <section ref={ref} className={`tk${hit ? ' hit' : ''}`}>
      <div className="tk-head">
        <span className="tk-num">{num}</span>
        <span className="tk-label">{label}</span>
        <span className="tk-pad" />
      </div>
      <div className="tk-body"><div className="tk-inner">{children}</div></div>
    </section>
  )
}

export default function TrackPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />

      {/* ══ FIXED GUITAR HERO NECK ════════════════════════════ */}
      <div className="neck" aria-hidden>
        <div className="neck-base" />
        <svg className="neck-svg" viewBox="0 0 1000 720" preserveAspectRatio="none">
          {/* The neck extends from strike line (72% of viewport) up to vanishing point at top-center.
              viewBox is mapped so that 0..720 corresponds to 0..72vh, and the strike is at y=720. */}

          {/* Outer edges of the neck — trapezoid */}
          <path d="M 20 720 L 480 0 L 520 0 L 980 720 Z" fill="rgba(245,243,237,0.02)" stroke="rgba(245,243,237,0.12)" strokeWidth="0.6" />

          {/* Inner rails — 5 lanes converging */}
          {[0.12, 0.32, 0.5, 0.68, 0.88].map(t => {
            const bx = 20 + (980 - 20) * t
            const tx = 480 + (520 - 480) * t
            return <line key={t} x1={bx} y1={720} x2={tx} y2={0} stroke="rgba(245,243,237,0.10)" strokeWidth="0.5" />
          })}

          {/* Horizontal rungs — get denser toward horizon */}
          {[720, 620, 520, 420, 325, 240, 165, 105, 60, 28, 10].map(y => {
            const u = y / 720 // 1 at bottom (close), 0 at top (far)
            const cx = 500
            const halfBottom = 480
            const halfTop = 20
            const half = halfTop + (halfBottom - halfTop) * u
            const x1 = cx - half
            const x2 = cx + half
            const alpha = 0.04 + u * 0.18
            return <line key={y} x1={x1} y1={y} x2={x2} y2={y} stroke={`rgba(245,243,237,${alpha.toFixed(3)})`} strokeWidth={0.3 + u * 0.4} />
          })}

          {/* Center line of the neck */}
          <line x1="500" y1="720" x2="500" y2="0" stroke="rgba(245,243,237,0.05)" strokeWidth="0.3" strokeDasharray="4 6" />
        </svg>

        {/* Distance haze at the vanishing point */}
        <div className="neck-haze" />
        {/* Subtle noise */}
        <div className="neck-noise" />
      </div>

      {/* ══ FIXED STRIKE LINE ═════════════════════════════════ */}
      <div className="strike" aria-hidden>
        <span className="strike-label left">STRIKE</span>
        <div className="strike-rail">
          <div className="strike-glow" />
        </div>
        <span className="strike-dot" />
        <span className="strike-label right">72°</span>
      </div>

      <main className="stage">

        {/* Top nav */}
        <nav className="topnav">
          <Link href="/" className="topnav-a">← INDEX</Link>
          <span className="topnav-brand">TRUE LOVE CREATIVE</span>
          <span className="topnav-meta">DXB · MMXXVI</span>
        </nav>

        {/* HERO — flat, large, above the neck */}
        <section className="hero">
          <div className="hero-eye">A DESIGN STUDIO · DUBAI · EST. 2015</div>
          <h1 className="hero-title">True&nbsp;Love<br />Creative</h1>
          <p className="hero-sub">High-end digital experiences, shipped with intent.</p>
          <div className="hero-hint">
            <span className="hero-hint-label">PLAY</span>
            <span className="hero-hint-rail" />
          </div>
        </section>

        <div className="crawl-stage">
          <Track num="01" label="STUDIO">
            <h2 className="tk-title">A studio built<br />for signal.</h2>
            <div className="tk-2">
              <p className="tk-lede">
                Founded in 2015, True Love Creative has quietly become one of the most trusted design studios operating out of Dubai, UAE. We work with artists, startups, and brands who believe design is not decoration — it is decision.
              </p>
              <div className="tk-stats">
                <div className="tk-stat"><strong>120+</strong><span>Projects shipped</span></div>
                <div className="tk-stat"><strong>10y</strong><span>Based in Dubai</span></div>
                <div className="tk-stat"><strong>EN·ES·AR</strong><span>Languages</span></div>
              </div>
            </div>
          </Track>

          <Track num="02" label="SERVICES">
            <h2 className="tk-title">What we do.</h2>
            <ul className="tk-list">
              {services.map((s, i) => (
                <li key={s.n} className="tk-row" style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="tk-row-n">{s.n}</span>
                  <span className="tk-row-name">{s.name}</span>
                  <span className="tk-row-ar">→</span>
                </li>
              ))}
            </ul>
          </Track>

          <Track num="03" label="SELECTED WORKS">
            <h2 className="tk-title">Receipts.</h2>
            <ul className="tk-list">
              {projects.map((p, i) => (
                <li key={p.n} className="tk-row tk-row--link" style={{ transitionDelay: `${i * 60}ms` }}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    <span className="tk-row-n">{p.n}</span>
                    <span className="tk-row-name">{p.name}</span>
                    <span className="tk-row-meta">{p.type} · {p.year}</span>
                    <span className="tk-row-ar">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Track>

          <Track num="04" label="PHILOSOPHY">
            <h2 className="tk-title">Design is<br />a decision.</h2>
            <p className="tk-quote">
              Every great project starts with a conversation. Every great result starts with a no. We don&apos;t make things prettier — we make them clearer, sharper, unafraid.
            </p>
            <div className="tk-sig">— THE STUDIO · DUBAI</div>
          </Track>

          <Track num="05" label="CONTACT">
            <h2 className="tk-title">Start a<br />conversation.</h2>
            <div className="tk-contact">
              <a href="mailto:info@truelovecreative.es" className="tk-ct">
                <span className="tk-ct-label">EMAIL</span>
                <span className="tk-ct-val">info@truelovecreative.es</span>
              </a>
              <a href="https://wa.me/971585324519?text=Hi%20True%20Love%20Creative%2C%20I%27d%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer" className="tk-ct">
                <span className="tk-ct-label">WHATSAPP</span>
                <span className="tk-ct-val">+971 58 532 4519</span>
              </a>
              <a href="https://www.instagram.com/truelove.creative" target="_blank" rel="noopener noreferrer" className="tk-ct">
                <span className="tk-ct-label">INSTAGRAM</span>
                <span className="tk-ct-val">@truelove.creative</span>
              </a>
              <Link href="/brief" className="tk-ct">
                <span className="tk-ct-label">BRIEF</span>
                <span className="tk-ct-val">Start a project →</span>
              </Link>
            </div>
            <div className="tk-loc">Dubai, UAE — working worldwide.</div>
          </Track>

          {/* Tail — guarantees enough scroll for the last track's top to cross the strike line */}
          <div className="tail" aria-hidden />
        </div>

        <footer className="foot">
          <span>© 2015–2026 TRUE LOVE CREATIVE</span>
          <Link href="/" className="foot-a">↖ INDEX</Link>
          <span>DUBAI · UAE</span>
        </footer>
      </main>

      {/* ── Styles ───────────────────────────────────────── */}
      <style>{`
        html, body { background: ${BG}; }

        main.stage {
          position: relative; z-index: 2;
          color: ${TEXT}; font-family: ${BODY};
          min-height: 100vh; overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ══ Fixed neck (Guitar Hero fretboard) ═══════════════ */
        .neck {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 120% 70% at 50% 0%, #0f1018 0%, #06060a 55%, ${BG} 90%),
            ${BG};
        }
        .neck-base {
          position: absolute; left: 0; right: 0; top: ${STRIKE_PCT}vh; bottom: 0;
          background: linear-gradient(to bottom, #08080c 0%, #030305 100%);
        }
        .neck-svg {
          position: absolute; left: 0; right: 0; top: 0;
          width: 100%; height: ${STRIKE_PCT}vh;
        }
        .neck-haze {
          position: absolute; left: 0; right: 0; top: 0;
          height: ${STRIKE_PCT * 0.45}vh;
          background: linear-gradient(to bottom, #06060a 0%, rgba(6,6,10,0.55) 60%, transparent 100%);
        }
        .neck-noise {
          position: absolute; inset: 0; opacity: .045; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }

        /* ══ Strike line ══════════════════════════════════════ */
        .strike {
          position: fixed; left: 0; right: 0; top: ${STRIKE_PCT}vh;
          z-index: 4; pointer-events: none;
          display: grid; grid-template-columns: auto 1fr auto auto;
          gap: 18px; align-items: center;
          padding: 0 32px;
          transform: translateY(-50%);
        }
        .strike-label {
          font-size: 9px; letter-spacing: .4em; color: ${DIM};
          text-transform: uppercase;
        }
        .strike-label.right { color: ${TEXT}; }
        .strike-rail {
          position: relative; height: 1px;
          background: linear-gradient(to right,
            transparent 0%,
            rgba(245,243,237,.2) 5%,
            rgba(245,243,237,.9) 50%,
            rgba(245,243,237,.2) 95%,
            transparent 100%);
        }
        .strike-glow {
          position: absolute; left: 10%; right: 10%; top: 50%; height: 0;
          box-shadow:
            0 0 28px 10px rgba(245,243,237,.22),
            0 0 56px 18px rgba(200,220,255,.10);
        }
        .strike-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${TEXT};
          box-shadow: 0 0 0 4px rgba(245,243,237,.12), 0 0 20px rgba(245,243,237,.7);
          animation: pulse 2.4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(245,243,237,.10), 0 0 14px rgba(245,243,237,.45); }
          50%     { box-shadow: 0 0 0 8px rgba(245,243,237,.24), 0 0 30px rgba(245,243,237,.8); }
        }

        /* ══ Top nav ══════════════════════════════════════════ */
        .topnav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px 32px;
          font-size: 10px; letter-spacing: .28em; text-transform: uppercase;
          color: ${DIM}; pointer-events: none;
        }
        .topnav > * { pointer-events: auto; }
        .topnav-a { color: ${TEXT}; text-decoration: none; transition: opacity .2s; }
        .topnav-a:hover { opacity: .55; }
        .topnav-brand { color: ${TEXT}; }
        .topnav-meta { color: ${FAINT}; }

        /* ══ Hero ═════════════════════════════════════════════ */
        .hero {
          position: relative; z-index: 10;
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 120px 40px 100px;
        }
        .hero-eye {
          font-size: 10px; letter-spacing: .38em; color: ${DIM};
          margin-bottom: 30px;
        }
        .hero-title {
          font-family: ${HEAD};
          font-size: clamp(5rem, 17vw, 20rem);
          line-height: .84; letter-spacing: -.005em;
          margin: 0; color: ${TEXT};
        }
        .hero-sub {
          font-weight: 300;
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          line-height: 1.4; color: ${DIM};
          margin: 40px 0 0; max-width: 520px;
        }
        .hero-hint {
          position: absolute; bottom: 32px; left: 40px;
          display: flex; align-items: center; gap: 16px;
          font-size: 10px; letter-spacing: .35em; color: ${TEXT};
        }
        .hero-hint-rail {
          position: relative; width: 72px; height: 1px;
          background: ${LINE}; overflow: hidden;
        }
        .hero-hint-rail::after {
          content: ''; position: absolute; top: 0; left: 0; width: 30%; height: 1px;
          background: ${TEXT}; animation: slide 2s ease-in-out infinite;
        }
        @keyframes slide {
          0%   { left: -30%; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        /* ══ Crawl ════════════════════════════════════════════ */
        .crawl-stage { position: relative; z-index: 10; }
        .tail { height: 80vh; }

        /* ══ Track ════════════════════════════════════════════ */
        .tk {
          --p: 0;
          padding: 0 40px;
          position: relative;
          /* Gentle rise as the track approaches the strike */
          transform: translateY(calc(18px * (1 - var(--p))));
          opacity: calc(0.35 + 0.65 * var(--p));
          transition: opacity .25s ease-out;
        }
        .tk.hit { opacity: 1; transform: translateY(0); }
        .tk::before {
          /* top rule line that extends across full width */
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, ${LINE} 12%, ${LINE} 88%, transparent);
        }

        .tk-head {
          display: grid; grid-template-columns: auto 1fr auto;
          gap: 28px; align-items: center;
          padding: 26px 0;
          font-size: 10px; letter-spacing: .32em; color: ${DIM};
        }
        .tk-num {
          font-family: ${HEAD};
          font-size: clamp(1.8rem, 2.4vw, 2.4rem);
          letter-spacing: 0; color: ${TEXT};
          transition: color .6s ease;
        }
        .tk.hit .tk-num { color: ${TEXT}; }
        .tk-label { text-transform: uppercase; }
        .tk-pad {
          justify-self: end;
          width: 8px; height: 8px; border-radius: 50%;
          background: ${FAINT};
          transition: background .6s ease, box-shadow .6s ease, transform .6s ease;
        }
        .tk.hit .tk-pad {
          background: ${TEXT};
          box-shadow: 0 0 0 4px rgba(245,243,237,.12), 0 0 16px rgba(245,243,237,.55);
          transform: scale(1.3);
        }

        /* Body expansion on hit */
        .tk-body {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 1s cubic-bezier(.2,.8,.2,1);
        }
        .tk-inner { overflow: hidden; opacity: 0; transition: opacity .7s ease .2s; }
        .tk.hit .tk-body { grid-template-rows: 1fr; }
        .tk.hit .tk-inner { opacity: 1; }

        /* Title */
        .tk-title {
          font-family: ${HEAD};
          font-size: clamp(3rem, 11vw, 10rem);
          line-height: .86; letter-spacing: -.005em;
          text-transform: uppercase;
          margin: 20px 0 56px; color: ${TEXT};
          transform: translateY(30px); opacity: 0;
          transition: transform .9s cubic-bezier(.2,.8,.2,1) .2s, opacity .9s ease .2s;
        }
        .tk.hit .tk-title { transform: translateY(0); opacity: 1; }

        /* Studio 2-col */
        .tk-2 {
          display: grid; grid-template-columns: 1.4fr 1fr; gap: 60px;
          padding-bottom: 140px;
        }
        .tk-lede {
          font-weight: 300;
          font-size: clamp(1.05rem, 1.6vw, 1.35rem);
          line-height: 1.5; color: ${TEXT};
          margin: 0; max-width: 640px;
        }
        .tk-stats { display: flex; flex-direction: column; gap: 28px;
          border-left: 1px solid ${LINE}; padding-left: 28px; }
        .tk-stat strong {
          font-family: ${HEAD};
          font-size: clamp(2.4rem, 5vw, 4rem);
          display: block; line-height: 1; color: ${TEXT};
        }
        .tk-stat span {
          font-size: 10px; letter-spacing: .3em; color: ${DIM};
          text-transform: uppercase; display: block; margin-top: 8px;
        }

        /* Lists */
        .tk-list { list-style: none; padding: 0 0 140px; margin: 0; }
        .tk-row {
          display: grid; grid-template-columns: 70px 1fr auto;
          align-items: baseline; gap: 28px; padding: 26px 0;
          border-top: 1px solid ${LINE};
          color: ${TEXT};
          opacity: 0; transform: translateY(20px);
          transition: opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1);
        }
        .tk.hit .tk-row { opacity: 1; transform: translateY(0); }
        .tk-row:last-child { border-bottom: 1px solid ${LINE}; }
        .tk-row--link { display: block; padding: 0; }
        .tk-row--link > a {
          display: grid; grid-template-columns: 70px 1fr auto auto;
          gap: 28px; align-items: baseline; padding: 26px 0;
          color: ${TEXT}; text-decoration: none;
          transition: transform .3s ease;
        }
        .tk-row--link > a:hover { transform: translateX(12px); }
        .tk-row-n { font-size: 10px; letter-spacing: .3em; color: ${DIM}; }
        .tk-row-name {
          font-family: ${HEAD};
          font-size: clamp(1.8rem, 5.5vw, 5rem);
          line-height: 1; text-transform: uppercase; letter-spacing: -.005em;
        }
        .tk-row-meta { font-size: 10px; letter-spacing: .3em; color: ${DIM}; text-transform: uppercase; }
        .tk-row-ar {
          font-family: ${HEAD};
          font-size: clamp(1.3rem, 2.4vw, 2rem); color: ${DIM};
          transition: color .3s, transform .3s;
        }
        .tk-row:hover .tk-row-ar, .tk-row--link > a:hover .tk-row-ar { color: ${TEXT}; transform: translateX(4px); }

        /* Quote */
        .tk-quote {
          font-weight: 300;
          font-size: clamp(1.4rem, 2.6vw, 2.4rem);
          line-height: 1.32; max-width: 1080px; margin: 0;
          color: ${TEXT};
        }
        .tk-sig {
          font-size: 10px; letter-spacing: .3em; color: ${DIM};
          margin-top: 48px; padding-bottom: 140px; text-transform: uppercase;
        }

        /* Contact */
        .tk-contact { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0; }
        .tk-ct {
          display: block; text-decoration: none; color: ${TEXT};
          border-top: 1px solid ${LINE};
          padding: 26px 28px 36px 0;
          transition: padding .3s ease, color .3s ease;
        }
        .tk-ct:hover { padding-left: 12px; }
        .tk-ct-label {
          font-size: 10px; letter-spacing: .32em; color: ${DIM};
          display: block; margin-bottom: 14px; text-transform: uppercase;
        }
        .tk-ct-val {
          font-family: ${HEAD};
          font-size: clamp(1.4rem, 2.4vw, 2.1rem);
          line-height: 1.1; text-transform: uppercase;
        }
        .tk-loc {
          font-weight: 300;
          font-size: clamp(1rem, 1.4vw, 1.2rem); color: ${DIM};
          padding: 48px 0 140px;
        }

        /* Footer */
        .foot {
          position: relative; z-index: 10;
          padding: 40px; border-top: 1px solid ${LINE};
          display: flex; justify-content: space-between; align-items: center;
          font-size: 10px; letter-spacing: .3em; color: ${DIM};
          flex-wrap: wrap; gap: 12px; text-transform: uppercase;
        }
        .foot-a { color: ${TEXT}; text-decoration: none; transition: opacity .2s; }
        .foot-a:hover { opacity: .6; }

        /* Responsive */
        @media (max-width: 768px) {
          .tk, .hero, .foot { padding-left: 20px; padding-right: 20px; }
          .topnav { padding: 16px 20px; font-size: 9px; letter-spacing: .18em; }
          .strike { padding: 0 20px; gap: 10px; }
          .strike-label { font-size: 8px; letter-spacing: .2em; }
          .tk-2 { grid-template-columns: 1fr; gap: 36px; padding-bottom: 80px; }
          .tk-stats { border-left: none; border-top: 1px solid ${LINE}; padding-left: 0; padding-top: 28px; }
          .tk-row, .tk-row--link > a { grid-template-columns: 44px 1fr auto; }
          .tk-row-meta { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tk, .tk-body, .tk-inner, .tk-title, .tk-row { transition: none !important; transform: none !important; opacity: 1 !important; }
          .strike-dot, .hero-hint-rail::after { animation: none !important; }
        }
      `}</style>
    </>
  )
}
