import { parseTimeString, isValidTimeString, toMilitaryFormat } from '@/time/parse'

describe('parseTimeString', () => {
  describe('Military time format (HHmm)', () => {
    it('should parse valid military time', () => {
      expect(parseTimeString('1800')).toEqual({ hour: 18, minute: 0, formatted: '1800' })
      expect(parseTimeString('0630')).toEqual({ hour: 6, minute: 30, formatted: '0630' })
      expect(parseTimeString('0000')).toEqual({ hour: 0, minute: 0, formatted: '0000' })
      expect(parseTimeString('2359')).toEqual({ hour: 23, minute: 59, formatted: '2359' })
    })

    it('should reject invalid military time', () => {
      expect(parseTimeString('2400')).toBeNull()
      expect(parseTimeString('1860')).toBeNull()
      expect(parseTimeString('123')).toBeNull()
      expect(parseTimeString('12345')).toBeNull()
    })
  })

  describe('24-hour format with colon (HH:mm)', () => {
    it('should parse valid 24-hour time with colon', () => {
      expect(parseTimeString('18:00')).toEqual({ hour: 18, minute: 0, formatted: '1800' })
      expect(parseTimeString('6:30')).toEqual({ hour: 6, minute: 30, formatted: '0630' })
      expect(parseTimeString('0:00')).toEqual({ hour: 0, minute: 0, formatted: '0000' })
      expect(parseTimeString('23:59')).toEqual({ hour: 23, minute: 59, formatted: '2359' })
    })

    it('should reject invalid 24-hour time', () => {
      expect(parseTimeString('24:00')).toBeNull()
      expect(parseTimeString('18:60')).toBeNull()
      expect(parseTimeString('18:')).toBeNull()
      expect(parseTimeString(':30')).toBeNull()
    })
  })

  describe('12-hour format with AM/PM', () => {
    it('should parse time with pm (lowercase)', () => {
      expect(parseTimeString('6pm')).toEqual({ hour: 18, minute: 0, formatted: '1800' })
      expect(parseTimeString('12pm')).toEqual({ hour: 12, minute: 0, formatted: '1200' })
      expect(parseTimeString('1pm')).toEqual({ hour: 13, minute: 0, formatted: '1300' })
      expect(parseTimeString('11pm')).toEqual({ hour: 23, minute: 0, formatted: '2300' })
    })

    it('should parse time with PM (uppercase)', () => {
      expect(parseTimeString('6PM')).toEqual({ hour: 18, minute: 0, formatted: '1800' })
      expect(parseTimeString('12PM')).toEqual({ hour: 12, minute: 0, formatted: '1200' })
    })

    it('should parse time with am (lowercase)', () => {
      expect(parseTimeString('6am')).toEqual({ hour: 6, minute: 0, formatted: '0600' })
      expect(parseTimeString('12am')).toEqual({ hour: 0, minute: 0, formatted: '0000' })
      expect(parseTimeString('1am')).toEqual({ hour: 1, minute: 0, formatted: '0100' })
      expect(parseTimeString('11am')).toEqual({ hour: 11, minute: 0, formatted: '1100' })
    })

    it('should parse time with AM (uppercase)', () => {
      expect(parseTimeString('6AM')).toEqual({ hour: 6, minute: 0, formatted: '0600' })
      expect(parseTimeString('12AM')).toEqual({ hour: 0, minute: 0, formatted: '0000' })
    })

    it('should parse time with minutes and pm', () => {
      expect(parseTimeString('6:30pm')).toEqual({ hour: 18, minute: 30, formatted: '1830' })
      expect(parseTimeString('12:45pm')).toEqual({ hour: 12, minute: 45, formatted: '1245' })
      expect(parseTimeString('1:15pm')).toEqual({ hour: 13, minute: 15, formatted: '1315' })
    })

    it('should parse time with minutes and am', () => {
      expect(parseTimeString('6:30am')).toEqual({ hour: 6, minute: 30, formatted: '0630' })
      expect(parseTimeString('12:45am')).toEqual({ hour: 0, minute: 45, formatted: '0045' })
      expect(parseTimeString('1:15am')).toEqual({ hour: 1, minute: 15, formatted: '0115' })
    })

    it('should parse time with leading zeros', () => {
      expect(parseTimeString('06:30AM')).toEqual({ hour: 6, minute: 30, formatted: '0630' })
      expect(parseTimeString('09:45pm')).toEqual({ hour: 21, minute: 45, formatted: '2145' })
    })

    it('should reject invalid 12-hour time', () => {
      expect(parseTimeString('0am')).toBeNull()
      expect(parseTimeString('13pm')).toBeNull()
      expect(parseTimeString('25pm')).toBeNull()
      expect(parseTimeString('12:60pm')).toBeNull()
    })
  })

  describe('Edge cases', () => {
    it('should handle whitespace', () => {
      expect(parseTimeString(' 6pm ')).toEqual({ hour: 18, minute: 0, formatted: '1800' })
      expect(parseTimeString('  18:00  ')).toEqual({ hour: 18, minute: 0, formatted: '1800' })
    })

    it('should handle empty or invalid input', () => {
      expect(parseTimeString('')).toBeNull()
      expect(parseTimeString('invalid')).toBeNull()
      expect(parseTimeString('abc')).toBeNull()
    })
  })
})

describe('isValidTimeString', () => {
  it('should return true for valid time formats', () => {
    expect(isValidTimeString('1800')).toBe(true)
    expect(isValidTimeString('18:00')).toBe(true)
    expect(isValidTimeString('6pm')).toBe(true)
    expect(isValidTimeString('6:30pm')).toBe(true)
    expect(isValidTimeString('06:30AM')).toBe(true)
  })

  it('should return false for invalid time formats', () => {
    expect(isValidTimeString('2400')).toBe(false)
    expect(isValidTimeString('invalid')).toBe(false)
    expect(isValidTimeString('')).toBe(false)
    expect(isValidTimeString('25:00')).toBe(false)
  })
})

describe('toMilitaryFormat', () => {
  it('should convert various formats to HHmm', () => {
    expect(toMilitaryFormat('1800')).toBe('1800')
    expect(toMilitaryFormat('18:00')).toBe('1800')
    expect(toMilitaryFormat('6pm')).toBe('1800')
    expect(toMilitaryFormat('6:30pm')).toBe('1830')
    expect(toMilitaryFormat('06:30AM')).toBe('0630')
  })

  it('should return null for invalid formats', () => {
    expect(toMilitaryFormat('invalid')).toBeNull()
    expect(toMilitaryFormat('2400')).toBeNull()
  })
})
