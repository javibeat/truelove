/* Blog covers in the new style (1600×800 JPEG, used on the cards, the article and social previews).
   Reads content/posts.json (coverLine1/coverLine2/category) and writes img/blog/covers/<slug>.jpg.
   Needs Playwright and a Chromium browser:  PW=<folder with node_modules/playwright> node tools/covers.mjs */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const require = createRequire(path.join(process.env.PW ?? ROOT, 'index.js'));
const { chromium } = require('playwright');
const POSTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/posts.json'), 'utf8'));
const OUT = path.join(ROOT, 'img/blog/covers');
fs.mkdirSync(OUT, { recursive: true });

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const html = p => `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1600px; height: 800px; overflow: hidden; font-family: -apple-system, "SF Pro Display", "Inter", Helvetica, sans-serif; color: #0A0A0A;
    background: #F4F4F4 radial-gradient(circle, rgba(10,10,10,.13) 1.6px, transparent 2px) 0 0 / 34px 34px; }
  .sheet { position: absolute; inset: 0; padding: 78px 92px; display: flex; flex-direction: column; justify-content: space-between;
    background: radial-gradient(120% 90% at 0% 100%, #F4F4F4 35%, rgba(244,244,244,.6) 70%, rgba(244,244,244,0)); }
  .top { display: flex; justify-content: space-between; align-items: center; font-size: 22px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand svg { width: 24px; height: 24px; fill: #E80707; }
  .cat { padding: 12px 22px; border-radius: 999px; background: #0A0A0A; color: #F4F4F4; font-size: 18px; letter-spacing: .12em; }
  h1 { font-size: 112px; font-weight: 800; letter-spacing: -.045em; line-height: .96; text-transform: none; max-width: 1350px; }
  h1 span { display: block; white-space: nowrap; }
  h1 .red { color: #E80707; }
  .foot { display: flex; justify-content: space-between; font-size: 22px; color: #55555A; font-weight: 600; }
</style></head><body><div class="sheet">
  <div class="top"><span class="brand"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>True Love Creative</span><span class="cat">${esc(p.category)}</span></div>
  <h1><span>${esc(p.coverLine1)}</span><span class="red">${esc(p.coverLine2)}</span></h1>
  <div class="foot"><span>Notes from the studio</span><span>truelovecreative.es/blog</span></div>
</div></body></html>`;

const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const page = await b.newPage({ viewport: { width: 1600, height: 800 }, deviceScaleFactor: 2 });   // 3200×1600: sharp on retina screens
for (const p of POSTS) {
  if (!p.coverLine1) { console.log('skip (no cover lines):', p.slug); continue; }
  await page.setContent(html(p));
  // shrink the headline until both lines fit on one row each
  await page.evaluate(() => { const h = document.querySelector('h1'); let s = 112; while (s > 64 && [...h.children].some(l => l.scrollWidth > 1416)) { s -= 4; h.style.fontSize = s + 'px'; } });
  await page.screenshot({ path: path.join(OUT, `${p.slug}@2x.jpg`), type: 'jpeg', quality: 84 });
  await page.screenshot({ path: path.join(OUT, `${p.slug}.jpg`), type: 'jpeg', quality: 86, scale: 'css' });   // 1600×800 for cards and social previews
  console.log('cover', p.slug);
}
await b.close();
