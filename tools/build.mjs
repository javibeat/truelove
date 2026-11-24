/* Static site builder for the True Love Creative redesign.
   Reads content/*.json and writes every page as plain HTML (readable by search engines and AI without
   JavaScript), plus sitemap.xml, robots.txt, llms.txt, 404.html and vercel.json (security headers).
   Run from the project folder:  node tools/build.mjs        Then check:  node tools/check.mjs */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = f => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const SERVICES = read('content/services.json');
const POSTS = read('content/posts.json');
const WORK = read('content/work.json');
const META = read('content/meta.json');          // titles and descriptions of the current live pages
const SITE = 'https://truelovecreative.es';
const FORMSPREE = 'https://formspree.io/f/mwvwnkow';   // same endpoint as the live brief form
const GOOGLE_VERIFY = 'LbyS8xzEGumgwNpp4KhHHcvIM8kX2uyQ3__hqyvMjbs';
const TODAY = new Date().toISOString().slice(0, 10);

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const host = u => u.replace(/^https?:\/\//, '').replace(/\/$/, '');
const iso = d => { const t = new Date(d + ' UTC'); return isNaN(t) ? TODAY : t.toISOString().slice(0, 10); };

/* Services: order, short copy and prices (timings are agreed with each client, so they are not shown) */
const SVC = [
  { slug: 'web-design', name: 'Web Design', desc: 'Fast, precise websites built by hand. No templates, no page builders.', price: 'From AED 8,000' },
  { slug: 'branding', name: 'Brand Identity', desc: 'Logo, type, colour and voice: the kit a brand needs to be recognised at a glance.', price: 'After a short call' },
  { slug: 'graphic-design', name: 'Graphic Design', desc: 'Covers, posters, flyers and social systems with intention behind every pixel.', price: 'Per piece' },
  { slug: 'app-development', name: 'App Development', desc: 'iOS, Android and web apps, from the first sketch to the store.', price: 'Once scoped' },
];
const GRAY = new Set(['julio', 'manuel']);   // logos with filled boxes: grey, not a flat silhouette
const INK = new Set(['estrela']);            // white script logo: stays black on hover

/* ── Structured data (schema.org) ── */
const ORG = {
  '@type': 'ProfessionalService', '@id': `${SITE}/#studio`, name: 'True Love Creative', url: SITE,
  logo: `${SITE}/img/brand/favicon.png`, image: `${SITE}/img/meta/og-default.png`,
  description: 'Creative studio in Dubai for brands, businesses and anyone with an idea: web design, brand identity, graphic design and app development since 2015.',
  foundingDate: '2015', email: 'info@truelovecreative.es', telephone: '+971585324519',
  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
  areaServed: 'Worldwide', knowsLanguage: ['English', 'Spanish', 'Arabic'],
  founder: { '@type': 'Person', name: 'Javi Beat', jobTitle: 'Creative Director & Founder' },
  parentOrganization: { '@type': 'Organization', name: 'BeatLabs FZE LLC', url: 'https://beatlabs.ae' },
  serviceType: ['Web Design', 'Brand Identity', 'Graphic Design', 'App Development', 'Creative Direction'],
  sameAs: ['https://www.instagram.com/truelove.creative'],
};
const crumbs = list => ({ '@type': 'BreadcrumbList', itemListElement: list.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + url })) });

/* ── Layout ── */
const TABS = [
  ['top', '/', 'Home', '<path d="M4 10.5L12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-5.5H9v5.5H5.5A1.5 1.5 0 0 1 4 19z"/>'],
  ['work', '/work', 'Work', '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>'],
  ['services', '/services', 'Services', '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>'],
  ['studio', '/about', 'Studio', '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="16.8" cy="9.5" r="2.5"/><path d="M15.6 14.6c2.6-.4 4.5 1.2 5 4.4"/>'],
  ['blog', '/blog', 'Blog', '<path d="M5 4.5h10.5L19 8v11.5H5z"/><path d="M15 4.5V8h4M8.5 12h7M8.5 15.5h7"/>'],
  ['contact', '/contact', 'Contact', '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V17A2.5 2.5 0 0 1 4 14.5z"/>'],
];
const dock = () => `<div class="dock" id="dock">
  <nav class="bar" id="bar" aria-label="Main">
${TABS.map(([id, href, label, icon]) => `    <a class="tab" href="${href}" data-id="${id}"><svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>${label}</a>`).join('\n')}
  </nav>
  <div id="sw" role="button" tabindex="0"></div>
</div>`;

