import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname === '/api/hello') {
    console.log('middleware hit', request.url);
  }

  return NextResponse.next();
}
