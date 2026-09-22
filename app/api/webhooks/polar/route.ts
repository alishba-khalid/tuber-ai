import { Webhooks } from '@polar-sh/nextjs';
import { adminDb } from '@/lib/firebase-admin';
import { getTier } from '@/lib/plans';

async function upsertSubscription(sub: any, status: 'active' | 'canceled' | 'none') {
  const userId = sub.metadata?.userId;
  const planId = sub.metadata?.planId;
  if (!userId) {
    console.warn('Polar subscription webhook missing metadata.userId', sub.id);
    return;
  }

  const tier = getTier(planId);
  const userRef = adminDb.collection('users').doc(userId);

  await adminDb.runTransaction(async (tx: any) => {
    const userSnap = await tx.get(userRef);
    const existingQuota = userSnap.exists ? userSnap.data()?.quota : null;

    const subscription = {
      status,
      tier: planId || null,
      polarSubscriptionId: sub.id,
      polarCustomerId: sub.customerId || sub.customer_id || null,
      currentPeriodEnd: sub.currentPeriodEnd || sub.current_period_end || null,
    };

    const periodStart = new Date().toISOString();
    const isNewPeriod =
      status === 'active' &&
      (!existingQuota || existingQuota.periodStart !== periodStart) &&
      (!existingQuota || subscription.currentPeriodEnd !== userSnap.data()?.subscription?.currentPeriodEnd);

    const quota =
      status === 'active' && tier && isNewPeriod
        ? { videosUsedThisPeriod: 0, videosLimit: tier.videosPerMonth, periodStart }
        : existingQuota;

    tx.set(userRef, { subscription, ...(quota ? { quota } : {}) }, { merge: true });
  });
}

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET || '',
  onPayload: async (payload: any) => {
    // Legacy one-time credit top-ups — dormant now that the purchase UI is
    // removed, but left in place in case an order is still in flight.
    if (payload.type === 'order.paid') {
      const order = payload.data;
      const userId = order.metadata?.userId;
      const addedCredits = parseInt(order.metadata?.credits || '0', 10);

      if (userId && addedCredits > 0) {
        try {
          const userRef = adminDb.collection('users').doc(userId);
          const transactionRef = userRef.collection('transactions').doc();

          await adminDb.runTransaction(async (transaction: any) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
              transaction.set(userRef, { credits: addedCredits, updatedAt: new Date().toISOString() });
            } else {
              const currentCredits = userDoc.data()?.credits ?? 0;
              transaction.update(userRef, { credits: currentCredits + addedCredits, updatedAt: new Date().toISOString() });
            }
            transaction.set(transactionRef, {
              id: transactionRef.id,
              desc: 'Legacy credit top-up (Polar)',
              credits: addedCredits,
              amount: order.amount ?? 0,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              createdAt: new Date().toISOString(),
              type: 'purchase',
            });
          });
        } catch (err) {
          console.error('Error crediting legacy top-up via Polar:', err);
        }
      }
      return;
    }

    // Subscription lifecycle — the source of truth for /api/generate's gate.
    if (payload.type === 'subscription.created' || payload.type === 'subscription.updated') {
      try {
        await upsertSubscription(payload.data, 'active');
      } catch (err) {
        console.error(`Error handling ${payload.type}:`, err);
      }
      return;
    }

    if (payload.type === 'subscription.canceled') {
      // Cancellation takes effect at period end — keep access alive until
      // then; /api/generate only checks status === 'active'.
      try {
        await upsertSubscription(payload.data, 'active');
      } catch (err) {
        console.error('Error handling subscription.canceled:', err);
      }
      return;
    }

    if (payload.type === 'subscription.revoked') {
      try {
        await upsertSubscription(payload.data, 'none');
      } catch (err) {
        console.error('Error handling subscription.revoked:', err);
      }
      return;
    }
  },
});
