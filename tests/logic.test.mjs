/* Unit tests for the site's logic. Run: node --test tests/ */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import { estimateAED, formatMoney } from '../js/brief-calc.js';
import { parseSubscribeInput, HONEYPOT_FIELD } from '../lib/subscribe.js';
import { scrollProgress } from '../js/progress.js';
import { tiltAt } from '../js/tilt.js';
import { nextIndex } from '../js/rotate.js';
import { superellipse } from '../js/superellipse.js';

const DATA = JSON.parse(fs.readFileSync(new URL('../content/brief.json', import.meta.url)));
const AED = DATA.CURRENCIES.find(c => c.code === 'AED'), EUR = DATA.CURRENCIES.find(c => c.code === 'EUR');

test('brief: nothing selected is 0', () => {
  assert.equal(estimateAED(DATA, { sel: {} }), 0);
});
test('brief: website type alone is its base price', () => {
  assert.equal(estimateAED(DATA, { web: true, type: 'Business Website', sel: {} }), DATA.WEBSITE_TYPES['Business Website'].base);
});
test('brief: a type without "website" ticked adds nothing', () => {
  assert.equal(estimateAED(DATA, { web: false, type: 'Business Website', sel: {} }), 0);
});
test('brief: features only count when compatible with the type', () => {
  const shipping = DATA.WEB_FEATURES.find(f => f.name === 'Shipping Setup');   // e-commerce only
  const base = DATA.WEBSITE_TYPES['Landing Page'].base;
  assert.equal(estimateAED(DATA, { web: true, type: 'Landing Page', sel: { feat_web: ['Shipping Setup'] } }), base);
  assert.equal(estimateAED(DATA, { web: true, type: 'E-commerce Store', sel: { feat_web: ['Shipping Setup'] } }), DATA.WEBSITE_TYPES['E-commerce Store'].base + shipping.price);
});
test('brief: same total as the old site for website + CMS + app + logo, rush level 4', () => {
  // expected value from the old brief/page.tsx rules: (base 5000 + CMS 1500 + app 20000 + logo 2500) × 1.15
  const t = estimateAED(DATA, { web: true, type: 'Business Website', app: true, urgency: 4, sel: { feat_web: ['CMS'], addons: ['Logo Design'] } });
  assert.equal(t, Math.round((5000 + 1500 + DATA.APP_BASE + 2500) * 1.15));
  assert.equal(t, 33350);
});
test('brief: redesign extras only count with a website', () => {
  const sel = { feat_redesign: ['SEO Migration'] };
  assert.equal(estimateAED(DATA, { app: true, redesign: true, sel }), DATA.APP_BASE);
  assert.equal(estimateAED(DATA, { web: true, type: 'Landing Page', redesign: true, sel }), DATA.WEBSITE_TYPES['Landing Page'].base + 800);
});
test('brief: urgency 1–3 has no surcharge, 5 adds 25%', () => {
  const c = { web: true, type: 'Landing Page', sel: {} }, base = DATA.WEBSITE_TYPES['Landing Page'].base;
  assert.equal(estimateAED(DATA, { ...c, urgency: 3 }), base);
  assert.equal(estimateAED(DATA, { ...c, urgency: 5 }), Math.round(base * 1.25));
});
test('brief: money formatting per currency', () => {
  assert.equal(formatMoney(33350, AED), 'AED 33,350');
  assert.equal(formatMoney(33350, EUR), '€8,338');
});

test('newsletter: valid email is trimmed', () => {
  assert.deepEqual(parseSubscribeInput({ email: '  a@b.co ' }), { kind: 'valid', email: 'a@b.co' });
});
test('newsletter: honeypot filled means bot', () => {
  assert.deepEqual(parseSubscribeInput({ email: 'a@b.co', [HONEYPOT_FIELD]: 'x' }), { kind: 'bot' });
});
test('newsletter: bad input is rejected', () => {
  for (const body of [null, 'x', {}, { email: 42 }, { email: 'nope' }, { email: 'a@b' }, { email: 'a'.repeat(250) + '@b.co' }]) assert.equal(parseSubscribeInput(body).kind, 'invalid');
});

test('scroll progress: 0 when the page does not scroll, clamped 0..1', () => {
  assert.equal(scrollProgress(0, 800, 900), 0);
  assert.equal(scrollProgress(500, 2000, 1000), .5);
  assert.equal(scrollProgress(5000, 2000, 1000), 1);
  assert.equal(scrollProgress(-20, 2000, 1000), 0);
});

test('tilt: centre is flat, corners lean up to the max, outside is clamped', () => {
  assert.deepEqual(tiltAt(50, 50, 100, 100), { rx: 0, ry: 0, mx: 50, my: 50 });
  assert.deepEqual(tiltAt(0, 0, 100, 100), { rx: 5, ry: -5, mx: 0, my: 0 });
  assert.deepEqual(tiltAt(300, -40, 100, 100), { rx: 5, ry: 5, mx: 100, my: 0 });
  assert.deepEqual(tiltAt(10, 10, 0, 0), { rx: 0, ry: 0, mx: 50, my: 50 });
});

test('rotate: steps through the slides and wraps around', () => {
  assert.equal(nextIndex(0, 7), 1);
  assert.equal(nextIndex(6, 7), 0);
  assert.equal(nextIndex(0, 0), 0);
});

test('superellipse: icon shape in the CSS matches n = 3.6 and stays inside the box', () => {
  const v = superellipse(3.6);
  assert.ok(fs.readFileSync(new URL('../css/pages.css', import.meta.url), 'utf8').includes(`--icon-shape: ${v};`));
  const nums = [...v.matchAll(/(-?[\d.]+)%/g)].map(m => +m[1]);
  assert.ok(nums.every(n => n >= 0 && n <= 100));
  assert.ok(v.startsWith('polygon(100% 50%'));
});
