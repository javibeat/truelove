/* Chrome shared by every page: tab bar, day/night switch, phone layout, page transitions. */
import { tabbar } from './tabbar.js';
import { switchA } from './switches.js';
import { reduceMotion, Squircle, drawWordmark } from './core.js';
import { progressRing } from './progress.js';

export function initChrome({ active, onGo } = {}) {
  const bar = tabbar(document.getElementById('bar'), {
    active,
    // other pages: let the bubble travel first, then go
    onGo: onGo ?? ((id, tab) => { const href = tab.getAttribute('href'); setTimeout(() => { location.href = href; }, reduceMotion.matches ? 0 : 320); }),
  });
  const sw = switchA(document.getElementById('sw'));
  const dock = document.getElementById('dock'), phone = matchMedia('(width < 700px)');
  const place = () => {
    const wrap = sw.closest('.gw');
    if (phone.matches) { wrap.classList.add('sw-float'); document.body.append(wrap); }
    else { wrap.classList.remove('sw-float'); dock.append(wrap); }
  };
  phone.addEventListener('change', place); place();
  // every card-like surface gets the traced squircle corner
  document.querySelectorAll('.card, .sq').forEach(el => Squircle.watch(el, el.dataset.sq ? +el.dataset.sq : 1));
  document.querySelectorAll('.mark-s, .mark').forEach(el => { if (!el.childElementCount) drawWordmark(el); });
  adaptiveGlass([document.getElementById('bar'), sw]);
  progressRing(() => glideTo(null));
  return bar;
}

/* Adaptive glass, like Apple's: look at what is under each glass piece (page colour or the pixels of an image)
   and switch its icons and labels to light or dark ink so they always read. */
function adaptiveGlass(panes) {
  // Images are shrunk to 48 px wide off the main thread (createImageBitmap), once, then sampled from the cache.
  const cache = new Map();
  const pixels = img => {
    if (!img.complete || !img.naturalWidth) return null;
    if (!cache.has(img)) {
      cache.set(img, null);
      const h = Math.max(1, Math.round(48 * img.naturalHeight / img.naturalWidth));
      createImageBitmap(img, { resizeWidth: 48, resizeHeight: Math.min(h, 2048), resizeQuality: 'low' }).then(bmp => {
        const c = new OffscreenCanvas(bmp.width, bmp.height), g = c.getContext('2d');
        g.drawImage(bmp, 0, 0); cache.set(img, g.getImageData(0, 0, bmp.width, bmp.height)); bmp.close(); ask();
      }).catch(() => {});
    }
    return cache.get(img);
  };
  const lum = (r, g, b) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  // any CSS colour (rgb, oklab, color-mix…) → [r, g, b, a] by painting one pixel
  const px1 = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const seen = new Map();
  const parse = c => {
    if (!seen.has(c)) {
      px1.clearRect(0, 0, 1, 1); px1.fillStyle = '#000'; px1.fillStyle = c; px1.fillRect(0, 0, 1, 1);
      const d = px1.getImageData(0, 0, 1, 1).data;
      seen.set(c, [d[0], d[1], d[2], d[3] / 255]);
    }
    return seen.get(c);
  };
  const sampleAt = (x, y, skip) => {
    for (const el of document.elementsFromPoint(x, y)) {
      if (skip.contains(el) || el.closest('.dock, .gw')) continue;
      if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;   // hidden layers (e.g. a site waiting behind its logo)
      if (el.tagName === 'IMG' && !el.closest('.logo-face, .logo-chip')) {
        const d = pixels(el), r = el.getBoundingClientRect();
        if (!d) continue;
        const px = Math.min(d.width - 1, Math.max(0, Math.floor((x - r.left) / r.width * d.width)));
        const py = Math.min(d.height - 1, Math.max(0, Math.floor((y - r.top) / r.height * d.height)));
        const i = (py * d.width + px) * 4;
        if (d.data[i + 3] < 160) continue;   // transparent pixel (e.g. around a logo): look further down
        return lum(d.data[i], d.data[i + 1], d.data[i + 2]);
      }
      const bg = parse(getComputedStyle(el).backgroundColor);
      if (bg[3] > .5) return lum(bg[0], bg[1], bg[2]);
    }
    const body = parse(getComputedStyle(document.body).backgroundColor);
    return lum(body[0], body[1], body[2]);
  };
  let queued = false;
  const update = () => {
    queued = false;
    for (const pane of panes) {
      if (!pane) continue;
      const r = pane.getBoundingClientRect();
      const xs = [.15, .35, .5, .65, .85].map(f => r.left + r.width * f);
      const vals = xs.flatMap(x => [r.top + r.height * .3, r.top + r.height * .7].map(y => sampleAt(x, y, pane))).filter(v => v != null);
      // dark ink would get lost as soon as a good part of the pane sits on something dark
      const darkShare = vals.filter(v => v < .42).length / (vals.length || 1);
      pane.classList.toggle('over-dark', darkShare >= .4);
      pane.classList.toggle('over-light', darkShare < .4);
    }
  };
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', ask, { passive: true });
  addEventListener('resize', ask);
  new MutationObserver(ask).observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });   // theme changes
  addEventListener('load', ask);
  setInterval(() => { if (document.querySelector('.case.live')) ask(); }, 700);   // only while a site is scrolling inside a card
  ask();
}

/** Unhurried scroll to an element (0.9–1.4 s, eased). */
let anim = 0;
export function glideTo(el, offset = innerWidth < 700 ? 16 : 24) {
  const to = el ? el.getBoundingClientRect().top + scrollY - offset : 0;
  if (reduceMotion.matches) { scrollTo(0, to); return; }
  const from = scrollY, dist = to - from, dur = Math.min(1400, Math.max(900, Math.abs(dist) * .35)), t0 = performance.now();
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  cancelAnimationFrame(anim);
  const step = now => { const t = Math.min(1, (now - t0) / dur); scrollTo(0, from + dist * ease(t)); if (t < 1) anim = requestAnimationFrame(step); };
  anim = requestAnimationFrame(step);
}
addEventListener('wheel', () => cancelAnimationFrame(anim), { passive: true });
addEventListener('touchstart', () => cancelAnimationFrame(anim), { passive: true });
