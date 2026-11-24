/* Checks every built page for SEO, AI-readability and security basics. Exit code 1 if anything fails.
   Run after the builder:  node tools/build.mjs && node tools/check.mjs */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SITE = 'https://truelovecreative.es';
const LABS = new Set(['options.html', 'sliders.html']);   // design labs: not deployed (.vercelignore)
const errors = [], warnings = [];
const fail = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warnings.push(`${f}: ${m}`);

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
  if (e.name.startsWith('.') || ['node_modules', 'public', 'tools', 'content', 'tests'].includes(e.name)) return [];
  const p = path.join(d, e.name);
  return e.isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
const pages = walk(ROOT).map(p => path.relative(ROOT, p)).filter(f => !LABS.has(f) && !f.startsWith('googlecdb'));

// a root-relative URL path → the file that would serve it (clean URLs, like Vercel)
const resolve = u => {
  const clean = decodeURI(u.split(/[?#]/)[0]);
  if (clean === '/' || clean === '') return 'index.html';
  const rel = clean.replace(/^\//, '').replace(/\/$/, '');
  for (const c of [rel, `${rel}.html`, `${rel}/index.html`]) if (fs.existsSync(path.join(ROOT, c)) && fs.statSync(path.join(ROOT, c)).isFile()) return c;
  return null;
};
const urlOf = f => f === 'index.html' ? '/' : '/' + f.replace(/\/?index\.html$/, '').replace(/\.html$/, '');

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const inSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));

for (const f of pages) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(f, 'missing <title>'); else if (title.length > 75) warn(f, `long title (${title.length} chars)`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(f, 'missing meta description'); else if (desc.length < 50 || desc.length > 200) warn(f, `description length ${desc.length}`);
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canon) fail(f, 'missing canonical');
  else if (!noindex && canon !== SITE + urlOf(f)) fail(f, `canonical ${canon} ≠ ${SITE + urlOf(f)}`);
  for (const p of ['og:title', 'og:description', 'og:url', 'og:image']) if (!html.includes(`property="${p}"`)) fail(f, `missing ${p}`);
  const ogImg = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  if (ogImg && !resolve(ogImg.replace(SITE, ''))) fail(f, `og:image not found: ${ogImg}`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(f, `${h1s} <h1> elements (want exactly 1)`);
  // structured data must parse
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ld.length) fail(f, 'no JSON-LD');
  for (const m of ld) { try { JSON.parse(m[1]); } catch { fail(f, 'JSON-LD does not parse'); } }
  // CSP: no inline executable scripts
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>/g)) if (!/application\/ld\+json/.test(m[1])) fail(f, 'inline <script> (blocked by the CSP)');
  if (/\son[a-z]+="/i.test(html)) fail(f, 'inline event handler attribute (blocked by the CSP)');
  // links and images
  for (const m of html.matchAll(/<(a|link)\b[^>]*\shref="([^"]+)"/g)) {
    const href = m[2];
    if (href.startsWith('/') && !href.startsWith('//') && !resolve(href)) fail(f, `broken link ${href}`);
  }
  for (const m of html.matchAll(/<a\b([^>]*)>/g)) if (/target="_blank"/.test(m[1]) && !/rel="[^"]*noopener/.test(m[1])) fail(f, 'target=_blank without rel=noopener');
  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    const src = m[1].match(/src="([^"]+)"/)?.[1];
    if (src && src.startsWith('/') && !resolve(src)) fail(f, `missing image ${src}`);
    if (!/\salt="/.test(m[1])) fail(f, `image without alt: ${src}`);
  }
  if (!noindex && !inSitemap.has(SITE + urlOf(f))) fail(f, 'not in sitemap.xml');
}

// site-wide files
const robots = fs.readFileSync(path.join(ROOT, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('robots.txt', 'no sitemap line');
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot']) if (!robots.includes(`User-agent: ${bot}`)) fail('robots.txt', `${bot} not listed`);
for (const loc of inSitemap) if (!resolve(loc.replace(SITE, ''))) fail('sitemap.xml', `points to a missing page: ${loc}`);
for (const f of ['llms.txt', 'llms-full.txt', 'favicon.ico', 'apple-touch-icon.png', '404.html', 'googlecdb2031bf5df3c87.html']) if (!fs.existsSync(path.join(ROOT, f))) fail(f, 'missing');
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const hdr = Object.fromEntries(vercel.headers.find(h => h.source === '/(.*)').headers.map(h => [h.key, h.value]));
for (const k of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy']) if (!hdr[k]) fail('vercel.json', `missing ${k}`);
const scriptSrc = hdr['Content-Security-Policy']?.match(/script-src ([^;]+)/)?.[1] ?? '';
if (/unsafe-inline|unsafe-eval/.test(scriptSrc)) fail('vercel.json', 'script-src allows unsafe-inline/eval');
if (!/frame-ancestors 'none'/.test(hdr['Content-Security-Policy'] ?? '')) fail('vercel.json', 'frame-ancestors not none');

console.log(`Checked ${pages.length} pages, ${inSitemap.size} sitemap URLs.`);
warnings.forEach(w => console.log('  warn ', w));
if (errors.length) { errors.forEach(e => console.log('  FAIL ', e)); console.log(`${errors.length} problem(s).`); process.exit(1); }
console.log('All checks passed.');
