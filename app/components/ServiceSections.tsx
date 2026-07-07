// Shared building blocks for /services/* pages — Kinetic Swiss voice.

export function StepRows({ heading, steps }: { heading: React.ReactNode; steps: { num: string; title: string; text: string }[] }) {
  return (
    <div style={{ paddingBottom: 'clamp(56px,8vw,110px)' }}>
      <h2 className="display reveal" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.2rem)', marginBottom: 'clamp(28px,4vw,48px)' }}>
        {heading}
      </h2>
      {steps.map((s, i) => (
        <div key={s.num} className="reveal" style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '20px', padding: 'clamp(20px,3vw,32px) 0', borderTop: '1px solid var(--hairline)', borderBottom: i === steps.length - 1 ? '1px solid var(--hairline)' : 'none', alignItems: 'baseline' }}>
          <span className="ix-num">{s.num}</span>
          <div>
            <h3 className="mega" style={{ fontSize: 'clamp(1.4rem,3.6vw,2.8rem)', marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '560px' }}>{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function CapabilityList({ heading, items }: { heading: React.ReactNode; items: string[] }) {
  return (
    <div style={{ paddingBottom: 'clamp(56px,8vw,110px)' }}>
      <h2 className="display reveal" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.2rem)', marginBottom: 'clamp(28px,4vw,48px)' }}>
        {heading}
      </h2>
      <div className="grid-2 reveal" style={{ gap: '0 clamp(24px,4vw,64px)' }}>
        {items.map(item => (
          <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '16px 0', borderBottom: '1px solid var(--hairline)' }}>
            <span style={{ fontSize: 'clamp(1rem,1.4vw,1.15rem)', fontWeight: 560, letterSpacing: '-0.01em' }}>{item}</span>
            <span aria-hidden="true" style={{ color: 'var(--muted)', fontSize: '14px' }}>↗</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FaqAccordion({ heading, faqs }: { heading: React.ReactNode; faqs: { q: string; a: string }[] }) {
  return (
    <div style={{ paddingBottom: 'clamp(56px,8vw,110px)', maxWidth: '860px' }}>
      <h2 className="display reveal" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.2rem)', marginBottom: 'clamp(28px,4vw,48px)' }}>
        {heading}
      </h2>
      <div className="reveal">
        {faqs.map(faq => (
          <details key={faq.q} className="faq-item">
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

export function ServiceIntro({ lede, body, aside }: { lede: string; body?: string; aside?: React.ReactNode }) {
  return (
    <div className="cs-grid" style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start', padding: 'clamp(48px,7vw,96px) 0 clamp(56px,8vw,110px)' }}>
      <div>
        <p className="display reveal" style={{ fontSize: 'clamp(1.35rem,2.4vw,2rem)', marginBottom: '24px' }}>{lede}</p>
        {body && <p className="reveal" style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '620px' }}>{body}</p>}
      </div>
      {aside && <div className="reveal">{aside}</div>}
    </div>
  )
}
