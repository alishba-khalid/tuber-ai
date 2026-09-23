// Per-tool "resume where I left off after a plan/credit gate" storage.
//
// Every generate action that gets a 402 saves the exact form it was about
// to submit here (keyed by tool id, e.g. "create") right before redirecting
// to the plans page, and reads it back after a successful checkout so the
// user never retypes anything. Today there is only one tool — Autopilot,
// Scripts, Voice Generation, and Visuals in the sidebar all deep-link into
// the same GeneratorForm on /dashboard/create via ?step=, not separate
// forms — but this is keyed per tool id so a future dedicated tool page
// only has to pick its own key.
//
// Same shape as lib/generate-gate.ts's Draft (topic/script/settings/
// savedAt) by design — both feed the same GeneratorForm#applyDraft.
import type { GeneratorSettings } from '@/lib/generate-gate';

export interface PendingGeneration {
  topic: string;
  script: string;
  settings: GeneratorSettings;
  savedAt: string;
}

const keyFor = (tool: string) => `pendingGeneration:${tool}`;

export function savePendingGeneration(tool: string, data: Omit<PendingGeneration, 'savedAt'>): void {
  try {
    localStorage.setItem(keyFor(tool), JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
  } catch {
    // localStorage can throw (private browsing, quota exceeded) — losing the
    // resume convenience is acceptable, failing the redirect itself is not.
  }
}

export function readPendingGeneration(tool: string): PendingGeneration | null {
  try {
    const raw = localStorage.getItem(keyFor(tool));
    return raw ? (JSON.parse(raw) as PendingGeneration) : null;
  } catch {
    return null;
  }
}

export function clearPendingGeneration(tool: string): void {
  try {
    localStorage.removeItem(keyFor(tool));
  } catch {
    // ignore
  }
}
