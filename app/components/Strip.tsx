// Marquee band — repeats items in a continuous horizontal scroll. Decorative only.
export default function Strip({
  items,
  variant = 'love',
  big = false,
  heart = false,
}: {
  items: string[]
  variant?: 'love' | 'ghost'
  big?: boolean
  heart?: boolean
}) {
  const seq = Array.from({ length: 6 }, () => items).flat()
  const half = (
    <div style={{ display: 'flex' }}>
      {seq.map((t, i) => (
        <span key={i} className="strip-item">
          {t}
          <span className="sep">{heart ? '♥' : '·'}</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`strip strip-${variant}${big ? ' strip-big' : ''}`} aria-hidden="true">
      <div className="marquee">
        {half}
        {half}
      </div>
    </div>
  )
}
