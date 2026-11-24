/* True Love Creative — shared pieces: squircle corners, liquid glass, springs, light/OLED theme, wordmark. */

/* ── Traced «Fold» squircle (same table as Curb / BLAB. cards, ~/.claude/design/squircle-corners.md) ── */
export const Squircle = (() => {
  const T = [[8.875,8.758],[9.5,8.186],[10.125,7.642],[10.75,7.122],[11.375,6.659],[12,6.221],[12.625,5.79],[13.25,5.398],[13.875,5.029],[14.5,4.694],[15.125,4.415],[15.75,4.135],[16.375,3.85],[17,3.61],[17.625,3.32],[18.25,3.105],[18.875,2.889],[19.5,2.646],[20.125,2.48],[20.75,2.355],[21.375,2.177],[22,1.99],[22.625,1.877],[23.25,1.771],[23.875,1.631],[24.5,1.502],[25.125,1.386],[25.75,1.311],[26.375,1.258],[27,1.195],[27.625,1.114],[28.25,.998],[28.875,.879],[29.5,.79],[30.125,.733],[30.75,.688],[31.375,.649],[32,.614],[32.625,.58],[33.25,.543],[33.875,.5],[34.5,.454],[35.125,.401],[35.75,.352],[36.375,.299],[37,.25],[37.625,.211],[38.25,.177],[38.875,.157],[39.5,.131],[40.125,.104],[40.75,.09],[41.375,.085],[42,.085],[42.625,.07],[43.25,.036]];
  const REACH = 43.25;
  /** SVG path for a w × h box (offset o); the corner scales down so 43 × s ≤ half the shorter side. */
  const d = (w, h, o = 0, scale = 1) => {
    const s = Math.min(scale, h / 2 / REACH, w / 2 / REACH);
    const c = [...T.slice().reverse().map(([a, i]) => [i * s, a * s]), ...T.map(([a, i]) => [a * s, i * s])];
    const P = [];
    c.forEach(([x, y]) => P.push([x, y]));
    c.forEach(([x, y]) => P.push([w - y, x]));
    c.forEach(([x, y]) => P.push([w - x, h - y]));
    c.forEach(([x, y]) => P.push([y, h - x]));
    return 'M' + P.map(([x, y]) => (x + o).toFixed(2) + ' ' + (y + o).toFixed(2)).join('L') + 'Z';
  };
  const clip = (w, h, scale) => `path("${d(w, h, 0, scale)}")`;
  /** Keep an element's clip-path (--sq) in step with its size. */
  const watch = (el, scale = 1) => {
    const ro = new ResizeObserver(() => { if (el.offsetWidth) el.style.setProperty('--sq', clip(el.offsetWidth, el.offsetHeight, scale)); });
    ro.observe(el);
  };
  return { d, clip, watch };
})();

export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

/* ── Liquid glass ──
   The page behind is frosted and, near the rim, bent like thick glass (an SVG displacement map read through
   backdrop-filter). That part only works in Chromium; Safari/Firefox keep the frost and the rim highlights. */
export const REFRACT = !!(navigator.userAgentData?.brands?.some(b => /Chromium|Chrome/.test(b.brand)));
document.documentElement.classList.toggle('refract', REFRACT);

