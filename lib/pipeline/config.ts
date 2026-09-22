// Central switches for the pipeline. Read once per call, not cached, so
// tests can flip env vars between runs without a process restart.

export function isMockMode(): boolean {
  return process.env.PIPELINE_MOCK === 'true';
}

// Guards against ever serving mock pipeline output to a real user. Call this
// at every entrypoint that can start or resume a job (the enqueue route, the
// orchestrator, the worker process) — it throws synchronously and must never
// be caught/retried by the per-stage retry loop.
export function assertPipelineModeSafe(): void {
  if (isMockMode() && process.env.NODE_ENV === 'production') {
    throw new Error(
      'PIPELINE_MOCK=true while NODE_ENV=production. Refusing to run: mock stage ' +
        'output must never reach a real user. Unset PIPELINE_MOCK or fix NODE_ENV.'
    );
  }
}

export const MAX_STAGE_ATTEMPTS = 3;

export function stageBackoffMs(attempt: number): number {
  // attempt is 1-indexed (the attempt that just failed). 1s, 2s, 4s.
  return 1000 * 2 ** (attempt - 1);
}

export function maxJobCostCents(): number {
  const raw = process.env.MAX_JOB_COST_CENTS;
  const parsed = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 500; // $5 default cap
}

// Non-zero by default so MAX_JOB_COST_CENTS is actually exercisable against
// mock runs; the stage contract says "mock can record 0" (permitted), not
// "must" — override to 0 with PIPELINE_MOCK_STAGE_COST_CENTS if you want
// zero-cost mock runs.
export function mockStageCostCents(): number {
  const raw = process.env.PIPELINE_MOCK_STAGE_COST_CENTS;
  const parsed = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 25;
}

// Test-only hook: set to a stage name to make that stage's mock adapter
// always throw, for exercising the retry/backoff/refund path end-to-end
// without needing a real flaky dependency.
export function forcedFailStage(): string | null {
  return process.env.PIPELINE_FORCE_FAIL_STAGE || null;
}

// Test-only hook: artificial per-stage delay (ms) the orchestrator waits
// before invoking a stage's run(). Lets a crash/restart test reliably kill
// the worker process mid-stage instead of racing a mock run that would
// otherwise finish in single-digit milliseconds.
export function mockStageDelayMs(): number {
  const raw = process.env.PIPELINE_MOCK_STAGE_DELAY_MS;
  const parsed = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}
