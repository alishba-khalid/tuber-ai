import type { GeneratorSettings } from '@/lib/generate-gate';

export const STAGES = ['research', 'script', 'voice', 'visuals', 'assembly'] as const;
export type StageName = (typeof STAGES)[number];

export type JobStatus = 'queued' | 'running' | 'failed' | 'complete' | 'cancelled';
export type StageStatus = 'pending' | 'running' | 'complete' | 'failed';

export interface JobInputs {
  topic: string;
  script: string;
  settings: GeneratorSettings;
}

// What the enqueue route deducted, so a failed job can reverse the exact
// same thing — mirrors the two modes in app/api/generate/route.ts.
export interface JobBilling {
  mode: 'credits' | 'subscription';
  amount: number; // credits deducted, or 1 for a subscription quota unit
}

export interface JobDoc {
  id: string;
  userId: string;
  status: JobStatus;
  currentStage: StageName | null;
  stageAttempts: Record<StageName, number>;
  createdAt: string;
  startedAt: string | null;
  finishedAt: string | null;
  errorMessage: string | null;
  totalCostCents: number;
  quotaConsumed: boolean;
  billing: JobBilling | null;
  inputs: JobInputs;
}

export interface JobStageDoc {
  jobId: string;
  stage: StageName;
  status: StageStatus;
  attempt: number;
  startedAt: string | null;
  finishedAt: string | null;
  costCents: number;
  outputRef: string | null;
  artifacts: string[];
  error: string | null;
}

export interface StageArtifact {
  path: string;
  kind: string;
}

export interface StageResult<TOutput = unknown> {
  output: TOutput;
  costCents: number;
  artifacts: StageArtifact[];
}

export interface StageContext {
  jobId: string;
  userId: string;
  mock: boolean;
}

// Every stage module — real or mock — implements this. `input` is always
// built by the orchestrator from PERSISTED prior-stage artifacts (see
// lib/pipeline/orchestrator.ts#buildStageInput), never passed through
// in-memory across stages, so a stage run mid-job and a stage run resumed
// after a crash take the identical code path.
export interface StageModule<TInput = unknown, TOutput = unknown> {
  name: StageName;
  estimatedCostCents(input: TInput, ctx: StageContext): number;
  run(jobId: string, input: TInput, ctx: StageContext): Promise<StageResult<TOutput>>;
}

export class StageFailedError extends Error {
  constructor(public stage: StageName, cause: unknown) {
    super(cause instanceof Error ? cause.message : String(cause));
    this.name = 'StageFailedError';
  }
}

export class CostCapExceededError extends Error {
  constructor(public stage: StageName, projectedCents: number, capCents: number) {
    super(`cost_cap_exceeded: stage "${stage}" would bring job to ${projectedCents}c, cap is ${capCents}c`);
    this.name = 'CostCapExceededError';
  }
}