const footer = () => `<footer class="foot">
  <div class="wrap">
    <div><svg class="mark-s" role="img" aria-label="True Love Creative"></svg><p style="margin-top:14px;max-width:34ch">A creative studio for brands, businesses and anyone with an idea. Dubai, since 2015.</p></div>
    <nav aria-label="Studio"><h2 class="fh">Studio</h2><ul><li><a href="/work">Work</a></li><li><a href="/services">Services</a></li><li><a href="/about">About</a></li><li><a href="/blog">Blog</a></li></ul></nav>
    <nav aria-label="Services"><h2 class="fh">Services</h2><ul>${SVC.map(s => `<li><a href="/services/${s.slug}">${s.name}</a></li>`).join('')}</ul></nav>
    <div><h2 class="fh">Contact</h2><ul><li><a href="mailto:info@truelovecreative.es">info@truelovecreative.es</a></li><li><a href="https://wa.me/971585324519" target="_blank" rel="noopener noreferrer">WhatsApp +971 58 532 4519</a></li><li><a href="https://www.instagram.com/truelove.creative" target="_blank" rel="noopener noreferrer">Instagram</a></li><li><a href="/contact">Contact</a></li><li><a href="/brief">Start a project</a></li></ul></div>
    <p class="legal">True Love Creative is a brand of <a href="https://beatlabs.ae" target="_blank" rel="noopener noreferrer">beatLabs</a> · BeatLabs FZE LLC · License 53228 · Ajman Media City Free Zone, UAE · © 2015–2026</p>
  </div>
</footer>`;

const SITEMAP = [];
const built = [];
/**
 * Writes one page. url = canonical path ('' for home). Everything a search engine or an AI reads is in the HTML.
 * og = { image, type, alt }, ld = extra JSON-LD nodes, noindex for pages that must stay out of search.
 */
