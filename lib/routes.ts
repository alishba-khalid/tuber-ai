// Route constants + the `?next=` round-trip used by every "you need to sign
// in / you need a plan" redirect in the app.
//
// The plans surface lives at /dashboard/credits (it shows the subscription
// tiers, the legacy balance and the checkout buttons). /dashboard/plans is
// wired up as a permanent redirect to it in next.config.ts so either URL
// works.
export const LOGIN_ROUTE = '/auth/login';
export const SIGNUP_ROUTE = '/auth/signup';
export const PLANS_ROUTE = '/dashboard/credits';

// Only ever follow a same-origin, single-leading-slash path. Anything else
// (absolute URL, protocol-relative //evil.com, or junk) falls back to the
// dashboard, so `?next=` can't be used as an open redirect.
export function safeNextPath(next: string | null | undefined, fallback = '/dashboard'): string {
  if (!next) return fallback;
  if (!next.startsWith('/') || next.startsWith('//')) return fallback;
  return next;
}

// Build `<route>?next=<current path + query>`. Used by the shared API error
// helper on a 401 and by every auth-gated redirect, so a user who signs in
// mid-flow lands back where they were — including the plan they had picked.
export function withNext(route: string, next: string): string {
  return `${route}?next=${encodeURIComponent(next)}`;
}

// Why a 402 sent the user to the plans page — shown as a message at the top
// of /dashboard/credits (see app/dashboard/credits/page.tsx) so "why am I
// here" is never a mystery. Every tool's generate action redirects here on
// a 402 instead of showing an error — see lib/handleApiError.ts and
// components/generator/GeneratorForm.tsx.
export type PaymentReason = 'no_plan' | 'insufficient_credits';

export function paywallHref(reason: PaymentReason): string {
  return `${PLANS_ROUTE}?reason=${reason}`;
}
