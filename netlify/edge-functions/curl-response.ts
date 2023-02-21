
import { Context } from 'https://edge.netlify.com'
import { datetime } from 'https://deno.land/x/ptera/mod.ts'
import { getDisplayTZ } from './edge-timezones.ts'

export default async (request: Request, context: Context) => {
  if (request.headers.get('user-agent')?.includes('curl')) {
    const urlSegments = new URL(request.url).pathname.split('/')
    if (urlSegments.length === 2) {
      if (urlSegments[1] === 'now') {
        const tz = getDisplayTZ(urlSegments[1])
        if (typeof tz === 'string') {
          const now = datetime().toZonedTime(tz)
          return await new Response(
            `Time right now in (${urlSegments[1]}) ${tz} is ${now.format('hh:mm a')} \0`,
            { status: 200 }
          )
        }
      }
    }

    if (urlSegments.length === 3) { /* TODO */ }

    return await new Response('curl is not allowed', { status: 403 })
  }
}
