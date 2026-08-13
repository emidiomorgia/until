import { useState, type FormEvent } from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DateTimePicker from '@/components/date-time-picker'
import { TimerStorageService } from '@/services/timer-storage.service'
import type { Timer } from '@/domain/timer'

type FormErrors = Partial<Record<'title' | 'start' | 'end' | 'storage', string>>

export default function AddTimerPage() {
  return <TimerFormPage mode="add" />
}

export function EditTimerPage() {
  return <TimerFormPage mode="edit" />
}

function TimerFormPage({ mode }: { mode: 'add' | 'edit' }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [initialState] = useState(() => {
    if (mode === 'add' || !id) return { title: '', start: undefined, end: undefined, missing: false }
    const result = new TimerStorageService().read()
    const timer = result.kind === 'timers' ? result.timers.find((candidate) => candidate.id === id) : undefined
    return timer
      ? { title: timer.title, start: new Date(timer.startDate), end: new Date(timer.endDate), missing: false }
      : { title: '', start: undefined, end: undefined, missing: true }
  })
  const [title, setTitle] = useState(initialState.title)
  const [start, setStart] = useState<Date | undefined>(initialState.start)
  const [end, setEnd] = useState<Date | undefined>(initialState.end)
  const [errors, setErrors] = useState<FormErrors>(initialState.missing ? { storage: 'The timer could not be found.' } : {})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateTimer(title, start, end)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const timer: Timer = {
      id: mode === 'add' ? createTimerId() : id!,
      title: title.trim(),
      startDate: start!.toISOString(),
      endDate: end!.toISOString(),
    }
    const service = new TimerStorageService()
    const result = mode === 'add' ? service.add(timer) : service.update(timer)

    if (result.kind === 'error') {
      setErrors({ storage: result.message })
      return
    }

    navigate('/app')
  }

  return (
    <section className="mx-auto w-full max-w-2xl rounded-xl border bg-card p-5 shadow-sm md:p-7">
      <Link className={buttonVariants({ variant: 'ghost', size: 'sm', className: '-ml-2' })} to="/app">
        <ArrowLeftIcon aria-hidden="true" />
        Back to timers
      </Link>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{mode === 'add' ? 'New timer' : 'Edit timer'}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{mode === 'add' ? 'Add a timer' : 'Edit a timer'}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter a title and choose when the timer starts and ends.
        </p>
      </div>

      <form className="mt-7 grid gap-5" noValidate onSubmit={handleSubmit}>
        <FormField error={errors.title} id="timer-title" label="Title">
          <Input
            aria-describedby={errors.title ? 'timer-title-error' : undefined}
            aria-invalid={Boolean(errors.title)}
            autoFocus
            id="timer-title"
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            value={title}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField error={errors.start} id="timer-start" label="Start">
            <DateTimePicker
              aria-describedby={errors.start ? 'timer-start-error' : undefined}
              aria-invalid={Boolean(errors.start)}
              id="timer-start"
              onChange={setStart}
              placeholder="Choose start date and time"
              value={start}
            />
          </FormField>

          <FormField error={errors.end} id="timer-end" label="End">
            <DateTimePicker
              aria-describedby={errors.end ? 'timer-end-error' : undefined}
              aria-invalid={Boolean(errors.end)}
              id="timer-end"
              onChange={setEnd}
              placeholder="Choose end date and time"
              value={end}
            />
          </FormField>
        </div>

        {errors.storage && (
          <p className="text-sm text-destructive" role="alert">
            {errors.storage}
          </p>
        )}

        <div className="flex flex-wrap justify-end gap-3 border-t pt-5">
          <Link className={buttonVariants({ variant: 'outline' })} to="/app">
            Cancel
          </Link>
          <Button type="submit">Save timer</Button>
        </div>
      </form>
    </section>
  )
}

function FormField({
  children,
  error,
  id,
  label,
}: {
  children: React.ReactNode
  error?: string
  id: string
  label: string
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm text-destructive" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

function validateTimer(title: string, start: Date | undefined, end: Date | undefined): FormErrors {
  const errors: FormErrors = {}

  if (!title.trim()) errors.title = 'Enter a title.'
  if (!start) errors.start = 'Choose a start date and time.'
  if (!end) errors.end = 'Choose an end date and time.'

  if (start && end && end.getTime() <= start.getTime()) {
    errors.end = 'End must be after start.'
  }

  return errors
}

function createTimerId() {
  return globalThis.crypto.randomUUID()
}
