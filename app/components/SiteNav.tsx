'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOVE } from '../lib/constants'

const links = [
  ['Work', '/work'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Blog', '/blog'],
] as const

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const [away, setAway] = useState(false)
  const [solid, setSolid] = useState(false)
  const lastY = useRef(0)
  const ticking = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setSolid(y > 24)
        // Hide when scrolling down past the fold, return on any scroll up
        if (y > lastY.current + 6 && y > 320) setAway(true)
        else if (y < lastY.current - 6 || y < 320) setAway(false)
        lastY.current = y
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href + '/'))

  return (
    <header className={`tl-nav${away && !open ? ' nav-away' : ''}${solid ? ' nav-solid' : ''}`}>
      <div className="container-wide tl-nav-inner">
        <Link href="/" onClick={() => setOpen(false)} className="tl-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', position: 'relative', zIndex: 1001 }}>
          <svg className="heartbeat" width="15" height="15" viewBox="0 0 24 24" fill={LOVE} aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span style={{ fontSize: '15px', fontWeight: 700, fontStretch: '115%', letterSpacing: '-0.01em', textTransform: 'uppercase', color: open ? '#F2F2EF' : undefined, transition: 'color 0.3s' }}>
            True Love
          </span>
        </Link>

        <nav className="tl-nav-links">
          {links.map(([label, href]) => (
            <Link key={label} href={href} aria-current={isActive(href) || undefined}>{label}</Link>
          ))}
          <Link href="/brief" className="tl-nav-cta">Start a project</Link>
        </nav>

        <button className={`tl-menu-btn${open ? ' menu-open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 8h16M4 16h16" /></svg>
          )}
        </button>
      </div>

      <nav className={`tl-mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
        {links.map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setOpen(false)} aria-current={isActive(href) || undefined}>
            {label}
          </Link>
        ))}
        <Link href="/brief" onClick={() => setOpen(false)} style={{ color: LOVE }}>Start a project</Link>
        <div className="tl-menu-meta">
          info@truelovecreative.es · Dubai, UAE
        </div>
      </nav>
    </header>
  )
}
