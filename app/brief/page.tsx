'use client'

import { useState, useRef, useMemo } from 'react'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import WhatsAppButton from '../components/WhatsAppButton'
import { INK, MUTED, LOVE, SURFACE, HAIRLINE } from '../lib/constants'

/* ── Number formatter (deterministic) ─────────────── */
function fmt(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/* ── URL normalizer ─ prepend https:// if the user omits it ── */
function normalizeUrl(v: string) {
  const t = v.trim()
  if (!t) return ''
  return /^https?:\/\//i.test(t) ? t : `https://${t}`
}

/* ── Currency ─────────────────────────────────────── */
const CURRENCIES = [
  { code: 'AED', symbol: 'AED', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.25 },
  { code: 'GBP', symbol: '£', rate: 0.21 },
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
    ideal: 'Ideal if you’re launching a product, running a campaign, or need a quick online presence.',
    includes: 'Professional design, responsive layout, 1 page',
  },
  'Business Website': {
    base: 5000,
    desc: 'A complete multi-page website (3–7 pages) for your company.',
    ideal: 'Ideal if you need Home, About, Services, Contact, etc.',
    includes: 'Professional design, responsive layout, 3–7 pages',
  },
  'Portfolio / Personal': {
    base: 4000,
    desc: 'A visual showcase for your work, personal brand, or creative career.',
    ideal: 'Ideal if you’re an artist, photographer, DJ, freelancer, or creative professional.',
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
    ideal: 'Ideal if content is your main product — news, guides, reviews, or thought leadership.',
    includes: 'Professional design, CMS, categories & tags, social sharing',
  },
  'Booking / Reservation': {
    base: 6000,
    desc: 'A booking system built on Cal.com or similar, integrated into your website.',
    ideal: 'Ideal if you’re a restaurant, salon, clinic, consultant, or event venue.',
    includes: 'Professional design, calendar/scheduling, email confirmations',
  },
  'Web Application': {
    base: 15000,
    desc: 'A custom interactive platform — dashboards, tools, or SaaS products.',
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
  { name: 'Live Chat Widget', price: 500, hint: 'We integrate Tawk.to, Crisp, or similar — real-time chat with visitors', types: ['*'] },

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
  { name: '8–12 pages', price: 500, hint: 'Need more pages than the standard 3–7', types: ['Business Website'] },
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
  { name: 'Push Notifications', price: 0, hint: 'Send alerts and updates directly to your users’ phones' },
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

/* ── Friendly labels for required-field error messages ── */
const FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone / WhatsApp',
  audience: 'Who is it for?',
  _service: 'What are you building',
  _websiteType: 'Website type',
}

/* ── Shared option-row styles ─────────────────────── */
const LOVE_TINT = 'rgba(255,55,95,0.07)'

function rowStyle(active: boolean): React.CSSProperties {
  return {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', padding: '14px 18px', textAlign: 'left',
    border: '1px solid transparent', borderRadius: '14px',
    background: active ? INK : SURFACE,
    cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
  }
}

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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const clearError = (name: string) => setErrors(prev => {
    if (!prev[name]) return prev
    const next = { ...prev }
    delete next[name]
    return next
  })

  const toggle = (g: string, v: string) => {
    setSel(prev => {
      const s = new Set(prev[g] || [])
      // "Nothing yet" is mutually exclusive with the other content options
      if (g === 'have') {
        if (v === 'Nothing yet') {
          return { ...prev, have: s.has('Nothing yet') ? new Set<string>() : new Set(['Nothing yet']) }
        }
        s.delete('Nothing yet')
      }
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
    if (!form) return

    const errs: Record<string, string> = {}
    const invalidEls: (HTMLInputElement | HTMLTextAreaElement)[] = []
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]').forEach(el => {
      if (!el.checkValidity()) {
        errs[el.name] = el.value.trim()
          ? (el.validity.typeMismatch ? 'Please enter a valid format' : 'Please check this field')
          : 'This field is required'
        invalidEls.push(el)
      }
    })

    // Service selection is required (not a native form field)
    if (!wantsWebsite && !wantsApp) {
      errs._service = 'Please select what you’re building — a website, an app, or both.'
    } else if (wantsWebsite && !websiteType) {
      errs._websiteType = 'Please choose a website type to continue.'
    }
    setErrors(errs)

    // Scroll to the topmost error on the page (inputs or the service/type cards)
    const anchors: HTMLElement[] = [...invalidEls]
    if (errs._service) { const e = document.getElementById('card-service'); if (e) anchors.push(e) }
    if (errs._websiteType) { const e = document.getElementById('card-webtype'); if (e) anchors.push(e) }
    if (anchors.length > 0) {
      anchors.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
      const el = anchors[0]
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) el.focus({ preventScroll: true })
      return
    }

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
    field('Current Website', normalizeUrl(form.querySelector<HTMLInputElement>('[name="current_site"]')?.value || ''))

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
    field('About', form.querySelector<HTMLInputElement>('[name="project_about"]')?.value || '')
    field('App About', form.querySelector<HTMLInputElement>('[name="app_about"]')?.value || '')
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
    field('Reference 1', normalizeUrl(form.querySelector<HTMLInputElement>('[name="ref1"]')?.value || ''))
    field('Reference 2', normalizeUrl(form.querySelector<HTMLInputElement>('[name="ref2"]')?.value || ''))
    field('Style Notes', form.querySelector<HTMLTextAreaElement>('[name="vibe_notes"]')?.value || '')

    // Content & timeline
    field('Content Available', vals('have'))
    field('Content Notes', form.querySelector<HTMLTextAreaElement>('[name="content_notes"]')?.value || '')
    field('Urgency', urgency ? `${urgency}/5${urgency >= 4 ? (urgency === 4 ? ' (Rush +15%)' : ' (Rush +25%)') : ''}` : '')
    field('Timeline Notes', form.querySelector<HTMLTextAreaElement>('[name="timeline_notes"]')?.value || '')

    // Notes & estimate
    field('Additional Notes', form.querySelector<HTMLTextAreaElement>('[name="notes"]')?.value || '')
    field('Estimated Budget', hasPrice ? `${sym}${fmt(estimate)}` : 'N/A')

    // Email subject line
    const clientName = form.querySelector<HTMLInputElement>('[name="name"]')?.value || 'Someone'
    const projectLabel = parts.length ? parts.join(' + ') : 'New enquiry'
    d.set('_subject', `New Brief: ${clientName} — ${projectLabel}`)

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
    const projectAbout = form?.querySelector<HTMLInputElement>('[name="project_about"]')?.value || ''
    const appAbout = form?.querySelector<HTMLInputElement>('[name="app_about"]')?.value || ''

    const webFeats = websiteType
      ? [...(sel['feat_web'] || [])].filter(fname =>
          WEB_FEATURES.some(f => f.name === fname && (f.types.includes('*') || f.types.includes(websiteType)))
        )
      : []
    const appFeats = [...(sel['feat_app'] || [])]

    return { name, email, phone, company, currentSite, audience, notes, projectAbout, appAbout, webFeats, appFeats }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewing, sel, websiteType])

  /* ── Success ── */
  if (submitted) return (
    <>
      <SiteNav />
      <main style={{ paddingTop: '60px' }}>
        <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 24px' }}>
          <div className="card" style={{ borderRadius: '28px', padding: 'clamp(48px,7vw,64px) clamp(28px,5vw,48px)', textAlign: 'center', maxWidth: '520px', width: '100%' }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill={LOVE} aria-hidden="true" style={{ margin: '0 auto 24px' }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <h1 className="display" style={{ fontSize: 'clamp(1.8rem,4vw,2.2rem)', marginBottom: '12px' }}>Brief received</h1>
            <p className="lede" style={{ marginBottom: '32px' }}>
              Thank you for your time. We&rsquo;ll review everything and get back to you within 24 hours.
            </p>
            <a href="https://truelovecreative.es" className="btn btn-dark">Back to Home</a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )

  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: '60px' }}>

        {/* ── STICKY ESTIMATE ────────────────────────── */}
        <div style={{
          position: 'sticky', top: '60px', zIndex: 50,
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${HAIRLINE}`,
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div>
                <div className="eyebrow eyebrow-muted" style={{ fontSize: '11px' }}>
                  {hasPrice ? 'Estimate from' : 'Project Brief'}
                </div>
                <div style={{ fontSize: hasPrice ? '22px' : '15px', fontWeight: 600, color: hasPrice ? INK : MUTED, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {hasPrice ? <>{sym}{fmt(estimate)}*</> : 'Select services below'}
                </div>
              </div>
              {urgency != null && urgency >= 4 && (
                <span style={{ fontSize: '12px', fontWeight: 600, color: LOVE, background: LOVE_TINT, padding: '4px 12px', borderRadius: '980px' }}>
                  Rush {urgency === 4 ? '+15%' : '+25%'}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', background: SURFACE, borderRadius: '980px', border: `1px solid ${HAIRLINE}`, overflow: 'hidden' }}>
              {CURRENCIES.map(c => (
                <button key={c.code} type="button" onClick={() => setCurrency(c.code)}
                  style={{
                    fontSize: '13px', fontWeight: 600,
                    padding: '7px 16px', border: 'none', cursor: 'pointer',
                    background: currency === c.code ? INK : 'transparent',
                    color: currency === c.code ? '#fff' : MUTED,
                    borderRadius: '980px',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >{c.code}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── HERO ───────────────────────────────────── */}
        <header className="container" style={{ padding: 'clamp(48px,7vw,88px) 24px clamp(36px,5vw,56px)' }}>
          <h1 className="mega rise" style={{ fontSize: 'clamp(2.6rem,8vw,6.5rem)' }}>
            Start a project<span style={{ color: LOVE }}>.</span>
          </h1>
          <p className="lede rise" style={{ maxWidth: '620px', margin: '20px 0 0', animationDelay: '0.12s' }}>
            Tell us what you need. Takes about 3 minutes. Prices are approximate and adjusted to your needs after our first conversation. Currency conversions are indicative; the final rate applies at the time of payment, but the total is the same regardless of currency.
          </p>
        </header>

        {/* ── CONTENT ────────────────────────────────── */}
        <div className="container" style={{ paddingBottom: 'clamp(64px,9vw,110px)' }}>
          <div className="card card-white" style={{ borderRadius: '28px', maxWidth: '760px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>

            <form ref={formRef} onSubmit={handleReview}>

              {/* 01 — About You */}
              <Card title="About you" num={1} first>
                <div className="grid-2" style={{ gap: '16px' }}>
                  <InputField label="Name" name="name" required placeholder="Your full name" error={errors.name} onClear={clearError} />
                  <InputField label="Email" name="email" type="email" required placeholder="your@email.com" error={errors.email} onClear={clearError} />
                </div>
                <div className="grid-2" style={{ gap: '16px', marginTop: '16px' }}>
                  <InputField label="Phone / WhatsApp" name="phone" type="tel" required placeholder="+971 5X XXX XXXX" error={errors.phone} onClear={clearError} />
                  <InputField label="Company / Brand" name="company" placeholder="Company or brand name" />
                </div>
                <div style={{ marginTop: '16px' }}>
                  <InputField label="Current website" name="current_site" type="text" inputMode="url" placeholder="your-site.com" />
                </div>
              </Card>

              {/* 02 — What are you building? */}
              <Card title="What are you building?" num={2} subtitle="Select one or both." required id="card-service" error={errors._service}>
                {/* Category selector */}
                <div className="grid-2" style={{ gap: '12px' }}>
                  <button type="button" onClick={() => { clearError('_service'); setWantsWebsite(!wantsWebsite); if (wantsWebsite) { setWebsiteType(null); setIsRedesign(false) } }}
                    style={{
                      padding: '28px 24px', textAlign: 'center', cursor: 'pointer',
                      border: '1px solid transparent', borderRadius: '20px',
                      background: wantsWebsite ? INK : SURFACE,
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>&#x1F310;</div>
                    <div style={{ fontSize: 'clamp(17px, 2.5vw, 20px)', fontWeight: 600, letterSpacing: '-0.01em', color: wantsWebsite ? '#fff' : INK }}>Website</div>
                    <div style={{ fontSize: '14px', color: wantsWebsite ? 'rgba(255,255,255,0.7)' : MUTED, marginTop: '6px' }}>from* {sym}{fmt(convert(2000))}</div>
                  </button>
                  <button type="button" onClick={() => { clearError('_service'); setWantsApp(!wantsApp) }}
                    style={{
                      padding: '28px 24px', textAlign: 'center', cursor: 'pointer',
                      border: '1px solid transparent', borderRadius: '20px',
                      background: wantsApp ? INK : SURFACE,
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>&#x1F4F1;</div>
                    <div style={{ fontSize: 'clamp(17px, 2.5vw, 20px)', fontWeight: 600, letterSpacing: '-0.01em', color: wantsApp ? '#fff' : INK }}>Mobile App</div>
                    <div style={{ fontSize: '14px', color: wantsApp ? 'rgba(255,255,255,0.7)' : MUTED, marginTop: '6px' }}>from* {sym}{fmt(convert(APP_BASE))}</div>
                  </button>
                </div>
              </Card>

              {/* 03 — Website type (only if website selected) */}
              {wantsWebsite && (
                <Card title="What type of website?" num={0} subtitle="This sets your starting price. Features appear below." required id="card-webtype" error={errors._websiteType}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(WEBSITE_TYPES).map(([name, wt]) => {
                      const active = websiteType === name
                      return (
                        <button key={name} type="button" onClick={() => { clearError('_websiteType'); setWebsiteType(active ? null : name) }}
                          style={{ ...rowStyle(active), padding: '20px 22px', borderRadius: '16px', alignItems: 'center' }}
                        >
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', fontWeight: 600, letterSpacing: '-0.01em', color: active ? '#fff' : INK, marginBottom: '4px' }}>{name}</div>
                            <div style={{ fontSize: '14px', color: active ? 'rgba(255,255,255,0.72)' : MUTED, lineHeight: 1.5, marginBottom: '4px' }}>{wt.desc}</div>
                            <div style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '-0.01em', color: active ? 'rgba(255,255,255,0.6)' : LOVE }}>{wt.ideal}</div>
                            {active && (
                              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '8px' }}>
                                Includes: {wt.includes}
                              </div>
                            )}
                          </div>
                          <div style={{ textAlign: 'right', marginLeft: '20px', flexShrink: 0 }}>
                            <div style={{ fontSize: '11px', fontWeight: 500, color: active ? 'rgba(255,255,255,0.6)' : MUTED, marginBottom: '2px' }}>from*</div>
                            <div style={{ fontSize: '15px', fontWeight: 600, color: active ? '#fff' : MUTED, whiteSpace: 'nowrap' }}>
                              {sym}{fmt(convert(wt.base))}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* What's the project about */}
                  {websiteType && (
                    <div style={{ marginTop: '20px' }}>
                      <InputField label="What is it about?" name="project_about" placeholder="e.g. Real estate agency, hair salon, restaurant, personal portfolio, online clothing store..." />
                    </div>
                  )}

                  {/* Redesign toggle */}
                  {websiteType && (
                    <div style={{ marginTop: '24px', borderTop: `1px solid ${HAIRLINE}`, paddingTop: '20px' }}>
                      <button type="button" onClick={() => setIsRedesign(!isRedesign)}
                        style={{ ...rowStyle(isRedesign), justifyContent: 'flex-start', gap: '12px', padding: '16px 20px' }}
                      >
                        <div style={{
                          width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0,
                          border: `2px solid ${isRedesign ? '#fff' : 'rgba(0,0,0,0.25)'}`,
                          background: isRedesign ? '#fff' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                        }}>
                          {isRedesign && <span style={{ color: INK, fontSize: '13px', fontWeight: 700 }}>&#10003;</span>}
                        </div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: isRedesign ? '#fff' : INK }}>This is a redesign of an existing site</div>
                          <div style={{ fontSize: '13px', color: isRedesign ? 'rgba(255,255,255,0.7)' : MUTED, marginTop: '2px' }}>Check this if you already have a website and want to replace it</div>
                        </div>
                      </button>
                      {isRedesign && (
                        <div style={{ marginTop: '12px', padding: '20px', background: '#fff', borderRadius: '16px', border: `1px solid ${HAIRLINE}` }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: MUTED, marginBottom: '12px' }}>What do you need for the migration?</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {REDESIGN_FEATURES.map(feat => (
                              <FeatureRow key={feat.name} feat={feat} active={has('feat_redesign', feat.name)}
                                onClick={() => toggle('feat_redesign', feat.name)} sym={sym} convert={convert} />
                            ))}
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
                        <div className="eyebrow eyebrow-muted" style={{ fontSize: '11px', marginBottom: '10px' }}>
                          Included at no extra cost
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                          {included.map(feat => (
                            <FeatureRow key={feat.name} feat={feat} active={has('feat_web', feat.name)}
                              onClick={() => toggle('feat_web', feat.name)} sym={sym} convert={convert} />
                          ))}
                        </div>
                      </>
                    )}
                    {paid.length > 0 && (
                      <>
                        <div className="eyebrow eyebrow-muted" style={{ fontSize: '11px', marginBottom: '10px' }}>
                          Optional add-ons
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {paid.map(feat => (
                            <FeatureRow key={feat.name} feat={feat} active={has('feat_web', feat.name)}
                              onClick={() => toggle('feat_web', feat.name)} sym={sym} convert={convert} />
                          ))}
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
                  <div style={{ marginBottom: '20px' }}>
                    <InputField label="What is the app about?" name="app_about" placeholder="e.g. Food delivery, fitness tracker, booking system, social network, marketplace..." />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {APP_FEATURES.map(feat => (
                      <FeatureRow key={feat.name} feat={feat} active={has('feat_app', feat.name)}
                        onClick={() => toggle('feat_app', feat.name)} sym={sym} convert={convert} />
                    ))}
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
                    ['I’ll need ongoing support', 'Maintenance, updates, edits — we’ll tailor a plan to your site'],
                    ['Just the build', 'I’ll manage it myself after delivery'],
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
                        style={{ ...rowStyle(active), justifyContent: 'flex-start', gap: '14px', padding: '16px 20px' }}
                      >
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                          border: `2px solid ${active ? '#fff' : 'rgba(0,0,0,0.25)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                        }}>
                          {active && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />}
                        </div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: active ? '#fff' : INK }}>{label}</div>
                          <div style={{ fontSize: '13px', color: active ? 'rgba(255,255,255,0.7)' : MUTED, marginTop: '2px' }}>{hint}</div>
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
              <Card title="Who is it for?" num={4} subtitle="Describe your ideal customer or visitor." required>
                <textarea name="audience" required placeholder="e.g. High-income professionals in Dubai aged 30-50, interested in luxury real estate investments..."
                  className="field"
                  style={{ minHeight: '100px', resize: 'vertical', borderColor: errors.audience ? LOVE : undefined }}
                  onInput={() => clearError('audience')}
                />
                {errors.audience && <div style={{ fontSize: '13px', fontWeight: 500, color: LOVE, marginTop: '8px' }}>{errors.audience}</div>}
              </Card>

              {/* 06 — Aesthetic */}
              <Card title="What vibe are you going for?" num={5} subtitle="Pick the words that feel closest to your brand.">
                <PillGroup group="vibe" items={VIBES} has={has} toggle={toggle} />
                <div className="grid-2" style={{ gap: '16px', marginTop: '20px' }}>
                  <InputField label="Reference website" name="ref1" type="text" inputMode="url" placeholder="example.com" />
                  <InputField label="Another reference" name="ref2" type="text" inputMode="url" placeholder="another-site.com (optional)" />
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
                          padding: '18px 8px', textAlign: 'center', cursor: 'pointer',
                          transition: 'background 0.2s, color 0.2s',
                          borderRadius: '14px', border: '1px solid transparent',
                          background: active ? (isRush ? LOVE : INK) : SURFACE,
                        }}
                      >
                        <div style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.02em', color: active ? '#fff' : MUTED, marginBottom: '4px' }}>{n}</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: active ? '#fff' : INK }}>{lbl}</div>
                        <div style={{ fontSize: '12px', color: active ? 'rgba(255,255,255,0.7)' : MUTED, marginTop: '3px' }}>{time}</div>
                      </button>
                    )
                  })}
                </div>
                <TextArea name="timeline_notes" placeholder="Specific deadline or launch date..." />
              </Card>

              {/* 09 — Notes */}
              <Card title="Anything else?" num={8}>
                <textarea name="notes" placeholder="Previous agency experiences, must-have features, competitors, inspirations... Optional but always useful."
                  className="field"
                  style={{ minHeight: '120px', resize: 'vertical' }}
                />
              </Card>

              {/* ── Footnote ── */}
              <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.6, marginTop: '24px' }}>
                *All prices are starting points. Final quote confirmed after consultation.
              </p>

              {/* ── Error summary ── */}
              {Object.keys(errors).length > 0 && (
                <div style={{
                  marginTop: '24px', padding: '16px 20px',
                  background: LOVE_TINT, border: `1px solid ${LOVE}`, borderRadius: '14px',
                  fontSize: '14px', color: LOVE, lineHeight: 1.5,
                }}>
                  <strong style={{ fontWeight: 600 }}>Please complete the required fields:</strong>{' '}
                  {Object.keys(errors).map(n => FIELD_LABELS[n] || n).join(', ')}
                </div>
              )}

              {/* ── Review button ── */}
              <div style={{ margin: '24px 0 clamp(28px,4vw,40px)', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-dark">
                  Review Brief &rarr;
                </button>
              </div>

            </form>
          </div>

          {/* ═══ REVIEW PAGE ═══ */}
          {reviewing && (
            <div style={{
              position: 'fixed', inset: 0, zIndex: 1200,
              background: 'var(--bg)', overflowY: 'auto',
            }}>
              <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(48px,7vw,72px) 24px 120px' }}>

                <span className="eyebrow" style={{ marginBottom: '14px' }}>Almost there</span>
                <h1 className="display" style={{ fontSize: 'clamp(2rem,5vw,3rem)', marginBottom: '8px' }}>
                  Review your brief
                </h1>
                <p className="lede" style={{ marginBottom: '36px' }}>
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
                      {reviewData.projectAbout && <ReviewRow label="About" value={reviewData.projectAbout} />}
                      {reviewData.webFeats.length > 0 && <ReviewRow label="Features" value={reviewData.webFeats.join(', ')} />}
                      {isRedesign && <ReviewRow label="Redesign" value={vals('feat_redesign') || 'Yes'} />}
                    </>
                  )}
                  {wantsApp && (
                    <>
                      <ReviewRow label="Mobile App" value="Yes" />
                      {reviewData.appAbout && <ReviewRow label="About" value={reviewData.appAbout} />}
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
                    <p style={{ fontSize: '15px', color: INK, lineHeight: 1.6 }}>{reviewData.notes}</p>
                  </ReviewSection>
                )}

                {/* Estimate */}
                {hasPrice && (
                  <div style={{
                    background: LOVE_TINT, border: `1px solid ${LOVE}`,
                    borderRadius: '20px', padding: '24px 28px', marginTop: '24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: LOVE }}>Estimated budget*</div>
                    <div style={{ fontSize: '26px', fontWeight: 600, letterSpacing: '-0.02em', color: LOVE }}>{sym}{fmt(estimate)}</div>
                  </div>
                )}

                {/* Actions */}
                <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => { setReviewing(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                    &larr; Go back and edit
                  </button>
                  <button type="button" className="btn btn-dark" onClick={handleSubmit}>
                    Send Brief &rarr;
                  </button>
                </div>

                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.6, marginTop: '20px' }}>
                  *All prices are starting points. Final quote confirmed after consultation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Legal ── */}
        <div style={{ borderTop: `1px solid ${HAIRLINE}`, padding: '40px 24px', maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: MUTED }}>
              True Love Creative &mdash; a <a href="https://beatlabs.ae" target="_blank" rel="noopener noreferrer" style={{ color: LOVE, textDecoration: 'none' }}>beatLabs</a> brand
            </div>
            <div style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8 }}>
              BeatLabs FZE LLC &middot; License 53228 &middot; Ajman Media City Free Zone, UAE<br />
              <a href="mailto:info@beatlabs.ae" className="footer-link" style={{ color: MUTED, textDecoration: 'none' }}>info@beatlabs.ae</a> &middot; <a href="tel:+971585324519" className="footer-link" style={{ color: MUTED, textDecoration: 'none' }}>+971 58 532 4519</a>
            </div>
            <div style={{ fontSize: '12px', color: MUTED, marginTop: '4px' }}>
              &copy; {new Date().getFullYear()} BeatLabs FZE LLC. All rights reserved.
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <WhatsAppButton />
    </>
  )
}

