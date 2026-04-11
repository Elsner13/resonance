// src/app/api/quiz-submit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ARCHETYPES } from '@/components/quiz/archetypes'
import type { ArchetypeKey } from '@/components/quiz/archetypes'

const resend = new Resend(process.env.RESEND_API_KEY)

interface QuizSubmitBody {
  firstName: string
  email: string
  archetype: ArchetypeKey
  scores: Record<ArchetypeKey, number>
}

export async function POST(req: NextRequest) {
  let body: QuizSubmitBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { firstName, email, archetype, scores } = body

  if (!firstName || !email || !archetype) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const archetypeData = ARCHETYPES[archetype]
  if (!archetypeData) {
    return NextResponse.json({ error: 'Invalid archetype' }, { status: 400 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.attunemastery.com'
  const pdfUrl = `${siteUrl}/pdfs/${archetypeData.pdfSlug}.pdf`

  // 1. Subscribe to Kit form
  let kitSuccess = false
  if (process.env.KIT_API_KEY && process.env.KIT_QUIZ_FORM_ID) {
    try {
      const kitRes = await fetch(
        `https://api.kit.com/v4/forms/${process.env.KIT_QUIZ_FORM_ID}/subscribers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.KIT_API_KEY}`,
          },
          body: JSON.stringify({
            email_address: email,
            first_name: firstName,
            fields: {
              archetype,
              archetype_scores: JSON.stringify(scores),
            },
          }),
        }
      )
      kitSuccess = kitRes.ok
      if (!kitRes.ok) {
        const err = await kitRes.text()
        console.error('[quiz-submit] Kit error:', err)
      }
    } catch (err) {
      console.error('[quiz-submit] Kit fetch failed:', err)
    }
  } else {
    console.warn('[quiz-submit] Kit env vars missing — skipping Kit subscription')
  }

  // 2. Send immediate PDF email via Resend
  let resendSuccess = false
  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'sam@attunemastery.com',
      to: email,
      subject: `Your Learner Archetype: ${archetypeData.name} — ${archetypeData.subtitle}`,
      html: buildEmail({ firstName, archetypeData, pdfUrl }),
    })
    if (error) {
      console.error('[quiz-submit] Resend error:', error)
    } else {
      resendSuccess = true
    }
  } catch (err) {
    console.error('[quiz-submit] Resend fetch failed:', err)
  }

  return NextResponse.json({
    success: true,
    archetype,
    kitSuccess,
    resendSuccess,
  })
}

function buildEmail({
  firstName,
  archetypeData,
  pdfUrl,
}: {
  firstName: string
  archetypeData: (typeof ARCHETYPES)[ArchetypeKey]
  pdfUrl: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#000000;color:#F0F0F0;font-family:'Inter',sans-serif;margin:0;padding:0;">
  <div style="max-width:600px;margin:0 auto;padding:48px 32px;">
    <p style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#555555;margin:0 0 32px;">ATTUNE</p>
    <h1 style="font-family:Georgia,serif;font-size:42px;font-weight:400;line-height:1.0;letter-spacing:-0.02em;color:#F0F0F0;margin:0 0 8px;">
      ${archetypeData.name}
    </h1>
    <p style="font-family:Georgia,serif;font-style:italic;font-size:18px;color:#888888;margin:0 0 32px;">
      ${archetypeData.greek} · ${archetypeData.subtitle}
    </p>
    <div style="width:48px;height:1px;background:#CC1133;margin:0 0 32px;"></div>
    <p style="font-size:15px;line-height:1.78;color:#888888;margin:0 0 16px;">Hi ${firstName},</p>
    <p style="font-size:15px;line-height:1.78;color:#888888;margin:0 0 32px;">
      ${archetypeData.tagline}
    </p>
    <p style="font-size:15px;line-height:1.78;color:#888888;margin:0 0 32px;">
      ${archetypeData.profile}
    </p>
    <p style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555555;margin:0 0 12px;">
      YOUR CORE CONSTRAINT
    </p>
    <p style="font-size:15px;line-height:1.78;color:#888888;margin:0 0 40px;">
      ${archetypeData.constraint}
    </p>
    <a href="${pdfUrl}" style="display:inline-block;background:#CC1133;color:#ffffff;text-decoration:none;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;padding:14px 32px;">
      Download Your Full Profile PDF →
    </a>
    <p style="font-size:13px;color:#555555;margin:48px 0 0;line-height:1.6;">
      The next step is Foundations — the operating system behind what your archetype actually needs.<br>
      <a href="https://www.attunemastery.com" style="color:#CC1133;text-decoration:none;">attunemastery.com →</a>
    </p>
    <p style="font-size:10px;color:#333333;margin:48px 0 0;letter-spacing:0.1em;">ATTUNE · Unsubscribe</p>
  </div>
</body>
</html>
  `.trim()
}
