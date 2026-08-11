import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { TimerStorageResult } from '@/domain/timer'
import { useTimerList } from './use-timer-list'

function TimerProbe({ service }: { service: { read: () => TimerStorageResult } }) {
  const [item] = useTimerList(service)
  return <output>{item.kind === 'timer' ? `${item.timer.progress.toFixed(3)}:${item.timer.remainingMilliseconds}` : item.message}</output>
}

describe('useTimerList', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-11T12:00:00.000Z'))
  })

  afterEach(() => vi.useRealTimers())

  it('updates derived values from memory without rereading localStorage', () => {
    const service = {
      read: vi.fn(() => ({
        kind: 'timers' as const,
        timers: [{
          id: 'one',
          title: 'Timer',
          startDate: '2026-08-11T11:00:00.000Z',
          endDate: '2026-08-11T13:00:00.000Z',
        }],
      })),
    }

    render(<TimerProbe service={service} />)
    expect(service.read).toHaveBeenCalledOnce()
    expect(screen.getByText('50.000:3600000')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(1000))

    expect(service.read).toHaveBeenCalledOnce()
    expect(screen.getByText('50.014:3599000')).toBeInTheDocument()
  })
})
