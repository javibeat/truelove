import Link from 'next/link'
import PageShell from './components/PageShell'

export default function NotFound() {
  return (
    <PageShell
      label="404"
      title="Page not"
      accent="found"
      subtitle="The page you are looking for does not exist, has been moved, or was never published."
    >
      <div style={{ textAlign: 'center', paddingBottom: 'clamp(64px,9vw,110px)' }}>
        <p className="lede" style={{ marginBottom: '28px' }}>
          Perhaps the archives can help you find what you seek.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-dark">Return home</Link>
          <Link href="/#contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </div>
    </PageShell>
  )
}
