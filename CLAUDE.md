# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Next.js 16)
npm run build    # Production build
npm run lint     # ESLint (next/core-web-vitals + typescript)
```

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

- `/` — homepage (`app/page.tsx`)
- `/about` — about page
- `/services/[slug]` — service pages (web-design, graphic-design, branding, app-development)
- `/work/[slug]` — portfolio case studies (each is a standalone page, not dynamic route)
- `/blog` — blog index; `/blog/[slug]` — individual articles (also standalone pages)

### Blog

Blog post metadata is centralized in `app/blog/posts.ts`. The `posts` array and `getAdjacentPosts()` helper drive the blog index and prev/next navigation. Each article page imports from this file.

### SEO

- Structured data (JSON-LD) in `layout.tsx` and individual pages
- `app/robots.ts` and `app/sitemap.ts` for crawlers
- `public/llms.txt` for LLM crawlers
- Google Analytics (GA4) and Search Console verification in layout

### Domain

Production URL: `https://truelovecreative.es`
