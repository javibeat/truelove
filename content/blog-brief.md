# Blog update brief — True Love Creative (Nov 2026)

You are updating the blog of **True Love Creative**, an independent creative studio in Dubai (since 2015, a brand of BeatLabs FZE LLC). The site is being redesigned to present the studio as a **company for everyone**: brands, businesses, startups and anyone with an idea. It is NOT a studio "for DJs and artists" — that was a coincidence of the founder's network.

## Voice
- First person, written by **Javi Beat**, founder and creative director. Honest, direct, warm, specific. Short paragraphs. British/neutral English is fine.
- No AI-sounding filler: avoid "delve", "in today's fast-paced world", "unlock", "elevate", "game-changer", "seamless", "leverage", "navigate the landscape". No lists of buzzwords.
- Em dashes are fine but don't overuse them.

## Audience and examples
- Write for business owners and decision-makers in general. Use **varied examples**: restaurants, clinics, real estate, e-commerce shops, consultants, startups, gyms, hotels, schools, and only occasionally a creative/musician.
- Do NOT make every post about DJs, artists or musicians. The one post that is specifically about DJs (`why-every-dj-needs-a-website`) may stay musician-focused, but widen it so it also speaks to other performers and creative professionals.

## Facts and honesty (very important)
- Do not invent statistics, studies, client names, testimonials or awards. If you mention a trend, keep it general and true. No precise percentages unless they were already in the post AND are plausible; when in doubt, remove the number.
- **Timelines:** the studio no longer promises durations ("4–8 weeks" etc.). Timing "depends on the design and the scope" and is agreed after the first conversation. Remove or rephrase any duration promises about True Love's own work. Market-wide observations ("some agencies take months") are fine if vague.
- **Prices:** do not invent new True Love prices. You may keep the general *market* price ranges already used in the cost article (they are market context), but for True Love's own price point the user to the brief (`/brief`) for an estimate. The services page says web design starts "from AED 8,000"; do not contradict it. If the existing text contradicts it, rewrite that sentence and list it in your report.
- Technology: the studio builds custom sites by hand (no templates, no page builders). Don't claim specific tools unless already in the text.
- It is now late 2026. AI search (ChatGPT, Perplexity, Google AI Overviews, Claude) and AI tools are mainstream; keep that perspective current but not hype.

## Links (use root-relative paths, no trailing slash)
- Services: `/services/web-design`, `/services/branding`, `/services/graphic-design`, `/services/app-development`, `/services`
- Work: `/work` and case studies `/work/jessica-morari`, `/work/kiko-navarro`, `/work/javi-beat`, `/work/estrela-photo`, `/work/manuel-kevsax`, `/work/julio-cuba`, `/work/sergio-trumpet`
- Start a project (brief + live estimate): `/brief` · Contact: `/contact` · About: `/about`
- Other posts: `/blog/<slug>` for the slugs listed in content/posts.json (and the two new ones if relevant: `how-to-write-a-website-brief`, `accessible-design-is-good-business`).
- Each post should end with a short call to action linking to `/brief` (or `/contact`), then this exact closing paragraph:
  `<p><em>Written by <strong>Javi Beat</strong>, founder of True Love Creative, a creative studio in Dubai making websites, brands and apps since 2015.</em></p>`

## Format of each output file
Write one JSON file per post to `content/posts-draft/<slug>.json` with exactly these keys:
```json
{
  "slug": "…",                 // keep existing slugs unchanged
  "title": "…",                // the H1, may be refined
  "subtitle": "…",             // one sentence
  "category": "Web Design | Branding | Graphic Design | SEO | Strategy",
  "readTime": "N min read",    // ~230 words per minute
  "excerpt": "…",              // 1–2 sentences for cards, max ~230 characters
  "seoTitle": "… — True Love Creative",   // ≤ 70 characters in total
  "seoDescription": "…",      // 140–160 characters, plain, no quotes
  "coverLine1": "…",          // cover image headline, line 1 (UPPERCASE allowed, ≤ 26 characters)
  "coverLine2": "…",          // line 2, the accent phrase shown in red (≤ 26 characters)
  "html": "…"                  // the article body (see below)
}
```
- `html`: only these tags: `h2, h3, p, ul, ol, li, blockquote, strong, em, a, table, thead, tbody, tr, th, td`. No inline styles, no classes, no images, no h1. Valid, properly closed HTML in one JSON string.
- Length: 900–1,600 words for updated posts; similar for new posts.

## Report
When done, reply with a short list: for each slug, what you changed in one line, plus anything that needs Javi's decision (e.g. price contradictions).
