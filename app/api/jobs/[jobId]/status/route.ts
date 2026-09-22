import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { apiError } from '@/lib/api-errors';
import { getJobWithStages } from '@/lib/pipeline/orchestrator';
import { STAGES } from '@/lib/pipeline/types';

// Percent complete is derived purely from how many of the 5 stages have a
// job_stages doc with status 'complete' — never a timer, never an
// interpolated curve. A stage that's currently running or retrying still
// counts as 0% of its own slice; only a persisted 'complete' moves the bar.
export async function GET(request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;

  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return apiError('UNAUTHENTICATED');
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
  } catch (err) {
    console.error('Job status: invalid ID token', err);
    return apiError('UNAUTHENTICATED');
  }

  const result = await getJobWithStages(jobId);
  if (!result) {
    return apiError('NOT_FOUND', 'We could not find that job.');
  }
  const { job, stages } = result;
  // Someone else's job is reported as missing, not as forbidden, so this
  // endpoint can't be used to probe which job ids exist.
  if (job.userId !== uid) {
    return apiError('NOT_FOUND', 'We could not find that job.');
  }

  const completedCount = stages.filter((s) => s.status === 'complete').length;
  const percentComplete =
    job.status === 'complete' ? 100 : Math.round((completedCount / STAGES.length) * 100);

  return NextResponse.json({
    jobId: job.id,
    status: job.status,
    currentStage: job.currentStage,
    percentComplete,
    totalCostCents: job.totalCostCents,
    errorMessage: job.status === 'failed' ? job.errorMessage : null,
    stages: stages.map((s) => ({
      stage: s.stage,
      status: s.status,
      attempt: s.attempt,
      costCents: s.costCents,
      error: s.error,
    })),
  });
}
