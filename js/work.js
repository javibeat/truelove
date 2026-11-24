/* Work cards are written into the HTML by tools/build.mjs (so search engines and AI read them);
   this only adds the behaviour: squircle corners and the site scrolling inside its window. */
import { Squircle } from './core.js';

export function enhanceWork(root = document) {
  root.querySelectorAll('.case').forEach(el => {
    Squircle.watch(el);
    const win = el.querySelector('.window');
    if (!win || !win.querySelector('.page img')) return;   // the «Your project» card has no site inside
    Squircle.watch(win, .5);
    const img = win.querySelector('img'), page = win.querySelector('.page');
    const start = () => { el.classList.add('live'); const t = Math.max(0, img.offsetHeight - page.offsetHeight); img.style.transitionDuration = `${Math.max(2, t / 160)}s`; img.style.transform = `translateY(${-t}px)`; };
    const stop = () => { el.classList.remove('live'); img.style.transitionDuration = '.9s'; img.style.transform = 'translateY(0)'; };
    el.addEventListener('pointerenter', start); el.addEventListener('pointerleave', stop);
    el.addEventListener('focus', start); el.addEventListener('blur', stop);
    // phones have no hover: the site scrolls by itself while the card is on screen
    if (matchMedia('(hover: none)').matches) new IntersectionObserver(([e]) => (e.isIntersecting ? start : stop)(), { threshold: .6 }).observe(win);
  });
}
