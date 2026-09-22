// Server-only startup safety checks. Each `assert*` here is called once per
// request from a place that renders/runs before any of the code it's
// guarding — see call sites for exactly where and why.

import { isFirebaseConfigured } from '@/lib/firebase';

// Guards against ever serving the localStorage-backed mock (lib/mock-
// generate.ts, and AuthProvider's whole `isMock` branch — fake auth, fake
// credits, fake subscriptions, client-side "generation" that never touches
// /api/generate) to a real visitor.
//
// isFirebaseConfigured has no environment awareness by itself — it's just
// "is NEXT_PUBLIC_FIREBASE_API_KEY set", which silently falls back to mock
// mode in ANY environment the moment that var is missing, unset, or
// mistyped, including a real production deployment. This is the guard that
// makes that failure loud instead of silent, the same way
// assertPipelineModeSafe() does for the render pipeline's mock stages.
//
// VERCEL_ENV (not NODE_ENV) is the right signal here: Next.js always builds
// with NODE_ENV=production, so NODE_ENV is 'production' for every Vercel
// deployment including previews — it can't distinguish "this is the real
// site" from "this is a preview build that may legitimately not have every
// secret configured yet". VERCEL_ENV can: it's only 'production' for the
// actual production deployment, and it's a real server-side env var (no
// NEXT_PUBLIC_ prefix needed) so this must run server-side, never in a
// client component.
export function assertAuthModeSafe(): void {
  if (!isFirebaseConfigured && process.env.VERCEL_ENV === 'production') {
    throw new Error(
      'NEXT_PUBLIC_FIREBASE_API_KEY is unset while VERCEL_ENV=production. Refusing to ' +
        'render: every visitor would silently fall back to the localStorage mock (fake ' +
        'auth, fake credits/subscription, client-side "generation" that never reaches ' +
        '/api/generate) instead of the real app. Set the Firebase env vars for the ' +
        'Production environment in Vercel, then redeploy.'
    );
  }
}
