import { adminDb } from '@/lib/firebase-admin';
import type { JobDoc } from '@/lib/pipeline/types';

// Exact inverse of the deduction app/api/generate/route.ts makes inside its
// billing transaction: credits mode adds the charged amount back, quota mode
// decrements the used-this-period counter by the one unit consumed. Called
// once, when a job is permanently marked failed (final retry exhausted, or
// cost cap exceeded) — never on a job that's still retrying.
export async function refundFailedJob(job: JobDoc): Promise<void> {
  if (!job.billing) return;

  const userRef = adminDb.collection('users').doc(job.userId);
  await adminDb.runTransaction(async (tx: FirebaseFirestore.Transaction) => {
    const snap = await tx.get(userRef);
    const data = snap.exists ? snap.data() : {};

    if (job.billing!.mode === 'credits') {
      const credits: number = data?.credits ?? 0;
      tx.set(userRef, { credits: credits + job.billing!.amount }, { merge: true });
      return;
    }

    if (job.billing!.mode === 'subscription' && job.quotaConsumed) {
      const quota = data?.quota ?? { videosUsedThisPeriod: 0, videosLimit: 0 };
      tx.set(
        userRef,
        { quota: { ...quota, videosUsedThisPeriod: Math.max(0, quota.videosUsedThisPeriod - 1) } },
        { merge: true }
      );
    }
  });
}
