import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const APEX_HOST = 'genbyghost.com';
const CANONICAL_HOST = 'www.genbyghost.com';

const goneSlugs = ['designs', 'kapwing', 'simplified', 'elai', 'colossyan', 'deepbrain'];

export function proxy(request: NextRequest) {
  const host = request.headers.get('host');
  const url = request.nextUrl;
  const path = url.pathname.toLowerCase();

  // Intercept the /versus/* paths for defunct/non-existent comparisons and return 410 Gone
  for (const slug of goneSlugs) {
    if (path === `/versus/${slug}` || path === `/versus/${slug}/`) {
      return new NextResponse(null, { status: 410 });
    }
  }

  if (host === APEX_HOST) {
    const redirectUrl = new URL(request.url);
    redirectUrl.host = CANONICAL_HOST;
    redirectUrl.protocol = 'https';
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
