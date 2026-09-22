import { NextResponse } from 'next/server';

// Single source of truth for the JSON body every API route returns on a
// failure. Before this existed each route invented its own shape
// ({ error: 'unauthorized' } / { error: 'quota_exceeded' } / a raw
// err.message), so the client had to special-case every endpoint and
// silently fell through to "something went wrong" for most of them.
//
// Every error response is now exactly: { error: string, code: ApiErrorCode }
//   UNAUTHENTICATED       401  no / invalid Firebase ID token
//   NO_PLAN               402  signed in, but no active subscription
//   INSUFFICIENT_CREDITS  402  active plan, but this period's quota is spent
//   SERVER_ERROR          500  anything unexpected
//
// BAD_REQUEST (400) and NOT_FOUND (404) are also in the union because these
// routes genuinely need them; the shared client helper treats them as
// "show the message", not as an auth/billing signal.
export type ApiErrorCode =
  | 'UNAUTHENTICATED'
  | 'NO_PLAN'
  | 'INSUFFICIENT_CREDITS'
  | 'SERVER_ERROR'
  | 'BAD_REQUEST'
  | 'NOT_FOUND';

export interface ApiErrorBody {
  error: string;
  code: ApiErrorCode;
}

const STATUS_BY_CODE: Record<ApiErrorCode, number> = {
  UNAUTHENTICATED: 401,
  NO_PLAN: 402,
  INSUFFICIENT_CREDITS: 402,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

// User-facing default copy. A route may override it, but it may never
// override the status — the status is a property of the code.
const MESSAGE_BY_CODE: Record<ApiErrorCode, string> = {
  UNAUTHENTICATED: 'You need to be signed in to do that.',
  NO_PLAN: 'Choose a plan to start generating.',
  INSUFFICIENT_CREDITS: "You've used everything your plan includes this period.",
  SERVER_ERROR: 'Something went wrong on our end. Please try again.',
  BAD_REQUEST: 'That request was missing something we need.',
  NOT_FOUND: 'We could not find that.',
};

export function apiError(code: ApiErrorCode, message?: string) {
  const body: ApiErrorBody = { error: message ?? MESSAGE_BY_CODE[code], code };
  return NextResponse.json(body, { status: STATUS_BY_CODE[code] });
}
