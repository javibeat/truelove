# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev         # Start dev server (Next.js 16)
pnpm build       # Production build
pnpm lint        # ESLint (next/core-web-vitals + typescript)
```

Package manager: **pnpm v11+** (migrated from npm after the Mini Shai-Hulud supply-chain attack in May 2026; `minimum-release-age=1440` and ignored install scripts are enabled by default).

No test framework is configured.

## Architecture

**Next.js 16** app with React 19, Tailwind CSS v4, and Framer Motion. App Router only — no `pages/` directory.

### Design System: "The Gazette"

The site mimics a vintage newspaper aesthetic. Every page uses the `GazettePage` wrapper component (`app/components/GazettePage.tsx`) which provides the shared masthead, nav, and section header. This is a `'use client'` component.

**Fonts** (loaded in `layout.tsx` as CSS variables):
- `--playfair` (Playfair Display) — headlines
- `--fell` (IM Fell English) — body text (also the `body` default)
- `--elite` (Special Elite) — typewriter accents, labels, stamps
- `Ibrand` — custom font loaded from `public/fonts/Ibrand.otf`, referenced via `IB` constant

**Design tokens** live in two places:
- CSS custom properties in `app/globals.css` (`--paper`, `--ink`, `--red`, `--fade`, `--rule`)
- JS constants in `app/lib/constants.ts` (`P`, `E`, `F`, `IB`, `INK`, `RED`, `FADE`, `PAPER`, `RULE`)

These must stay in sync. Use the JS constants when writing inline styles in components.

### Styling Approach

Pages use **inline styles** with the JS constants from `app/lib/constants.ts`, not Tailwind utility classes. Global CSS classes (`globals.css`) exist for newspaper-specific patterns: `.rule-h`, `.rule-h2`, `.rule-thin`, `.cols-2`, `.cols-3`, `.dropcap`, `.hp-photo`, `.stamp`, `.work-row`, `.marquee`, `.reveal`.

### Routes

Services, work, and blog posts are each **standalone folders with their own `page.tsx`** — there are no `[slug]` dynamic routes. Adding a new service/case-study/post means creating a new folder under the relevant parent.

- `/` — homepage (`app/page.tsx`)
- `/about` — about page
- `/brief` — client intake form (submits to Formspree)
- `/services/*` — service pages: `web-design`, `graphic-design`, `branding`, `app-development`
- `/work/*` — portfolio case studies (`kiko-navarro`, `javi-beat`, `jessica-morari`, `julio-cuba`, `manuel-kevsax`, `sergio-trumpet`, `estrela-photo`)
- `/blog` — blog index; each post lives at `/blog/<slug>/` as its own folder
- `/api/subscribe` — MailerLite newsletter signup (`app/api/subscribe/route.ts`); requires `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` env vars

### Blog

Blog post metadata is centralized in `app/blog/posts.ts`. The `posts` array and `getAdjacentPosts()` helper drive the blog index and prev/next navigation. Each article page imports from this file.

### SEO

- Structured data (JSON-LD) in `layout.tsx` and individual pages
- `app/robots.ts` and `app/sitemap.ts` for crawlers
- `public/llms.txt` for LLM crawlers
- Google Analytics (GA4) and Search Console verification in layout

### Security headers

`next.config.ts` sets a strict CSP plus `X-Frame-Options: DENY`, nosniff, and a restrictive `Permissions-Policy`. The CSP allowlists `www.googletagmanager.com` / `www.google-analytics.com` (scripts, connect), `fonts.googleapis.com` / `fonts.gstatic.com` (styles/fonts), and `formspree.io` (connect, form-action). Any new third-party script, font host, form endpoint, or image source needs to be added here or it will be blocked at runtime.

### Domain

Production URL: `https://truelovecreative.es`
