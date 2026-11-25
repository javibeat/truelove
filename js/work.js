/* Work cards are written into the HTML by tools/build.mjs (so search engines and AI read them);
   this only adds the behaviour: squircle corners and the poster tilt that follows the pointer. */
import { Squircle, reduceMotion } from './core.js';
import { tiltAt } from './tilt.js';

export function enhanceWork(root = document) {
  const still = reduceMotion.matches || matchMedia('(hover: none)').matches;
  root.querySelectorAll('.case').forEach(el => {
    Squircle.watch(el);
    const win = el.querySelector('.window');
    if (!win) return;
    Squircle.watch(win, .5);   // every window gets its own corners, or it would inherit the card's (bigger) path
    if (still) return;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), t = tiltAt(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
      el.classList.add('tilting');
      el.style.setProperty('--rx', `${t.rx}deg`); el.style.setProperty('--ry', `${t.ry}deg`);
      el.style.setProperty('--mx', `${t.mx}%`); el.style.setProperty('--my', `${t.my}%`);
    });
    el.addEventListener('pointerleave', () => { el.classList.remove('tilting'); ['--rx', '--ry'].forEach(k => el.style.removeProperty(k)); });
  });
}
