/* Work cards are written into the HTML by tools/build.mjs (so search engines and AI read them);
   this only adds the squircle corners and the hairline that follows them. */
import { Squircle } from './core.js';

const NS = 'http://www.w3.org/2000/svg';
/** A 1px line drawn on the window's own squircle, kept in step with its size. */
function rim(win) {
  const svg = document.createElementNS(NS, 'svg'), path = document.createElementNS(NS, 'path');
  svg.setAttribute('class', 'rim'); svg.setAttribute('aria-hidden', 'true'); svg.append(path); win.append(svg);
  new ResizeObserver(() => { const w = win.offsetWidth, h = win.offsetHeight; if (!w) return; svg.setAttribute('viewBox', `0 0 ${w} ${h}`); path.setAttribute('d', Squircle.d(w - 1, h - 1, .5, .5)); }).observe(win);
}

export function enhanceWork(root = document) {
  root.querySelectorAll('.case').forEach(el => {
    Squircle.watch(el);
    const win = el.querySelector('.window');
    if (!win) return;
    Squircle.watch(win, .5);   // every window gets its own corners, or it would inherit the card's (bigger) path
    if (!el.classList.contains('invite')) rim(win);
  });
}
