import { Context } from 'https://edge.netlify.com'
import { datetime } from 'https://deno.land/x/ptera@v1.0.2/mod.ts'
import timezones from 'https://cdn.jsdelivr.net/npm/tzabbrmap' assert { type: 'json' }

export default async (request: Request, context: Context) => {
  if (request.headers.get('user-agent')?.includes('curl')) {
    const urlSegments = new URL(request.url).pathname.split('/').slice(1)
    const clientTZ = context.geo.timezone ?? ''
    if (!clientTZ) {
      return await new Response('Cannot decipher client timezone, sorry\n', { status: 404 })
    }
    const header = 'Your timezone detected is ' + clientTZ + '\n'
    console.log(urlSegments)
    if (urlSegments.length === 2) {
      const tz = getDisplayTZ(urlSegments[0])
      console.log(tz)
      if (urlSegments[1] === 'now') {
        return await new Response(header + timeNowInTz(urlSegments[0]), { status: 200 })
      } else if (/([0-2][0-9][0-5][0-9])/.test(urlSegments[1])) {
        return await new Response(header + timeInTz(urlSegments[0], urlSegments[1], clientTZ), { status: 200 })
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
  const possibleTZs = (timezones[tzAbbr]) as Array<TimeZone>
  if (possibleTZs.length === 1) {
    return possibleTZs[0].utc[0]
  } else if (possibleTZs.length === 0) {
    return null
  } else {
    return possibleTZs
  }
}

function timeNowInTz (tzAbbr: string): string {
  const tz: string | Array<TimeZone> = getDisplayTZ(tzAbbr)
  if (typeof tz === 'string') {
    const now = datetime().toZonedTime(tz)
    return `Time right now in (${tzAbbr}) ${tz} is ${now.format('hh:mm a')} \n`
  } else if (Array.isArray(tz)) {
    const now = datetime()
    const responseHeader = `Multiple timezones found for (${tzAbbr}) \n`
    const responseBody = tz.map(t => `Time right now at ${t.value} ${t.text} is ${now.toZonedTime(t.utc[0]).format('hh:mm a')}`).join('\n')
    return responseHeader + responseBody + '\n'
  }
  throw new Error('Invalid Timezone')
}

function _timeInTz (tzAbbr: string, tz: string, timeStr: string, clientTZ: string): string {
  const displayTime = datetime().toZonedTime(tz)
  const hour = timeStr.slice(0, 2)
  const minute = timeStr.slice(2, 4)
  displayTime.hour = parseInt(hour)
  displayTime.minute = parseInt(minute)
  const localTime = displayTime.toZonedTime(clientTZ)
  let dayDelta = ''
  if (localTime.day - displayTime.day === 1) {
    dayDelta = '(+1 day)'
  } else if (localTime.day - displayTime.day === -1) {
    dayDelta = '(-1 day)'
  }
  return `${hour}${minute} hrs in (${tzAbbr}) ${tz} at your timezone will be ${localTime.format('hh:mm a')} ${dayDelta} \n`
}
function timeInTz (tzAbbr: string, timeStr: string, clientTZ: string): string {
  const tz: string | Array<TimeZone> = getDisplayTZ(tzAbbr)
  if (!/([0-2][0-9][0-5][0-9])/.test(timeStr)) {
    throw new Error('Invalid Time')
  }
  if (typeof tz === 'string') {
    return _timeInTz(tzAbbr, tz, timeStr, clientTZ)
  } else if (Array.isArray(tz)) {
    const responseHeader = `Multiple timezones found for (${tzAbbr}) \n`
    const responseBody = tz.map(t => _timeInTz(t.value, t.utc[0], timeStr, clientTZ)).join('')
    return responseHeader + responseBody + '\n'
  }
  throw new Error('Invalid Timezone')
}

// TESTS
// console.log(getDisplayTZ('IST'))
// console.log(timeNowInTz('IST'))
// console.log(timeNowInTz('KST'))
// console.log(timeInTz('PST', '1200', 'Asia/Kolkata'))
// console.log(timeInTz('KST', '1200', 'Asia/Kolkata'))
