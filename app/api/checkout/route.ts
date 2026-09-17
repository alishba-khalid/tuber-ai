import { NextResponse } from 'next/server';
import { polar } from '@/lib/polar';
import { adminAuth } from '@/lib/firebase-admin';
import { getTier, polarProductIds } from '@/lib/plans';

// Polar subscription checkout — the sole payment provider for this app.
// Resolves the user from the Firebase ID token server-side rather than
// trusting a userId in the body.
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const host = request.headers.get('origin') || 'http://localhost:3000';

  if (!token) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let uid: string;
  let email: string | undefined;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
    email = decoded.email;
  } catch (err) {
    console.error('Checkout: invalid ID token', err);
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let planId = '';
  let interval: 'monthly' | 'annual' = 'monthly';

  try {
    const body = await request.json();
    planId = body.planId;
    interval = body.interval === 'annual' ? 'annual' : 'monthly';

    const tier = getTier(planId);
    if (!tier) {
      return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 });
    }

    const productId = polarProductIds[planId]?.[interval];
    const successUrl = `${host}/dashboard/create?checkout=success`;

    const isMockMode = !process.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN.includes('placeholder');
    if (isMockMode || !productId || productId.includes('placeholder')) {
      return NextResponse.json({
        url: `${successUrl}&mock_plan=${planId}&mock_interval=${interval}`,
      });
    }

    const session = await polar.checkouts.create({
      products: [productId],
      successUrl,
      customerEmail: email,
      metadata: { userId: uid, planId, interval },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Polar subscription checkout error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json({
        url: `${host}/dashboard/create?checkout=success&mock_plan=${planId}&mock_interval=${interval}`,
        warning: 'Polar API failed. Using local mock mode.',
      });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
