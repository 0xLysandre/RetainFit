import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { WelcomeEmail } from '@/components/emails/WelcomeEmail'
import { createResendClient } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { to, subject, template, props } = await request.json()

    // Validate required fields
    if (!to || !subject || !template) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, template' },
        { status: 400 }
      )
    }

    let htmlContent
    switch (template) {
      case 'welcome':
        htmlContent = await import('@/components/emails/WelcomeEmail').then(
          module => module.default(props)
        )
        break
      default:
        return NextResponse.json({ error: 'Invalid template' }, { status: 400 })
    }

    const resend = createResendClient()
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [to],
      subject,
      react: htmlContent,
    })

    if (error) {
      console.error('Email send error:', error)
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Email API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}