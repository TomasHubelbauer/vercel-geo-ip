import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type Data = { name: string };

export default async function handler(request: NextApiRequest, response: NextApiResponse<Data>) {
  const country = request.headers['x-vercel-ip-country'];
  const region = request.headers['x-vercel-ip-country-region'];
  const city = request.headers['x-vercel-ip-city'];
  const ip = request.socket.remoteAddress;
  const xRealIp = request.headers['x-real-ip'];
  const xForwardedFor = request.headers['x-forwarded-for'];

  // Avoid .then due to https://github.com/vercel/community/discussions/156
  await supabase.from('logs').insert({ text: 'API hit', url: request.url, country, region, city, ip, x_real_ip: xRealIp, x_forwarded_for: xForwardedFor });
  console.log('API hit', request.url);
  response.status(200).json({ name: 'John Doe' })
}
