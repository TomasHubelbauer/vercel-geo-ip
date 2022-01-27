import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { fetch });

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname === '/api/hello') {
    const country = request.headers.get('X-Vercel-IP-Country');
    const region = request.headers.get('X-Vercel-IP-Country-Region');
    const city = request.headers.get('X-Vercel-IP-City');
    const ip = request.ip;
    const xRealIp = request.headers.get('X-Real-IP');
    const xForwardedFor = request.headers.get('X-Forwarded-For');
    supabase.from('logs').insert({ text: 'middleware hit', url: request.url, country, region, city, ip, x_real_ip: xRealIp, x_forwarded_for: xForwardedFor }).then(console.log);
    console.log('middleware hit', request.url);
  }

  return NextResponse.next();
}
