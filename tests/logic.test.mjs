/* Unit tests for the site's logic. Run: node --test tests/ */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import { estimateAED, formatMoney } from '../js/brief-calc.js';
import { parseSubscribeInput, HONEYPOT_FIELD } from '../lib/subscribe.js';
import { scrollProgress } from '../js/progress.js';

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
