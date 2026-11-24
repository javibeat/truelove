/* Vercel serverless function: newsletter sign-up → MailerLite (same behaviour and env vars as the old site).
   Env: MAILERLITE_API_KEY, MAILERLITE_GROUP_ID. The key never reaches the browser. */
import { parseSubscribeInput } from '../lib/subscribe.js';

const GENERIC_ERROR = 'Subscription failed. Please try again later.';
const json = (status, data) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export async function POST(request) {
  if (!(request.headers.get('content-type') ?? '').includes('application/json')) return json(415, { error: 'Please enter a valid email.' });
  const raw = await request.text();
  if (raw.length > 2000) return json(413, { error: 'Please enter a valid email.' });
  let body;
  try { body = JSON.parse(raw); } catch { return json(400, { error: 'Please enter a valid email.' }); }

  const input = parseSubscribeInput(body);
  if (input.kind === 'bot') return json(200, { success: true });   // pretend it worked so bots learn nothing
  if (input.kind === 'invalid') return json(400, { error: 'Please enter a valid email.' });

  const { MAILERLITE_API_KEY: apiKey, MAILERLITE_GROUP_ID: groupId } = process.env;
  if (!apiKey || !groupId) { console.error('subscribe: MailerLite env vars are missing'); return json(500, { error: GENERIC_ERROR }); }

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ email: input.email, groups: [groupId] }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`subscribe: MailerLite responded ${res.status}`);
      return res.status === 422 ? json(400, { error: 'Please enter a valid email.' }) : json(502, { error: GENERIC_ERROR });
    }
  } catch (err) {
    console.error('subscribe: MailerLite request failed', err?.name ?? 'error');
    return json(502, { error: GENERIC_ERROR });
  }
  return json(200, { success: true });
}

export function GET() { return json(405, { error: 'Method not allowed' }); }
