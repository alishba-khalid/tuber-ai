// No analytics provider is wired up yet (no env keys configured) — this is a
// thin seam so real tracking (PostHog/GA/etc.) can be dropped in later
// without touching call sites.
export function track(event: string, props?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`[analytics] ${event}`, props ?? {});
  }
  if (typeof window !== 'undefined') {
    (window as any).__gbgEvents = (window as any).__gbgEvents || [];
    (window as any).__gbgEvents.push({ event, props, at: Date.now() });
  }
}
