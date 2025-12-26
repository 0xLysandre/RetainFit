import { Resend } from 'resend';
import { render } from '@react-email/render';

export function createResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  try {
    const client = createResendClient();
    const { data, error } = await client.emails.send({
      from: options.from || process.env.RESEND_FROM_EMAIL!,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      console.error('Email send error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

export async function sendTemplate(
  template: any,
  props: any,
  options: {
    to: string | string[];
    subject: string;
    from?: string;
  }
) {
  const html = await render(template(props));
  return sendEmail({
    ...options,
    html,
  });
}
