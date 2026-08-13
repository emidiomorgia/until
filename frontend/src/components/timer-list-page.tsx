import { Link } from 'react-router-dom'
import { PlusIcon, TimerIcon } from 'lucide-react'
import TimerList from '@/components/timer-list'
import { buttonVariants } from '@/components/ui/button'

export default function TimerListPage() {
  return (
    <>
      <section className="rounded-xl border bg-card p-4 shadow-sm md:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TimerIcon aria-hidden="true" className="size-4 text-muted-foreground" />
            <h1 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Timers</h1>
          </div>
          <Link className={buttonVariants({ size: 'sm', className: '!text-primary-foreground' })} to="/app/timers/new">
            <PlusIcon aria-hidden="true" />
            Add timer
          </Link>
        </div>
        <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
          Everything you have in progress, with elapsed and remaining time.
        </p>
      </section>

      <section aria-label="Saved timers">
        <TimerList />
      </section>
    </>
  )
}
