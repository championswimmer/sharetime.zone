import { getDisplayTZ } from '../../src/data/timezones'

describe('getDisplayTZ', () => {
  test('returns the display timezone', () => {
    expect(getDisplayTZ('PST')).toBe('America/Los_Angeles')
    expect(getDisplayTZ('IST')).toBe('Asia/Kolkata')
  })
})
