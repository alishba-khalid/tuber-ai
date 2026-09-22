import { isMockMode, mockStageCostCents, forcedFailStage } from '@/lib/pipeline/config';
import { artifactPaths, writeJsonArtifact } from '@/lib/pipeline/storage';
import type { StageContext, StageModule, StageResult } from '@/lib/pipeline/types';
import type { ResearchOutput } from '@/lib/pipeline/stages/research';
import type { GeneratorSettings } from '@/lib/generate-gate';

export interface ScriptInput {
  topic: string;
  settings: GeneratorSettings;
  research: ResearchOutput;
}

export interface ScriptChapter {
  title: string;
  narration: string;
}

export interface ScriptOutput {
  title: string;
  chapters: ScriptChapter[];
}

async function runMock(jobId: string, input: ScriptInput, _ctx: StageContext): Promise<StageResult<ScriptOutput>> {
  if (forcedFailStage() === 'script') {
    throw new Error('forced failure: PIPELINE_FORCE_FAIL_STAGE=script');
  }

  const output: ScriptOutput = {
    title: input.topic,
    chapters: [
      {
        title: 'Chapter 1: Origins',
        narration: `${input.research.summary} We begin at the beginning: ${input.research.keyFacts[0]}`,
      },
      {
        title: 'Chapter 2: Development',
        narration: `From there, ${input.topic} evolved in ways few expected. ${input.research.keyFacts[1] ?? ''}`,
      },
      {
        title: 'Chapter 3: Legacy',
        narration: `Today, the impact of ${input.topic} is still felt. ${input.research.keyFacts[2] ?? ''}`,
      },
    ],
  };

  const path = artifactPaths.script(jobId);
  await writeJsonArtifact(path, output);

  return {
    output,
    costCents: mockStageCostCents(),
    artifacts: [{ path, kind: 'script' }],
  };
}

export const scriptStage: StageModule<ScriptInput, ScriptOutput> = {
  name: 'script',
  estimatedCostCents: () => mockStageCostCents(),
  async run(jobId, input, ctx) {
    if (!isMockMode()) {
      throw new Error('script stage: no real provider wired yet — set PIPELINE_MOCK=true');
    }
    return runMock(jobId, input, ctx);
  },
};
