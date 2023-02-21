
import type { Context } from '@netlify/edge-functions'
import { EdgeRequest } from '@netlify/edge-functions/dist/types/request'

export default async (request: EdgeRequest, context: Context) => {
  await request.headers.set('x-user-timezone', context.geo.timezone)
}

declare module '@netlify/edge-functions/dist/types/geo' {
  interface Geo {
    timezone: string;
  }
}
