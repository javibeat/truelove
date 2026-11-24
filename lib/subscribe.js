/* Newsletter input validation (ported from the Next.js site's app/lib/subscribe.ts). Shared by api/subscribe.js and the tests. */
export const HONEYPOT_FIELD = 'website';   // hidden field only bots fill in
const MAX_EMAIL_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @returns {{kind:'valid', email:string} | {kind:'bot'} | {kind:'invalid'}} */
export function parseSubscribeInput(body) {
  if (typeof body !== 'object' || body === null) return { kind: 'invalid' };
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return { kind: 'bot' };
  const email = body.email;
  if (typeof email !== 'string') return { kind: 'invalid' };
  const trimmed = email.trim();
  if (trimmed.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(trimmed)) return { kind: 'invalid' };
  return { kind: 'valid', email: trimmed };
}
