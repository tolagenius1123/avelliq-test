"use client"

import { useState } from "react"

import {
  DAYS_PER_WEEK,
  addDays,
  formatLongDate,
  formatWeekday,
  formatWeekdayInitial,
  getWeekDays,
  isSameDay,
  toIsoDate,
} from "@/lib/date"
import { cn } from "@/lib/utils"

import type { Booking } from "../types"
import { WeekCardShell } from "./week-card-shell"

interface WeekOverviewCardProps {
  scheduled: Booking[]
  next?: Booking
  today: Date
}

const describeCount = (count: number) =>
  count === 0 ? "No bookings this week" : `${count} ${count === 1 ? "booking" : "bookings"} this week`

export function WeekOverviewCard({ scheduled, next, today }: WeekOverviewCardProps) {
  const [weekOffset, setWeekOffset] = useState(0)
  const days = getWeekDays(addDays(today, weekOffset * DAYS_PER_WEEK))
  const weekBookings = scheduled.filter(({ start }) => days.some((day) => isSameDay(day, start)))

  return (
    <WeekCardShell
      days={days}
      onShiftWeek={(weeks) => setWeekOffset((current) => current + weeks)}
      className="gap-5 rounded-[16px]"
      titleClassName="text-xl"
    >
      <ul className="grid grid-cols-7 gap-1 leading-[1.3]">
        {days.map((day) => {
          const isToday = isSameDay(day, today)
          const isNext = next !== undefined && isSameDay(day, next.start)
          const isBooked = weekBookings.some(({ start }) => isSameDay(start, day))

          return (
            <li
              key={toIsoDate(day)}
              aria-current={isToday ? "date" : undefined}
              className={cn(
                "flex flex-col items-center gap-2 rounded-[20px] border border-transparent py-2 text-ink-strong",
                isToday && "border-primary",
                isBooked && "bg-leaf",
                isNext && "bg-primary text-white"
              )}
            >
              <span className="sr-only">
                {formatLongDate(day)}
                {isBooked && ", booked"}
              </span>
              <span
                aria-hidden="true"
                className={cn("text-muted-foreground", isNext && "text-white")}
              >
                {formatWeekdayInitial(day)}
              </span>
              <span aria-hidden="true">{day.getDate()}</span>
            </li>
          )
        })}
      </ul>
      <div
        aria-live="polite"
        className="flex flex-col gap-1.5 rounded-[10px] bg-background p-3 leading-[1.3]"
      >
        <p className="font-heading text-xl leading-[1.2] font-medium text-primary">
          {describeCount(weekBookings.length)}
        </p>
        <p className="text-muted-foreground">
          {weekBookings
            .map(({ professional, start }) => `${professional.shortName} on ${formatWeekday(start)}`)
            .join(" · ") || "Enjoy the quiet, or book new care."}
        </p>
      </div>
    </WeekCardShell>
  )
}
