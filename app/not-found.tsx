import Link from 'next/link'
import GazettePage from './components/GazettePage'
import { F, E, INK, RED, FADE, PAPER } from './lib/constants'

export default function NotFound() {
  return (
    <GazettePage
      section="Lost & Found"
      sectionNum="404"
      title="Page Not"
      titleAccent="Found"
      subtitle="The page you are looking for does not exist, has been moved, or was never published."
    >
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <p style={{ fontFamily: F, fontSize: '1.1rem', fontStyle: 'italic', color: FADE, marginBottom: '24px' }}>
          Perhaps the archives can help you find what you seek.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.25em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
            Return Home
          </Link>
          <Link href="/#contact" style={{ fontFamily: E, fontSize: '10px', letterSpacing: '.25em', textTransform: 'uppercase', color: RED, border: `2px solid ${RED}`, padding: '12px 30px', textDecoration: 'none', display: 'inline-block' }}>
            Contact Us
          </Link>
        </div>
      </div>
    </GazettePage>
  )
}
