import { assertPipelineModeSafe, isMockMode, MAX_STAGE_ATTEMPTS, maxJobCostCents, mockStageDelayMs, stageBackoffMs } from '@/lib/pipeline/config';
import {
  completeStage,
  getAllStages,
  getJob,
  getStage,
  markJobComplete,
  markJobFailed,
  markJobRunning,
  markStageFailedAttempt,
  markStageRunning,
} from '@/lib/pipeline/db';
import { getStageModule } from '@/lib/pipeline/stages';
import { artifactPaths, readJsonArtifact } from '@/lib/pipeline/storage';
import { STAGES, type JobDoc, type StageContext, type StageName } from '@/lib/pipeline/types';
import { refundFailedJob } from '@/lib/pipeline/billing';
import type { ResearchOutput } from '@/lib/pipeline/stages/research';
import type { ScriptOutput } from '@/lib/pipeline/stages/script';
import type { VoiceOutput } from '@/lib/pipeline/stages/voice';
import type { VisualsOutput } from '@/lib/pipeline/stages/visuals';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Builds each stage's input by reading the PRIOR stage's persisted artifact
// off disk — never from an in-memory value produced earlier in this process
// — so a stage run right after its predecessor and a stage run resumed after
// a crash/restart go through the exact same path.
async function buildStageInput(stage: StageName, job: JobDoc): Promise<unknown> {
  switch (stage) {
    case 'research':
      return { topic: job.inputs.topic };
    case 'script': {
      const research = await readJsonArtifact<ResearchOutput>(artifactPaths.research(job.id));
      return { topic: job.inputs.topic, settings: job.inputs.settings, research };
    }
    case 'voice': {
      const script = await readJsonArtifact<ScriptOutput>(artifactPaths.script(job.id));
      return { script, voice: job.inputs.settings.voice };
    }
    case 'visuals': {
      const script = await readJsonArtifact<ScriptOutput>(artifactPaths.script(job.id));
      return { script, aspect: job.inputs.settings.aspect };
    }
    case 'assembly': {
      const script = await readJsonArtifact<ScriptOutput>(artifactPaths.script(job.id));
      const voice = await readJsonArtifact<VoiceOutput>(`jobs/${job.id}/audio/voice-meta.json`);
      const visuals = await readJsonArtifact<VisualsOutput>(`jobs/${job.id}/images/visuals-meta.json`);
      return { script, voice, visuals };
    }
  }
}

class JobStoppedError extends Error {}

async function runStageWithRetry(job: JobDoc, stage: StageName): Promise<void> {
  const stageModule = getStageModule(stage);
  const ctx: StageContext = { jobId: job.id, userId: job.userId, mock: isMockMode() };

  const stageDoc = await getStage(job.id, stage);
  // A doc left 'running' means a crash happened mid-attempt — redo that same
  // attempt number. Otherwise ('pending' or 'failed') the next call is a
  // fresh attempt.
  let attempt = stageDoc.status === 'running' ? Math.max(stageDoc.attempt, 1) : stageDoc.attempt + 1;

  while (attempt <= MAX_STAGE_ATTEMPTS) {
    const input = await buildStageInput(stage, job);
    const estimatedCost = stageModule.estimatedCostCents(input, ctx);
    const freshJob = await getJob(job.id);
    const currentTotal = freshJob?.totalCostCents ?? job.totalCostCents;

    if (currentTotal + estimatedCost > maxJobCostCents()) {
      const message = `cost_cap_exceeded: total ${currentTotal}c + est. ${estimatedCost}c for "${stage}" exceeds cap of ${maxJobCostCents()}c`;
      await markJobFailed(job.id, message);
      await refundFailedJob(freshJob ?? job);
      throw new JobStoppedError(message);
    }

    await markStageRunning(job.id, stage, attempt);

    try {
      if (mockStageDelayMs() > 0) await sleep(mockStageDelayMs());
      const result = await stageModule.run(job.id, input, ctx);
      await completeStage(job.id, stage, attempt, {
        costCents: result.costCents,
        outputRef: result.artifacts[0]?.path ?? null,
        artifacts: result.artifacts.map((a) => a.path),
      });
      return;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await markStageFailedAttempt(job.id, stage, attempt, message);

      if (attempt >= MAX_STAGE_ATTEMPTS) {
        const failMessage = `stage "${stage}" failed after ${attempt} attempts: ${message}`;
        await markJobFailed(job.id, failMessage);
        const freshJobForRefund = await getJob(job.id);
        await refundFailedJob(freshJobForRefund ?? job);
        throw new JobStoppedError(failMessage);
      }

      await sleep(stageBackoffMs(attempt));
      attempt += 1;
    }
  }
}

// Drives a job through every stage from wherever it left off. Safe to call
// repeatedly/concurrently-in-sequence for the same job: each stage is
// skipped once its job_stages doc reads 'complete', so resuming after a
// crash never re-runs finished work or double-charges the cost ledger.
export async function runJob(jobId: string): Promise<void> {
  assertPipelineModeSafe();

  const job = await getJob(jobId);
  if (!job) throw new Error(`runJob: no such job ${jobId}`);
  if (job.status === 'complete' || job.status === 'cancelled' || job.status === 'failed') return;

  if (job.status === 'queued') {
    await markJobRunning(jobId);
  }

  try {
    for (const stage of STAGES) {
      const stageDoc = await getStage(jobId, stage);
      if (stageDoc.status === 'complete') continue;

      const currentJob = await getJob(jobId);
      if (!currentJob) return;
      await runStageWithRetry(currentJob, stage);
    }

    await markJobComplete(jobId);
  } catch (err) {
    if (err instanceof JobStoppedError) return; // already marked failed + refunded
    throw err;
  }
}

export async function getJobWithStages(jobId: string) {
  const job = await getJob(jobId);
  if (!job) return null;
  const stages = await getAllStages(jobId);
  return { job, stages };
}
