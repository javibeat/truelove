/* Single entry point for every page (no inline scripts, so the CSP can stay strict). */
import { initChrome, glideTo } from './site.js';
import { enhanceWork } from './work.js';

const { page, active } = document.body.dataset;

if (page === 'home') {
  const { neural } = await import('./neural.js');
  neural(document.querySelector('.hero canvas'));
  const bar = initChrome({ active: 'top', onGo: id => glideTo(id === 'top' ? null : document.getElementById(id)) });
  document.querySelectorAll('[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); bar.go(a.dataset.go); }));
  // the bubble follows the section you are reading
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) bar.follow(e.target.id); }), { rootMargin: '-45% 0px -50% 0px' });
  ['top', 'work', 'services', 'studio', 'blog', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
} else {
  initChrome({ active });
  // the same quiet dot field as the home hero, behind every page title
  const field = document.querySelector('.page-head .field');
  if (field) import('./neural.js').then(({ neural }) => neural(field));
}

enhanceWork();

// Web design showcase: the sites take turns
document.querySelectorAll('[data-rotate]').forEach(el => import('./rotate.js').then(({ rotate }) => rotate(el)));

// Project brief (the client's starting form)
const briefRoot = document.getElementById('brief-app');
if (briefRoot) import('./brief.js').then(({ brief }) => brief(briefRoot));

// Blog: filter by topic
document.querySelectorAll('[data-filter-for]').forEach(el => import('./filter.js').then(({ filter }) => filter(el)));

// Contact: the time in Dubai
document.querySelectorAll('[data-dubai-time]').forEach(el => import('./clock.js').then(({ clock }) => clock(el)));

// Contact form → Formspree (same endpoint as the current site), with a clear error if it fails
const form = document.getElementById('contact-form');
if (form) {
  const err = document.getElementById('formError');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    err.hidden = true;
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.classList.add('sent');
    } catch { err.hidden = false; } finally { btn.disabled = false; }
  });
}

// Newsletter sign-up (blog)
document.querySelectorAll('form.nl').forEach(f => import('./newsletter.js').then(({ newsletter }) => newsletter(f)));