/* ── Sub-components ──────────────────────────────── */

function Card({ title, num, subtitle, children, required, id, error, first }: { title: string; num: number; subtitle?: string; children: React.ReactNode; required?: boolean; id?: string; error?: string; first?: boolean }) {
  return (
    <section id={id} style={{
      padding: 'clamp(28px,4vw,40px) 0',
      borderTop: first ? 'none' : `1px solid ${HAIRLINE}`,
    }}>
      {num > 0 && <span className="eyebrow eyebrow-muted" style={{ fontSize: '11px', marginBottom: '8px' }}>{String(num).padStart(2, '0')}</span>}
      <h2 className="display" style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.7rem)' }}>
        {title}{required && <span style={{ color: LOVE }}> *</span>}
      </h2>
      {subtitle && <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.6, marginTop: '8px' }}>{subtitle}</p>}
      <div style={{ marginTop: '20px' }}>{children}</div>
      {error && <div style={{ fontSize: '14px', fontWeight: 500, color: LOVE, marginTop: '14px' }}>{error}</div>}
    </section>
  )
}

function InputField({ label, name, type = 'text', required, placeholder, inputMode, error, onClear }: {
  label: string; name: string; type?: string; required?: boolean; placeholder: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  error?: string; onClear?: (name: string) => void
}) {
  return (
    <div>
      <label className="field-label" htmlFor={`bf-${name}`}>
        {label}{required && <span style={{ color: LOVE }}> *</span>}
      </label>
      <input id={`bf-${name}`} className="field" type={type} name={name} required={required} placeholder={placeholder} inputMode={inputMode}
        style={error ? { borderColor: LOVE } : undefined}
        onInput={() => onClear?.(name)}
      />
      {error && <div style={{ fontSize: '13px', fontWeight: 500, color: LOVE, marginTop: '6px' }}>{error}</div>}
    </div>
  )
}

