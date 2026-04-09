import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
    },
    body: JSON.stringify({
      email,
      groups: [process.env.MAILERLITE_GROUP_ID],
    }),
  })

  if (!res.ok) {
    const data = await res.json()
    return NextResponse.json(
      { error: data.message || 'Subscription failed' },
      { status: res.status },
    )
  }

  return NextResponse.json({ success: true })
}
