'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Observes .reveal elements and adds .in when they enter the viewport.
// Lives in the root layout so every page gets scroll reveals for free.
export default function ScrollFx() {
  const pathname = usePathname()

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in), .reveal-img:not(.in)')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'))
      return
    }
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [pathname])

  return null
}
