// Hidden field only bots fill in (see NewsletterForm).
export const HONEYPOT_FIELD = 'website'

const MAX_EMAIL_LENGTH = 254
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SubscribeInput =
  | { kind: 'valid'; email: string }
  | { kind: 'bot' }
  | { kind: 'invalid' }

export function parseSubscribeInput(body: unknown): SubscribeInput {
  if (typeof body !== 'object' || body === null) return { kind: 'invalid' }
  const record = body as Record<string, unknown>

  const honeypot = record[HONEYPOT_FIELD]
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return { kind: 'bot' }

  const email = record.email
  if (typeof email !== 'string') return { kind: 'invalid' }
  const trimmed = email.trim()
  if (trimmed.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(trimmed)) {
    return { kind: 'invalid' }
  }
  return { kind: 'valid', email: trimmed }
}
