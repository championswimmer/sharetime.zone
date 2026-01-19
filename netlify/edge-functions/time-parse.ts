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
