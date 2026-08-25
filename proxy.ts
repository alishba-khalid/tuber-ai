import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const APEX_HOST = 'genbyghost.com';
const CANONICAL_HOST = 'www.genbyghost.com';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host');

  if (host === APEX_HOST) {
    const url = new URL(request.url);
    url.host = CANONICAL_HOST;
    url.protocol = 'https';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
