import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { fetch });

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname === '/api/hello') {
    supabase.from('logs').insert({ text: 'middleware hit' }).then(console.log);
    console.log('middleware hit', request.url);
  }

  return NextResponse.next();
}
