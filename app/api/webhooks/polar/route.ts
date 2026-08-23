import { Webhooks } from '@polar-sh/nextjs';
import { adminDb } from '@/lib/firebase-admin';
import { getPlan } from '@/lib/plans';

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET || '',
  onPayload: async (payload: any) => {
    if (payload.type === 'order.paid') {
      const order = payload.data;
      const userId = order.metadata?.userId;
      const planId = order.metadata?.planId || '';
      const addedCredits = parseInt(order.metadata?.credits || '0', 10);

      if (userId && addedCredits > 0) {
        try {
          const userRef = adminDb.collection('users').doc(userId);
          const transactionRef = userRef.collection('transactions').doc();
          
          const planInfo = getPlan(planId) || { name: 'Premium Plan', price: 0 };

          await adminDb.runTransaction(async (transaction: any) => {
            const userDoc = await transaction.get(userRef);

            // Update credits
            if (!userDoc.exists) {
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

            // Log transaction
            transaction.set(transactionRef, {
              id: transactionRef.id,
              desc: `Upgrade to ${planInfo.name} (Polar)`,
              credits: addedCredits,
              amount: planInfo.price,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              createdAt: new Date().toISOString(),
              type: 'purchase',
            });
          });

          console.log(`Successfully credited ${addedCredits} via Polar and recorded transaction for user ${userId}`);
        } catch (err) {
          console.error(`Error updating credits/transactions via Polar in Firestore:`, err);
        }
      }
    }
  }
});
