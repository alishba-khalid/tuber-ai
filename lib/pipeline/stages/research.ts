import { isMockMode, mockStageCostCents, forcedFailStage } from '@/lib/pipeline/config';
import { artifactPaths, writeJsonArtifact } from '@/lib/pipeline/storage';
import type { StageContext, StageModule, StageResult } from '@/lib/pipeline/types';

export interface ResearchInput {
  topic: string;
}

export interface ResearchOutput {
  topic: string;
  summary: string;
  keyFacts: string[];
  sources: string[];
}

async function runMock(jobId: string, input: ResearchInput, _ctx: StageContext): Promise<StageResult<ResearchOutput>> {
  if (forcedFailStage() === 'research') {
    throw new Error('forced failure: PIPELINE_FORCE_FAIL_STAGE=research');
  }

  const output: ResearchOutput = {
    topic: input.topic,
    summary: `A structured overview of "${input.topic}", covering its origins, key developments, and lasting significance.`,
    keyFacts: [
      `${input.topic} traces back further than most popular accounts suggest.`,
      `There are at least three distinct schools of thought on how to interpret ${input.topic}.`,
      `Modern understanding of ${input.topic} was reshaped by developments in the last century.`,
    ],
    sources: ['mock-source://encyclopedia/overview', 'mock-source://journal/recent-findings'],
  };

  const path = artifactPaths.research(jobId);
  await writeJsonArtifact(path, output);

  return {
    output,
    costCents: mockStageCostCents(),
    artifacts: [{ path, kind: 'research' }],
  };
}

export const researchStage: StageModule<ResearchInput, ResearchOutput> = {
  name: 'research',
  estimatedCostCents: () => mockStageCostCents(),
  async run(jobId, input, ctx) {
    if (!isMockMode()) {
      throw new Error('research stage: no real provider wired yet — set PIPELINE_MOCK=true');
    }
    return runMock(jobId, input, ctx);
  },
};
