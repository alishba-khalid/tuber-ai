import type { StageModule, StageName } from '@/lib/pipeline/types';
import { researchStage } from '@/lib/pipeline/stages/research';
import { scriptStage } from '@/lib/pipeline/stages/script';
import { voiceStage } from '@/lib/pipeline/stages/voice';
import { visualsStage } from '@/lib/pipeline/stages/visuals';
import { assemblyStage } from '@/lib/pipeline/stages/assembly';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registry: Record<StageName, StageModule<any, any>> = {
  research: researchStage,
  script: scriptStage,
  voice: voiceStage,
  visuals: visualsStage,
  assembly: assemblyStage,
};

export function getStageModule(stage: StageName): StageModule {
  return registry[stage];
}

export { researchStage, scriptStage, voiceStage, visualsStage, assemblyStage };
