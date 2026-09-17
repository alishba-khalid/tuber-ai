// Legacy prepaid-credit balances still spend down after the switch to
// subscriptions — flip to 'false' once all balances have drained.
// Server-side (route handlers, the actual enforcement point):
export const CREDITS_LEGACY_ENABLED = process.env.CREDITS_LEGACY_ENABLED !== 'false';
// Client-side mirror, display only (e.g. the "credits left" banner) — never
// used for enforcement, only NEXT_PUBLIC_ vars reach the browser bundle.
export const CREDITS_LEGACY_ENABLED_CLIENT = process.env.NEXT_PUBLIC_CREDITS_LEGACY_ENABLED !== 'false';

// Single source of truth for "does this user still ride the legacy credit
// path" — a balance strictly greater than zero, gated by the flag. Every
// place that decides between credit-consumption UI/logic and
// subscription-based UI/logic must go through one of these two, not
// reimplement the `> 0` check inline.
export function hasLegacyCredits(creditBalance: number): boolean {
  return CREDITS_LEGACY_ENABLED && creditBalance > 0;
}
export function hasLegacyCreditsClient(creditBalance: number): boolean {
  return CREDITS_LEGACY_ENABLED_CLIENT && creditBalance > 0;
}
