import { NextResponse } from 'next/server';

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };

// Fail closed: without APP_PASSWORD nobody gets in. The page will later spend the owner's API key, so it must never be open.
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function middleware(req) {
  const pw = process.env.APP_PASSWORD;
  if (!pw) return new NextResponse('APP_PASSWORD is not configured', { status: 503 });
  const h = req.headers.get('authorization') || '';
  if (h.startsWith('Basic ')) {
    try {
      const decoded = atob(h.slice(6));
      const given = decoded.slice(decoded.indexOf(':') + 1);
      if (safeEqual(given, pw)) return NextResponse.next();
    } catch {}
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Verve Content Studio", charset="UTF-8"' },
  });
}
