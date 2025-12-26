import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Error occurred' }, { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);
  let evt: any;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as any;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({ error: 'Error occurred' }, { status: 400 });
  }

  const eventType = evt.type;

  switch (eventType) {
    case 'user.created':
      await handleUserCreated(evt.data);
      break;
    case 'organization.created':
      await handleOrganizationCreated(evt.data);
      break;
    case 'organizationMembership.created':
      await handleMembershipCreated(evt.data);
      break;
    default:
      console.log(`Unhandled event type: ${eventType}`);
  }

  return NextResponse.json({ success: true });
}

async function handleUserCreated(userData: any) {
  console.log(`User created: ${userData.email_addresses[0]?.email_address}`);
  // Here you could send a welcome email
}

async function handleOrganizationCreated(orgData: any) {
  console.log(`Organization created: ${orgData.name}`);
  // Here you could create initial database records for the studio
}

async function handleMembershipCreated(membershipData: any) {
  console.log(`Membership created: User ${membershipData.user_id} joined Org ${membershipData.organization_id}`);
  // Here you could handle user joining an organization
}