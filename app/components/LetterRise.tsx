// Splits text into per-letter spans that rise in sequence on load.
// Pure server component — the animation is CSS only (see .h-letter).
export default function LetterRise({ text, from = 0 }: { text: string; from?: number }) {
  let i = from
  return (
    <span aria-hidden="true">
      {text.split(' ').map((word, w) => (
        <span key={w} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((ch, c) => (
            <span key={c} className="h-clip">
              <span className="h-letter" style={{ '--i': i++ } as React.CSSProperties}>{ch}</span>
            </span>
          ))}
          {w < text.split(' ').length - 1 && <span style={{ display: 'inline-block', width: '0.22em' }} />}
        </span>
      ))}
    </span>
  )
}
