"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  addDays,
  formatDateRange,
  formatLongDate,
  formatRelativeDay,
  formatTime,
  formatWeekdayInitial,
  getWeekDays,
  isSameDay,
  toIsoDate,
} from "@/lib/date"
import { cn } from "@/lib/utils"

import { useBookings } from "../hooks/use-bookings"
import type { Booking } from "../types"
import { DashboardCard } from "./dashboard-card"

const DAYS_PER_WEEK = 7

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

  const { now, bookings } = data
  const selected = selectedDay ?? now
  const days = getWeekDays(selected)
  const shiftWeek = (weeks: number) => setSelectedDay(addDays(selected, weeks * DAYS_PER_WEEK))

  return (
    <DashboardCard className={cn("gap-7", className)}>
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl leading-[1.2] text-ink-strong">
          <h2>Your week</h2>
        </CardTitle>
        <CardDescription aria-live="polite" className="leading-[1.3]">
          {formatDateRange(days[0], days[days.length - 1])}
        </CardDescription>
        <CardAction className="-mt-1.5 -mr-2 flex">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Previous week"
            onClick={() => shiftWeek(-1)}
          >
            <ChevronLeft aria-hidden="true" className="size-4.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Next week" onClick={() => shiftWeek(1)}>
            <ChevronRight aria-hidden="true" className="size-4.5" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 justify-between gap-7">
        <WeekDays days={days} selected={selected} today={now} onSelect={setSelectedDay} />
        <div aria-live="polite">
          <DayAgenda day={selected} today={now} bookings={bookings} />
        </div>
      </CardContent>
    </DashboardCard>
  )
}