/** Displacement map: red = x, green = y (128 = still). rim bends near the edge; mag pulls toward the centre (magnifies). */
export function glassMap(w, h, { rim = 16, mag = 0, radius } = {}) {
  const c = document.createElement('canvas'); c.width = Math.max(2, Math.ceil(w)); c.height = Math.max(2, Math.ceil(h));
  const g = c.getContext('2d'), img = g.createImageData(c.width, c.height), D = img.data;
  const r = radius ?? Math.min(h / 2, 30), hx = w / 2, hy = h / 2;
  const sdf = (x, y) => {
    const qx = Math.abs(x - hx) - (hx - r), qy = Math.abs(y - hy) - (hy - r);
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
  };
  for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
    const px = x + .5, py = y + .5, depth = -sdf(px, py);
    let dx = 0, dy = 0;
    if (depth > 0 && depth < rim) {
      const nx = sdf(px + 1, py) - sdf(px - 1, py), ny = sdf(px, py + 1) - sdf(px, py - 1), l = Math.hypot(nx, ny) || 1;
      const k = Math.pow(1 - depth / rim, 2.2);
      dx += nx / l * k; dy += ny / l * k;
    }
    if (mag) { dx -= (px - hx) / hx * mag; dy -= (py - hy) / hy * mag; }
    const i = (y * c.width + x) * 4;
    D[i] = 128 + Math.max(-1, Math.min(1, dx)) * 127; D[i + 1] = 128 + Math.max(-1, Math.min(1, dy)) * 127; D[i + 2] = 128; D[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return c.toDataURL();
}

const SVGNS = 'http://www.w3.org/2000/svg';
const defs = (() => {
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('width', 0); svg.setAttribute('height', 0); svg.setAttribute('aria-hidden', 'true');
  svg.style.position = 'absolute';
  document.body.prepend(svg);
  return svg;
})();
let filterId = 0;

/** A glass filter whose map can be resized. kind: 'pane' (frost + rim) or 'lens' (clear + magnify). */
export function makeFilter(kind = 'pane') {
  const id = `glass${filterId++}`;
  const f = document.createElementNS(SVGNS, 'filter');
  f.setAttribute('id', id);
  for (const [k, v] of Object.entries({ filterUnits: 'userSpaceOnUse', primitiveUnits: 'userSpaceOnUse', x: 0, y: 0, width: 100, height: 60, 'color-interpolation-filters': 'sRGB' })) f.setAttribute(k, v);
  f.innerHTML = kind === 'lens'
    ? `<feGaussianBlur in="SourceGraphic" stdDeviation=".5" result="s"/><feImage x="0" y="0" width="100" height="60" preserveAspectRatio="none" result="m"/>
       <feDisplacementMap in="s" in2="m" scale="20" xChannelSelector="R" yChannelSelector="G" result="b"/>
       <feComponentTransfer in="b"><feFuncR type="linear" slope="1.06"/><feFuncG type="linear" slope="1.06"/><feFuncB type="linear" slope="1.06"/></feComponentTransfer>`
    // Apple-style Liquid Glass: barely frosted (the page stays readable behind), strongly bent at the rim,
    // a touch brighter and more saturated. Tint and highlights come from CSS and the rim SVG.
    : `<feGaussianBlur in="SourceGraphic" stdDeviation="2.6" result="s"/><feImage x="0" y="0" width="100" height="60" preserveAspectRatio="none" result="m"/>
       <feDisplacementMap in="s" in2="m" scale="72" xChannelSelector="R" yChannelSelector="G" result="b"/><feColorMatrix in="b" type="saturate" values="1.7" result="c"/>
       <feComponentTransfer in="c"><feFuncR type="linear" slope="1.05" intercept=".01"/><feFuncG type="linear" slope="1.05" intercept=".01"/><feFuncB type="linear" slope="1.05" intercept=".01"/></feComponentTransfer>`;
  defs.append(f);
  const img = f.querySelector('feImage');
  return {
    id,
    size(w, h) { for (const el of [f, img]) { el.setAttribute('width', w); el.setAttribute('height', h); } },
    map(url) { img.setAttribute('href', url); },
  };
}

/** Turn an element into a glass pane: squircle clip, frost/refraction, rim highlight, soft shadow behind it. */
export function glassPane(el, { rim = 24 } = {}) {
  el.classList.add('glass');
  // wrapper = the glass plus its shadow, so both can be moved together
  const wrap = document.createElement('span');
  wrap.className = 'gw';
  el.before(wrap);
  const shadow = document.createElement('span');
  shadow.className = 'glass-shadow';
  shadow.setAttribute('aria-hidden', 'true');
  wrap.append(shadow, el);
  const rimSvg = document.createElementNS(SVGNS, 'svg');
  rimSvg.setAttribute('class', 'glass-rim'); rimSvg.setAttribute('aria-hidden', 'true');
  const gid = `rimg${filterId}`;
  rimSvg.innerHTML = `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--rim-hi)"/><stop offset=".5" style="stop-color:var(--rim-lo)" stop-opacity=".3"/><stop offset="1" style="stop-color:var(--rim-lo)"/></linearGradient></defs>
    <filter id="${gid}b" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="3"/></filter><clipPath id="${gid}c"><path/></clipPath>
    <path fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="5" filter="url(#${gid}b)" clip-path="url(#${gid}c)" class="glow"/>
    <path fill="none" style="stroke:var(--rim-dark)" stroke-width="1"/><path fill="none" stroke="url(#${gid})" stroke-width="1.3"/>`;
  el.append(rimSvg);
  const filter = REFRACT ? makeFilter('pane') : null;
  if (filter) el.style.backdropFilter = `url(#${filter.id})`;
  let last = '';
  new ResizeObserver(() => {
    const w = el.offsetWidth, h = el.offsetHeight, key = w + 'x' + h;
    if (!w || key === last) return;
    last = key;
    el.style.setProperty('--sq', Squircle.clip(w, h));
    rimSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const inner = Squircle.d(w - 1.4, h - 1.4, .7);
    rimSvg.querySelectorAll('path').forEach(p => p.setAttribute('d', inner));
    if (filter) { filter.size(w, h); (window.requestIdleCallback ?? setTimeout)(() => filter.map(glassMap(w, h, { rim }))); }   // drawn when the page is idle, not during load
  }).observe(el);
  return el;
}

/* ── Damped spring, frame-rate independent ── */
export function spring(state, key, target, k, zeta, dt) {
  const v = key + 'v', n = Math.max(1, Math.ceil(dt * 240)), h = dt / n;   // small steps keep stiff springs stable
  for (let i = 0; i < n; i++) {
    state[v] = (state[v] ?? 0) + (k * (target - state[key]) - 2 * zeta * Math.sqrt(k) * (state[v] ?? 0)) * h;
    state[key] += state[v] * h;
  }
  if (!Number.isFinite(state[key])) { state[key] = target; state[v] = 0; }
}

/* ── Light / OLED theme ──
   Follows the system unless you choose otherwise; your choice is stored only when it differs from the system.
   --night eases from 0 (light) to 1 (OLED black) so every colour blends continuously. */
export const Theme = (() => {
  const meta = document.querySelector('meta[name="color-scheme"]');
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const listeners = new Set();
  const isDark = () => (meta.content === 'dark' || meta.content === 'light') ? meta.content === 'dark' : mq.matches;
  const store = v => { try { v ? localStorage.setItem('tl-scheme', v) : localStorage.removeItem('tl-scheme'); } catch (e) {} };
  const st = { p: isDark() ? 1 : 0 };
  const set = dark => {
    const target = dark ? 'dark' : 'light', system = mq.matches ? 'dark' : 'light';
    if (target === system) { store(null); meta.content = 'light dark'; } else { store(target); meta.content = target; }
    listeners.forEach(f => f(dark));
  };
  mq.addEventListener('change', () => listeners.forEach(f => f(isDark())));
  addEventListener('storage', e => { if (e.key === 'tl-scheme') { meta.content = e.newValue ?? 'light dark'; listeners.forEach(f => f(isDark())); } });
  let last = performance.now(), shown = -1;
  const tick = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (reduceMotion.matches) st.p = isDark() ? 1 : 0; else spring(st, 'p', isDark() ? 1 : 0, 90, 1, dt);
    const p = Math.max(0, Math.min(1, st.p));
    if (Math.abs(p - shown) > .002) { shown = p; document.documentElement.style.setProperty('--night', p.toFixed(3)); }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  return { isDark, set, toggle: () => set(!isDark()), on: f => listeners.add(f), get p() { return st.p; } };
})();

/* ── Wordmark «TRUE LOVE CREATIVE»: blocky letters with slit counters, LOVE in the heart red ── */
export function drawWordmark(svg, { slit = 3.6 } = {}) {
  const HEART = '#E80707';
  const H = 100, s = slit, TOP = 12, BOT = 92, R = 2.6, GAP = 2.8, SPACE = 13, W = 34, xc = (W - s) / 2;
  const box = (x, w) => `M${x + R},0H${x + w - R}Q${x + w},0 ${x + w},${R}V${H - R}Q${x + w},${H} ${x + w - R},${H}H${x + R}Q${x},${H} ${x},${H - R}V${R}Q${x},0 ${x + R},0Z`;
  const v = (y1, y2) => [xc, y1, s, y2 - y1];
  const h = y => [xc, y, W + 1 - xc, s];
  const G = {
    T: { w: W, cuts: [[-1, TOP, 9.2, 90], [W - 8.2, TOP, 9.2, 90]] },
    R: { w: W, cuts: [v(TOP, 46), h(50 - s / 2), v(58, 101)] },
    U: { w: W, cuts: [v(-1, BOT)] },
    E: { w: W, cuts: [v(TOP, 38 + s), h(38), v(62 - s, BOT), h(62 - s)] },
    L: { w: W, cuts: [[xc, -1, W, 89]] },
    O: { w: W, cuts: [v(TOP, BOT)] },
    V: { w: W, cuts: [v(-1, 84)], outer: x => `M${x + R},0H${x + W - R}Q${x + W},0 ${x + W},${R}V74L${x + W - 10},${H - 1}Q${x + W - 10.6},${H} ${x + W - 12},${H}H${x + 12}Q${x + 10.6},${H} ${x + 10},${H - 1}L${x},74V${R}Q${x},0 ${x + R},0Z` },
    C: { w: W, cuts: [v(TOP, BOT), h(50 - s / 2)] },
    A: { w: W, cuts: [v(TOP, 46), v(58, 101)] },
    I: { w: 13, cuts: [] },
  };
  const uid = Math.random().toString(36).slice(2, 6);
  let x = 0, n = 0, word = 0, d = '', body = '';
  for (const ch of 'TRUE LOVE CREATIVE') {
    if (ch === ' ') { x += SPACE; word++; continue; }
    const g = G[ch], id = `wm${uid}${n++}`, p = g.outer ? g.outer(x) : box(x, g.w);
    d += `<mask id="${id}" maskUnits="userSpaceOnUse"><path d="${p}" fill="#fff"/>${g.cuts.map(([a, b, c, e]) => `<rect x="${x + a}" y="${b}" width="${c}" height="${e}"/>`).join('')}</mask>`;
    body += `<path d="${p}" fill="${word === 1 ? HEART : 'currentColor'}" mask="url(#${id})"/>`;
    x += g.w + GAP;
  }
  svg.setAttribute('viewBox', `0 0 ${x - GAP} ${H}`);
  svg.innerHTML = `<defs>${d}</defs>${body}`;
}

/* ── Sun ↔ moon icon (thin, vector): p = 0 sun … 1 moon ── */
let iconId = 0;
export function sunMoonIcon() {
  const id = `sm${iconId++}`;
  const wrap = document.createElement('span');
  wrap.className = 'sunmoon';
  wrap.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><mask id="${id}"><rect x="-4" y="-4" width="32" height="32" fill="#fff"/><circle class="bite" cx="30" cy="0" r="7" fill="#000"/></mask></defs>
    <g class="rays">${Array.from({ length: 8 }, (_, i) => `<line x1="12" y1="2.6" x2="12" y2="4.6" transform="rotate(${i * 45} 12 12)"/>`).join('')}</g>
    <circle class="core" cx="12" cy="12" r="4.4" mask="url(#${id})"/></svg>`;
  const core = wrap.querySelector('.core'), bite = wrap.querySelector('.bite'), rays = wrap.querySelector('.rays');
  wrap.set = p => {
    core.setAttribute('r', (4.4 + 3.4 * p).toFixed(2));
    bite.setAttribute('cx', (30 - 13.2 * p).toFixed(2));
    bite.setAttribute('cy', (0 + 6.6 * p).toFixed(2));
    rays.style.opacity = (1 - p * 1.4).toFixed(3);
    rays.setAttribute('transform', `rotate(${(p * 70).toFixed(1)} 12 12) translate(12 12) scale(${(1 - p * .5).toFixed(3)}) translate(-12 -12)`);
  };
  wrap.set(0);
  return wrap;
}
