
import { URL } from 'url'
import type { Context } from '@netlify/edge-functions'
import { EdgeRequest } from '@netlify/edge-functions/dist/types/request'

export default async (request: EdgeRequest, context: Context) => {
  if (request.headers.get('user-agent')?.includes('curl')) {
    const urlPath = new URL(request.url).pathname

    return await new Response('curl is not allowed', { status: 403 })
  }
}
