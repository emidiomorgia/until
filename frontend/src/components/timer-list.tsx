import { CircleAlert, PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTimerList, type TimerListItem, type TimerViewModel } from '@/hooks/use-timer-list'
import { buttonVariants } from '@/components/ui/button'
import emptyTimersImage from '@/assets/hero.png'

const dateFormatterOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
}

export default function TimerList() {
  const items = useTimerList()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed bg-card px-6 py-10 text-center shadow-sm">
        <img alt="" className="h-36 w-36 object-contain" src={emptyTimersImage} />
        <h2 className="mt-5 text-lg font-semibold">No timers yet</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Create your first timer to keep track of elapsed and remaining time.
        </p>
        <Link className={buttonVariants({ className: 'mt-5 !text-primary-foreground' })} to="/app/timers/new">
          <PlusIcon aria-hidden="true" />
          Add timer
        </Link>
      </div>
    )
  }

  return (
    <div aria-label="Saved timers" className="grid gap-3">
      {items.map((item, index) => (
        <TimerListItemView item={item} key={item.kind === 'timer' ? item.timer.id : `error-${index}`} />
      ))}
    </div>
  )
}

function TimerListItemView({ item }: { item: TimerListItem }) {
  if (item.kind === 'error') {
    return (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive">
        <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        <div>
          <p className="font-medium">Saved timer error</p>
          <p className="mt-1 text-sm">{item.message}</p>
        </div>
      </div>
    )
  }

  return <TimerCard timer={item.timer} />
}

function TimerCard({ timer }: { timer: TimerViewModel }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div
        className="grid w-full gap-2 p-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset lg:grid-cols-[minmax(10rem,14rem)_9rem_minmax(10rem,1fr)_14rem_14rem_auto] lg:items-center"
      >
        <div className="hidden lg:contents">
          <span className="min-w-0">
            <span className="block truncate font-medium">{timer.title}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{formatStatus(timer)}</span>
          </span>
          <span className="flex items-center justify-between gap-3 lg:block lg:text-right">
            <span className="min-w-0">
              <span className="block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">Remaining time</span>
              <span className="mt-1 block truncate text-sm font-medium">{formatRemaining(timer.remainingMilliseconds)}</span>
            </span>
          </span>
          <div>
            <div className="mb-1 flex justify-between text-[0.68rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              <span>Elapsed</span>
              <span>{formatProgress(timer.progress)}%</span>
            </div>
            <div
              aria-label={`${formatProgress(timer.progress)}% of elapsed time`}
              className="h-2 min-w-0 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={Number(formatProgress(timer.progress))}
            >
              <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${timer.progress}%` }} />
            </div>
          </div>
          <Stat className="lg:ml-6" label="Start" value={formatTimerDate(timer.startDate)} />
          <Stat label="End" value={formatTimerDate(timer.endDate)} />
        </div>
        <div className="grid gap-3 lg:hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <span className="min-w-0">
              <span className="block truncate font-medium">{timer.title}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{formatStatus(timer)}</span>
            </span>
            <span className="grid gap-1 text-right text-xs">
              <span><span className="text-muted-foreground">Start </span>{formatTimerDate(timer.startDate)}</span>
              <span><span className="text-muted-foreground">End </span>{formatTimerDate(timer.endDate)}</span>
            </span>
          </div>
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-end gap-3">
            <span>
              <span className="block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">Elapsed</span>
              <span className="mt-1 block text-sm font-medium">{formatProgress(timer.progress)}%</span>
            </span>
            <div
              aria-label={`${formatProgress(timer.progress)}% of elapsed time`}
              className="mb-1 h-2 min-w-0 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={Number(formatProgress(timer.progress))}
            >
              <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${timer.progress}%` }} />
            </div>
            <span className="text-right">
              <span className="block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">Remaining time</span>
              <span className="mt-1 block text-sm font-medium">{formatRemaining(timer.remainingMilliseconds)}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

function Stat({ className, label, value }: { className?: string; label: string; value: string }) {
  return (
    <span className={`min-w-0 ${className ?? ''}`}>
      <span className="block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
      <span className="mt-1 block truncate text-sm">{value}</span>
    </span>
  )
}

export function formatTimerDate(value: string, locale?: string | string[]) {
  return new Intl.DateTimeFormat(locale, dateFormatterOptions).format(new Date(value))
}

function formatProgress(value: number) {
  return value.toFixed(0)
}

function formatRemaining(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (days > 0) return `${days}g ${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
  return `${minutes}m ${seconds}s`
}

function formatStatus(timer: TimerViewModel) {
  if (timer.progress === 0) return 'Scheduled'
  if (timer.progress === 100) return 'Expired'
  return 'Active'
}
