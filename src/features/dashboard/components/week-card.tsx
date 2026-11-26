"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { WeekCardShell } from "@/features/bookings/components/week-card-shell"
import { useBookings } from "@/features/bookings/hooks/use-bookings"
import type { Booking } from "@/features/bookings/types"
import {
  DAYS_PER_WEEK,
  addDays,
  formatLongDate,
  formatRelativeDay,
  formatTime,
  formatWeekdayInitial,
  getWeekDays,
  isSameDay,
  toIsoDate,
} from "@/lib/date"
import { cn } from "@/lib/utils"


interface WeekDaysProps {
  days: Date[]
  selected: Date
  today: Date
  onSelect: (day: Date) => void
}

function WeekDays({ days, selected, today, onSelect }: WeekDaysProps) {
  return (
    <ul className="grid grid-cols-7">
      {days.map((day) => {
        const isSelected = isSameDay(day, selected)
        const isToday = isSameDay(day, today)

        return (
          <li key={toIsoDate(day)} className="flex flex-col items-center gap-1.5">
            <span aria-hidden="true" className="leading-[1.3] text-muted-foreground">
              {formatWeekdayInitial(day)}
            </span>
            <Button
              variant={isSelected ? "default" : "ghost"}
              aria-label={formatLongDate(day)}
              aria-pressed={isSelected}
              aria-current={isToday ? "date" : undefined}
              onClick={() => onSelect(day)}
              className={cn(
                "aspect-square h-auto w-full max-w-9 rounded-full p-0 font-normal",
                !isSelected && isToday && "font-semibold text-primary"
              )}
            >
              {day.getDate()}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

interface DayAgendaProps {
  day: Date
  today: Date
  bookings: Booking[]
}

function DayAgenda({ day, today, bookings }: DayAgendaProps) {
  const dayBookings = bookings.filter(({ start }) => isSameDay(start, day))

  if (dayBookings.length === 0) {
    return <p className="py-2.5 leading-[1.3] text-muted-foreground">No bookings on this day.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {dayBookings.map(({ id, service, professional, start }) => (
        <li key={id} className="flex items-center justify-between gap-3 leading-[1.3]">
          <div className="flex flex-col gap-1 border-l-3 border-primary pl-3">
            <p className="text-primary">{formatRelativeDay(day, today)}</p>
            <p className="text-muted-foreground">
              {service} with {professional.shortName}
            </p>
          </div>
          <time
            dateTime={start.toISOString()}
            className="shrink-0 whitespace-nowrap text-muted-foreground"
          >
            {formatTime(start)}
          </time>
        </li>
      ))}
    </ul>
  )
}

export function WeekCard({ className }: { className?: string }) {
  const data = useBookings()
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  if (!data) {
    return <Skeleton className={cn("h-63.25 rounded-[12px] bg-white", className)} />
  }

  const { now, scheduled } = data
  const selected = selectedDay ?? now
  const days = getWeekDays(selected)
  const shiftWeek = (weeks: number) => setSelectedDay(addDays(selected, weeks * DAYS_PER_WEEK))

  return (
    <WeekCardShell days={days} onShiftWeek={shiftWeek} className={className}>
      <WeekDays days={days} selected={selected} today={now} onSelect={setSelectedDay} />
      <div aria-live="polite">
        <DayAgenda day={selected} today={now} bookings={scheduled} />
      </div>
    </WeekCardShell>
  )
}
