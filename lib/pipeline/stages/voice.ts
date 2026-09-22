import { isMockMode, mockStageCostCents, forcedFailStage } from '@/lib/pipeline/config';
import { artifactPaths, writeArtifact, writeJsonArtifact } from '@/lib/pipeline/storage';
import type { StageContext, StageModule, StageResult } from '@/lib/pipeline/types';
import type { ScriptOutput } from '@/lib/pipeline/stages/script';

export interface VoiceInput {
  script: ScriptOutput;
  voice: string;
}

export interface VoiceOutput {
  audioPath: string;
  durationSeconds: number;
  voice: string;
}

async function runMock(jobId: string, input: VoiceInput, _ctx: StageContext): Promise<StageResult<VoiceOutput>> {
  if (forcedFailStage() === 'voice') {
    throw new Error('forced failure: PIPELINE_FORCE_FAIL_STAGE=voice');
  }

  const audioPath = artifactPaths.audio(jobId);
  // Fake fixed-length narration audio — no real TTS call. Written as a small
  // placeholder file so downstream stages and the acceptance test have a
  // real artifact to point at, not just a string.
  await writeArtifact(audioPath, Buffer.from(`MOCK AUDIO for job ${jobId}, voice=${input.voice}`));

  const output: VoiceOutput = {
    audioPath,
    durationSeconds: input.script.chapters.length * 90,
    voice: input.voice,
  };

  const metaPath = `jobs/${jobId}/audio/voice-meta.json`;
  await writeJsonArtifact(metaPath, output);

  return {
    output,
    costCents: mockStageCostCents(),
    artifacts: [
      { path: audioPath, kind: 'audio' },
      { path: metaPath, kind: 'audio-meta' },
    ],
  };
}

export const voiceStage: StageModule<VoiceInput, VoiceOutput> = {
  name: 'voice',
  estimatedCostCents: () => mockStageCostCents(),
  async run(jobId, input, ctx) {
    if (!isMockMode()) {
      throw new Error('voice stage: no real provider wired yet — set PIPELINE_MOCK=true');
    }
    return runMock(jobId, input, ctx);
  },
};
