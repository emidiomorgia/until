import { useEffect, useMemo, useState } from 'react'
import type { Timer } from '@/domain/timer'
import { TimerStorageService } from '@/services/timer-storage.service'

type TimerReader = Pick<TimerStorageService, 'read'>

export interface TimerViewModel extends Timer {
  progress: number
  remainingMilliseconds: number
}

export type TimerListItem =
  | { kind: 'timer'; timer: TimerViewModel }
  | { kind: 'error'; message: string }

export function useTimerList(service?: TimerReader): TimerListItem[] {
  const [reader] = useState<TimerReader>(() => service ?? new TimerStorageService())
  const [storedResult, setStoredResult] = useState(() => reader.read())
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const handleChange = () => setStoredResult(reader.read())
    window.addEventListener('until-timers-changed', handleChange)

    return () => window.removeEventListener('until-timers-changed', handleChange)
  }, [reader])

  useEffect(() => {
    if (storedResult.kind !== 'timers' || storedResult.timers.length === 0) return

    const intervalId = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(intervalId)
  }, [storedResult])

  return useMemo(() => {
    if (storedResult.kind === 'error') {
      return [storedResult]
    }

    return storedResult.timers.map((timer) => ({ kind: 'timer' as const, timer: toViewModel(timer, now) }))
  }, [now, storedResult])
}

function toViewModel(timer: Timer, now: number): TimerViewModel {
  const start = new Date(timer.startDate).getTime()
  const end = new Date(timer.endDate).getTime()
  const duration = end - start
  const progress = Math.min(100, Math.max(0, ((now - start) / duration) * 100))

  return {
    ...timer,
    progress,
    remainingMilliseconds: Math.max(0, end - now),
  }
}
