import { NextResponse } from 'next/server'
import { parseSubscribeInput } from '../../lib/subscribe'

const GENERIC_ERROR = 'Subscription failed. Please try again later.'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
  }

  const input = parseSubscribeInput(body)
  if (input.kind === 'bot') {
    // Pretend it worked so bots don't learn about the trap.
    return NextResponse.json({ success: true })
  }
  if (input.kind === 'invalid') {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
  }

  const apiKey = process.env.MAILERLITE_API_KEY
  const groupId = process.env.MAILERLITE_GROUP_ID
  if (!apiKey || !groupId) {
    console.error('subscribe: MailerLite env vars are missing')
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 })
  }

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email: input.email, groups: [groupId] }),
    })

    if (!res.ok) {
      console.error(`subscribe: MailerLite responded ${res.status}`)
      const status = res.status === 422 ? 400 : 502
      const error = res.status === 422 ? 'Please enter a valid email.' : GENERIC_ERROR
      return NextResponse.json({ error }, { status })
    }
  } catch (err) {
    console.error('subscribe: MailerLite request failed', err)
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
