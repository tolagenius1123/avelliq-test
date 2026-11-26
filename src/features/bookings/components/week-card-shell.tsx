"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type { PropsWithChildren } from "react"

import { Button } from "@/components/ui/button"
import {
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DashboardCard } from "@/features/dashboard/components/dashboard-card"
import { formatDateRange } from "@/lib/date"
import { cn } from "@/lib/utils"

interface WeekCardShellProps {
  days: Date[]
  onShiftWeek: (weeks: number) => void
  className?: string
  titleClassName?: string
}

export function WeekCardShell({
  days,
  onShiftWeek,
  className,
  titleClassName,
  children,
}: PropsWithChildren<WeekCardShellProps>) {
  return (
    <DashboardCard className={cn("gap-7", className)}>
      <CardHeader className="gap-2">
        <CardTitle className={cn("text-2xl leading-[1.2] text-ink-strong", titleClassName)}>
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
            onClick={() => onShiftWeek(-1)}
          >
            <ChevronLeft aria-hidden="true" className="size-4.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Next week"
            onClick={() => onShiftWeek(1)}
          >
            <ChevronRight aria-hidden="true" className="size-4.5" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 justify-between gap-7">{children}</CardContent>
    </DashboardCard>
  )
}
