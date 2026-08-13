import { useState } from 'react'
import { CircleAlert, EllipsisIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTimerList, type TimerListItem, type TimerViewModel } from '@/hooks/use-timer-list'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TimerStorageService } from '@/services/timer-storage.service'
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
  const navigate = useNavigate()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string>()

  function deleteTimer() {
    const result = new TimerStorageService().remove(timer.id)
    if (result.kind === 'error') {
      setError(result.message)
      return
    }
    setConfirmDelete(false)
  }

  return (
    <article className="relative overflow-hidden rounded-xl border bg-card shadow-sm">
      <div
        className="grid w-full gap-2 p-4 pr-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset md:pr-14 lg:grid-cols-[minmax(10rem,14rem)_9rem_minmax(10rem,1fr)_14rem_14rem_auto] lg:items-center"
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
          <div className="flex gap-2 md:hidden">
            <Button className="flex-1" onClick={() => navigate(`/app/timers/${timer.id}/edit`)} variant="outline">
              <PencilIcon aria-hidden="true" />
              Edit
            </Button>
            <Button className="flex-1" onClick={() => setConfirmDelete(true)} variant="destructive">
              <Trash2Icon aria-hidden="true" />
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-4 hidden md:block">
        <Popover>
          <PopoverTrigger
            render={(
              <Button aria-label={`Actions for ${timer.title}`} size="icon-sm" variant="ghost" />
            )}
          >
            <EllipsisIcon aria-hidden="true" />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-40">
            <Button className="justify-start" onClick={() => navigate(`/app/timers/${timer.id}/edit`)} variant="ghost">
              <PencilIcon aria-hidden="true" />
              Edit
            </Button>
            <Button className="justify-start" onClick={() => setConfirmDelete(true)} variant="ghost">
              <Trash2Icon aria-hidden="true" />
              Delete
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="px-4 pb-4 text-sm text-destructive" role="alert">{error}</p>}
      {confirmDelete && (
        <div aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4" role="dialog">
          <div aria-labelledby={`delete-title-${timer.id}`} className="w-full max-w-sm rounded-xl border bg-card p-5 shadow-lg">
            <h2 className="text-lg font-semibold" id={`delete-title-${timer.id}`}>Delete timer?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Are you sure you want to delete “{timer.title}”?</p>
            <div className="mt-5 flex justify-end gap-2">
              <Button onClick={() => setConfirmDelete(false)} variant="outline">Cancel</Button>
              <Button onClick={deleteTimer} variant="destructive">Delete timer</Button>
            </div>
          </div>
        </div>
      )}
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
