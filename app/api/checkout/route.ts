import { NextResponse } from 'next/server';
import { polar } from '@/lib/polar';
import { adminAuth } from '@/lib/firebase-admin';
import { apiError } from '@/lib/api-errors';
import { getTier, polarProductIds } from '@/lib/plans';

// Polar subscription checkout — the sole payment provider for this app.
// Resolves the user from the Firebase ID token server-side rather than
// trusting a userId in the body.
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const host = request.headers.get('origin') || 'http://localhost:3000';

  if (!token) {
    return apiError('UNAUTHENTICATED', 'Sign in to start a checkout.');
  }

  let uid: string;
  let email: string | undefined;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
    email = decoded.email;
  } catch (err) {
    console.error('Checkout: invalid ID token', err);
    return apiError('UNAUTHENTICATED', 'Your session expired. Sign in again to continue.');
  }

  let planId = '';

  try {
    const body = await request.json();
    planId = body.planId;

    const tier = getTier(planId);
    if (!tier) {
      return apiError('BAD_REQUEST', 'That plan is no longer available. Pick one from the list.');
    }

    // One product per tier — no annual variant exists in Polar for any of
    // them (verified against the live catalog), so there's nothing to
    // select between here.
    const productId = polarProductIds[tier.id];
    const successUrl = `${host}/dashboard/create?checkout=success`;

    const isMockMode = !process.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN.includes('placeholder');
    if (isMockMode || !productId || productId.includes('placeholder')) {
      return NextResponse.json({
        url: `${successUrl}&mock_plan=${planId}`,
      });
    }

    const session = await polar.checkouts.create({
      products: [productId],
      successUrl,
      customerEmail: email,
      metadata: { userId: uid, planId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Polar subscription checkout error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json({
        url: `${host}/dashboard/create?checkout=success&mock_plan=${planId}`,
        warning: 'Polar API failed. Using local mock mode.',
      });
    }
    // Never leak a raw provider error message to the browser.
    return apiError('SERVER_ERROR', 'We could not open checkout right now. Please try again.');
  }
}
