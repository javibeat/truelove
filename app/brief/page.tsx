'use client'

import { useState, useRef, useMemo } from 'react'
import Link from 'next/link'

/* ── Number formatter (deterministic) ─────────────── */
function fmt(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/* ── Design tokens ────────────────────────────────── */
const T = {
  bg: '#f5f5f7',
  card: '#ffffff',
  border: '#e5e5ea',
  borderLight: '#f0f0f3',
  text: '#1d1d1f',
  textSec: '#86868b',
  textTer: '#aeaeb2',
  accent: '#0071e3',
  accentLight: 'rgba(0,113,227,0.06)',
  red: '#ff3b30',
  redLight: 'rgba(255,59,48,0.06)',
  radius: '16px',
  radiusSm: '12px',
  radiusPill: '100px',
  shadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
  shadowMd: '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
  font: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

/* ── Currency ─────────────────────────────────────── */
const CURRENCIES = [
  { code: 'AED', symbol: 'AED', rate: 1 },
  { code: 'EUR', symbol: '\u20AC', rate: 0.25 },
  { code: 'GBP', symbol: '\u00A3', rate: 0.21 },
  { code: 'USD', symbol: '$', rate: 0.27 },
] as const
type CurrencyCode = typeof CURRENCIES[number]['code']

/* ── Types ────────────────────────────────────────── */
type Feature = { name: string; price: number; hint: string }

type WebType = {
  base: number
  desc: string
  ideal: string
  includes: string
}

/* ── Website types (base price + what's included) ──── */
const WEBSITE_TYPES: Record<string, WebType> = {
  'Landing Page': {
    base: 2000,
    desc: 'A single, focused page designed to convert visitors.',
    ideal: 'Ideal if you\u2019re launching a product, running a campaign, or need a quick online presence.',
    includes: 'Professional design, responsive layout, 1 page',
  },
  'Business Website': {
    base: 5000,
    desc: 'A complete multi-page website (3\u20137 pages) for your company.',
    ideal: 'Ideal if you need Home, About, Services, Contact, etc.',
    includes: 'Professional design, responsive layout, 3\u20137 pages',
  },
  'Portfolio / Personal': {
    base: 4000,
    desc: 'A visual showcase for your work, personal brand, or creative career.',
    ideal: 'Ideal if you\u2019re an artist, photographer, DJ, freelancer, or creative professional.',
    includes: 'Professional design, photo gallery, responsive layout',
  },
  'E-commerce Store': {
    base: 9000,
    desc: 'A full online shop built on Shopify where customers browse, add to cart, and pay.',
    ideal: 'Ideal if you sell physical products, digital goods, or subscriptions online.',
    includes: 'Professional design, payment gateway, inventory management, product pages',
  },
  'Blog / Magazine': {
    base: 3500,
    desc: 'A content-first website built around articles, news, or editorial content.',
    ideal: 'Ideal if content is your main product \u2014 news, guides, reviews, or thought leadership.',
    includes: 'Professional design, CMS, categories & tags, social sharing',
  },
  'Booking / Reservation': {
    base: 6000,
    desc: 'A booking system built on Cal.com or similar, integrated into your website.',
    ideal: 'Ideal if you\u2019re a restaurant, salon, clinic, consultant, or event venue.',
    includes: 'Professional design, calendar/scheduling, email confirmations',
  },
  'Web Application': {
    base: 15000,
    desc: 'A custom interactive platform \u2014 dashboards, tools, or SaaS products.',
    ideal: 'Ideal if you need something beyond a website: a tool people log into and use.',
    includes: 'User authentication, database & backend, responsive design',
  },
}

/* ── Feature pool (buffet) ─────────────────────────── */
/* `types`: which website types this feature is compatible with. ['*'] = all */
type PoolFeature = Feature & { types: string[] }

const WEB_FEATURES: PoolFeature[] = [
  // Communication — available for all types
  { name: 'Contact Form', price: 0, hint: 'So visitors can reach you directly', types: ['*'] },
  { name: 'WhatsApp Button', price: 0, hint: 'Let people message you instantly', types: ['*'] },
  { name: 'Live Chat Widget', price: 500, hint: 'We integrate Tawk.to, Crisp, or similar \u2014 real-time chat with visitors', types: ['*'] },

  // Content & management
  { name: 'CMS', price: 1500, hint: 'Edit your own content without a developer. Essential for real estate, restaurants, etc.', types: ['Business Website', 'Portfolio / Personal', 'E-commerce Store', 'Booking / Reservation', 'Web Application'] },
  { name: 'Blog Section', price: 1000, hint: 'Publish articles to attract visitors and improve SEO', types: ['Landing Page', 'Business Website', 'Portfolio / Personal', 'E-commerce Store', 'Booking / Reservation'] },
  { name: 'Newsletter', price: 500, hint: 'Collect emails via Mailchimp, Brevo, or similar. Free tiers available', types: ['Blog / Magazine', 'Business Website', 'E-commerce Store'] },

  // Media
  { name: 'Video Integration', price: 500, hint: 'Embed your YouTube, Vimeo, or showreel content', types: ['Portfolio / Personal', 'Landing Page', 'Business Website'] },
  { name: 'Music Player', price: 500, hint: 'Embed your Spotify, SoundCloud, or Mixcloud tracks', types: ['Portfolio / Personal'] },
  { name: 'Photo Gallery', price: 500, hint: 'Display work in a beautiful grid or lightbox layout', types: ['Business Website', 'Landing Page'] },

  // Location & maps
  { name: 'Google Maps', price: 0, hint: 'Show your physical location on the site', types: ['Business Website', 'Booking / Reservation', 'Landing Page'] },

  // Structure
  { name: '8\u201312 pages', price: 500, hint: 'Need more pages than the standard 3\u20137', types: ['Business Website'] },
  { name: 'CV / Resume', price: 0, hint: 'A professional bio and experience section', types: ['Portfolio / Personal'] },

  // E-commerce specific
  { name: 'Shipping Setup', price: 1000, hint: 'Configure shipping zones, rates, and carrier tracking', types: ['E-commerce Store'] },
  { name: 'Multi-currency', price: 800, hint: 'Let customers pay in their local currency', types: ['E-commerce Store'] },
  { name: 'Product Filters', price: 500, hint: 'Help shoppers find products by size, color, price, etc.', types: ['E-commerce Store'] },
  { name: 'Customer Accounts', price: 800, hint: 'Logged-in users can track orders and save favorites', types: ['E-commerce Store'] },
  { name: 'Discount Codes', price: 500, hint: 'Run promotions and offer coupon codes', types: ['E-commerce Store'] },
  { name: 'Product Upload (50+)', price: 2500, hint: 'We upload your catalog from a spreadsheet you provide', types: ['E-commerce Store'] },

  // Blog specific
  { name: 'Author Profiles', price: 500, hint: 'Multiple writers? Each gets their own bio and page', types: ['Blog / Magazine'] },
  { name: 'Comments', price: 500, hint: 'Reader discussions via Disqus or similar third-party widget', types: ['Blog / Magazine'] },

  // Booking specific
  { name: 'Online Payment', price: 800, hint: 'Charge deposits or full payment at booking', types: ['Booking / Reservation'] },
  { name: 'SMS / WhatsApp Reminders', price: 600, hint: 'Reduce no-shows with automatic reminders. Small per-message cost applies', types: ['Booking / Reservation'] },
  { name: 'Multi-staff / Multi-room', price: 1000, hint: 'Different availability per team member or room', types: ['Booking / Reservation'] },
  { name: 'Google Calendar Sync', price: 500, hint: 'Bookings appear automatically in your calendar', types: ['Booking / Reservation'] },

  // Web App specific
  { name: 'Admin Dashboard', price: 2000, hint: 'A control panel for you to manage users and data', types: ['Web Application'] },
  { name: 'API Integration', price: 1500, hint: 'Per integration (Stripe, Google, CRM, etc.). Complex APIs quoted separately', types: ['Web Application'] },
  { name: 'Real-time Features', price: 2500, hint: 'Live updates, chat, or collaboration. May involve ongoing hosting costs', types: ['Web Application'] },
  { name: 'File Uploads', price: 800, hint: 'Users can upload documents, images, or media', types: ['Web Application'] },
  { name: 'Email Notifications', price: 1000, hint: 'Automatic emails when things happen (signups, orders, alerts)', types: ['Web Application'] },

  // Universal paid
  { name: 'Analytics Setup', price: 300, hint: 'Track who visits and what they do', types: ['*'] },
  { name: 'Multi-language', price: 500, hint: 'Reach audiences in different languages', types: ['*'] },
]

/* ── Mobile App ─────────────────────────────────────── */
const APP_FEATURES: Feature[] = [
  { name: 'iOS & Android', price: 0, hint: 'One codebase that works on both platforms' },
  { name: 'Push Notifications', price: 0, hint: 'Send alerts and updates directly to your users\u2019 phones' },
  { name: 'User Authentication', price: 0, hint: 'Login, signup, and user profiles' },
  { name: 'Camera / Media Access', price: 0, hint: 'Let users take photos or upload files from their phone' },
  { name: 'GPS / Location', price: 0, hint: 'Maps, location tracking, or nearby search features' },
  { name: 'App Store Submission', price: 0, hint: 'We handle the publishing process to Apple & Google stores' },
  { name: 'Offline Mode', price: 1500, hint: 'App works without internet and syncs when back online' },
  { name: 'In-app Payments', price: 2500, hint: 'Sell products or subscriptions inside the app. Payment gateway fees handled by you' },
  { name: 'Admin Dashboard', price: 2500, hint: 'A web panel for you to manage app content and users' },
  { name: 'Analytics Setup', price: 300, hint: 'Track downloads, usage, and retention' },
]
const APP_BASE = 20000

/* ── Redesign extras (shown when "This is a redesign" is toggled) ── */
const REDESIGN_FEATURES: Feature[] = [
  { name: 'Keep Current Content', price: 0, hint: 'We migrate your existing text and images' },
  { name: 'New Content Needed', price: 1200, hint: 'Need fresh copy and visuals? We handle it' },
  { name: 'SEO Migration', price: 800, hint: 'Keep your Google rankings when moving. Best for sites under 50 pages' },
  { name: 'New Platform', price: 3000, hint: 'Move from WordPress, Wix, etc. to a modern stack. Price varies by content volume' },
  { name: 'Speed Optimization', price: 800, hint: 'Make your site load fast on any device' },
]

/* ── Add-on services ──────────────────────────────── */
const ADDON_PRICES: Record<string, number> = {
  'Logo Design': 2500, 'Full Brand Identity': 5500,
  'Flyer / Poster Design': 600, 'Business Card Design': 400,
  'SEO & AI Setup': 1500,
}

const URGENCY_MULT: Record<number, number> = { 4: 1.15, 5: 1.25 }

const GOALS = ['Generate Leads', 'Sell Products', 'Build Credibility', 'Showcase Work', 'Increase Bookings', 'Online Presence', 'SEO / Visibility', 'Attract Investors']
const VIBES = ['Luxury / Premium', 'Minimal / Clean', 'Bold / Edgy', 'Warm / Friendly', 'Corporate / Trust', 'Creative / Artistic', 'Modern / Tech', 'Vintage / Classic']
const CONTENT_HAVE = ['Logo', 'Brand Colors', 'Professional Photos', 'Written Copy', 'Domain Name', 'Nothing yet']

/* ═══════════════════════════════════════════════════ */
export default function BriefPage() {
  const [sel, setSel] = useState<Record<string, Set<string>>>({})
  const [urgency, setUrgency] = useState<number | null>(null)
  const [currency, setCurrency] = useState<CurrencyCode>('AED')
  const [wantsWebsite, setWantsWebsite] = useState(false)
  const [wantsApp, setWantsApp] = useState(false)
  const [websiteType, setWebsiteType] = useState<string | null>(null)
  const [isRedesign, setIsRedesign] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const toggle = (g: string, v: string) => {
    setSel(prev => {
      const s = new Set(prev[g] || [])
      s.has(v) ? s.delete(v) : s.add(v)
      return { ...prev, [g]: s }
    })
  }
  const has = (g: string, v: string) => sel[g]?.has(v) || false
  const vals = (g: string) => [...(sel[g] || [])].join(', ')

  const cur = CURRENCIES.find(c => c.code === currency)!
  const convert = (aed: number) => Math.round(aed * cur.rate)
  const sym = cur.code === 'AED' ? 'AED ' : cur.symbol

  /* ── Price calc ── */
  const estimateAED = useMemo(() => {
    let t = 0
    // Website base + features from pool
    if (wantsWebsite && websiteType) {
      const wt = WEBSITE_TYPES[websiteType]
      if (wt) {
        t += wt.base
        const feats = sel['feat_web'] || new Set()
        WEB_FEATURES.forEach(f => {
          if (feats.has(f.name) && (f.types.includes('*') || f.types.includes(websiteType))) {
            t += f.price
          }
        })
      }
    }
    // Mobile App
    if (wantsApp) {
      t += APP_BASE
      const feats = sel['feat_app'] || new Set()
      APP_FEATURES.forEach(f => { if (feats.has(f.name)) t += f.price })
    }
    // Redesign extras
    if (isRedesign && wantsWebsite) {
      const rFeats = sel['feat_redesign'] || new Set()
      REDESIGN_FEATURES.forEach(f => { if (rFeats.has(f.name)) t += f.price })
    }
    ;(sel['addons'] || new Set()).forEach(a => { t += ADDON_PRICES[a] || 0 })
    const m = URGENCY_MULT[urgency || 0]
    if (m) t = Math.round(t * m)
    return t
  }, [sel, urgency, isRedesign, wantsWebsite, wantsApp, websiteType])

  const estimate = convert(estimateAED)
  const hasPrice = estimateAED > 0

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault()
    const form = formRef.current
    if (!form || !form.reportValidity()) return
    setReviewing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = () => {
    const form = formRef.current
    if (!form) return

    // Build clean FormData with readable labels, skip empty fields
    const d = new FormData()
    const field = (label: string, value: string) => { if (value.trim()) d.set(label, value.trim()) }

    field('Name', form.querySelector<HTMLInputElement>('[name="name"]')?.value || '')
    field('Email', form.querySelector<HTMLInputElement>('[name="email"]')?.value || '')
    field('Phone / WhatsApp', form.querySelector<HTMLInputElement>('[name="phone"]')?.value || '')
    field('Company', form.querySelector<HTMLInputElement>('[name="company"]')?.value || '')
    field('Current Website', form.querySelector<HTMLInputElement>('[name="current_site"]')?.value || '')

    // Project
    const parts: string[] = []
    if (wantsWebsite && websiteType) {
      const webFeats = [...(sel['feat_web'] || [])].filter(fname =>
        WEB_FEATURES.some(f => f.name === fname && (f.types.includes('*') || f.types.includes(websiteType)))
      )
      parts.push(webFeats.length ? `${websiteType} (${webFeats.join(', ')})` : websiteType)
    }
    if (wantsApp) {
      const appFeats = [...(sel['feat_app'] || [])]
      parts.push(appFeats.length ? `Mobile App (${appFeats.join(', ')})` : 'Mobile App')
    }
    field('Project', parts.join(' | '))
    if (isRedesign) field('Redesign', vals('feat_redesign') || 'Yes')
    field('Project Notes', form.querySelector<HTMLTextAreaElement>('[name="site_notes"]')?.value || '')

    // Extras
    field('Extra Services', vals('addons'))
    field('Extra Services Notes', form.querySelector<HTMLTextAreaElement>('[name="addon_notes"]')?.value || '')
    field('Ongoing Support', vals('support'))

    // Goals & audience
    field('Goals', vals('goals'))
    field('Goals Notes', form.querySelector<HTMLTextAreaElement>('[name="goals_notes"]')?.value || '')
    field('Target Audience', form.querySelector<HTMLTextAreaElement>('[name="audience"]')?.value || '')

    // Style
    field('Vibe / Style', vals('vibe'))
    field('Reference 1', form.querySelector<HTMLInputElement>('[name="ref1"]')?.value || '')
    field('Reference 2', form.querySelector<HTMLInputElement>('[name="ref2"]')?.value || '')
    field('Style Notes', form.querySelector<HTMLTextAreaElement>('[name="vibe_notes"]')?.value || '')

    // Content & timeline
    field('Content Available', vals('have'))
    field('Content Notes', form.querySelector<HTMLTextAreaElement>('[name="content_notes"]')?.value || '')
    field('Urgency', urgency ? `${urgency}/5${urgency >= 4 ? (urgency === 4 ? ' (Rush +15%)' : ' (Rush +25%)') : ''}` : '')
    field('Timeline Notes', form.querySelector<HTMLTextAreaElement>('[name="timeline_notes"]')?.value || '')

    // Notes & estimate
    field('Additional Notes', form.querySelector<HTMLTextAreaElement>('[name="notes"]')?.value || '')
    field('Estimated Budget', hasPrice ? `${sym}${fmt(estimate)}` : 'N/A')

    fetch('https://formspree.io/f/mwvwnkow', {
      method: 'POST', body: d, headers: { Accept: 'application/json' },
    }).then(() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }) })
  }

  /* ── Build review data ── */
  const reviewData = useMemo(() => {
    const form = formRef.current
    const name = form?.querySelector<HTMLInputElement>('[name="name"]')?.value || ''
    const email = form?.querySelector<HTMLInputElement>('[name="email"]')?.value || ''
    const phone = form?.querySelector<HTMLInputElement>('[name="phone"]')?.value || ''
    const company = form?.querySelector<HTMLInputElement>('[name="company"]')?.value || ''
    const currentSite = form?.querySelector<HTMLInputElement>('[name="current_site"]')?.value || ''
    const audience = form?.querySelector<HTMLTextAreaElement>('[name="audience"]')?.value || ''
    const notes = form?.querySelector<HTMLTextAreaElement>('[name="notes"]')?.value || ''

    const webFeats = websiteType
      ? [...(sel['feat_web'] || [])].filter(fname =>
          WEB_FEATURES.some(f => f.name === fname && (f.types.includes('*') || f.types.includes(websiteType)))
        )
      : []
    const appFeats = [...(sel['feat_app'] || [])]

    return { name, email, phone, company, currentSite, audience, notes, webFeats, appFeats }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewing, sel, websiteType])

  /* ── Success ── */
  if (submitted) return (
    <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: T.font, padding: '40px 20px' }}>
      <div style={{ background: T.card, borderRadius: '24px', boxShadow: T.shadowMd, padding: '64px 48px', textAlign: 'center', maxWidth: '480px', width: '100%' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(52,199,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>&#10003;</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: T.text, marginBottom: '12px', letterSpacing: '-0.02em' }}>Brief received</h1>
        <p style={{ fontSize: '18px', color: T.textSec, lineHeight: 1.6, marginBottom: '32px' }}>
          Thank you for your time. We&apos;ll review everything and get back to you within 24 hours.
        </p>
        <Link href="/" style={{ display: 'inline-block', padding: '14px 32px', background: T.text, color: '#fff', borderRadius: T.radiusPill, fontSize: '16px', fontWeight: 500, textDecoration: 'none' }}>&larr; Back to Home</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: T.font }}>

      {/* ── STICKY ESTIMATE ────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(245,245,247,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${T.borderLight}`,
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 800 }}>T</span>
              </div>
            </Link>
            <div style={{ height: '20px', width: '1px', background: T.border }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: T.textTer, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {hasPrice ? 'Estimate from' : 'Project Brief'}
              </div>
              <div style={{ fontSize: hasPrice ? '24px' : '16px', fontWeight: 700, color: hasPrice ? T.text : T.textSec, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {hasPrice ? <>{sym}{fmt(estimate)}*</> : 'Select services below'}
              </div>
            </div>
            {urgency != null && urgency >= 4 && (
              <span style={{ fontSize: '12px', fontWeight: 600, color: T.red, background: T.redLight, padding: '4px 12px', borderRadius: T.radiusPill }}>
                Rush {urgency === 4 ? '+15%' : '+25%'}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', background: T.card, borderRadius: T.radiusPill, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
            {CURRENCIES.map(c => (
              <button key={c.code} type="button" onClick={() => setCurrency(c.code)}
                style={{
                  fontSize: '14px', fontWeight: 500, fontFamily: T.font,
                  padding: '8px 18px', border: 'none', cursor: 'pointer',
                  background: currency === c.code ? T.text : 'transparent',
                  color: currency === c.code ? '#fff' : T.textSec,
                  transition: 'all .2s',
                }}
              >{c.code}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ────────────────────────────────── */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 120px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 700, color: T.text, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}>
            Start your project
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', color: T.textSec, lineHeight: 1.6, maxWidth: '520px' }}>
            Tell us what you need. Takes about 3 minutes. Prices are approximate and adjusted to your needs after our first conversation. Currency conversions are indicative &mdash; the final rate applies at the time of payment, but the total is the same regardless of currency.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleReview}>

          {/* 01 — About You */}
          <Card title="About you" num={1}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-2-form">
              <InputField label="Name" name="name" required placeholder="Your full name" />
              <InputField label="Email" name="email" type="email" required placeholder="your@email.com" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }} className="grid-2-form">
              <InputField label="Phone / WhatsApp" name="phone" type="tel" required placeholder="+971 5X XXX XXXX" />
              <InputField label="Company / Brand" name="company" placeholder="Company or brand name" />
            </div>
            <div style={{ marginTop: '16px' }}>
              <InputField label="Current website" name="current_site" type="url" placeholder="https://your-site.com" />
            </div>
          </Card>

          {/* 02 — What are you building? */}
          <Card title="What are you building?" num={2} subtitle="Select one or both.">
            {/* Category selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="grid-2-form">
              <button type="button" onClick={() => { setWantsWebsite(!wantsWebsite); if (wantsWebsite) { setWebsiteType(null); setIsRedesign(false) } }}
                style={{
                  padding: '28px 24px', textAlign: 'center', cursor: 'pointer',
                  border: `2px solid ${wantsWebsite ? T.accent : T.borderLight}`,
                  borderRadius: T.radius, fontFamily: T.font,
                  background: wantsWebsite ? T.accentLight : '#fff',
                  transition: 'all .15s',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>&#x1F310;</div>
                <div style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, color: wantsWebsite ? T.accent : T.text }}>Website</div>
                <div style={{ fontSize: '15px', color: T.textSec, marginTop: '6px' }}>from* {sym}{fmt(convert(2000))}</div>
              </button>
              <button type="button" onClick={() => setWantsApp(!wantsApp)}
                style={{
                  padding: '28px 24px', textAlign: 'center', cursor: 'pointer',
                  border: `2px solid ${wantsApp ? T.accent : T.borderLight}`,
                  borderRadius: T.radius, fontFamily: T.font,
                  background: wantsApp ? T.accentLight : '#fff',
                  transition: 'all .15s',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>&#x1F4F1;</div>
                <div style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, color: wantsApp ? T.accent : T.text }}>Mobile App</div>
                <div style={{ fontSize: '15px', color: T.textSec, marginTop: '6px' }}>from* {sym}{fmt(convert(APP_BASE))}</div>
              </button>
            </div>
          </Card>

          {/* 03 — Website type (only if website selected) */}
          {wantsWebsite && (
            <Card title="What type of website?" num={0} subtitle="This sets your starting price. Features appear below.">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(WEBSITE_TYPES).map(([name, wt]) => {
                  const active = websiteType === name
                  return (
                    <button key={name} type="button" onClick={() => setWebsiteType(active ? null : name)}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        width: '100%', padding: '20px 22px', textAlign: 'left',
                        border: `1.5px solid ${active ? T.accent : T.borderLight}`,
                        borderRadius: T.radiusSm, cursor: 'pointer', transition: 'all .15s',
                        background: active ? T.accentLight : '#fff', fontFamily: T.font,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 'clamp(18px, 2.5vw, 21px)', fontWeight: 600, color: active ? T.accent : T.text, marginBottom: '4px' }}>{name}</div>
                        <div style={{ fontSize: '16px', color: T.textSec, lineHeight: 1.5, marginBottom: '4px' }}>{wt.desc}</div>
                        <div style={{ fontSize: '14px', color: T.accent, fontStyle: 'italic' }}>{wt.ideal}</div>
                        {active && (
                          <div style={{ fontSize: '13px', color: T.textTer, marginTop: '8px' }}>
                            Includes: {wt.includes}
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right', marginLeft: '20px', flexShrink: 0 }}>
                        <div style={{ fontSize: '11px', fontWeight: 500, color: T.textTer, marginBottom: '2px' }}>from*</div>
                        <div style={{ fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 600, color: active ? T.accent : T.textTer, whiteSpace: 'nowrap' }}>
                          {sym}{fmt(convert(wt.base))}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Redesign toggle */}
              {websiteType && (
                <div style={{ marginTop: '24px', borderTop: `1px solid ${T.borderLight}`, paddingTop: '20px' }}>
                  <button type="button" onClick={() => setIsRedesign(!isRedesign)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                      padding: '16px 20px', textAlign: 'left',
                      border: `1.5px solid ${isRedesign ? T.accent : T.borderLight}`,
                      borderRadius: T.radiusSm, cursor: 'pointer', fontFamily: T.font,
                      background: isRedesign ? T.accentLight : '#fff', transition: 'all .15s',
                    }}
                  >
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0,
                      border: `2px solid ${isRedesign ? T.accent : T.border}`,
                      background: isRedesign ? T.accent : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s',
                    }}>
                      {isRedesign && <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>&#10003;</span>}
                    </div>
                    <div>
                      <div style={{ fontSize: '17px', fontWeight: 600, color: isRedesign ? T.accent : T.text }}>This is a redesign of an existing site</div>
                      <div style={{ fontSize: '14px', color: T.textSec, marginTop: '2px' }}>Check this if you already have a website and want to replace it</div>
                    </div>
                  </button>
                  {isRedesign && (
                    <div style={{ marginTop: '12px', padding: '20px', background: '#fafbff', borderRadius: T.radiusSm, border: `1px solid ${T.borderLight}` }}>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: T.textSec, marginBottom: '12px' }}>What do you need for the migration?</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {REDESIGN_FEATURES.map(feat => {
                          const fActive = has('feat_redesign', feat.name)
                          return (
                            <button key={feat.name} type="button" onClick={() => toggle('feat_redesign', feat.name)}
                              style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '14px 18px', textAlign: 'left',
                                border: `1.5px solid ${fActive ? T.accent : T.border}`,
                                borderRadius: T.radiusSm, fontFamily: T.font,
                                background: fActive ? T.accentLight : '#fff',
                                cursor: 'pointer', transition: 'all .15s',
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: fActive ? T.accent : T.text }}>{feat.name}</div>
                                <div style={{ fontSize: '14px', color: T.textSec, marginTop: '2px' }}>{feat.hint}</div>
                              </div>
                              <div style={{ marginLeft: '16px', flexShrink: 0 }}>
                                {feat.price > 0 ? (
                                  <span style={{ fontSize: '14px', fontWeight: 600, color: fActive ? T.accent : T.textTer }}>+{sym}{fmt(convert(feat.price))}</span>
                                ) : (
                                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#34c759' }}>Included</span>
                                )}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )}

          {/* 03b — Feature buffet (website) — appears after picking a type */}
          {wantsWebsite && websiteType && (() => {
            const available = WEB_FEATURES.filter(f => f.types.includes('*') || f.types.includes(websiteType))
            const included = available.filter(f => f.price === 0)
            const paid = available.filter(f => f.price > 0)
            return (
              <Card title="Add to your project" num={0} subtitle={`Compatible features for your ${websiteType.toLowerCase()}. Pick what you need.`}>
                {included.length > 0 && (
                  <>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: T.textTer, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                      Included at no extra cost
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                      {included.map(feat => {
                        const fActive = has('feat_web', feat.name)
                        return (
                          <button key={feat.name} type="button" onClick={() => toggle('feat_web', feat.name)}
                            style={{
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              padding: '14px 18px', textAlign: 'left',
                              border: `1.5px solid ${fActive ? T.accent : T.border}`,
                              borderRadius: T.radiusSm, fontFamily: T.font,
                              background: fActive ? T.accentLight : '#fff',
                              cursor: 'pointer', transition: 'all .15s',
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '16px', fontWeight: 600, color: fActive ? T.accent : T.text }}>{feat.name}</div>
                              <div style={{ fontSize: '14px', color: T.textSec, marginTop: '2px' }}>{feat.hint}</div>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#34c759', marginLeft: '16px', flexShrink: 0 }}>Included</span>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
                {paid.length > 0 && (
                  <>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: T.textTer, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                      Optional add-ons
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {paid.map(feat => {
                        const fActive = has('feat_web', feat.name)
                        return (
                          <button key={feat.name} type="button" onClick={() => toggle('feat_web', feat.name)}
                            style={{
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              padding: '14px 18px', textAlign: 'left',
                              border: `1.5px solid ${fActive ? T.accent : T.border}`,
                              borderRadius: T.radiusSm, fontFamily: T.font,
                              background: fActive ? T.accentLight : '#fff',
                              cursor: 'pointer', transition: 'all .15s',
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '16px', fontWeight: 600, color: fActive ? T.accent : T.text }}>{feat.name}</div>
                              <div style={{ fontSize: '14px', color: T.textSec, marginTop: '2px' }}>{feat.hint}</div>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: fActive ? T.accent : T.textTer, marginLeft: '16px', flexShrink: 0 }}>
                              +{sym}{fmt(convert(feat.price))}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
                <TextArea name="site_notes" placeholder="Need something not listed? Tell us more about your project..." />
              </Card>
            )
          })()}

          {/* 03c — Mobile App features */}
          {wantsApp && (
            <Card title="App features" num={0} subtitle="What do you need for your mobile app?">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {APP_FEATURES.map(feat => {
                  const fActive = has('feat_app', feat.name)
                  return (
                    <button key={feat.name} type="button" onClick={() => toggle('feat_app', feat.name)}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 18px', textAlign: 'left',
                        border: `1.5px solid ${fActive ? T.accent : T.border}`,
                        borderRadius: T.radiusSm, fontFamily: T.font,
                        background: fActive ? T.accentLight : '#fff',
                        cursor: 'pointer', transition: 'all .15s',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: fActive ? T.accent : T.text }}>{feat.name}</div>
                        <div style={{ fontSize: '14px', color: T.textSec, marginTop: '2px' }}>{feat.hint}</div>
                      </div>
                      <div style={{ marginLeft: '16px', flexShrink: 0 }}>
                        {feat.price > 0 ? (
                          <span style={{ fontSize: '14px', fontWeight: 600, color: fActive ? T.accent : T.textTer }}>+{sym}{fmt(convert(feat.price))}</span>
                        ) : (
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#34c759' }}>Included</span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
              {!wantsWebsite && <TextArea name="site_notes" placeholder="Tell us more about your app idea..." />}
            </Card>
          )}

          {/* 03 — Add-ons */}
          <Card title="Extra services" num={0} subtitle="Optional add-ons. Select all that apply.">
            <PillGroup group="addons" items={Object.keys(ADDON_PRICES)} has={has} toggle={toggle}
              price={k => convert(ADDON_PRICES[k] || 0)} symbol={sym} />
            <TextArea name="addon_notes" placeholder="Any other services you need..." />
          </Card>

          {/* Ongoing support */}
          <Card title="After launch" num={0} subtitle="Do you need us after the project is delivered?">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {([
                ['I\u2019ll need ongoing support', 'Maintenance, updates, edits \u2014 we\u2019ll tailor a plan to your site'],
                ['Just the build', 'I\u2019ll manage it myself after delivery'],
                ['Not sure yet', 'We can discuss this later'],
              ] as const).map(([label, hint]) => {
                const active = has('support', label)
                return (
                  <button key={label} type="button" onClick={() => {
                    setSel(prev => {
                      const s = new Set<string>()
                      if (!prev['support']?.has(label)) s.add(label)
                      return { ...prev, support: s }
                    })
                  }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px', width: '100%',
                      padding: '16px 20px', textAlign: 'left',
                      border: `1.5px solid ${active ? T.accent : T.borderLight}`,
                      borderRadius: T.radiusSm, cursor: 'pointer', fontFamily: T.font,
                      background: active ? T.accentLight : '#fff', transition: 'all .15s',
                    }}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                      border: `2px solid ${active ? T.accent : T.border}`,
                      background: active ? T.accent : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s',
                    }}>
                      {active && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: active ? T.accent : T.text }}>{label}</div>
                      <div style={{ fontSize: '14px', color: T.textSec, marginTop: '2px' }}>{hint}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* 04 — Goals */}
          <Card title="What should it achieve?" num={3} subtitle="The real objective behind the project.">
            <PillGroup group="goals" items={GOALS} has={has} toggle={toggle} />
            <TextArea name="goals_notes" placeholder="Specific goals or KPIs..." />
          </Card>

          {/* 05 — Audience */}
          <Card title="Who is it for?" num={4} subtitle="Describe your ideal customer or visitor.">
            <textarea name="audience" required placeholder="e.g. High-income professionals in Dubai aged 30-50, interested in luxury real estate investments..."
              style={{ ...textareaStyle, minHeight: '100px' }}
              onFocus={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${T.accentLight}` }}
              onBlur={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none' }}
            />
          </Card>

          {/* 06 — Aesthetic */}
          <Card title="What vibe are you going for?" num={5} subtitle="Pick the words that feel closest to your brand.">
            <PillGroup group="vibe" items={VIBES} has={has} toggle={toggle} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }} className="grid-2-form">
              <InputField label="Reference website" name="ref1" type="url" placeholder="https://example.com" />
              <InputField label="Another reference" name="ref2" type="url" placeholder="https://... (optional)" />
            </div>
            <TextArea name="vibe_notes" placeholder="Colors, styles, or visual references you love..." />
          </Card>

          {/* 07 — Content */}
          <Card title="What do you already have?" num={6} subtitle="Check everything you can provide.">
            <PillGroup group="have" items={CONTENT_HAVE} has={has} toggle={toggle} />
            <TextArea name="content_notes" placeholder="Other materials you have, or things you need help with..." />
          </Card>

          {/* 08 — Timeline */}
          <Card title="How soon do you need this?" num={7} subtitle="Timeframes start once all content is delivered. Rush projects (level 4-5) may include a priority surcharge.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {([
                [1, 'No rush', '6+ wks'],
                [2, 'Flexible', '4-6 wks'],
                [3, 'Standard', '3-4 wks'],
                [4, 'Soon', '2-3 wks'],
                [5, 'ASAP', 'Yesterday'],
              ] as const).map(([n, lbl, time]) => {
                const active = urgency === n
                const isRush = n >= 4
                return (
                  <button key={n} type="button" onClick={() => setUrgency(urgency === n ? null : n)}
                    style={{
                      padding: '18px 8px', textAlign: 'center', cursor: 'pointer', transition: 'all .2s',
                      borderRadius: T.radiusSm, fontFamily: T.font,
                      background: active ? (isRush ? T.redLight : T.accentLight) : '#fff',
                      border: `1.5px solid ${active ? (isRush ? T.red : T.accent) : T.borderLight}`,
                    }}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 700, color: active ? (isRush ? T.red : T.accent) : T.textTer, marginBottom: '4px' }}>{n}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: active ? (isRush ? T.red : T.accent) : T.textSec }}>{lbl}</div>
                    <div style={{ fontSize: '13px', color: T.textTer, marginTop: '3px' }}>{time}</div>
                  </button>
                )
              })}
            </div>
            <TextArea name="timeline_notes" placeholder="Specific deadline or launch date..." />
          </Card>

          {/* 09 — Notes */}
          <Card title="Anything else?" num={8}>
            <textarea name="notes" placeholder="Previous agency experiences, must-have features, competitors, inspirations... Optional but always useful."
              style={{ ...textareaStyle, minHeight: '120px' }}
              onFocus={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${T.accentLight}` }}
              onBlur={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none' }}
            />
          </Card>

          {/* ── Footnote ── */}
          <p style={{ fontSize: '13px', color: T.textTer, lineHeight: 1.6, marginTop: '24px' }}>
            *All prices are starting points. Final quote confirmed after consultation.
          </p>

          {/* ── Review button ── */}
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit"
              style={{
                fontFamily: T.font, fontSize: '18px', fontWeight: 600,
                background: T.accent, color: '#fff', border: 'none',
                padding: '18px 44px', borderRadius: T.radiusPill,
                cursor: 'pointer', transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#005ec4' }}
              onMouseLeave={e => { e.currentTarget.style.background = T.accent }}
            >
              Review Brief &rarr;
            </button>
          </div>

        </form>

        {/* ═══ REVIEW PAGE ═══ */}
        {reviewing && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: T.bg, overflowY: 'auto',
            fontFamily: T.font,
          }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 120px' }}>

              <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 700, color: T.text, letterSpacing: '-0.03em', marginBottom: '8px' }}>
                Review your brief
              </h1>
              <p style={{ fontSize: '18px', color: T.textSec, lineHeight: 1.6, marginBottom: '36px' }}>
                Check everything before sending. You can go back and edit if needed.
              </p>

              {/* Contact */}
              <ReviewSection title="About you">
                <ReviewRow label="Name" value={reviewData.name} />
                <ReviewRow label="Email" value={reviewData.email} />
                <ReviewRow label="Phone / WhatsApp" value={reviewData.phone} />
                {reviewData.company && <ReviewRow label="Company" value={reviewData.company} />}
                {reviewData.currentSite && <ReviewRow label="Current website" value={reviewData.currentSite} />}
              </ReviewSection>

              {/* Project */}
              <ReviewSection title="Project">
                {wantsWebsite && websiteType && (
                  <>
                    <ReviewRow label="Website type" value={websiteType} />
                    {reviewData.webFeats.length > 0 && <ReviewRow label="Features" value={reviewData.webFeats.join(', ')} />}
                    {isRedesign && <ReviewRow label="Redesign" value={vals('feat_redesign') || 'Yes'} />}
                  </>
                )}
                {wantsApp && (
                  <>
                    <ReviewRow label="Mobile App" value="Yes" />
                    {reviewData.appFeats.length > 0 && <ReviewRow label="App features" value={reviewData.appFeats.join(', ')} />}
                  </>
                )}
                {!wantsWebsite && !wantsApp && <ReviewRow label="Project" value="Not selected" />}
              </ReviewSection>

              {/* Extras */}
              {vals('addons') && (
                <ReviewSection title="Extra services">
                  <ReviewRow label="Add-ons" value={vals('addons')} />
                </ReviewSection>
              )}

              {/* After launch */}
              {vals('support') && (
                <ReviewSection title="After launch">
                  <ReviewRow label="Ongoing support" value={vals('support')} />
                </ReviewSection>
              )}

              {/* Goals & audience */}
              <ReviewSection title="Goals & audience">
                {vals('goals') && <ReviewRow label="Goals" value={vals('goals')} />}
                {reviewData.audience && <ReviewRow label="Audience" value={reviewData.audience} />}
              </ReviewSection>

              {/* Style */}
              {(vals('vibe')) && (
                <ReviewSection title="Style">
                  <ReviewRow label="Vibe" value={vals('vibe')} />
                </ReviewSection>
              )}

              {/* Content */}
              {vals('have') && (
                <ReviewSection title="Content you have">
                  <ReviewRow label="Assets" value={vals('have')} />
                </ReviewSection>
              )}

              {/* Timeline */}
              {urgency && (
                <ReviewSection title="Timeline">
                  <ReviewRow label="Urgency" value={`${urgency}/5${urgency >= 4 ? (urgency === 4 ? ' (Rush +15%)' : ' (Rush +25%)') : ''}`} />
                </ReviewSection>
              )}

              {/* Notes */}
              {reviewData.notes && (
                <ReviewSection title="Additional notes">
                  <p style={{ fontSize: '16px', color: T.text, lineHeight: 1.6 }}>{reviewData.notes}</p>
                </ReviewSection>
              )}

              {/* Estimate */}
              {hasPrice && (
                <div style={{
                  background: T.accentLight, border: `1.5px solid ${T.accent}`,
                  borderRadius: T.radius, padding: '24px 28px', marginTop: '24px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: T.accent }}>Estimated budget*</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: T.accent }}>{sym}{fmt(estimate)}</div>
                </div>
              )}

              {/* Actions */}
              <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <button type="button" onClick={() => { setReviewing(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  style={{
                    fontFamily: T.font, fontSize: '16px', fontWeight: 600,
                    background: 'transparent', color: T.textSec, border: `1.5px solid ${T.border}`,
                    padding: '16px 32px', borderRadius: T.radiusPill,
                    cursor: 'pointer', transition: 'all .2s',
                  }}
                >
                  &larr; Go back and edit
                </button>
                <button type="button" onClick={handleSubmit}
                  style={{
                    fontFamily: T.font, fontSize: '18px', fontWeight: 600,
                    background: T.accent, color: '#fff', border: 'none',
                    padding: '18px 44px', borderRadius: T.radiusPill,
                    cursor: 'pointer', transition: 'all .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#005ec4' }}
                  onMouseLeave={e => { e.currentTarget.style.background = T.accent }}
                >
                  Send Brief &rarr;
                </button>
              </div>

              <p style={{ fontSize: '13px', color: T.textTer, lineHeight: 1.6, marginTop: '20px' }}>
                *All prices are starting points. Final quote confirmed after consultation.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: `1px solid ${T.borderLight}`, padding: '40px 24px',
        maxWidth: '720px', margin: '0 auto',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: T.textSec }}>
            True Love Creative &mdash; a <a href="https://beatlabs.ae" target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: 'none' }}>beatLabs</a> brand
          </div>
          <div style={{ fontSize: '13px', color: T.textTer, lineHeight: 1.8 }}>
            BeatLabs FZE LLC &middot; License 53228 &middot; Ajman Media City Free Zone, UAE<br />
            <a href="mailto:info@beatlabs.ae" style={{ color: T.textTer, textDecoration: 'none' }}>info@beatlabs.ae</a> &middot; <a href="tel:+971585324519" style={{ color: T.textTer, textDecoration: 'none' }}>+971 58 532 4519</a>
          </div>
          <div style={{ fontSize: '12px', color: T.textTer, marginTop: '4px' }}>
            &copy; {new Date().getFullYear()} BeatLabs FZE LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ── Sub-components ──────────────────────────────── */

const textareaStyle: React.CSSProperties = {
  width: '100%', fontFamily: T.font, fontSize: '18px', padding: '14px 18px',
  border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm,
  background: '#fff', color: T.text, outline: 'none', resize: 'none',
  transition: 'border-color .2s, box-shadow .2s', lineHeight: 1.5,
}

function Card({ title, num, subtitle, children }: { title: string; num: number; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: T.card, borderRadius: T.radius, border: `1px solid ${T.borderLight}`,
      boxShadow: T.shadow, padding: 'clamp(24px, 4vw, 32px)', marginBottom: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: subtitle ? '10px' : '24px' }}>
        {num > 0 && <span style={{ fontSize: '16px', fontWeight: 700, color: T.textTer }}>{String(num).padStart(2, '0')}</span>}
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: T.text, letterSpacing: '-0.02em' }}>{title}</h2>
      </div>
      {subtitle && <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: T.textSec, lineHeight: 1.6, marginBottom: '24px' }}>{subtitle}</p>}
      {children}
    </div>
  )
}

function InputField({ label, name, type = 'text', required, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; placeholder: string
}) {
  return (
    <div>
      <label style={{ fontSize: '15px', fontWeight: 600, color: T.textSec, display: 'block', marginBottom: '8px' }}>
        {label}{required && <span style={{ color: T.red }}> *</span>}
      </label>
      <input type={type} name={name} required={required} placeholder={placeholder}
        style={{
          width: '100%', fontFamily: T.font, fontSize: '18px', padding: '14px 18px',
          border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm,
          background: '#fff', color: T.text, outline: 'none',
          transition: 'border-color .2s, box-shadow .2s',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${T.accentLight}` }}
        onBlur={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function TextArea({ name, placeholder }: { name: string; placeholder: string }) {
  return (
    <textarea name={name} placeholder={placeholder}
      style={{ ...textareaStyle, minHeight: '60px', marginTop: '20px' }}
      onFocus={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${T.accentLight}` }}
      onBlur={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none' }}
    />
  )
}

function PillGroup({ group, items, has, toggle, price, symbol }: {
  group: string; items: string[]
  has: (g: string, v: string) => boolean
  toggle: (g: string, v: string) => void
  price?: (k: string) => number; symbol?: string
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {items.map(item => {
        const active = has(group, item)
        const p = price?.(item)
        return (
          <button key={item} type="button" onClick={() => toggle(group, item)}
            style={{
              padding: '12px 22px', display: 'inline-flex', alignItems: 'center', gap: '10px',
              border: `1.5px solid ${active ? T.accent : T.borderLight}`,
              borderRadius: T.radiusPill, fontFamily: T.font, fontSize: '17px', fontWeight: 500,
              color: active ? T.accent : T.textSec,
              background: active ? T.accentLight : '#fff',
              cursor: 'pointer', transition: 'all .15s', userSelect: 'none',
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = active ? T.accent : T.borderLight; e.currentTarget.style.color = active ? T.accent : T.textSec } }}
          >
            {item}
            {p != null && p > 0 && (
              <span style={{ fontSize: '14px', fontWeight: 600, color: active ? T.accent : T.textTer }}>
                +{symbol}{fmt(p)}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: T.card, borderRadius: T.radius, border: `1px solid ${T.borderLight}`,
      boxShadow: T.shadow, padding: '24px 28px', marginBottom: '12px',
    }}>
      <h3 style={{ fontSize: '13px', fontWeight: 700, color: T.textTer, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>{title}</h3>
      {children}
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', padding: '8px 0', borderBottom: `1px solid ${T.borderLight}` }}>
      <span style={{ fontSize: '15px', color: T.textSec, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '15px', color: T.text, fontWeight: 500, textAlign: 'right' }}>{value}</span>
    </div>
  )
}
