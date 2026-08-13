import { format } from 'date-fns'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateTimePickerProps {
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  id: string
  onChange: (value: Date | undefined) => void
  placeholder: string
  value: Date | undefined
}

export default function DateTimePicker({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  id,
  onChange,
  placeholder,
  value,
}: DateTimePickerProps) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  function handleDateChange(date: Date | undefined) {
    if (!date) {
      onChange(undefined)
      return
    }

    const nextValue = new Date(date)
    nextValue.setHours(value?.getHours() ?? 0, value?.getMinutes() ?? 0, 0, 0)
    onChange(nextValue)
  }

  function handleTimeChange(time: string) {
    if (!value || !time) return

    const [hours, minutes] = time.split(':').map(Number)
    const nextValue = new Date(value)
    nextValue.setHours(hours, minutes, 0, 0)
    onChange(nextValue)
  }

  return (
    <Popover>
      <PopoverTrigger
        render={(
          <Button
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalid}
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
            id={id}
            type="button"
            variant="outline"
          />
        )}
      >
        <CalendarIcon aria-hidden="true" />
        {value ? format(value, 'PPP HH:mm') : placeholder}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={handleDateChange}
          selected={value}
          timeZone={timeZone}
        />
        <div className="border-t p-3">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium" htmlFor={`${id}-time`}>
            <ClockIcon aria-hidden="true" className="size-4 text-muted-foreground" />
            Time
          </label>
          <Input
            disabled={!value}
            id={`${id}-time`}
            onInput={(event) => handleTimeChange(event.currentTarget.value)}
            step={60}
            type="time"
            value={value ? format(value, 'HH:mm') : ''}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
