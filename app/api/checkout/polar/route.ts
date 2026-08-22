import { NextResponse } from 'next/server';
import { polar } from '@/lib/polar';

const plans: Record<string, { price: number; credits: number; name: string }> = {
  starter: { price: 29, credits: 300, name: 'Starter Plan' },
  plus: { price: 49, credits: 660, name: 'Plus Plan' },
  creator: { price: 89, credits: 1500, name: 'Creator Plan' },
  studio: { price: 139, credits: 2700, name: 'Studio Plan' },
  pro: { price: 259, credits: 6000, name: 'Pro Plan' },
};

const polarProductIds: Record<string, string> = {
  starter: process.env.POLAR_PRODUCT_ID_STARTER || 'polar_prod_starter_placeholder',
  plus: process.env.POLAR_PRODUCT_ID_PLUS || 'polar_prod_plus_placeholder',
  creator: process.env.POLAR_PRODUCT_ID_CREATOR || 'polar_prod_creator_placeholder',
  studio: process.env.POLAR_PRODUCT_ID_STUDIO || 'polar_prod_studio_placeholder',
  pro: process.env.POLAR_PRODUCT_ID_PRO || 'polar_prod_pro_placeholder',
};

export async function POST(request: Request) {
  try {
    const { planId, userId, email } = await request.json();

    if (!userId || !planId || !plans[planId]) {
      return NextResponse.json({ error: 'Missing parameters or invalid plan.' }, { status: 400 });
    }

    const selectedPlan = plans[planId];
    const productId = polarProductIds[planId];
    const host = request.headers.get('origin') || 'http://localhost:3000';

    // Mock checkout fallback
    const isMockMode = !process.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN.includes('placeholder');
    if (isMockMode || productId.includes('placeholder')) {
      return NextResponse.json({ url: `${host}/dashboard/credits?polar-mock-success=true&planId=${planId}` });
    }

    // Create Polar Checkout Session
    const session = await polar.checkouts.create({
      products: [productId],
      successUrl: `${host}/dashboard?checkout_id={CHECKOUT_ID}`,
      customerEmail: email,
      metadata: {
        userId,
        planId,
        credits: selectedPlan.credits,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Polar session creation error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
