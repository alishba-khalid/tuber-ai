import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userId = session.client_reference_id;
    const addedCredits = parseInt(session.metadata?.credits || '0', 10);

    if (userId && addedCredits > 0) {
      try {
        const userRef = adminDb.collection('users').doc(userId);
        
        await adminDb.runTransaction(async (transaction: any) => {
          const userDoc = await transaction.get(userRef);
          
          if (!userDoc.exists) {
            // Document doesn't exist, create it
            transaction.set(userRef, {
              credits: addedCredits,
              updatedAt: new Date().toISOString(),
            });
          } else {
            const currentCredits = userDoc.data()?.credits ?? 0;
            transaction.update(userRef, {
              credits: currentCredits + addedCredits,
              updatedAt: new Date().toISOString(),
            });
          }
        });

        console.log(`Successfully credited ${addedCredits} to user ${userId}`);
      } catch (err) {
        console.error(`Error updating credits in Firestore:`, err);
        return NextResponse.json({ error: 'Failed to update Firestore credits.' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
