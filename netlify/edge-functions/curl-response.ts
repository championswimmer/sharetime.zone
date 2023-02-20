
import type { Context } from '@netlify/edge-functions'

export default async (request: Request, context: Context) => {
  if (request.headers.get('user-agent')?.includes('curl')) {
    return await new Response('curl is not allowed', { status: 403 })
  }
}

declare module '@netlify/edge-functions/dist/types/geo' {
  interface Geo {
    timezone: string
  }
}
