import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId || !sessionId.startsWith('cs_')) {
    return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer'],
    });

    const howFound = session.custom_fields?.find(f => f.key === 'how_found');

    return NextResponse.json({
      name: session.customer_details?.name ?? '',
      email: session.customer_details?.email ?? '',
      phone: session.customer_details?.phone ?? '',
      country: session.customer_details?.address?.country ?? '',
      howFound: howFound?.dropdown?.value ?? '',
    });
  } catch {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }
}
