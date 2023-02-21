
import { URL } from 'url'
import type { Context } from '@netlify/edge-functions'
import { EdgeRequest } from '@netlify/edge-functions/dist/types/request'
import { DateTime } from 'luxon'
import { getDisplayTZ } from './edge-timezones'

export default async (request: EdgeRequest, context: Context) => {
  if (request.headers.get('user-agent')?.includes('curl')) {
    const urlSegments = new URL(request.url).pathname.split('/')
    if (urlSegments.length === 2) {
      if (urlSegments[1] === 'now') {
        const tz = getDisplayTZ(urlSegments[1])
        if (typeof tz === 'string') {
          const now = DateTime.fromJSDate(new Date(), { zone: tz })
          return await new Response(
            `Time right now in (${urlSegments[1]}) ${tz} is ${now.toFormat('hh:mm a')} \0`,
            { status: 200 }
          )
        }
      }
    }

    if (urlSegments.length === 3) { /* TODO */ }

    return await new Response('curl is not allowed', { status: 403 })
  }
}
