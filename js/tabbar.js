/* Tab bar: glass pane + a spring «bubble». At rest it is a soft pill; when it travels or is dragged it turns
   into a clear lens that magnifies the icons under it, stretches with speed and settles with a bounce. */
import { Squircle, glassPane, makeFilter, glassMap, REFRACT, reduceMotion, spring } from './core.js';

export function tabbar(bar, { onGo, active: startId } = {}) {
  glassPane(bar);
  const tabs = [...bar.querySelectorAll('.tab')];
  const pill = document.createElement('span'); pill.className = 'pill'; pill.setAttribute('aria-hidden', 'true'); pill.innerHTML = '<i></i>';
  const lens = document.createElement('span'); lens.className = 'lens'; lens.setAttribute('aria-hidden', 'true');
  lens.innerHTML = `<svg><defs><linearGradient id="lensRim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".45" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".7"/></linearGradient></defs><path fill="none" stroke="url(#lensRim)" stroke-width="1.4"/></svg>`;
  bar.prepend(pill); bar.append(lens);
  const lensPath = lens.querySelector('path');
  const lf = REFRACT ? makeFilter('lens') : null;
  if (lf) { (window.requestIdleCallback ?? setTimeout)(() => lf.map(glassMap(164, 104, { rim: 14, mag: .42 }))); lens.style.backdropFilter = `url(#${lf.id})`; }

  const BH = 52;
  const st = { x: 0, w: 0, tx: 0, tw: 0, held: false, glass: 0 };
  let active = 0, shown = '';
  const slot = i => ({ x: tabs[i].offsetLeft + tabs[i].offsetWidth / 2, w: tabs[i].offsetWidth });
  const place = jump => {
    const s = slot(active);
    st.tx = s.x; st.tw = s.w;
    if (jump || !st.w) { st.x = s.x; st.w = s.w; st.xv = st.wv = 0; }
  };
  const mark = i => tabs.forEach((t, k) => { t.classList.toggle('on', k === i); k === i ? t.setAttribute('aria-current', 'true') : t.removeAttribute('aria-current'); });
  const setActive = (i, jump = false) => { active = i; mark(i); if (!st.held) place(jump); };
  new ResizeObserver(() => place(true)).observe(bar);

  let last = performance.now();
  const frame = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const sub = Math.ceil(dt / (1 / 240)), h = dt / sub, rm = reduceMotion.matches;
    for (let n = 0; n < sub; n++) {
      spring(st, 'x', st.tx, st.held ? 900 : 150, rm ? 1 : (st.held ? .8 : .6), h);   // a touch slower than iOS, on purpose
      spring(st, 'w', st.tw, 220, .7, h);
    }
    const want = st.held ? 1 : Math.min(1, Math.abs(st.xv || 0) / 500);
    st.glass += (want - st.glass) * Math.min(1, dt * (want > st.glass ? 14 : 4));
    const sp = rm ? 0 : Math.min(1, Math.abs(st.xv || 0) / 2200);
    const swell = st.glass * 10;
    const w = st.w * (1 + sp * .3) + swell, hh = BH * (1 - sp * .1) + swell * .5;
    const key = w.toFixed(1) + 'x' + hh.toFixed(1);
    if (key !== shown) {
      shown = key;
      for (const el of [pill, lens]) { el.style.width = w + 'px'; el.style.height = hh + 'px'; el.style.top = (6 + (BH - hh) / 2) + 'px'; }
      const clip = Squircle.clip(w, hh);
      pill.firstElementChild.style.setProperty('--sq', clip);
      lens.style.setProperty('--sq', clip);
      lens.firstElementChild.setAttribute('viewBox', `0 0 ${w} ${hh}`);
      lensPath.setAttribute('d', Squircle.d(w - 1.4, hh - 1.4, .7));
      lf?.size(w, hh);
    }
    const tx = `translateX(${(st.x - w / 2).toFixed(2)}px)`;
    pill.style.transform = tx; lens.style.transform = tx;
    pill.style.opacity = (1 - st.glass * .85).toFixed(3);
    lens.style.opacity = st.glass.toFixed(3);
    requestAnimationFrame(frame);
  };

  let lockUntil = 0, down = null, dragged = false;
  const nearest = x => tabs.reduce((b, t, i) => Math.abs(slot(i).x - x) < Math.abs(slot(b).x - x) ? i : b, 0);
  const go = i => {
    setActive(i);
    lockUntil = performance.now() + 1500;
    onGo?.(tabs[i].dataset.id, tabs[i]);
  };
  tabs.forEach((t, i) => t.addEventListener('click', e => { e.preventDefault(); if (!dragged) go(i); }));
  bar.addEventListener('dragstart', e => e.preventDefault());
  bar.addEventListener('pointerdown', e => { down = { x: e.clientX, left: bar.getBoundingClientRect().left }; dragged = false; });
  addEventListener('pointermove', e => {
    if (!down) return;
    if (!dragged && Math.abs(e.clientX - down.x) > 6) { dragged = true; st.held = true; }
    if (!dragged) return;
    st.tx = Math.max(slot(0).x - 14, Math.min(slot(tabs.length - 1).x + 14, e.clientX - down.left));
    mark(nearest(st.tx));
  });
  const up = () => {
    if (!down) return;
    down = null;
    if (!dragged) return;
    st.held = false;
    go(nearest(st.tx));
    setTimeout(() => { dragged = false; }, 0);
  };
  addEventListener('pointerup', up);
  addEventListener('pointercancel', up);

  setActive(Math.max(0, tabs.findIndex(t => t.dataset.id === startId)), true);
  requestAnimationFrame(frame);
  return {
    go(id) { const i = tabs.findIndex(t => t.dataset.id === id); if (i >= 0) go(i); },
    /** Scroll-spy calls this; ignored right after a tap so the bubble does not jump back. */
    follow(id) {
      if (performance.now() < lockUntil || st.held) return;
      const i = tabs.findIndex(t => t.dataset.id === id);
      if (i >= 0 && i !== active) setActive(i);
    },
  };
}
