import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const [, locale = 'en'] = request.nextUrl.pathname.split('/')

  return NextResponse.next({
    request: {
      ...request,
      headers: new Headers({
        NEXT_ROUTEX_LOCALE: locale,
      }),
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