function TextArea({ name, placeholder }: { name: string; placeholder: string }) {
  return (
    <textarea name={name} placeholder={placeholder} className="field"
      style={{ minHeight: '60px', marginTop: '20px', resize: 'vertical' }}
    />
  )
}

function FeatureRow({ feat, active, onClick, sym, convert }: {
  feat: Feature; active: boolean; onClick: () => void
  sym: string; convert: (aed: number) => number
}) {
  return (
    <button type="button" onClick={onClick} style={rowStyle(active)}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '15px', fontWeight: 600, color: active ? '#fff' : INK }}>{feat.name}</div>
        <div style={{ fontSize: '13px', color: active ? 'rgba(255,255,255,0.7)' : MUTED, marginTop: '2px' }}>{feat.hint}</div>
      </div>
      <div style={{ marginLeft: '16px', flexShrink: 0 }}>
        {feat.price > 0 ? (
          <span style={{ fontSize: '13px', fontWeight: 600, color: active ? 'rgba(255,255,255,0.85)' : MUTED }}>+{sym}{fmt(convert(feat.price))}</span>
        ) : (
          <span style={{ fontSize: '12px', fontWeight: 600, color: active ? '#8FE3AE' : '#34c759' }}>Included</span>
        )}
      </div>
    </button>
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
              padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: `1px solid ${active ? INK : 'rgba(0,0,0,0.16)'}`,
              borderRadius: '980px', fontSize: '14px', fontWeight: 500,
              color: active ? '#fff' : INK,
              background: active ? INK : 'transparent',
              cursor: 'pointer', transition: 'background 0.2s, color 0.2s, border-color 0.2s', userSelect: 'none',
            }}
          >
            {item}
            {p != null && p > 0 && (
              <span style={{ fontSize: '13px', fontWeight: 600, color: active ? 'rgba(255,255,255,0.75)' : MUTED }}>
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
    <div className="card" style={{ borderRadius: '20px', padding: '24px 28px', marginBottom: '12px' }}>
      <h3 className="eyebrow eyebrow-muted" style={{ fontSize: '11px', marginBottom: '16px' }}>{title}</h3>
      {children}
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', padding: '8px 0', borderBottom: `1px solid ${HAIRLINE}` }}>
      <span style={{ fontSize: '14px', color: MUTED, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '14px', color: INK, fontWeight: 500, textAlign: 'right' }}>{value}</span>
    </div>
  )
}
