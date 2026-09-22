import { isMockMode, mockStageCostCents, forcedFailStage } from '@/lib/pipeline/config';
import { artifactPaths, writeArtifact, writeJsonArtifact } from '@/lib/pipeline/storage';
import type { StageContext, StageModule, StageResult } from '@/lib/pipeline/types';
import type { VoiceOutput } from '@/lib/pipeline/stages/voice';
import type { VisualsOutput } from '@/lib/pipeline/stages/visuals';
import type { ScriptOutput } from '@/lib/pipeline/stages/script';

export interface AssemblyInput {
  script: ScriptOutput;
  voice: VoiceOutput;
  visuals: VisualsOutput;
}

export interface AssemblyOutput {
  videoPath: string;
  durationSeconds: number;
  chapterCount: number;
}

async function runMock(jobId: string, input: AssemblyInput, _ctx: StageContext): Promise<StageResult<AssemblyOutput>> {
  if (forcedFailStage() === 'assembly') {
    throw new Error('forced failure: PIPELINE_FORCE_FAIL_STAGE=assembly');
  }

  const videoPath = artifactPaths.video(jobId);
  await writeArtifact(
    videoPath,
    Buffer.from(
      `MOCK MP4 for job ${jobId}: ${input.visuals.images.length} scenes, ${input.voice.durationSeconds}s audio`
    )
  );

  const output: AssemblyOutput = {
    videoPath,
    durationSeconds: input.voice.durationSeconds,
    chapterCount: input.script.chapters.length,
  };

  const metaPath = `jobs/${jobId}/video/assembly-meta.json`;
  await writeJsonArtifact(metaPath, output);

  return {
    output,
    costCents: mockStageCostCents(),
    artifacts: [
      { path: videoPath, kind: 'video' },
      { path: metaPath, kind: 'video-meta' },
    ],
  };
}

export const assemblyStage: StageModule<AssemblyInput, AssemblyOutput> = {
  name: 'assembly',
  estimatedCostCents: () => mockStageCostCents(),
  async run(jobId, input, ctx) {
    if (!isMockMode()) {
      throw new Error('assembly stage: no real provider wired yet — set PIPELINE_MOCK=true');
    }
    return runMock(jobId, input, ctx);
  },
};
