/* Three day/night switches, all in the tab bar's language (glass, squircle, thin icons, springs). */
import { Squircle, glassPane, Theme, reduceMotion, spring, sunMoonIcon } from './core.js';

const SUN = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"/></svg>';
const MOON = '<svg viewBox="0 0 24 24"><path d="M19.5 14.6A7.6 7.6 0 0 1 9.4 4.5a7.6 7.6 0 1 0 10.1 10.1z"/></svg>';
const label = el => { el.setAttribute('aria-label', Theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'); };

function loop(fn) { let last = performance.now(); const f = now => { const dt = Math.min(.05, (now - last) / 1000); last = now; fn(dt); requestAnimationFrame(f); }; requestAnimationFrame(f); }

/** A — glass slider. Drag or tap; the knob glides, squashes on arrival and morphs sun ↔ moon. */
export function switchA(el) {
  el.classList.add('sw', 'sw-a');
  el.innerHTML = `<span class="track-icons" aria-hidden="true">${SUN}${MOON}</span><span class="knob"><i></i></span>`;
  glassPane(el);
  const knob = el.querySelector('.knob'), icon = sunMoonIcon();
  knob.append(icon);
  Squircle.watch(knob.firstElementChild);
  const span = () => el.offsetWidth - 12 - 52;
  const st = { x: Theme.isDark() ? 1 : 0, t: 0, s: 1, held: false };
  st.t = st.x;
  Theme.on(d => { if (!st.held) st.t = d ? 1 : 0; label(el); });
  label(el);
  loop(dt => {
    const rm = reduceMotion.matches;
    if (rm) { st.x = st.t; st.s = 1; }
    else {
      const before = st.xv || 0;
      spring(st, 'x', st.t, st.held ? 700 : 220, st.held ? .9 : .62, dt);
      if (Math.sign(before) !== Math.sign(st.xv || 0) && Math.abs(before) > .8) st.sv = (st.sv || 0) - Math.min(4, Math.abs(before) * 1.6);   // squash when it turns back
      spring(st, 's', 1 + Math.min(.25, Math.abs(st.xv || 0) * .08), 500, .35, dt);
    }
    const x = Math.max(-.06, Math.min(1.06, st.x));
    st.s = Math.max(.75, Math.min(1.3, st.s));
    knob.style.transform = `translateX(${(x * span()).toFixed(2)}px) scale(${st.s.toFixed(3)}, ${(1 / Math.pow(st.s, .6)).toFixed(3)})`;
    icon.set(Math.max(0, Math.min(1, x)));
  });
  let down = null, moved = false;
  el.addEventListener('pointerdown', e => { el.setPointerCapture(e.pointerId); down = { x: e.clientX, x0: st.x }; moved = false; });
  el.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - down.x;
    if (Math.abs(dx) > 4) { moved = true; st.held = true; }
    if (moved) st.t = Math.max(-.08, Math.min(1.08, down.x0 + dx / span()));
  });
  el.addEventListener('pointerup', () => {
    if (!down) return;
    down = null; st.held = false;
    if (moved) { const dark = st.t > .5; st.t = dark ? 1 : 0; Theme.set(dark); }
    else { Theme.toggle(); }
  });
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); Theme.toggle(); } });
  return el;
}

/** B — segmented: sun | moon with the tab bar's bubble. */
export function switchB(el) {
  el.classList.add('sw', 'sw-b');
  el.innerHTML = `<span class="bub" aria-hidden="true"><i></i></span><span class="seg" data-v="0">${SUN}</span><span class="seg" data-v="1">${MOON}</span>`;
  glassPane(el);
  const bub = el.querySelector('.bub'), segs = [...el.querySelectorAll('.seg')];
  Squircle.watch(bub.firstElementChild);
  const st = { x: Theme.isDark() ? 1 : 0, t: 0 };
  st.t = st.x;
  const mark = () => segs.forEach(s => s.classList.toggle('on', +s.dataset.v === (Theme.isDark() ? 1 : 0)));
  Theme.on(d => { st.t = d ? 1 : 0; mark(); label(el); });
  mark(); label(el);
  loop(dt => {
    if (reduceMotion.matches) st.x = st.t; else spring(st, 'x', st.t, 260, .55, dt);
    const sp = Math.min(1, Math.abs(st.xv || 0) / 9);
    const w = segs[0].offsetWidth;
    bub.style.width = w + 'px';
    bub.style.transform = `translateX(${(st.x * w).toFixed(2)}px) scaleX(${(1 + sp * .25).toFixed(3)}) scaleY(${(1 - sp * .08).toFixed(3)})`;
  });
  el.addEventListener('click', e => { const s = e.target.closest('.seg'); Theme.set(s ? s.dataset.v === '1' : !Theme.isDark()); });
  return el;
}

/** C — eclipse: one round glass button; the moon slides over the sun, the rays fold away. */
export function switchC(el) {
  el.classList.add('sw', 'sw-c');
  glassPane(el);
  const icon = sunMoonIcon();
  el.prepend(icon);
  const st = { x: Theme.isDark() ? 1 : 0, s: 1 };
  Theme.on(() => { st.sv = (st.sv || 0) - 6; label(el); });
  label(el);
  loop(dt => {
    const t = Theme.isDark() ? 1 : 0;
    if (reduceMotion.matches) { st.x = t; st.s = 1; }
    else { spring(st, 'x', t, 120, .8, dt); spring(st, 's', 1, 420, .3, dt); st.s = Math.max(.7, Math.min(1.3, st.s)); }
    icon.set(Math.max(0, Math.min(1, st.x)));
    icon.style.transform = `scale(${st.s.toFixed(3)}) rotate(${((1 - st.x) * -30).toFixed(1)}deg)`;
  });
  el.addEventListener('click', () => Theme.toggle());
  return el;
}
