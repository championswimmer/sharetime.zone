
import { Context } from 'https://edge.netlify.com'
import { datetime } from 'https://deno.land/x/ptera@v1.0.2/mod.ts'
import timezones from 'https://cdn.jsdelivr.net/npm/tzabbrmap' assert { type: 'json' }

export default async (request: Request, context: Context) => {
  if (request.headers.get('user-agent')?.includes('curl')) {
    const urlSegments = new URL(request.url).pathname.split('/').slice(1)
    console.log(urlSegments)
    if (urlSegments.length === 2) {
      const tz = getDisplayTZ(urlSegments[0])
      console.log(tz)
      if (urlSegments[1] === 'now') {
        if (typeof tz === 'string') {
          const now = datetime().toZonedTime(tz)
          return await new Response(
            `Time right now in (${urlSegments[0]}) ${tz} is ${now.format('hh:mm a')} \n`,
            { status: 200 }
          )
        }
        if (Array.isArray(tz)) {
          const now = datetime()
          const responseHeader = `Multiple timezones found for (${urlSegments[0]}) \n`
          const responseBody = tz.map(t => `Time right now at ${t.value} ${t.text} is ${now.toZonedTime(t.utc[0]).format('hh:mm a')}`).join('\n')
          return await new Response(responseHeader + responseBody + '\n', { status: 200 })
        }
      } else if (/([0-2][0-9][0-5][0-9])/.test(urlSegments[1])) {
        if (typeof tz === 'string') {
          const now = datetime().toZonedTime(tz)
          const time = urlSegments[1]
          const hour = time.slice(0, 2)
          const minute = time.slice(2, 4)
          const response = `Time in (${urlSegments[0]}) ${tz} at ${hour}:${minute} is ${now.set({ hour, minute }).format('hh:mm a')} \n`
          return await new Response(response, { status: 200 })
        }
        if (Array.isArray(tz)) {
          const now = datetime()
          const time = urlSegments[1]
          const hour = time.slice(0, 2)
          const minute = time.slice(2, 4)
          const responseHeader = `Multiple timezones found for (${urlSegments[0]}) \n`
          const responseBody = tz.map(t => `Time right now at ${t.value} ${t.text} is ${now.toZonedTime(t.utc[0]).set({ hour, minute }).format('hh:mm a')}`).join('\n')
          return await new Response(responseHeader + responseBody + '\n', { status: 200 })
        }
      }
    }

    if (urlSegments.length === 3) { /* TODO */ }

    return await new Response('curl is not allowed \n', { status: 403 })
  } else {
    return await context.next()
  }
}

type TimeZone = {
  value: string,
  text: string,
  utc: string[],
}

export function getDisplayTZ (tzAbbr: string): string | TimeZone[] | null {
  const possibleTZs = timezones[tzAbbr] as TimeZone[]
  if (possibleTZs.length === 1) {
    return possibleTZs[0].utc[0]
  } else if (possibleTZs.length === 0) {
    return null
  } else {
    return possibleTZs
  }
}