function page({ url, file, title, description, active, body, og = {}, ld = [], css = [], noindex = false, priority = .7, changefreq = 'monthly', lastmod = TODAY, pageId = '' }) {
  const canonical = SITE + (url || '/');
  const image = SITE + (og.image ?? '/img/meta/og-default.png');
  const graph = { '@context': 'https://schema.org', '@graph': [ORG, ...ld] };
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<script src="/js/boot.js"></script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
<meta name="author" content="True Love Creative">
${url === '' ? `<meta name="google-site-verification" content="${GOOGLE_VERIFY}">\n` : ''}<meta property="og:type" content="${og.type ?? 'website'}">
<meta property="og:site_name" content="True Love Creative">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta property="og:image:alt" content="${esc(og.alt ?? title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/img/brand/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt">
<link rel="stylesheet" href="/css/core.css">
<link rel="stylesheet" href="/css/pages.css">
${css.map(c => `<link rel="stylesheet" href="${c}">`).join('\n')}
<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>
<script src="/js/analytics.js" defer></script>
<script type="module" src="/js/page.js"></script>
<!-- Generated by tools/build.mjs: edit content/*.json or the builder, not this file. -->
</head>
<body data-active="${active}"${pageId ? ` data-page="${pageId}"` : ''}>
<a class="skip" href="#main">Skip to content</a>
${dock()}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
  const out = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  if (!noindex) SITEMAP.push({ loc: canonical, lastmod, changefreq, priority });
  built.push(file);
}

const head = (kicker, h1, sub, crumb) => `<header class="wrap page-head">
  ${crumb ? `<nav class="crumb" aria-label="Breadcrumb">${crumb}</nav>` : `<p class="kicker">${esc(kicker)}</p>`}
  <h1>${esc(h1)}</h1>
  ${sub ? `<p class="sub">${esc(sub)}</p>` : ''}
</header>`;
const ctaBand = (h = 'Have something in mind?', p = 'Tell us what you need. You will get a real answer, with timing and price, within 24 hours.') =>
  `<section class="wrap block" aria-label="Start a project"><div class="cta-band sq"><div><h2>${esc(h)}</h2><p>${esc(p)}</p></div><a class="btn white" href="/brief">Start a project ${arrow}</a></div></section>`;
const svcCards = (tag = 'h3') => `<div class="svc-grid">${SVC.map((s, i) => `
  <a class="card svc" href="/services/${s.slug}"><span class="num">${String(i + 1).padStart(2, '0')}</span><${tag} class="svc-t">${s.name}</${tag}><p>${esc(s.desc)}</p>
    <span class="meta"><span>Price</span><span><b>${esc(s.price)}</b></span></span>
    <span class="link">Explore ${arrow}</span></a>`).join('')}</div>`;
const caseCard = w => `<a class="case" id="case-${w.id}" href="/work/${w.slug}" style="--acc:${w.accent};--tile:${w.tile}">
    <span class="window" aria-hidden="true">
      <span class="page"><img src="/img/full/${w.id}-1000.webp" srcset="/img/full/${w.id}-1000.webp 1000w, /img/full/${w.id}.webp 1600w" sizes="(width < 700px) 92vw, (width < 1100px) 45vw, 22vw" alt="" width="1000" loading="lazy" decoding="async"></span>
      <span class="logo-face${GRAY.has(w.id) ? ' gray' : ''}"><img src="/${w.logo}" alt="" loading="lazy" decoding="async" draggable="false"></span>
    </span>
    <span class="case-top"><span class="case-name">${esc(w.name)}</span><span class="case-meta">${esc(w.year)}</span></span>
    <span class="case-idea">${esc(w.services)}</span>
  </a>`;
const invite = () => `<a class="case invite" href="/brief">
    <span class="window invite-in"><span class="kicker">Your project</span><span class="invite-t">Could be the next one here.</span></span>
    <span class="case-top"><span class="case-name">Start a project</span><span class="case-meta">${arrow}</span></span>
    <span class="case-idea">Brief and estimate in 3 minutes</span>
  </a>`;
const casesGrid = () => `<div class="cases">${WORK.map(caseCard).join('')}${invite()}</div>`;
const steps = list => `<div class="steps-grid${list.length === 5 ? ' n5' : ''}">${list.map((s, i) => `<div class="card step"><span class="num">${esc(s.num ?? String(i + 1).padStart(2, '0'))}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join('')}</div>`;
const items = list => `<div class="items">${list.map(s => `<div class="card"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join('')}</div>`;
const chips = list => `<ul class="chips">${list.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`;
const faq = list => `<div class="faq">${list.map(f => `<details class="sq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;
const block = (h, inner) => `<section class="wrap block"><div class="sec-head"><h2>${esc(h)}</h2></div>${inner}</section>`;
/* Home section head: number + name on a hairline, then the title and an optional aside (text or link) */
const secHead = (n, kicker, id, title, aside = '') => `<header class="sec-head home"><p class="sec-k"><span>${n}</span>${esc(kicker)}</p>
    <div class="sec-row"><h2 id="${id}">${esc(title)}</h2>${aside}</div></header>`;
const meta = p => META[p] ?? {};
const newsletterBox = () => `<section class="wrap block" aria-labelledby="nl-h"><div class="card nl-card">
  <div><h2 id="nl-h">Design insights, straight to your inbox.</h2><p>No spam. No fluff. Just honest thoughts on design, branding and building things that last. Unsubscribe anytime.</p></div>
  <form class="nl" novalidate>
    <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <label class="vh" for="nl-email">Email address</label>
    <input id="nl-email" type="email" name="email" required maxlength="254" autocomplete="email" placeholder="your@email.com">
    <button class="btn" type="submit">Subscribe</button>
    <p class="nl-msg" role="status" hidden></p>
  </form>
</div></section>`;
// blog images without the old grey paper frame baked into them, so the squircle corners show
const hasCover = p => fs.existsSync(path.join(ROOT, `img/blog/covers/${p.slug}.jpg`));
const postImg = p => hasCover(p) ? `/img/blog/covers/${p.slug}.jpg` : '/' + p.image.replace('img/blog/', 'img/blog/c/');
const postDims = p => hasCover(p) ? `srcset="/img/blog/covers/${p.slug}.jpg 1600w, /img/blog/covers/${p.slug}@2x.jpg 3200w" sizes="(width < 700px) 92vw, (width < 1100px) 46vw, 30vw" width="1600" height="800"` : 'width="1548" height="748"';
const postCards = (list, tag = 'h3') => `<div class="posts">${list.map(p => `
  <a class="card post" href="/blog/${p.slug}"><img class="sq" data-sq=".5" src="${postImg(p)}" alt="" ${postDims(p)} loading="lazy" decoding="async"><span class="pm">${esc(p.category)} · <time datetime="${iso(p.date)}">${esc(p.date)}</time> · ${esc(p.readTime)}</span><${tag} class="post-t">${esc(p.title)}</${tag}><p>${esc(p.excerpt)}</p><span class="link">Continue reading ${arrow}</span></a>`).join('')}</div>`;

/* ── Home ── */
page({
  url: '', file: 'index.html', active: 'top', pageId: 'home', priority: 1, css: ['/css/home.css'],
  title: 'True Love Creative — Web & Graphic Design Studio · Dubai',
  description: 'True Love Creative is a creative studio in Dubai for brands, businesses and anyone with an idea: web design, brand identity, graphic design and apps since 2015.',
  ld: [{ '@type': 'WebSite', '@id': `${SITE}/#website`, name: 'True Love Creative', url: SITE, publisher: { '@id': `${SITE}/#studio` }, inLanguage: 'en' }],
  body: `<section class="hero" id="top" aria-labelledby="hero-h">
    <canvas aria-hidden="true"></canvas>
    <div class="hero-in">
      <h1 id="hero-h"><span class="vh">True Love Creative, creative studio in Dubai</span><svg class="mark" aria-hidden="true"></svg></h1>
      <div class="hero-foot">
        <p>A creative studio for brands, businesses and anyone with an idea. Websites, identities, graphic design and apps, made in Dubai since 2015.</p>
        <div class="ctas">
          <a class="cta" href="/brief">Start a project ${arrow}</a>
          <a class="cta ghost" href="/work" data-go="work">See our work</a>
        </div>
      </div>
    </div>
  </section>
  <section class="hsec" id="work" aria-labelledby="work-h"><div class="wrap">
    ${secHead('01', 'Selected work', 'work-h', 'Made with true love.', `<a class="link" href="/work">All work ${arrow}</a>`)}
    ${casesGrid()}
  </div></section>
  <section class="hsec band" id="services" aria-labelledby="svc-h"><div class="wrap">
    ${secHead('02', 'Services', 'svc-h', 'Four disciplines, one standard.', `<a class="link" href="/services">All services ${arrow}</a>`)}
    ${svcCards()}
  </div></section>
  <section class="hsec" id="studio" aria-labelledby="studio-h"><div class="wrap">
    ${secHead('03', 'Studio', 'studio-h', 'Fewer clients, deeper work.', `<a class="link" href="/about">About the studio ${arrow}</a>`)}
    <div class="intro">
      <div class="card"><p class="lede">Design is not decoration. It is decision.</p><p class="body">An independent studio in Dubai since 2015. Each project gets the full attention of the studio, from the first idea to launch, for businesses, startups, brands and people with something to say.</p></div>
      <div class="card"><dl class="facts"><div><dt>Founded</dt><dd>2015</dd></div><div><dt>Based in</dt><dd>Dubai, UAE</dd></div><div><dt>Serving</dt><dd>Worldwide</dd></div><div><dt>Languages</dt><dd>EN · ES · AR</dd></div></dl></div>
    </div>
  </div></section>
  <section class="hsec band" id="blog" aria-labelledby="blog-h"><div class="wrap">
    ${secHead('04', 'Blog', 'blog-h', 'Notes from the studio.', `<a class="link" href="/blog">All articles ${arrow}</a>`)}
    ${postCards(POSTS.slice(0, 3))}
  </div></section>
  <section class="hsec" id="contact" aria-labelledby="contact-h"><div class="wrap">
    ${secHead('05', 'Contact', 'contact-h', 'Have something in mind?', `<a class="link" href="/contact">Contact ${arrow}</a>`)}
    <div class="cta-band sq"><div><h3 class="cta-t">Tell us what you need.</h3><p>You will get a real answer, with timing and price, within 24 hours.</p></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn white" href="/brief">Start a project ${arrow}</a><a class="btn white outline" href="https://wa.me/971585324519" target="_blank" rel="noopener noreferrer">WhatsApp</a></div></div>
  </div></section>`,
});

/* ── /services ── */
page({
  url: '/services', file: 'services/index.html', active: 'services', priority: .9,
  title: meta('/services').title, description: meta('/services').description,
  ld: [crumbs([['Home', '/'], ['Services', '/services']]), { '@type': 'ItemList', itemListElement: SVC.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: `${SITE}/services/${s.slug}` })) }],
  body: `${head('Services', 'Four disciplines, one standard.', 'Work made by hand, made to last and made to be remembered. One studio from the first idea to launch.')}
<section class="wrap block" aria-label="Our services">${svcCards('h2')}</section>
${ctaBand()}`,
});

