import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type Data = { name: string };

export default function handler(request: NextApiRequest, response: NextApiResponse<Data>) {
  const country = request.rawHeaders[request.rawHeaders.indexOf('x-vercel-ip-country') + 1];
  const region = request.rawHeaders[request.rawHeaders.indexOf('x-vercel-ip-country-region') + 1];
  const city = request.rawHeaders[request.rawHeaders.indexOf('x-vercel-ip-city') + 1];

  const country2 = request.headers['x-vercel-ip-country'];
  const region2 = request.headers['x-vercel-ip-country-region'];
  const city2 = request.headers['x-vercel-ip-city'];

  console.log({
    country, region, city,
    countryType: typeof country, countryArray: Array.isArray(country),
    regionType: typeof country, regionArray: Array.isArray(country),
    cityType: typeof country, cityArray: Array.isArray(country),

    country2, region2, city2,
    country2Type: typeof country, country2Array: Array.isArray(country),
    region2Type: typeof country, region2Array: Array.isArray(country),
    city2Type: typeof country, city2Array: Array.isArray(country),
  });

  supabase.from('logs').insert({ text: 'API hit', url: request.url }).then(console.log);
  console.log('API hit', request.url);
  response.status(200).json({ name: 'John Doe' })
}
