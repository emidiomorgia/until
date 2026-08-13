import { describe, expect, it } from 'vitest'
import { formatTimerDate } from './timer-list'

describe('formatTimerDate', () => {
  const value = '2026-08-01T21:30:00.000Z'
  const options = { timeZone: 'Europe/Rome' as const }

  it('uses the numeric date and time conventions for en-US', () => {
    expect(formatTimerDate(value, 'en-US', options)).toBe('08/01/2026, 11:30 PM')
  })

  it('uses the numeric date and time conventions for it-IT', () => {
    expect(formatTimerDate(value, 'it-IT', options)).toBe('01/08/2026, 23:30')
  })
})
