import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { hasLegacyCredits } from '@/lib/flags';
import { estimatedCreditCost } from '@/lib/generate-gate';

// The client-side gate in components/generator/GeneratorForm.tsx is UX only.
// This route is the sole authority on whether a generation is allowed to
// start: legacy credit balance first (while CREDITS_LEGACY_ENABLED), then an
// active subscription with remaining monthly quota. Everything is decided
// and written inside one Firestore transaction, so a 402 here writes nothing
// — there is nothing to "refund" because nothing was ever deducted.
class GateError extends Error {
  constructor(public code: 'subscription_required' | 'quota_exceeded') {
    super(code);
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
  } catch (err) {
    console.error('Generate: invalid ID token', err);
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.topic !== 'string' || !body.settings) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }
  const { topic, script, settings } = body;
  const estimatedCost = estimatedCreditCost(settings.duration || '1 hr');

  const userRef = adminDb.collection('users').doc(uid);
  const projectId = 'proj_' + Math.random().toString(36).slice(2, 11);
  const projectRef = adminDb.collection('projects').doc(projectId);

  try {
    const { project } = await adminDb.runTransaction(async (tx: any) => {
      const userSnap = await tx.get(userRef);
      const userData = userSnap.exists ? userSnap.data() : {};
      const credits: number = userData?.credits ?? 0;
      const subscription = userData?.subscription ?? { status: 'none' };
      const quota = userData?.quota ?? { videosUsedThisPeriod: 0, videosLimit: 0 };

      let mode: 'credits' | 'subscription';

      // Legacy path only applies to a user who actually still HAS a balance
      // (> 0) — it must never catch a zero/absent balance and must never
      // block on "enough to cover this specific generation"; it just spends
      // down what's there (floored at 0) until it's gone.
      if (hasLegacyCredits(credits)) {
        mode = 'credits';
        tx.set(userRef, { credits: Math.max(0, credits - estimatedCost) }, { merge: true });
      } else if (subscription.status !== 'active') {
        throw new GateError('subscription_required');
      } else if (quota.videosUsedThisPeriod >= quota.videosLimit) {
        throw new GateError('quota_exceeded');
      } else {
        mode = 'subscription';
        tx.set(
          userRef,
          { quota: { ...quota, videosUsedThisPeriod: quota.videosUsedThisPeriod + 1 } },
          { merge: true }
        );
      }

      const cleanTitle = topic.trim().split(/[.!?\n]/)[0].slice(0, 60) || 'Untitled Video';
      const title = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
      const project = {
        id: projectId,
        userId: uid,
        title,
        topic,
        script: script || '',
        format: settings.format,
        duration: settings.duration,
        voice: settings.voice,
        aspect: settings.aspect,
        includeEbook: !!settings.includeEbook,
        credits: mode === 'credits' ? Math.min(credits, estimatedCost) : 0,
        status: 'queued',
        currentStage: 0,
        stageProgress: 0,
        views: '0',
        date: new Date().toISOString().split('T')[0],
      };
      tx.set(projectRef, project);
      return { project };
    });

    return NextResponse.json({ projectId, project });
  } catch (err: any) {
    if (err instanceof GateError) {
      return NextResponse.json({ error: err.code }, { status: 402 });
    }
    console.error('Generate error:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
