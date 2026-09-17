export interface GeneratorSettings {
  format: string;
  duration: string;
  voice: string;
  aspect: string;
  includeEbook: boolean;
}

export interface Draft {
  topic: string;
  script: string;
  settings: GeneratorSettings;
  savedAt: string;
}

export const DRAFT_STORAGE_KEY = 'gbg_draft';

// Same estimate used client-side for display and server-side for legacy
// credit enforcement — keep in sync, this is the single source of truth.
export function estimatedCreditCost(duration: string): number {
  const minutes = duration.includes('hr')
    ? parseFloat(duration) * 60
    : parseInt(duration, 10);
  return Math.round(minutes * 5);
}
