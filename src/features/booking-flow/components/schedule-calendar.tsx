"use client"

import { Calendar } from "@/components/ui/calendar"
import { addDays, formatWeekdayInitial, toIsoDate } from "@/lib/date"

const MONDAY = 1
const MONTHS_AHEAD = 6

const CALENDAR_CLASS_NAMES = {
  root: "w-full",
  month_caption: "flex h-9 items-center pr-20",
  caption_label: "font-heading text-lg leading-[1.2] font-medium text-ink-strong select-none",
  nav: "absolute top-0 right-0 z-10 flex gap-0.5",
  week: "mt-1 flex w-full",
  weekday: "flex-1 text-sm font-normal text-muted-foreground select-none",
  day: "group/day relative flex-1 p-0 text-center select-none",
  day_button: "aspect-auto h-10 rounded-[8px] text-sm",
  today: "font-semibold",
}

interface ScheduleCalendarProps {
  value: Date
  today: Date
  availableDays: number[]
  onChange: (isoDate: string) => void
}

export function ScheduleCalendar({ value, today, availableDays, onChange }: ScheduleCalendarProps) {
  const unavailableDays = [0, 1, 2, 3, 4, 5, 6].filter((day) => !availableDays.includes(day))

  return (
    <Calendar
      mode="single"
      required
      selected={value}
      onSelect={(date) => onChange(toIsoDate(date))}
      defaultMonth={value}
      startMonth={today}
      endMonth={new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD)}
      weekStartsOn={MONDAY}
      disabled={[{ before: addDays(today, 1) }, { dayOfWeek: unavailableDays }]}
      formatters={{ formatWeekdayName: formatWeekdayInitial }}
      classNames={CALENDAR_CLASS_NAMES}
      className="w-full bg-transparent p-0 [--cell-size:--spacing(9)]"
    />
  )
}
