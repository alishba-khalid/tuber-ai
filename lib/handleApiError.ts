'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { showToast } from '@/lib/toast';
import { track } from '@/lib/analytics';
import { LOGIN_ROUTE, paywallHref, withNext, type PaymentReason } from '@/lib/routes';
import type { ApiErrorBody, ApiErrorCode } from '@/lib/api-errors';

export type { PaymentReason };

// "You've never subscribed" vs "your plan is out of room this period" — maps
// 1:1 onto the two 402 codes, and becomes the ?reason= on the plans page.
const REASON_BY_CODE: Partial<Record<ApiErrorCode, PaymentReason>> = {
  NO_PLAN: 'no_plan',
  INSUFFICIENT_CREDITS: 'insufficient_credits',
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
  // Called right before the 402 redirect fires, so the caller can persist
  // whatever it needs first — e.g. save the filled-in form to localStorage
  // (see lib/pending-generation.ts) so nothing is lost by navigating away.
  // A 402 is never shown as an error: no toast, no "something went wrong".
  onPaymentRequired?: (reason: PaymentReason) => void;
}

/**
 * The single client-side handler every tool (Autopilot/Create, Scripts,
 * Voice Generation, Visuals, E-book) funnels failed API responses through.
 *
 *   401  -> /auth/login?next=<current path>            (form/plan survives)
 *   402  -> /dashboard/credits?reason=no_plan|insufficient_credits
 *           (onPaymentRequired runs first, to save any in-progress form)
 *   else -> toast with the server's message
 *
 * Returns the ApiErrorCode so a caller can skip its own error UI.
 */
export function useApiErrorHandler(options?: ApiErrorHandlerOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const onPaymentRequired = options?.onPaymentRequired;

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

      const reason = REASON_BY_CODE[code];
      if (reason) {
        track('paywall_redirect', { reason, path: pathname });
        onPaymentRequired?.(reason);
        router.push(paywallHref(reason));
        return code;
      }

      showToast(error);
      return code;
    },
    [router, pathname, onPaymentRequired]
  );

  return { handleApiError };
}