/* ── /services/<slug> ── */
const subtitleFix = { 'graphic-design': 'Vinyl covers, posters, flyers and visual systems for brands and artists who refuse to blend in.' };
for (const s of SVC) {
  const d = SERVICES[s.slug], url = `/services/${s.slug}`, m = meta(url);
  const stepList = d.steps ?? d.process ?? d.phases;
  const aside = d.stack
    ? `<div class="card aside"><dl class="facts">${d.stack.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><p class="score">100<span>/</span>100</p><p class="muted" style="font-size:14px">Lighthouse score. We treat anything below perfect as a bug.</p></div>`
    : `<div class="card aside"><p class="quote">${esc(d.aside[0])}</p>${d.aside[1] ? `<p>${esc(d.aside[1])}</p>` : ''}</div>`;
  let sections = '';
  if (d.gallery) sections += block('Ink, sleeves & artwork.', `<div class="gallery">${d.gallery.map(g => `<figure class="${g.span === 'b3' ? 'b3' : ''}"><img class="sq" data-sq=".6" src="${g.src}" alt="${esc(g.caption)}" loading="lazy" decoding="async"><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div>`);
  if (d.included) sections += block('What’s included.', items(d.included));
  if (d.services) sections += block('What we create.', items(d.services));
  sections += block(d.heads[0].replace(/\.?$/, '.'), steps(stepList));
  if (d.buildItems) sections += block(d.heads[1], chips(d.buildItems));
  if (d.capabilities) sections += block(d.heads[1], chips(d.capabilities));
  if (d.faqs.length) sections += block(d.heads[d.heads.length - 1], faq(d.faqs));
  page({
    url, file: `services/${s.slug}/index.html`, active: 'services', priority: .9,
    title: m.title ?? `${s.name} — True Love Creative`, description: m.description ?? s.desc,
    og: d.gallery ? { image: '/img/graphic/el-silencio.jpg', alt: 'El Silencio vinyl cover' } : {},
    ld: [
      crumbs([['Home', '/'], ['Services', '/services'], [s.name, url]]),
      { '@type': 'Service', name: s.name, serviceType: s.name, description: d.lede, provider: { '@id': `${SITE}/#studio` }, areaServed: 'Worldwide', url: SITE + url },
      ...(d.faqs.length ? [{ '@type': 'FAQPage', mainEntity: d.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
    ],
    body: `${head('', s.name, subtitleFix[s.slug] ?? d.subtitle, `<a href="/services">Services</a> / ${s.name}`)}
<section class="wrap block" aria-label="Overview"><div class="intro"><div class="card"><p class="lede">${esc(d.lede)}</p><p class="body">${esc(d.body)}</p>
  <p class="muted price-line">Price <b>${esc(s.price)}</b></p></div>${aside}</div></section>
${sections}
${ctaBand(`Let’s talk about your ${s.name.toLowerCase()}.`)}`,
  });
}

/* ── /work ── */
page({
  url: '/work', file: 'work/index.html', active: 'work', priority: .9,
  title: meta('/work').title, description: meta('/work').description,
  ld: [crumbs([['Home', '/'], ['Work', '/work']]), { '@type': 'CollectionPage', name: 'Selected work', url: `${SITE}/work`, hasPart: WORK.map(w => ({ '@type': 'CreativeWork', name: `${w.name} — case study`, url: `${SITE}/work/${w.slug}` })) }],
  body: `${head('Selected work', 'Made with true love.', 'Websites, identities and digital products for clients of every kind. Hover a project to see the site move.')}
<section class="wrap block" aria-label="Projects">${casesGrid()}</section>
${ctaBand('Your project could be next.')}`,
});

/* ── /work/<slug> ── */
WORK.forEach((w, i) => {
  const prev = WORK[(i - 1 + WORK.length) % WORK.length], next = WORK[(i + 1) % WORK.length];
  const url = `/work/${w.slug}`, m = meta(url);
  page({
    url, file: `work/${w.slug}/index.html`, active: 'work', priority: .7, changefreq: 'yearly',
    title: m.title ?? `${w.name} — True Love Creative`, description: m.description ?? w.subtitle,
    og: { image: `/img/og/${w.id}.jpg`, type: 'article', alt: `${w.name} website by True Love Creative` },
    ld: [crumbs([['Home', '/'], ['Work', '/work'], [w.name, url]]), {
      '@type': 'CreativeWork', name: `${w.name} — case study`, description: w.subtitle, url: SITE + url, image: `${SITE}/img/og/${w.id}.jpg`,
      dateCreated: String(w.year), author: { '@id': `${SITE}/#studio` }, about: { '@type': 'Thing', name: w.name, url: w.live },
      genre: w.services, keywords: [w.services, w.industry].join(', '),
    }],
    body: `${head('', w.name, w.subtitle, `<a href="/work">Work</a> / ${esc(w.name)}`)}
<section class="wrap block" aria-label="Project"><div class="case-hero" style="--acc:${w.accent}">
  <a class="window sq" data-sq=".5" href="${w.live}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(host(w.live))} in a new tab">
    <span class="chrome"><i style="background:${w.accent}"></i><i></i><i></i><span>${esc(host(w.live))}</span></span>
    <span class="page"><img src="/img/full/${w.id}.webp" srcset="/img/full/${w.id}-1000.webp 1000w, /img/full/${w.id}.webp 1600w" sizes="(width < 1100px) 92vw, 55vw" alt="${esc(w.name)} website, full page" width="1600" decoding="async" style="transition-duration:${9 + i}s"></span>
  </a>
  <div class="card"><dl class="facts">
    <div><dt>Client</dt><dd>${esc(w.name)}</dd></div><div><dt>Year</dt><dd>${esc(w.year)}</dd></div>
    <div><dt>Services</dt><dd>${esc(w.services)}</dd></div><div><dt>Industry</dt><dd>${esc(w.industry)}</dd></div><div><dt>Built with</dt><dd>${esc(w.tech)}</dd></div>
  </dl><p style="margin-top:22px"><a class="btn" href="${w.live}" target="_blank" rel="noopener noreferrer">Visit ${esc(host(w.live))} ${arrow}</a></p></div>
</div></section>
<section class="wrap block" aria-label="Story"><div class="story3">
  <div class="card"><h2>The challenge</h2><p>${esc(w.challenge)}</p></div>
  <div class="card"><h2>Our approach</h2><p>${esc(w.approach)}</p></div>
  <div class="card"><h2>The result</h2><p>${esc(w.result)}</p></div>
</div></section>
<section class="wrap block" aria-label="Client’s words"><figure class="card" style="padding:clamp(28px,4vw,56px)"><blockquote class="case-quote">“${esc(w.quote)}”</blockquote><figcaption>— ${esc(w.by)}</figcaption></figure></section>
<section class="wrap block"><nav class="next-prev" aria-label="More work">
  <a class="card" href="/work/${prev.slug}"><span>← Previous</span><b>${esc(prev.name)}</b></a>
  <a class="card" href="/work/${next.slug}"><span>Next →</span><b>${esc(next.name)}</b></a>
</nav></section>
${ctaBand()}`,
  });
});

/* ── /about ── */
page({
  url: '/about', file: 'about/index.html', active: 'studio', priority: .8,
  title: meta('/about').title, description: meta('/about').description,
  ld: [crumbs([['Home', '/'], ['Studio', '/about']]), { '@type': 'AboutPage', name: 'About True Love Creative', url: `${SITE}/about`, mainEntity: { '@id': `${SITE}/#studio` } }],
  body: `${head('Studio', 'Design is not decoration. It is decision.', 'An independent creative studio, born in Dubai in 2015. A decade of making digital work that refuses to be ordinary.')}
<section class="wrap block" aria-label="How we work"><div class="intro">
  <div class="card"><h2 class="lede">Fewer clients, deeper work.</h2>
    <p class="body">We don’t run an assembly line. Each project gets the full attention of the studio, from concept to launch, because that is the only way to make work that truly matters.</p>
    <p class="body">Our clients are businesses, startups, brands and people with something to say, who understand that their digital presence is not a cost. It is their most powerful asset. We build things that last, that perform and that make people stop scrolling.</p></div>
  <div class="card"><dl class="facts">
    <div><dt>Founded</dt><dd>2015</dd></div><div><dt>Based in</dt><dd>Dubai, UAE</dd></div><div><dt>Serving</dt><dd>Worldwide</dd></div>
    <div><dt>Languages</dt><dd>EN · ES · AR</dd></div><div><dt>Clients served</dt><dd>30+</dd></div><div><dt>Part of</dt><dd><a href="https://beatlabs.ae" target="_blank" rel="noopener noreferrer">beatLabs</a></dd></div>
  </dl></div>
</div></section>
${block('Four steps. No shortcuts.', steps([
  { title: 'Discovery', text: 'We listen. We research your industry, your competitors and your audience before sketching a single line.' },
  { title: 'Concept', text: 'Strategic direction and visual exploration. We present ideas, not templates.' },
  { title: 'Craft', text: 'Meticulous execution in code and pixel. Every detail serves a purpose.' },
  { title: 'Launch', text: 'Deployment, testing and handover. We stay until everything is perfect, and beyond.' },
]))}
${block('Who is behind it.', `<div class="card"><p class="body" style="margin:0;max-width:70ch">The studio was founded by <b style="color:var(--fg)">Javi Beat</b>, designer and creative director, in Dubai for more than ten years. Rooted in European design and sharpened by the ambition of the Gulf, the studio’s voice is clean, powerful and intentional. Every project is personal. Every pixel, considered.</p></div>`)}
${ctaBand('Let’s make something together.')}`,
});

/* ── /blog ── */
page({
  url: '/blog', file: 'blog/index.html', active: 'blog', priority: .8, changefreq: 'weekly',
  title: meta('/blog').title, description: meta('/blog').description,
  ld: [crumbs([['Home', '/'], ['Blog', '/blog']]), { '@type': 'Blog', name: 'True Love Creative — Blog', url: `${SITE}/blog`, publisher: { '@id': `${SITE}/#studio` },
    blogPost: POSTS.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE}/blog/${p.slug}`, datePublished: iso(p.date) })) }],
  body: `${head('Blog', 'Notes from the studio.', 'Straight answers on websites, branding, AI and what actually brings clients. Written from Dubai.')}
<section class="wrap block" aria-label="Articles">${postCards(POSTS, 'h2')}</section>
${newsletterBox()}`,
});

/* ── /blog/<slug> ── */
POSTS.forEach((p, i) => {
  const url = `/blog/${p.slug}`, m = meta(url);
  const older = POSTS[(i + 1) % POSTS.length], newer = POSTS[(i - 1 + POSTS.length) % POSTS.length];
  const html = p.html.split('<h2>Design insights')[0]
    .replace(/href="\/#contact"/g, 'href="/brief"')
    .replace(/<a href="(https?:\/\/[^"]+)"/g, (all, u) => u.startsWith(SITE) ? `<a href="${u.slice(SITE.length) || '/'}"` : `<a href="${u}" target="_blank" rel="noopener noreferrer"`);
  page({
    url, file: `blog/${p.slug}/index.html`, active: 'blog', priority: .8, changefreq: 'yearly', lastmod: iso(p.updated ?? p.date),
    title: p.seoTitle ?? m.title ?? `${p.title} — True Love Creative`, description: p.seoDescription ?? m.description ?? p.excerpt,
    og: { image: hasCover(p) ? postImg(p) : `/${p.image}`, type: 'article', alt: p.title },
    ld: [crumbs([['Home', '/'], ['Blog', '/blog'], [p.title, url]]), {
      '@type': 'BlogPosting', headline: p.title, alternativeHeadline: p.subtitle, description: p.excerpt, image: SITE + (hasCover(p) ? postImg(p) : `/${p.image}`),
      datePublished: iso(p.date), dateModified: iso(p.updated ?? p.date), articleSection: p.category, inLanguage: 'en',
      author: { '@type': 'Person', name: 'Javi Beat', url: `${SITE}/about` }, publisher: { '@id': `${SITE}/#studio` },
      mainEntityOfPage: SITE + url,
    }],
    body: `<header class="wrap page-head article"><nav class="crumb" aria-label="Breadcrumb"><a href="/blog">Blog</a> / ${esc(p.category)} · <time datetime="${iso(p.date)}">${esc(p.date)}</time>${p.updated ? ` · Updated <time datetime="${iso(p.updated)}">${esc(p.updated)}</time>` : ''} · ${esc(p.readTime)}</nav><h1 style="font-size:clamp(36px,4.6vw,64px)">${esc(p.title)}</h1><p class="sub">${esc(p.subtitle)}</p></header>
<div class="wrap"><figure class="article-hero sq" data-sq=".7"><img class="sq" data-sq=".7" src="${postImg(p)}" alt="${esc(p.title)}" ${postDims(p).replace(/sizes="[^"]*"/, 'sizes="(width < 1180px) 94vw, 1100px"')} decoding="async"></figure></div>
<article class="wrap"><div class="article prose">${html}</div></article>
<div style="margin-top:clamp(48px,6vw,90px)">${newsletterBox()}</div>
<section class="wrap block article-more" style="margin-top:0"><nav class="next-prev" aria-label="More articles">
  <a class="card" href="/blog/${older.slug}" rel="prev"><span>← Previous article</span><b>${esc(older.title)}</b></a>
  <a class="card" href="/blog/${newer.slug}" rel="next"><span>Next article →</span><b>${esc(newer.title)}</b></a>
</nav></section>
${ctaBand()}`,
  });
});

