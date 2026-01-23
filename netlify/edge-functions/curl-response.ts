import { Context } from 'https://edge.netlify.com'
import { datetime } from 'https://deno.land/x/ptera@v1.0.2/mod.ts'
import timezones from 'https://cdn.jsdelivr.net/npm/tzabbrmap' with { type: 'json' }

/**
 * Time parsing utilities for Deno runtime (Edge Functions)
 * Supports multiple time formats and converts them to 24-hour HHmm format
 */

export interface ParsedTime {
  hour: number
  minute: number
  formatted: string // HHmm format
}

/**
 * Validates and parses various time formats
 * Supported formats:
 * - 1800 (military time)
 * - 18:00 (24-hour with colon)
 * - 6pm, 6PM (12-hour without minutes)
 * - 6:30pm, 6:30PM (12-hour with minutes)
 * - 06:30AM (12-hour with leading zero)
 *
 * @param timeStr - The time string to parse
 * @returns ParsedTime object if valid, null if invalid
 */
export function parseTimeString (timeStr: string): ParsedTime | null {
  if (!timeStr) { return null }

  // Normalize the input
  const normalized = timeStr.trim().toLowerCase()

  // Pattern 1: Military time (1800, 0630)
  const militaryMatch = /^([0-2][0-9])([0-5][0-9])$/.exec(normalized)
  if (militaryMatch) {
    const hour = parseInt(militaryMatch[1], 10)
    const minute = parseInt(militaryMatch[2], 10)
    if (hour <= 23 && minute <= 59) {
      return {
        hour,
        minute,
        formatted: `${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}`
      }
    }
  }

  // Pattern 2: 24-hour with colon (18:00, 6:30)
  const colonMatch = /^(\d{1,2}):([0-5][0-9])$/.exec(normalized)
  if (colonMatch) {
    const hour = parseInt(colonMatch[1], 10)
    const minute = parseInt(colonMatch[2], 10)
    if (hour <= 23 && minute <= 59) {
      return {
        hour,
        minute,
        formatted: `${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}`
      }
    }
  }

  // Pattern 3 & 4: 12-hour with am/pm (6pm, 6:30pm, 06:30AM)
  const ampmMatch = /^(\d{1,2})(?::([0-5][0-9]))?(am|pm)$/.exec(normalized)
  if (ampmMatch) {
    let hour = parseInt(ampmMatch[1], 10)
    const minute = parseInt(ampmMatch[2] || '0', 10)
    const meridiem = ampmMatch[3]

    // Validate hour for 12-hour format
    if (hour < 1 || hour > 12) { return null }

    // Convert to 24-hour format
    if (meridiem === 'am') {
      if (hour === 12) { hour = 0 } // 12am is 00:00
    } else if (hour !== 12) {
      hour += 12 // 1pm-11pm, but not 12pm
    }

    return {
      hour,
      minute,
      formatted: `${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}`
    }
  }

  return null
}

/**
 * Validates if a time string is in a supported format
 * @param timeStr - The time string to validate
 * @returns true if valid, false otherwise
 */
export function isValidTimeString (timeStr: string): boolean {
  return parseTimeString(timeStr) !== null
}

/**
 * Converts any supported time format to HHmm format
 * @param timeStr - The time string to convert
 * @returns HHmm formatted string, or null if invalid
 */
export function toMilitaryFormat (timeStr: string): string | null {
  const parsed = parseTimeString(timeStr)
  return parsed ? parsed.formatted : null
}

export default async (request: Request, context: Context) => {
  // This runs only for curl requests
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
      } else if (isValidTimeString(urlSegments[1])) {
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
  const militaryTime = toMilitaryFormat(timeStr) || '0000'
  const displayTime = datetime().toZonedTime(tz)
  const hour = militaryTime.slice(0, 2)
  const minute = militaryTime.slice(2, 4)
  displayTime.hour = parseInt(hour)
  displayTime.minute = parseInt(minute)
  const localTime = displayTime.toZonedTime(clientTZ)
  let dayDelta = ''
  if (localTime.day - displayTime.day === 1) {
    dayDelta = '(+1 day)'
  } else if (localTime.day - displayTime.day === -1) {
    dayDelta = '(-1 day)'
  }
  return `${timeStr} in (${tzAbbr}) ${tz} at your timezone will be ${localTime.format('hh:mm a')} ${dayDelta} \n`
}
function timeInTz (tzAbbr: string, timeStr: string, clientTZ: string): string {
  const tz: string | Array<TimeZone> = getDisplayTZ(tzAbbr)
  if (!isValidTimeString(timeStr)) {
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
