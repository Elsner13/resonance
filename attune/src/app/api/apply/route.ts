import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, working_on, tried, outcome, other } = await req.json()

  if (!name || !email || !working_on || !tried || !outcome) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.APPLY_TO_EMAIL

  if (!apiKey || !toEmail) {
    // Dev fallback — log to console until env vars are configured
    console.log('=== NEW COACHING APPLICATION ===')
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Working on:\n${working_on}`)
    console.log(`Tried:\n${tried}`)
    console.log(`Outcome:\n${outcome}`)
    if (other) console.log(`Other:\n${other}`)
    console.log('================================')
    return NextResponse.json({ ok: true })
  }

  const body = `
New coaching application from ${name}

———

Name: ${name}
Email: ${email}

What they're working on:
${working_on}

What they've already tried:
${tried}

What changes if it works:
${outcome}
${other ? `\nAnything else:\n${other}` : ''}
  `.trim()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Attune Applications <applications@attune.so>',
      to: toEmail,
      reply_to: email,
      subject: `Coaching application — ${name}`,
      text: body,
    }),
  })

  if (!res.ok) {
    console.error('Resend error:', await res.text())
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
