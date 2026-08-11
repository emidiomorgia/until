import { useState } from 'react'
import { ChevronDown, CircleAlert, PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTimerList, type TimerListItem, type TimerViewModel } from '@/hooks/use-timer-list'
import { buttonVariants } from '@/components/ui/button'
import emptyTimersImage from '@/assets/hero.png'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

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
  const [expanded, setExpanded] = useState(false)
  const panelId = `timer-panel-${timer.id}`

  return (
    <article className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <button
        aria-controls={panelId}
        aria-expanded={expanded}
        className="grid w-full gap-4 p-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_auto] md:items-center"
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        <span className="min-w-0">
          <span className="block truncate font-medium">{timer.title}</span>
          <span className="mt-1 block text-xs text-muted-foreground">{formatStatus(timer)}</span>
        </span>
        <Stat label="Start" value={formatDate(timer.startDate)} />
        <Stat label="End" value={formatDate(timer.endDate)} />
        <Stat label="Elapsed" value={`${formatProgress(timer.progress)}%`} />
        <span className="flex items-center justify-between gap-3 text-sm font-medium md:block md:text-right">
          <span>{formatRemaining(timer.remainingMilliseconds)}</span>
          <ChevronDown aria-hidden="true" className={`size-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </span>
      </button>
      {expanded && (
        <div className="border-t bg-muted/20 px-4 py-4" id={panelId}>
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <Stat label="Start date" value={formatDate(timer.startDate)} />
            <Stat label="End date" value={formatDate(timer.endDate)} />
            <div className="sm:col-span-2">
              <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                <span>Elapsed time</span>
                <span>{formatProgress(timer.progress)}%</span>
              </div>
              <div aria-label={`${formatProgress(timer.progress)}% of elapsed time`} className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemax={100} aria-valuemin={0} aria-valuenow={Number(formatProgress(timer.progress))}>
                <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${timer.progress}%` }} />
              </div>
            </div>
            <Stat label="Remaining time" value={formatRemaining(timer.remainingMilliseconds)} />
          </div>
        </div>
      )}
    </article>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="min-w-0">
      <span className="block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
      <span className="mt-1 block truncate text-sm">{value}</span>
    </span>
  )
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(value))
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
