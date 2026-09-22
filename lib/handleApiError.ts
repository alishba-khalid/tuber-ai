'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { showToast } from '@/lib/toast';
import { track } from '@/lib/analytics';
import { LOGIN_ROUTE, PLANS_ROUTE, withNext } from '@/lib/routes';
import type { ApiErrorBody, ApiErrorCode } from '@/lib/api-errors';

// The paywall modal distinguishes "you have never subscribed" from "your
// plan is out of room this period" — that maps 1:1 onto the two 402 codes.
export type PaywallMode = 'subscribe' | 'upgrade';

const PAYWALL_MODE_BY_CODE: Partial<Record<ApiErrorCode, PaywallMode>> = {
  NO_PLAN: 'subscribe',
  INSUFFICIENT_CREDITS: 'upgrade',
};

// Reads the standard { error, code } body. Tolerates a route that somehow
// returns HTML or an empty body (a crashed function, a proxy error page) by
// falling back to a code derived from the status, so the caller always gets
// a usable ApiErrorBody instead of a parse exception.
export async function readApiError(res: Response): Promise<ApiErrorBody> {
  let body: Partial<ApiErrorBody> | null = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  if (body?.code) {
    return { error: body.error || 'Something went wrong.', code: body.code };
  }
  const code: ApiErrorCode =
    res.status === 401
      ? 'UNAUTHENTICATED'
      : res.status === 402
        ? 'NO_PLAN'
        : res.status === 404
          ? 'NOT_FOUND'
          : res.status === 400
            ? 'BAD_REQUEST'
            : 'SERVER_ERROR';
  return { error: body?.error || 'Something went wrong. Please try again.', code };
}

export interface ApiErrorHandlerOptions {
  // Render a paywall in place instead of navigating away. When omitted the
  // handler falls back to router.push(PLANS_ROUTE), so a tool that has no
  // modal of its own still lands the user on the plans page.
  onPaywall?: (mode: PaywallMode) => void;
}

/**
 * The single client-side handler every tool (Autopilot/Create, Scripts,
 * Voice Generation, Visuals, E-book) funnels failed API responses through.
 *
 *   401  -> /auth/login?next=<current path>   (draft + selected plan survive)
 *   402  -> upgrade modal, or /dashboard/credits when no modal is mounted
 *   else -> toast with the server's message
 *
 * Returns the ApiErrorCode so a caller can skip its own error UI.
 */
export function useApiErrorHandler(options?: ApiErrorHandlerOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const onPaywall = options?.onPaywall;

  const handleApiError = useCallback(
    async (input: Response | unknown): Promise<ApiErrorCode> => {
      // A thrown fetch (offline, DNS, aborted) never produces a Response.
      if (!(input instanceof Response)) {
        console.error('API request failed:', input);
        showToast('Could not reach the server. Check your connection and try again.');
        return 'SERVER_ERROR';
      }

      const { error, code } = await readApiError(input);
      track('api_error', { code, status: input.status, path: pathname });

      if (code === 'UNAUTHENTICATED') {
        // Preserve the query string too — that's where ?plan= / ?step= live.
        const search = typeof window !== 'undefined' ? window.location.search : '';
        router.push(withNext(LOGIN_ROUTE, `${pathname}${search}`));
        return code;
      }

      const paywallMode = PAYWALL_MODE_BY_CODE[code];
      if (paywallMode) {
        track('paywall_shown', { reason: paywallMode });
        if (onPaywall) {
          onPaywall(paywallMode);
        } else {
          router.push(PLANS_ROUTE);
        }
        return code;
      }

      showToast(error);
      return code;
    },
    [router, pathname, onPaywall]
  );

  return { handleApiError };
}