/* ── /brief: the client's project brief (interactive, js/brief.js; data from content/brief.json) ── */
fs.writeFileSync(path.join(ROOT, 'js/brief-data.js'), `/* Generated by tools/build.mjs from content/brief.json. */\nexport const DATA = ${JSON.stringify(read('content/brief.json'))};\n`);
page({
  url: '/brief', file: 'brief/index.html', active: 'contact', priority: .8,
  title: meta('/brief').title, description: meta('/brief').description,
  ld: [crumbs([['Home', '/'], ['Start a project', '/brief']])],
  body: `${head('Project brief', 'Start a project.', 'Tell us what you need. Takes about 3 minutes. Prices are approximate and adjusted to your needs after our first conversation. Currency conversions are indicative; the final rate applies at the time of payment, but the total is the same regardless of currency.')}
<section class="wrap brief-wrap" aria-label="Project brief" id="brief-app">
  <noscript><div class="card"><p>The brief needs JavaScript. You can also write to <a href="mailto:info@truelovecreative.es">info@truelovecreative.es</a> or WhatsApp <a href="https://wa.me/971585324519">+971 58 532 4519</a>.</p></div></noscript>
</section>
<section class="wrap brief-wrap block" aria-label="Company details"><p class="b-foot" style="margin-top:28px">True Love Creative — a <a href="https://beatlabs.ae" target="_blank" rel="noopener noreferrer">beatLabs</a> brand · BeatLabs FZE LLC · License 53228 · Ajman Media City Free Zone, UAE · <a href="mailto:info@beatlabs.ae">info@beatlabs.ae</a></p></section>`,
});

