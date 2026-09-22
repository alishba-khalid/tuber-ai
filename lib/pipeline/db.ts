import { adminDb } from '@/lib/firebase-admin';
import { STAGES, type JobBilling, type JobDoc, type JobInputs, type JobStageDoc, type StageName } from '@/lib/pipeline/types';

const jobsCol = () => adminDb.collection('jobs');
const jobStagesCol = () => adminDb.collection('job_stages');
const stageDocId = (jobId: string, stage: StageName) => `${jobId}__${stage}`;

function emptyAttempts(): Record<StageName, number> {
  return Object.fromEntries(STAGES.map((s) => [s, 0])) as Record<StageName, number>;
}

// Creates the job doc and one pending job_stages doc per stage, atomically,
// inside the caller's own transaction (the generate route's billing
// transaction) so the job is only ever created alongside a successful quota/
// credit deduction — never orphaned, never double-created.
export function buildNewJob(params: {
  jobId: string;
  userId: string;
  inputs: JobInputs;
  billing: JobBilling;
  quotaConsumed: boolean;
}): JobDoc {
  return {
    id: params.jobId,
    userId: params.userId,
    status: 'queued',
    currentStage: null,
    stageAttempts: emptyAttempts(),
    createdAt: new Date().toISOString(),
    startedAt: null,
    finishedAt: null,
    errorMessage: null,
    totalCostCents: 0,
    quotaConsumed: params.quotaConsumed,
    billing: params.billing,
    inputs: params.inputs,
  };
}

export function writeNewJobInTransaction(tx: FirebaseFirestore.Transaction, job: JobDoc): void {
  tx.set(jobsCol().doc(job.id), job);
  for (const stage of STAGES) {
    const stageDoc: JobStageDoc = {
      jobId: job.id,
      stage,
      status: 'pending',
      attempt: 0,
      startedAt: null,
      finishedAt: null,
      costCents: 0,
      outputRef: null,
      artifacts: [],
      error: null,
    };
    tx.set(jobStagesCol().doc(stageDocId(job.id, stage)), stageDoc);
  }
}

export async function getJob(jobId: string): Promise<JobDoc | null> {
  const snap = await jobsCol().doc(jobId).get();
  return snap.exists ? (snap.data() as JobDoc) : null;
}

export async function getStage(jobId: string, stage: StageName): Promise<JobStageDoc> {
  const snap = await jobStagesCol().doc(stageDocId(jobId, stage)).get();
  if (!snap.exists) {
    throw new Error(`job_stages doc missing for job ${jobId} stage ${stage} — job was not created via buildNewJob`);
  }
  return snap.data() as JobStageDoc;
}

export async function getAllStages(jobId: string): Promise<JobStageDoc[]> {
  const docs = await Promise.all(STAGES.map((stage) => getStage(jobId, stage)));
  return docs;
}

export async function markJobRunning(jobId: string): Promise<void> {
  await jobsCol().doc(jobId).set(
    { status: 'running', startedAt: new Date().toISOString() },
    { merge: true }
  );
}

export async function markJobComplete(jobId: string): Promise<void> {
  await jobsCol().doc(jobId).set(
    { status: 'complete', currentStage: null, finishedAt: new Date().toISOString() },
    { merge: true }
  );
}

export async function markJobFailed(jobId: string, errorMessage: string): Promise<void> {
  await jobsCol().doc(jobId).set(
    { status: 'failed', errorMessage, finishedAt: new Date().toISOString() },
    { merge: true }
  );
}

export async function markJobCancelled(jobId: string): Promise<void> {
  await jobsCol().doc(jobId).set(
    { status: 'cancelled', finishedAt: new Date().toISOString() },
    { merge: true }
  );
}

export async function markStageRunning(jobId: string, stage: StageName, attempt: number): Promise<void> {
  await adminDb.runTransaction(async (tx: FirebaseFirestore.Transaction) => {
    const ref = jobStagesCol().doc(stageDocId(jobId, stage));
    const snap = await tx.get(ref);
    const existing = snap.data() as JobStageDoc | undefined;
    tx.set(
      ref,
      {
        status: 'running',
        attempt,
        startedAt: existing?.startedAt ?? new Date().toISOString(),
        error: null,
      },
      { merge: true }
    );
    tx.set(jobsCol().doc(jobId), { currentStage: stage }, { merge: true });
  });
}

export async function markStageFailedAttempt(jobId: string, stage: StageName, attempt: number, error: string): Promise<void> {
  await adminDb.runTransaction(async (tx: FirebaseFirestore.Transaction) => {
    const stageRef = jobStagesCol().doc(stageDocId(jobId, stage));
    tx.set(stageRef, { status: 'failed', attempt, error, finishedAt: new Date().toISOString() }, { merge: true });
    const jobRef = jobsCol().doc(jobId);
    tx.set(jobRef, { stageAttempts: { [stage]: attempt } }, { merge: true });
  });
}

// Atomically: complete the stage doc, add its cost to the job ledger, and
// advance currentStage — all in one transaction, so a crash right after this
// commits still leaves the job in a consistent, resumable state (the stage
// reads back as 'complete' and is skipped on resume; totalCostCents was only
// ever incremented this once for this stage).
export async function completeStage(
  jobId: string,
  stage: StageName,
  attempt: number,
  result: { costCents: number; outputRef: string | null; artifacts: string[] }
): Promise<void> {
  await adminDb.runTransaction(async (tx: FirebaseFirestore.Transaction) => {
    const jobRef = jobsCol().doc(jobId);
    const jobSnap = await tx.get(jobRef);
    const job = jobSnap.data() as JobDoc;

    const stageRef = jobStagesCol().doc(stageDocId(jobId, stage));
    tx.set(
      stageRef,
      {
        status: 'complete',
        attempt,
        finishedAt: new Date().toISOString(),
        costCents: result.costCents,
        outputRef: result.outputRef,
        artifacts: result.artifacts,
        error: null,
      },
      { merge: true }
    );

    tx.set(
      jobRef,
      { totalCostCents: (job.totalCostCents ?? 0) + result.costCents },
      { merge: true }
    );
  });
}

// Idempotency guard for completeStage: if a process dies after the
// transaction above commits but before the orchestrator moves on, resuming
// must not re-add this stage's cost. Callers check stage.status === 'complete'
// via getStage()/getAllStages() before ever calling completeStage again.
