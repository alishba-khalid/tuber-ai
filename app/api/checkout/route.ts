import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getPlan } from '@/lib/plans';

export async function POST(request: Request) {
  let planId = '';
  let host = 'http://localhost:3000';
  try {
    const body = await request.json();
    planId = body.planId;
    const { userId, email } = body;

    const selectedPlan = getPlan(planId);
    if (!userId || !planId || !selectedPlan) {
      return NextResponse.json({ error: 'Missing parameters or invalid plan.' }, { status: 400 });
    }
    host = request.headers.get('origin') || 'http://localhost:3000';

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
              name: `GenByGhost ${selectedPlan.name} Plan`,
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
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Stripe API failed. Falling back to Mock Mode in development.');
      return NextResponse.json({ 
        url: `${host}/dashboard/credits?mock-success=true&planId=${planId}`,
        warning: 'Stripe API failed. Using local mock mode.' 
      });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