/* ── /contact: quick message + every way to reach the studio ── */
page({
  url: '/contact', file: 'contact/index.html', active: 'contact', priority: .8,
  title: meta('/contact').title, description: meta('/contact').description,
  ld: [crumbs([['Home', '/'], ['Contact', '/contact']]), { '@type': 'ContactPage', name: 'Contact True Love Creative', url: `${SITE}/contact`, mainEntity: { '@id': `${SITE}/#studio` } }],
  body: `${head('Contact', 'Let’s talk.', 'A question, an idea or a quick hello. We reply within 24 hours. Ready to start a project? The brief gets you an estimate in three minutes.')}
<section class="wrap block" aria-label="Contact"><div class="contact-grid">
  <form class="card form" id="contact-form" action="${FORMSPREE}" method="POST">
    <div class="two"><label>Name<input name="name" autocomplete="name" required maxlength="120"></label><label>Email<input type="email" name="email" autocomplete="email" required maxlength="160"></label></div>
    <label>Message<textarea name="message" required maxlength="5000" placeholder="How can we help?"></textarea></label>
    <label class="hp" aria-hidden="true">Leave this empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
    <input type="hidden" name="_subject" value="New message — truelovecreative.es">
    <p class="form-row"><span class="form-note">We reply within 24 hours. EN · ES · AR.</span><button class="btn" type="submit">Send ${arrow}</button></p>
    <p class="form-note" id="formError" role="alert" hidden>That didn’t go through. Please try again, or write to info@truelovecreative.es.</p>
    <p class="form-done" role="status">Thank you. We have your message and will reply within 24 hours.</p>
  </form>
  <div class="ways">
    <a class="sq ways-brief" href="/brief">Start a project <span>Brief + estimate in 3 minutes →</span></a>
    <a class="sq" href="mailto:info@truelovecreative.es">Email <span>info@truelovecreative.es</span></a>
    <a class="sq" href="https://wa.me/971585324519" target="_blank" rel="noopener noreferrer">WhatsApp <span>+971 58 532 4519</span></a>
    <a class="sq" href="https://www.instagram.com/truelove.creative" target="_blank" rel="noopener noreferrer">Instagram <span>@truelove.creative</span></a>
    <div class="card"><dl class="facts"><div><dt>Studio</dt><dd>Dubai, UAE</dd></div><div><dt>Working</dt><dd>Worldwide</dd></div><div><dt>Reply</dt><dd>Within 24 h</dd></div></dl></div>
  </div>
</div></section>`,
});

