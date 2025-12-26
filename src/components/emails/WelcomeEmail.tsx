import { BaseEmail } from './BaseEmail';
import { Heading, Text, Button } from '@react-email/components';

interface WelcomeEmailProps {
  memberName: string;
  studioName: string;
  dashboardUrl: string;
  memberEmail?: string;
}

export function WelcomeEmail({ memberName, studioName, dashboardUrl, memberEmail }: WelcomeEmailProps) {
  const trackingPixelUrl = memberEmail ?
    `${process.env.NEXT_PUBLIC_APP_URL}/api/email/track?event=open&email=${encodeURIComponent(memberEmail)}` :
    '';

  return (
    <BaseEmail preview={`Welcome to ${studioName}!`}>
      <Heading>Welcome to {studioName}!</Heading>
      <Text>Hi {memberName},</Text>
      <Text>
        We're thrilled to have you join our fitness community! Your account has been successfully created and you're all set to start your fitness journey with us.
      </Text>
      <Text>
        Get started by exploring our class schedule, booking your first session, and tracking your progress in your personal dashboard.
      </Text>
      <Button href={dashboardUrl}>Get Started</Button>
      {trackingPixelUrl && (
        <img
          src={trackingPixelUrl}
          width="1"
          height="1"
          alt=""
          style={{ display: 'none' }}
        />
      )}
      <Text>
        If you have any questions, don't hesitate to reach out to our support team.
      </Text>
      <Text>See you at the studio!</Text>
      <Text>The {studioName} Team</Text>
    </BaseEmail>
  );
}


export default WelcomeEmail;