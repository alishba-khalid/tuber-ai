import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

// Plan configuration lookup (using standard Stripe price variables)
const plans: Record<string, { price: number; credits: number; name: string }> = {
  starter: { price: 29, credits: 300, name: 'Starter Plan' },
  plus: { price: 49, credits: 660, name: 'Plus Plan' },
  creator: { price: 89, credits: 1500, name: 'Creator Plan' },
  studio: { price: 139, credits: 2700, name: 'Studio Plan' },
  pro: { price: 259, credits: 6000, name: 'Pro Plan' },
};

export async function POST(request: Request) {
  try {
    const { planId, userId, email } = await request.json();

    if (!userId || !planId || !plans[planId]) {
      return NextResponse.json({ error: 'Missing parameters or invalid plan.' }, { status: 400 });
    }

    const selectedPlan = plans[planId];
    const host = request.headers.get('origin') || 'http://localhost:3000';

    // Mock mode fallback if keys are placeholder
    const isMockMode = !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder');
    if (isMockMode) {
      return NextResponse.json({ url: `${host}/dashboard/credits?mock-success=true&planId=${planId}` });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `TuberAI ${selectedPlan.name}`,
              description: `Get ${selectedPlan.credits.toLocaleString()} video generation credits`,
            },
            unit_amount: selectedPlan.price * 100, // in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      client_reference_id: userId, // CRITICAL: store the Firebase userId here so the webhook can read it!
      metadata: {
        planId,
        credits: selectedPlan.credits.toString(),
      },
      success_url: `${host}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${host}/dashboard/credits`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe session creation error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
