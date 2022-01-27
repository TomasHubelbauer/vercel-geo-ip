import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { name: string };

export default function handler(request: NextApiRequest, response: NextApiResponse<Data>) {
  console.log('API route hit', request.url);
  response.status(200).json({ name: 'John Doe' })
}
