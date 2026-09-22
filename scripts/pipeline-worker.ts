// Standalone poller that actually drives enqueued jobs — the API route
// (app/api/generate) only ever writes a 'queued' jobs/{id} doc and returns.
// Run alongside `next dev`:
//   npm run pipeline:worker
//
// Safe to kill (Ctrl+C) at any point mid-job and restart: every stage
// transition is committed to Firestore before this process needs to know
// about it, so on restart the poll loop just picks the job back up and
// lib/pipeline/orchestrator#runJob resumes from the last completed stage.
import { adminDb } from '../lib/firebase-admin';
import { assertPipelineModeSafe } from '../lib/pipeline/config';
import { runJob } from '../lib/pipeline/orchestrator';

const POLL_INTERVAL_MS = 2000;
let shuttingDown = false;

async function findWork(): Promise<string[]> {
  const snap = await adminDb
    .collection('jobs')
    .where('status', 'in', ['queued', 'running'])
    .get();
  return snap.docs.map((d) => d.id);
}

async function tick(): Promise<void> {
  const jobIds = await findWork();
  for (const jobId of jobIds) {
    if (shuttingDown) return;
    try {
      await runJob(jobId);
    } catch (err) {
      console.error(`[pipeline-worker] job ${jobId} threw unexpectedly:`, err);
    }
  }
}

async function main() {
  assertPipelineModeSafe();
  console.log(
    `[pipeline-worker] starting (mock=${process.env.PIPELINE_MOCK === 'true'}, poll=${POLL_INTERVAL_MS}ms)`
  );

  process.on('SIGINT', () => {
    console.log('[pipeline-worker] shutting down...');
    shuttingDown = true;
  });
  process.on('SIGTERM', () => {
    shuttingDown = true;
  });

  while (!shuttingDown) {
    await tick();
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

main().catch((err) => {
  console.error('[pipeline-worker] fatal:', err);
  process.exit(1);
});
