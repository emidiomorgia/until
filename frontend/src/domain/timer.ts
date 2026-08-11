export interface Timer {
  id: string
  title: string
  startDate: string
  endDate: string
}

export type TimerStorageResult =
  | { kind: 'timers'; timers: Timer[] }
  | { kind: 'error'; message: string }
