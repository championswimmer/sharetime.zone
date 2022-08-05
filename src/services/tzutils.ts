import { TimeZone, timezones } from '@/assets/timezones'

export function getDisplayTZ (tzAbbr: string): string | TimeZone[] | null {
  const possibleTZs = timezones.filter(tz => tz.abbr === tzAbbr)
  if (possibleTZs.length === 1) {
    return possibleTZs[0].utc[0]
  } else if (possibleTZs.length === 0) {
    return null
  } else {
    return possibleTZs
  }
}
