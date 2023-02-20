
import type { Context } from '@netlify/edge-functions'

export default async (request: Request, context: Context) => {
  await request.headers.set('x-user-timezone', context.geo.timezone)
}

declare module '@netlify/edge-functions/dist/types/geo' {
  interface Geo {
    timezone: string;
  }
}
