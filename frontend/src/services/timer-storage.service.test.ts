import { beforeEach, describe, expect, it } from 'vitest'
import { TIMER_STORAGE_KEY, TimerStorageService } from './timer-storage.service'

const timer = {
  id: 'one',
  title: 'Consegna progetto',
  startDate: '2026-08-11T09:00:00.000Z',
  endDate: '2026-08-11T17:00:00.000Z',
}

describe('TimerStorageService', () => {
  beforeEach(() => localStorage.clear())

  it('reads valid timers from localStorage', () => {
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify([timer]))

    expect(new TimerStorageService().read()).toEqual({ kind: 'timers', timers: [timer] })
  })

  it('returns an empty list when no timers are saved', () => {
    expect(new TimerStorageService().read()).toEqual({ kind: 'timers', timers: [] })
  })

  it('returns a dedicated error result for malformed data', () => {
    localStorage.setItem(TIMER_STORAGE_KEY, '{not-json')

    expect(new TimerStorageService().read()).toMatchObject({ kind: 'error' })
  })

  it('rejects invalid timer shapes', () => {
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify([{ ...timer, endDate: timer.startDate }]))

    expect(new TimerStorageService().read()).toMatchObject({ kind: 'error' })
  })

  it('adds a timer to empty localStorage', () => {
    const service = new TimerStorageService()

    expect(service.add(timer)).toEqual({ kind: 'timers', timers: [timer] })
    expect(JSON.parse(localStorage.getItem(TIMER_STORAGE_KEY) ?? 'null')).toEqual([timer])
  })

  it('appends a timer without replacing existing timers', () => {
    const existingTimer = { ...timer, id: 'existing', title: 'Timer esistente' }
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify([existingTimer]))

    expect(new TimerStorageService().add(timer)).toEqual({
      kind: 'timers',
      timers: [existingTimer, timer],
    })
  })

  it('does not overwrite malformed stored data', () => {
    localStorage.setItem(TIMER_STORAGE_KEY, '{not-json')

    expect(new TimerStorageService().add(timer)).toMatchObject({ kind: 'error' })
    expect(localStorage.getItem(TIMER_STORAGE_KEY)).toBe('{not-json')
  })

  it('rejects an invalid timer before writing it', () => {
    const invalidTimer = { ...timer, endDate: timer.startDate }

    expect(new TimerStorageService().add(invalidTimer)).toMatchObject({ kind: 'error' })
    expect(localStorage.getItem(TIMER_STORAGE_KEY)).toBeNull()
  })
})
