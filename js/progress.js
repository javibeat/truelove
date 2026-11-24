/* Reading progress ring (same as beatlabs.ae): fills as you read, empties as you go back up.
   Tap or click it to glide back to the top. */
const R = 20, C = 2 * Math.PI * R;

/** How far the page has been read, 0..1. Zero when the page does not scroll. */
export const scrollProgress = (scrollY, scrollHeight, viewport) => {
  const max = scrollHeight - viewport;
  return max <= 0 ? 0 : Math.min(1, Math.max(0, scrollY / max));
};

export function progressRing(onTop) {
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'progress'; btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="progress-track" cx="24" cy="24" r="${R}"/><circle class="progress-bar" cx="24" cy="24" r="${R}" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg><span class="progress-num" aria-hidden="true"><span>0</span><small>%</small></span>`;
  document.body.append(btn);
  const ring = btn.querySelector('.progress-bar'), num = btn.querySelector('.progress-num span'), root = document.documentElement;
  let raf = 0;
  const update = () => {
    raf = 0;
    const p = scrollProgress(scrollY, root.scrollHeight, innerHeight);
    ring.style.strokeDashoffset = String(C * (1 - p));
    num.textContent = String(Math.round(p * 100));
    btn.style.setProperty('--p', p.toFixed(3));   // ring and number blend from ink to heart red as you read
    btn.classList.toggle('shown', scrollY > 120);
  };
  const ask = () => { if (!raf) raf = requestAnimationFrame(update); };
  addEventListener('scroll', ask, { passive: true });
  addEventListener('resize', ask);
  btn.addEventListener('click', () => onTop());
  update();
}
