import { promises as fs } from 'fs';
import path from 'path';

// One folder per job: jobs/{jobId}/{research,script,audio,images,video}/...
// Paths are defined for every stage now even though only `script` (and
// `research`, which is just JSON) are ever actually written to for real —
// audio/images/video stay path-only placeholders until a real TTS/image/video
// API is wired in. Everything here is storage-backend agnostic: these are
// relative keys, resolved to local disk by the functions below. Swapping in
// real object storage later means changing writeArtifact/readArtifact, not
// any stage module or the orchestrator.
export const artifactPaths = {
  research: (jobId: string) => `jobs/${jobId}/research/research.json`,
  script: (jobId: string) => `jobs/${jobId}/script/script.json`,
  audio: (jobId: string) => `jobs/${jobId}/audio/voiceover.mp3`,
  image: (jobId: string, sceneIndex: number) =>
    `jobs/${jobId}/images/scene-${String(sceneIndex).padStart(3, '0')}.png`,
  video: (jobId: string) => `jobs/${jobId}/video/final.mp4`,
};

// Local-disk stand-in for real blob storage, scoped under the repo root so
// it's trivially inspectable in dev and cleaned up by deleting one folder.
// Never used in production (assertPipelineModeSafe forbids mock mode there,
// and no real stage writes through this yet).
const STORAGE_ROOT = path.join(process.cwd(), '.pipeline-storage');

function resolvePath(relativePath: string): string {
  return path.join(STORAGE_ROOT, relativePath);
}

export async function writeArtifact(relativePath: string, data: string | Buffer): Promise<void> {
  const absolute = resolvePath(relativePath);
  await fs.mkdir(path.dirname(absolute), { recursive: true });
  await fs.writeFile(absolute, data);
}

export async function writeJsonArtifact(relativePath: string, data: unknown): Promise<void> {
  await writeArtifact(relativePath, JSON.stringify(data, null, 2));
}

export async function readJsonArtifact<T>(relativePath: string): Promise<T> {
  const absolute = resolvePath(relativePath);
  const raw = await fs.readFile(absolute, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function artifactExists(relativePath: string): Promise<boolean> {
  try {
    await fs.access(resolvePath(relativePath));
    return true;
  } catch {
    return false;
  }
}
