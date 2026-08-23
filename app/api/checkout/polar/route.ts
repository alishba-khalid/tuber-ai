import { NextResponse } from 'next/server';
import { polar } from '@/lib/polar';
import { getPlan } from '@/lib/plans';

const polarProductIds: Record<string, string> = {
  starter: process.env.POLAR_PRODUCT_ID_STARTER || 'polar_prod_starter_placeholder',
  plus: process.env.POLAR_PRODUCT_ID_PLUS || 'polar_prod_plus_placeholder',
  creator: process.env.POLAR_PRODUCT_ID_CREATOR || 'polar_prod_creator_placeholder',
  studio: process.env.POLAR_PRODUCT_ID_STUDIO || 'polar_prod_studio_placeholder',
  pro: process.env.POLAR_PRODUCT_ID_PRO || 'polar_prod_pro_placeholder',
};

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

    const productId = polarProductIds[planId];
    host = request.headers.get('origin') || 'http://localhost:3000';

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
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Polar API failed. Falling back to Mock Mode in development.');
      return NextResponse.json({ 
        url: `${host}/dashboard/credits?polar-mock-success=true&planId=${planId}`,
        warning: 'Polar API failed. Using local mock mode.' 
      });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
