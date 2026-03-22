# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TRUE LOVE CREATIVE** — Static portfolio website for a creative design agency (Dubai/Spain). Vanilla HTML/CSS/JS, no framework, no build step. Deployed via GitHub Pages to `truelovecreative.es`.

## Local Development

No build process. Serve directly:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Image resizing (when adding new portfolio images):
```bash
sips -Z 1200 assets/img/portfolios/yourimage.jpg
```

## Architecture

### Pages
- `index.html` — Homepage: hero, services, portfolio gallery, graphic design, apps, footer
- `behind.html` — About/bio page for Javi Beat

### Assets
- `assets/css/styles.css` — All styles (2,090 lines), no preprocessor. Uses CSS custom properties as design tokens.
- `assets/js/script.js` — Interactions: overlay menu, smooth scroll, scroll-reveal, magnetic cursor effect
- `assets/js/i18n.js` — EN/ES translations (~100 keys). Language toggled via URL param `?lang=es` or UI button.
- `assets/fonts/Ibrand.otf` — Custom brand font

### Design System
- **Theme**: Dark (black/near-black) with red accent `#FF0000` and gold neon `#C9A96C`
- **Border radius**: 0px (sharp corners throughout)
- **Typography**: Syne (display), Montserrat (headings), Space Grotesk (body), Playfair Display, Alex Brush, Ibrand
- **Spacing**: Fluid via `clamp()` for responsive scaling
- **Animations**: CSS blob floats, scroll-reveal on `.reveal` elements, magnetic button effects in JS

### Internationalization
Add new translation keys to both `en` and `es` objects in `i18n.js`, then reference via `data-i18n="key"` in HTML.

### Performance Constraints
- All `<img>` tags must have explicit `width` and `height` attributes (LCP optimization)
- Google Fonts loaded via preload + print media trick (not render-blocking)
- Font Awesome loaded async via `media` attribute fallback
- Heavy GPU animations (blur-blobs) disabled on mobile via media query
- Prefer WebP images with JPG fallbacks

### SEO
- `sitemap.xml` and `robots.txt` — update sitemap when adding new pages
- Structured data in `<head>` (schema.org `CreativeAgency`)
- `hreflang` alternates for en/es in both `sitemap.xml` and page `<head>`
