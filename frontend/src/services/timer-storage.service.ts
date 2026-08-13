import type { Timer, TimerStorageResult } from '@/domain/timer'

export const TIMER_STORAGE_KEY = 'until-timers'

export class TimerStorageService {
  private readonly storage: Storage

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage
  }

  read(): TimerStorageResult {
    const rawValue = this.storage.getItem(TIMER_STORAGE_KEY)

    if (rawValue === null) {
      return { kind: 'timers', timers: [] }
    }

    try {
      const parsed: unknown = JSON.parse(rawValue)

      if (!Array.isArray(parsed) || !parsed.every(isTimer)) {
        return { kind: 'error', message: 'The saved timer data is invalid.' }
      }

      return { kind: 'timers', timers: parsed }
    } catch {
      return { kind: 'error', message: 'The saved timers could not be read.' }
    }
  }

  add(timer: Timer): TimerStorageResult {
    if (!isTimer(timer)) {
      return { kind: 'error', message: 'The timer data is invalid.' }
    }

    const current = this.read()

    if (current.kind === 'error') {
      return current
    }

    const timers = [...current.timers, timer]

    try {
      this.write(timers)
      return { kind: 'timers', timers }
    } catch {
      return { kind: 'error', message: 'The timer could not be saved.' }
    }
  }

  update(timer: Timer): TimerStorageResult {
    if (!isTimer(timer)) return { kind: 'error', message: 'The timer data is invalid.' }

    const current = this.read()
    if (current.kind === 'error') return current

    if (!current.timers.some((savedTimer) => savedTimer.id === timer.id)) {
      return { kind: 'error', message: 'The timer could not be found.' }
    }

    const timers = current.timers.map((savedTimer) => savedTimer.id === timer.id ? timer : savedTimer)

    try {
      this.write(timers)
      return { kind: 'timers', timers }
    } catch {
      return { kind: 'error', message: 'The timer could not be saved.' }
    }
  }

  remove(id: string): TimerStorageResult {
    const current = this.read()
    if (current.kind === 'error') return current

    const timers = current.timers.filter((timer) => timer.id !== id)

    try {
      this.write(timers)
      return { kind: 'timers', timers }
    } catch {
      return { kind: 'error', message: 'The timer could not be deleted.' }
    }
  }

  private write(timers: Timer[]) {
    this.storage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timers))
    window.dispatchEvent(new Event('until-timers-changed'))
  }
}

function isTimer(value: unknown): value is Timer {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    isDate(candidate.startDate) &&
    isDate(candidate.endDate) &&
    new Date(candidate.endDate).getTime() > new Date(candidate.startDate).getTime()
  )
}

function isDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}
