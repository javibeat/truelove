'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

// Inertia scrolling for the whole site. Skipped under reduced motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.115, autoRaf: true })
    return () => lenis.destroy()
  }, [])

  return null
}
