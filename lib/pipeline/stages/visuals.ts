import { isMockMode, mockStageCostCents, forcedFailStage } from '@/lib/pipeline/config';
import { artifactPaths, writeArtifact, writeJsonArtifact } from '@/lib/pipeline/storage';
import type { StageArtifact, StageContext, StageModule, StageResult } from '@/lib/pipeline/types';
import type { ScriptOutput } from '@/lib/pipeline/stages/script';

export interface VisualsInput {
  script: ScriptOutput;
  aspect: string;
}

export interface VisualsOutput {
  aspect: string;
  images: { sceneIndex: number; path: string; caption: string }[];
}

async function runMock(jobId: string, input: VisualsInput, _ctx: StageContext): Promise<StageResult<VisualsOutput>> {
  if (forcedFailStage() === 'visuals') {
    throw new Error('forced failure: PIPELINE_FORCE_FAIL_STAGE=visuals');
  }

  const images: VisualsOutput['images'] = [];
  const artifacts: StageArtifact[] = [];

  for (let i = 0; i < input.script.chapters.length; i++) {
    const chapter = input.script.chapters[i];
    const imagePath = artifactPaths.image(jobId, i);
    await writeArtifact(imagePath, Buffer.from(`MOCK IMAGE for "${chapter.title}", aspect=${input.aspect}`));
    images.push({ sceneIndex: i, path: imagePath, caption: chapter.title });
    artifacts.push({ path: imagePath, kind: 'image' });
  }

  const output: VisualsOutput = { aspect: input.aspect, images };

  const metaPath = `jobs/${jobId}/images/visuals-meta.json`;
  await writeJsonArtifact(metaPath, output);
  artifacts.push({ path: metaPath, kind: 'visuals-meta' });

  return {
    output,
    costCents: mockStageCostCents(),
    artifacts,
  };
}

export const visualsStage: StageModule<VisualsInput, VisualsOutput> = {
  name: 'visuals',
  estimatedCostCents: () => mockStageCostCents(),
  async run(jobId, input, ctx) {
    if (!isMockMode()) {
      throw new Error('visuals stage: no real provider wired yet — set PIPELINE_MOCK=true');
    }
    return runMock(jobId, input, ctx);
  },
};
