// Mirrors app/api/generate/route.ts's decision logic for mock mode (no
// Firebase/Polar keys configured), the same way every other payment surface
// in this app (AuthProvider, the Polar checkout routes) falls back to a
// localStorage-backed mock rather than skipping the check entirely.
import { hasLegacyCreditsClient } from '@/lib/flags';
import { getTier } from '@/lib/plans';

export interface MockSubscription {
  status: 'active' | 'canceled' | 'none';
  tier: string | null;
  currentPeriodEnd: string | null;
}

export interface MockQuota {
  videosUsedThisPeriod: number;
  videosLimit: number;
  periodStart: string;
}

const subKey = (uid: string) => `genbyghost_subscription_${uid}`;
const quotaKey = (uid: string) => `genbyghost_quota_${uid}`;
const creditsKey = (uid: string) => `genbyghost_credits_${uid}`;

export function getMockSubscription(uid: string): MockSubscription {
  const raw = localStorage.getItem(subKey(uid));
  return raw ? JSON.parse(raw) : { status: 'none', tier: null, currentPeriodEnd: null };
}

export function getMockQuota(uid: string): MockQuota {
  const raw = localStorage.getItem(quotaKey(uid));
  return raw ? JSON.parse(raw) : { videosUsedThisPeriod: 0, videosLimit: 0, periodStart: new Date().toISOString() };
}

// Called after a mock checkout "success" redirect to activate the plan the
// user picked, standing in for what the real Polar webhook does server-side.
export function activateMockSubscription(uid: string, planId: string) {
  const tier = getTier(planId);
  if (!tier) return;
  localStorage.setItem(
    subKey(uid),
    JSON.stringify({
      status: 'active',
      tier: planId,
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    } satisfies MockSubscription)
  );
  localStorage.setItem(
    quotaKey(uid),
    JSON.stringify({
      videosUsedThisPeriod: 0,
      videosLimit: tier.videosPerMonth,
      periodStart: new Date().toISOString(),
    } satisfies MockQuota)
  );
}

// Rejection codes match app/api/generate/route.ts exactly, so mock mode and
// real mode feed the shared client error handler the same vocabulary.
export type MockGenerateResult =
  | { ok: true; projectId: string; mode: 'credits' | 'subscription' }
  | { ok: false; code: 'NO_PLAN' | 'INSUFFICIENT_CREDITS' };

export function runMockGenerateGate(uid: string, estimatedCost: number): MockGenerateResult {
  const projectId = 'proj_' + Math.random().toString(36).slice(2, 11);
  const credits = parseInt(localStorage.getItem(creditsKey(uid)) || '0', 10);

  if (hasLegacyCreditsClient(credits)) {
    localStorage.setItem(creditsKey(uid), String(Math.max(0, credits - estimatedCost)));
    return { ok: true, projectId, mode: 'credits' };
  }

  const subscription = getMockSubscription(uid);
  if (subscription.status !== 'active') {
    return { ok: false, code: 'NO_PLAN' };
  }

  const quota = getMockQuota(uid);
  if (quota.videosUsedThisPeriod >= quota.videosLimit) {
    return { ok: false, code: 'INSUFFICIENT_CREDITS' };
  }

  localStorage.setItem(
    quotaKey(uid),
    JSON.stringify({ ...quota, videosUsedThisPeriod: quota.videosUsedThisPeriod + 1 } satisfies MockQuota)
  );
  return { ok: true, projectId, mode: 'subscription' };
}
