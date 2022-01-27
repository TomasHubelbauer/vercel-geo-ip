import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type Data = { name: string };

export default function handler(request: NextApiRequest, response: NextApiResponse<Data>) {
  supabase.from('logs').insert({ text: 'API hit' }).then(console.log);
  console.log('API hit', request.url);
  response.status(200).json({ name: 'John Doe' })
}
