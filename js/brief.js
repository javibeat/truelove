/* Project brief — the client's starting form (same steps, prices and rules as the current truelovecreative.es/brief):
   about you → website / app → type → features → redesign → extras → after launch → goals → audience → vibe →
   content → urgency → notes, with a live estimate in AED/EUR/GBP/USD, a review screen and sending to Formspree.
   Data lives in content/brief.json (written to js/brief-data.js by the builder). */
import { DATA } from './brief-data.js';
import { Squircle } from './core.js';
import { estimateAED as calc, formatMoney, fits } from './brief-calc.js';

const FORMSPREE = 'https://formspree.io/f/mwvwnkow';
const { CURRENCIES, WEBSITE_TYPES, WEB_FEATURES, APP_FEATURES, APP_BASE, REDESIGN_FEATURES, ADDON_PRICES, URGENCY_MULT, GOALS, VIBES, CONTENT_HAVE, FIELD_LABELS } = DATA;
const URGENCY = [[1, 'No rush'], [2, 'Flexible'], [3, 'Standard'], [4, 'Soon'], [5, 'ASAP']];
const SUPPORT = [
  ['I’ll need ongoing support', 'Maintenance, updates, edits — we’ll tailor a plan to your site'],
  ['Just the build', 'I’ll manage it myself after delivery'],
  ['Not sure yet', 'We can discuss this later'],
];

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const normalizeUrl = v => { const t = v.trim(); return !t ? '' : /^https?:\/\//i.test(t) ? t : `https://${t}`; };

export function brief(root) {
  /* ── State ── */
  const st = { sel: {}, urgency: null, currency: 'AED', web: false, app: false, type: null, redesign: false, errors: {} };
  const set = (g) => (st.sel[g] ??= new Set());
  const has = (g, v) => st.sel[g]?.has(v) ?? false;
  const vals = g => [...(st.sel[g] ?? [])].join(', ');
  const cur = () => CURRENCIES.find(c => c.code === st.currency);
  const money = aed => formatMoney(aed, cur());

  const estimateAED = () => calc(DATA, { web: st.web, type: st.type, app: st.app, redesign: st.redesign, urgency: st.urgency, sel: st.sel });

  /* ── Building blocks ── */
  const step = ({ n, id, title, sub, required, body, err }) => `<section class="b-step card" ${id ? `id="${id}"` : ''}>
      ${n ? `<span class="b-num">${String(n).padStart(2, '0')}</span>` : ''}
      <h2>${esc(title)}${required ? '<span class="b-req" aria-hidden="true"> *</span>' : ''}</h2>
      ${sub ? `<p class="b-sub">${esc(sub)}</p>` : ''}
      <div class="b-body">${body}</div>
      ${err ? `<p class="b-err" role="alert">${esc(err)}</p>` : ''}
    </section>`;
  const input = (label, name, { type = 'text', required, placeholder = '', mode } = {}) => `<label class="b-field">
      <span>${esc(label)}${required ? '<span class="b-req" aria-hidden="true"> *</span>' : ''}</span>
      <input name="${name}" type="${type}" ${required ? 'required' : ''} ${mode ? `inputmode="${mode}"` : ''} placeholder="${esc(placeholder)}" maxlength="300" ${st.errors[name] ? 'aria-invalid="true"' : ''}>
      ${st.errors[name] ? `<em class="b-err">${esc(st.errors[name])}</em>` : ''}
    </label>`;
  const area = (name, placeholder, required) => `<textarea class="b-area" name="${name}" placeholder="${esc(placeholder)}" maxlength="3000" ${required ? 'required' : ''} ${st.errors[name] ? 'aria-invalid="true"' : ''}></textarea>${st.errors[name] ? `<em class="b-err">${esc(st.errors[name])}</em>` : ''}`;
  const row = (g, f) => `<button type="button" class="b-row${has(g, f.name) ? ' on' : ''}" data-g="${g}" data-v="${esc(f.name)}" aria-pressed="${has(g, f.name)}">
      <span><b>${esc(f.name)}</b><small>${esc(f.hint)}</small></span>
      <span class="b-price">${f.price > 0 ? `+${money(f.price)}` : 'Included'}</span>
    </button>`;
  const pills = (g, items, price) => `<div class="b-pills">${items.map(v => `<button type="button" class="b-pill${has(g, v) ? ' on' : ''}" data-g="${g}" data-v="${esc(v)}" aria-pressed="${has(g, v)}">${esc(v)}${price ? ` <small>+${money(price(v))}</small>` : ''}</button>`).join('')}</div>`;

  /* ── Render: only the parts that depend on choices are redrawn; typed text is kept ── */
  const form = document.createElement('form');
  form.className = 'b-form'; form.noValidate = true;
  root.innerHTML = '';
  const bar = document.createElement('div');
  bar.className = 'b-bar glass-lite sq';
  root.append(bar, form);
  Squircle.watch(bar, .6);

  const keep = () => Object.fromEntries([...form.querySelectorAll('input[name], textarea[name]')].map(el => [el.name, el.value]));
  const restore = v => form.querySelectorAll('input[name], textarea[name]').forEach(el => { if (v[el.name] != null) el.value = v[el.name]; });

  function render() {
    const typed = keep();
    const avail = st.type ? WEB_FEATURES.filter(f => fits(f, st.type)) : [];
    form.innerHTML = [
      step({ n: 1, title: 'About you', body: `<div class="b-two">${input('Name', 'name', { required: true, placeholder: 'Your full name' })}${input('Email', 'email', { type: 'email', required: true, placeholder: 'your@email.com' })}</div>
        <div class="b-two">${input('Phone / WhatsApp', 'phone', { type: 'tel', required: true, placeholder: '+971 5X XXX XXXX' })}${input('Company / Brand', 'company', { placeholder: 'Company or brand name' })}</div>
        ${input('Current website', 'current_site', { placeholder: 'your-site.com', mode: 'url' })}` }),
      step({ n: 2, id: 'card-service', title: 'What are you building?', sub: 'Select one or both.', required: true, err: st.errors._service,
        body: `<div class="b-two">
          <button type="button" class="b-big${st.web ? ' on' : ''}" data-act="web" aria-pressed="${st.web}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="3"/><path d="M3 8.5h18M8 21h8"/></svg><b>Website</b><small>from* ${money(Math.min(...Object.values(WEBSITE_TYPES).map(t => t.base)))}</small></button>
          <button type="button" class="b-big${st.app ? ' on' : ''}" data-act="app" aria-pressed="${st.app}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.6"/><path d="M11 18.5h2"/></svg><b>Mobile App</b><small>from* ${money(APP_BASE)}</small></button>
        </div>` }),
      st.web ? step({ id: 'card-webtype', title: 'What type of website?', sub: 'This sets your starting price. Features appear below.', required: true, err: st.errors._websiteType,
        body: `<div class="b-list">${Object.entries(WEBSITE_TYPES).map(([name, t]) => `<button type="button" class="b-row b-type${st.type === name ? ' on' : ''}" data-act="type" data-v="${esc(name)}" aria-pressed="${st.type === name}">
            <span><b>${esc(name)}</b><small>${esc(t.desc)}</small><small class="b-ideal">${esc(t.ideal)}</small>${st.type === name ? `<small class="b-inc">Includes: ${esc(t.includes)}</small>` : ''}</span>
            <span class="b-price"><small>from*</small>${money(t.base)}</span></button>`).join('')}</div>
          ${st.type ? `<div class="b-gap">${input('What is it about?', 'project_about', { placeholder: 'e.g. Real estate agency, hair salon, restaurant, personal portfolio, online clothing store...' })}</div>
          <button type="button" class="b-row b-check${st.redesign ? ' on' : ''}" data-act="redesign" aria-pressed="${st.redesign}"><span><b>This is a redesign of an existing site</b><small>Check this if you already have a website and want to replace it</small></span><span class="b-tick" aria-hidden="true"></span></button>
          ${st.redesign ? `<div class="b-sub-box"><p class="b-label">What do you need for the migration?</p><div class="b-list">${REDESIGN_FEATURES.map(f => row('feat_redesign', f)).join('')}</div></div>` : ''}` : ''}` }) : '',
      st.web && st.type ? step({ title: 'Add to your project', sub: `Compatible features for your ${st.type.toLowerCase()}. Pick what you need.`,
        body: `${avail.some(f => !f.price) ? `<p class="b-label">Included at no extra cost</p><div class="b-list">${avail.filter(f => !f.price).map(f => row('feat_web', f)).join('')}</div>` : ''}
          ${avail.some(f => f.price) ? `<p class="b-label">Optional add-ons</p><div class="b-list">${avail.filter(f => f.price).map(f => row('feat_web', f)).join('')}</div>` : ''}
          ${area('site_notes', 'Need something not listed? Tell us more about your project...')}` }) : '',
      st.app ? step({ title: 'App features', sub: 'What do you need for your mobile app?',
        body: `${input('What is the app about?', 'app_about', { placeholder: 'e.g. Food delivery, fitness tracker, booking system, social network, marketplace...' })}
          <div class="b-list b-gap">${APP_FEATURES.map(f => row('feat_app', f)).join('')}</div>
          ${!st.web ? area('site_notes', 'Tell us more about your app idea...') : ''}` }) : '',
      step({ title: 'Extra services', sub: 'Optional add-ons. Select all that apply.', body: `${pills('addons', Object.keys(ADDON_PRICES), k => ADDON_PRICES[k])}${area('addon_notes', 'Any other services you need...')}` }),
      step({ title: 'After launch', sub: 'Do you need us after the project is delivered?', body: `<div class="b-list">${SUPPORT.map(([l, h]) => `<button type="button" class="b-row b-radio${has('support', l) ? ' on' : ''}" data-act="support" data-v="${esc(l)}" aria-pressed="${has('support', l)}"><span><b>${esc(l)}</b><small>${esc(h)}</small></span><span class="b-dot" aria-hidden="true"></span></button>`).join('')}</div>` }),
      step({ n: 3, title: 'What should it achieve?', sub: 'The real objective behind the project.', body: `${pills('goals', GOALS)}${area('goals_notes', 'Specific goals or KPIs...')}` }),
      step({ n: 4, title: 'Who is it for?', sub: 'Describe your ideal customer or visitor.', required: true, body: area('audience', 'e.g. High-income professionals in Dubai aged 30-50, interested in luxury real estate investments...', true) }),
      step({ n: 5, title: 'What vibe are you going for?', sub: 'Pick the words that feel closest to your brand.', body: `${pills('vibe', VIBES)}<div class="b-two b-gap">${input('Reference website', 'ref1', { placeholder: 'example.com', mode: 'url' })}${input('Another reference', 'ref2', { placeholder: 'another-site.com (optional)', mode: 'url' })}</div>${area('vibe_notes', 'Colors, styles, or visual references you love...')}` }),
      step({ n: 6, title: 'What do you already have?', sub: 'Check everything you can provide.', body: `${pills('have', CONTENT_HAVE)}${area('content_notes', 'Other materials you have, or things you need help with...')}` }),
      step({ n: 7, title: 'How soon do you need this?', sub: 'Timing is agreed together once we know the project. Rush projects (level 4–5) include a priority surcharge.',
        body: `<div class="b-urg">${URGENCY.map(([n, l]) => `<button type="button" class="b-u${st.urgency === n ? ' on' : ''}${n >= 4 ? ' rush' : ''}" data-act="urgency" data-v="${n}" aria-pressed="${st.urgency === n}"><b>${n}</b><span>${l}</span>${n >= 4 ? `<small>+${Math.round((URGENCY_MULT[n] - 1) * 100)}%</small>` : ''}</button>`).join('')}</div>${area('timeline_notes', 'Specific deadline or launch date...')}` }),
      step({ n: 8, title: 'Anything else?', body: area('notes', 'Previous agency experiences, must-have features, competitors, inspirations... Optional but always useful.') }),
      `<p class="b-foot">*All prices are starting points. Final quote confirmed after consultation.</p>`,
      Object.keys(st.errors).length ? `<p class="b-summary" role="alert"><b>Please complete the required fields:</b> ${Object.keys(st.errors).map(n => FIELD_LABELS[n] ?? n).join(', ')}</p>` : '',
      `<p class="b-actions"><button type="submit" class="btn">Review brief →</button></p>`,
      `<input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">`,
    ].join('');
    restore(typed);
    form.querySelectorAll('.b-step, .b-row, .b-big, .b-u, .b-sub-box').forEach(el => Squircle.watch(el, el.classList.contains('b-step') ? 1 : .5));
    renderBar();
  }

  function renderBar() {
    const t = estimateAED();
    bar.innerHTML = `<div><span class="b-bar-k">${t ? 'Estimate from' : 'Project brief'}</span><b class="b-bar-v">${t ? money(t) + '*' : 'Select services below'}</b>${st.urgency >= 4 ? `<span class="b-rush">Rush +${Math.round((URGENCY_MULT[st.urgency] - 1) * 100)}%</span>` : ''}</div>
      <div class="b-cur" role="group" aria-label="Currency">${CURRENCIES.map(c => `<button type="button" data-cur="${c.code}" class="${st.currency === c.code ? 'on' : ''}" aria-pressed="${st.currency === c.code}">${c.code}</button>`).join('')}</div>`;
  }

  /* ── Interaction ── */
  const clearErr = name => { if (st.errors[name]) { delete st.errors[name]; return true; } return false; };
  root.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b || !root.contains(b)) return;
    if (b.dataset.cur) { st.currency = b.dataset.cur; render(); root.querySelector(`[data-cur="${b.dataset.cur}"]`)?.focus({ preventScroll: true }); return; }
    const { act, g, v } = b.dataset;
    if (act === 'web') { clearErr('_service'); st.web = !st.web; if (!st.web) { st.type = null; st.redesign = false; } }
    else if (act === 'app') { clearErr('_service'); st.app = !st.app; }
    else if (act === 'type') { clearErr('_websiteType'); st.type = st.type === v ? null : v; }
    else if (act === 'redesign') st.redesign = !st.redesign;
    else if (act === 'support') { const on = has('support', v); st.sel.support = new Set(on ? [] : [v]); }
    else if (act === 'urgency') st.urgency = st.urgency === +v ? null : +v;
    else if (g) {
      const s = set(g);
      if (g === 'have') { if (v === 'Nothing yet') { st.sel.have = new Set(s.has(v) ? [] : [v]); render(); return; } s.delete('Nothing yet'); }
      s.has(v) ? s.delete(v) : s.add(v);
    } else return;
    render();
    // keep keyboard focus on the same choice after redrawing
    const sel = b.dataset.cur ? `[data-cur="${b.dataset.cur}"]` : act ? `[data-act="${act}"]${v ? `[data-v="${CSS.escape(v)}"]` : ''}` : `[data-g="${g}"][data-v="${CSS.escape(v)}"]`;
    if (document.activeElement === document.body) root.querySelector(sel)?.focus({ preventScroll: true });
  });
  form.addEventListener('input', e => { if (e.target.name && clearErr(e.target.name)) { e.target.removeAttribute('aria-invalid'); e.target.parentElement.querySelector('.b-err')?.remove(); } });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const errs = {};
    form.querySelectorAll('[required]').forEach(el => {
      if (!el.checkValidity()) errs[el.name] = el.value.trim() ? (el.validity.typeMismatch ? 'Please enter a valid format' : 'Please check this field') : 'This field is required';
    });
    if (!st.web && !st.app) errs._service = 'Please select what you’re building — a website, an app, or both.';
    else if (st.web && !st.type) errs._websiteType = 'Please choose a website type to continue.';
    st.errors = errs;
    if (Object.keys(errs).length) {
      render();
      const first = [...form.querySelectorAll('[aria-invalid="true"], .b-err')].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (first?.matches('input, textarea')) first.focus({ preventScroll: true });
      return;
    }
    review();
  });

  /* ── Review and send ── */
  const value = n => form.querySelector(`[name="${n}"]`)?.value.trim() ?? '';
  const projectParts = () => {
    const parts = [];
    if (st.web && st.type) { const f = [...(st.sel.feat_web ?? [])].filter(n => WEB_FEATURES.some(x => x.name === n && fits(x, st.type))); parts.push(f.length ? `${st.type} (${f.join(', ')})` : st.type); }
    if (st.app) { const f = [...(st.sel.feat_app ?? [])]; parts.push(f.length ? `Mobile App (${f.join(', ')})` : 'Mobile App'); }
    return parts;
  };
  const urgencyText = () => st.urgency ? `${st.urgency}/5${st.urgency >= 4 ? ` (Rush +${Math.round((URGENCY_MULT[st.urgency] - 1) * 100)}%)` : ''}` : '';

  function fields() {
    return [
      ['Name', value('name')], ['Email', value('email')], ['Phone / WhatsApp', value('phone')], ['Company', value('company')],
      ['Current Website', normalizeUrl(value('current_site'))], ['Project', projectParts().join(' | ')], ['About', value('project_about')],
      ['App About', value('app_about')], ['Redesign', st.redesign ? (vals('feat_redesign') || 'Yes') : ''], ['Project Notes', value('site_notes')],
      ['Extra Services', vals('addons')], ['Extra Services Notes', value('addon_notes')], ['Ongoing Support', vals('support')],
      ['Goals', vals('goals')], ['Goals Notes', value('goals_notes')], ['Target Audience', value('audience')],
      ['Vibe / Style', vals('vibe')], ['Reference 1', normalizeUrl(value('ref1'))], ['Reference 2', normalizeUrl(value('ref2'))], ['Style Notes', value('vibe_notes')],
      ['Content Available', vals('have')], ['Content Notes', value('content_notes')], ['Urgency', urgencyText()], ['Timeline Notes', value('timeline_notes')],
      ['Additional Notes', value('notes')], ['Estimated Budget', estimateAED() ? money(estimateAED()) : 'N/A'],
    ].filter(([, v]) => v);
  }

  const sheet = document.createElement('div');
  sheet.className = 'b-review'; sheet.hidden = true;
  sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-labelledby', 'b-review-h');
  document.body.append(sheet);

  function review() {
    const rows = fields().filter(([k]) => k !== 'Estimated Budget');
    const t = estimateAED();
    sheet.innerHTML = `<div class="b-review-in">
      <p class="kicker">Review</p><h2 id="b-review-h">Your brief.</h2>
      <dl class="card b-dl">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      ${t ? `<div class="b-total sq"><span>Estimated budget*</span><b>${money(t)}</b></div>` : ''}
      <p class="b-actions"><button type="button" class="btn ghost" data-r="back">← Go back and edit</button><button type="button" class="btn" data-r="send">Send brief →</button></p>
      <p class="b-err" id="b-send-err" role="alert" hidden>That didn’t go through. Please try again, or write to info@truelovecreative.es.</p>
      <p class="b-foot">*All prices are starting points. Final quote confirmed after consultation.</p></div>`;
    sheet.hidden = false;
    document.documentElement.classList.add('b-locked');
    sheet.querySelectorAll('.card, .sq').forEach(el => Squircle.watch(el));
    sheet.scrollTop = 0;
    sheet.querySelector('[data-r="send"]').focus();
  }
  const close = () => { sheet.hidden = true; document.documentElement.classList.remove('b-locked'); };
  addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) close(); });
  sheet.addEventListener('click', async e => {
    const b = e.target.closest('[data-r]');
    if (!b) return;
    if (b.dataset.r === 'back') { close(); return; }
    const d = new FormData();
    fields().forEach(([k, v]) => d.set(k, v));
    if (form.querySelector('[name="_gotcha"]').value) return;   // a bot filled the hidden field
    d.set('_subject', `New Brief: ${value('name') || 'Someone'} — ${projectParts().join(' + ') || 'New enquiry'}`);
    b.disabled = true;
    try {
      const res = await fetch(FORMSPREE, { method: 'POST', body: d, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      close();
      root.innerHTML = `<div class="card b-done"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><h2>Brief received.</h2><p>Thank you for your time. We’ll review everything and get back to you within 24 hours.</p><a class="btn" href="/">Back to home</a></div>`;
      Squircle.watch(root.firstElementChild);
      scrollTo({ top: 0, behavior: 'smooth' });
    } catch { sheet.querySelector('#b-send-err').hidden = false; }
    finally { b.disabled = false; }
  });

  render();
}