/* ── 404 ── */
page({
  url: '/404', file: '404.html', active: '', noindex: true,
  title: 'Page not found — True Love Creative', description: 'The page you are looking for does not exist or has moved.',
  body: `${head('404', 'Page not found.', 'The page you are looking for does not exist, has been moved, or was never published.')}
<section class="wrap block"><p style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="/">Back home ${arrow}</a><a class="btn ghost" href="/brief">Contact us</a></p></section>`,
});

/* ── sitemap.xml, robots.txt, llms.txt ── */
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`);
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended'];
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `# True Love Creative — search engines and AI assistants are welcome.
User-agent: *
Allow: /
Disallow: /options.html
Disallow: /sliders.html

${AI_BOTS.map(b => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE}/sitemap.xml
`);
fs.writeFileSync(path.join(ROOT, 'llms.txt'), `# True Love Creative

> Creative studio in Dubai, UAE, for brands, businesses and anyone with an idea. Web design, brand identity, graphic design and app development since 2015. Serving clients worldwide. A brand of BeatLabs FZE LLC.

True Love Creative designs and builds by hand: no templates, no page builders. The studio works with fewer clients to go deeper on each project, from the first idea to launch. Founded in 2015 by Javi Beat, designer and creative director based in Dubai. Languages: English, Spanish, Arabic. Reply within 24 hours.

## Services

${SVC.map(s => `- [${s.name}](${SITE}/services/${s.slug}): ${s.desc} Price: ${s.price}.`).join('\n')}

## Work

${WORK.map(w => `- [${w.name}](${SITE}/work/${w.slug}): ${w.subtitle} (${w.services}, ${w.year}; live site ${host(w.live)})`).join('\n')}

## Articles

${POSTS.map(p => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.excerpt}`).join('\n')}

## Contact

- [Start a project](${SITE}/brief): project brief with a live estimate, answer within 24 hours
- [Contact](${SITE}/contact)
- Email: info@truelovecreative.es
- WhatsApp: +971 58 532 4519
- Instagram: https://www.instagram.com/truelove.creative

## Optional

- [About the studio](${SITE}/about)
- [Full company details](${SITE}/llms-full.txt)
`);

/* llms-full.txt: everything an AI assistant needs, written from the same content as the pages */
fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), `# True Love Creative — full profile

> Creative studio in Dubai, UAE, for brands, businesses and anyone with an idea. Web design, brand identity, graphic design and app development since 2015. A brand of BeatLabs FZE LLC (License 53228, Ajman Media City Free Zone, UAE).

## Studio

- Founded: 2015, Dubai, United Arab Emirates. Serving clients worldwide.
- Founder: Javi Beat, designer and creative director.
- Languages: English, Spanish, Arabic. Reply within 24 hours.
- Philosophy: design is not decoration, it is decision. Fewer clients, deeper work. Everything made by hand: no templates, no page builders.
- Clients: businesses, startups, brands, artists and independent creators. 30+ clients served.
- Timelines are agreed with each client after the first conversation; they depend on the design and the scope.

## Services

${SVC.map(s => { const d = SERVICES[s.slug]; return `### ${s.name}
URL: ${SITE}/services/${s.slug}
Price: ${s.price}.
${d.lede} ${d.body}
${(d.steps ?? d.process ?? d.phases).map(x => `- ${x.title}: ${x.text}`).join('\n')}
${d.faqs.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n')}`; }).join('\n\n')}

## Selected work

${WORK.map(w => `### ${w.name} (${w.year})
URL: ${SITE}/work/${w.slug} · Live site: ${w.live}
Services: ${w.services} · Industry: ${w.industry}
${w.subtitle}
- Challenge: ${w.challenge}
- Approach: ${w.approach}
- Result: ${w.result}
- Client: "${w.quote}" — ${w.by}`).join('\n\n')}

## Articles

${POSTS.map(p => `- ${p.title} (${p.date}, ${p.category}): ${SITE}/blog/${p.slug}\n  ${p.excerpt}`).join('\n')}

## Contact

- Start a project: ${SITE}/brief
- Email: info@truelovecreative.es
- WhatsApp: +971 58 532 4519
- Instagram: https://www.instagram.com/truelove.creative
`);

/* ── vercel.json: clean URLs, the old /index.html redirect and security headers ── */
const CSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https://formspree.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');
const SECURITY = [
  { key: 'Content-Security-Policy', value: CSP },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];
fs.writeFileSync(path.join(ROOT, 'vercel.json'), JSON.stringify({
  $schema: 'https://openapi.vercel.sh/vercel.json',
  framework: null, buildCommand: '', installCommand: '', outputDirectory: '.',   // plain static site + api/ functions (the project used to be Next.js)
  cleanUrls: true,
  trailingSlash: false,
  redirects: [
    { source: '/index.html', destination: '/', permanent: true },
    { source: '/riot', destination: '/', permanent: true },
    { source: '/track', destination: '/', permanent: true },
  ],
  headers: [
    { source: '/(.*)', headers: SECURITY },
    { source: '/(img|fonts)/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }] },   // a week: file names are not hashed
    { source: '/(css|js)/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }] },
  ],
}, null, 2) + '\n');

console.log(`Built ${built.length} pages, sitemap with ${SITEMAP.length} URLs, robots.txt, llms.txt, vercel.json.`);
