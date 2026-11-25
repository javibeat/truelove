/* A stage whose slides take turns (web and app showcases). Optional tab buttons ([data-for=<stage id>] [data-i])
   pick a slide. Auto-advance pauses on hover, off-screen, in a background tab, and is off with reduced motion. */
export const nextIndex = (i, n) => (n > 0 ? (i + 1) % n : 0);

export function rotate(stage, every = 4500) {
  const slides = [...stage.querySelectorAll('.slide')];
  if (slides.length < 2) return;
  const tabs = stage.id ? [...document.querySelectorAll(`[data-for="${stage.id}"] [data-i]`)] : [];
  let i = 0, hold = false, seen = true, timer = 0;
  const show = k => {
    i = k;
    slides.forEach((s, j) => { s.classList.toggle('on', j === k); if (s.tagName === 'A') s.tabIndex = j === k ? 0 : -1; });
    tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === k)));
  };
  const auto = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => { if (!hold && seen && !document.hidden) show(nextIndex(i, slides.length)); }, every); };
  tabs.forEach(t => t.addEventListener('click', () => { show(+t.dataset.i); auto(); }));
  stage.addEventListener('pointerenter', () => { hold = true; });
  stage.addEventListener('pointerleave', () => { hold = false; });
  new IntersectionObserver(([e]) => { seen = e.isIntersecting; }).observe(stage);
  auto();
}
