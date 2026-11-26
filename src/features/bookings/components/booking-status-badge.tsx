import { CircleCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import type { BookingStatus } from "../types"

interface StatusStyle {
  label: string
  shortLabel: string
  className: string
  compactClassName: string
}

const CANCELLED_CLASS = "border-error bg-white text-error"

const STATUS: Record<BookingStatus, StatusStyle> = {
  confirmed: {
    label: "Confirmed",
    shortLabel: "Confirmed",
    className: "bg-success-soft text-success",
    compactClassName: "bg-mint text-primary",
  },
  pending: {
    label: "Awaiting confirmation",
    shortLabel: "Awaiting",
    className: "bg-warning/15 text-warning",
    compactClassName: "bg-background text-primary",
  },
  completed: {
    label: "Completed",
    shortLabel: "Completed",
    className: "bg-mint text-primary",
    compactClassName: "bg-mint text-primary",
  },
  cancelled: {
    label: "Cancelled",
    shortLabel: "Cancelled",
    className: CANCELLED_CLASS,
    compactClassName: CANCELLED_CLASS,
  },
}

interface BookingStatusBadgeProps {
  status: BookingStatus
  compact?: boolean
  withIcon?: boolean
}

export function BookingStatusBadge({
  status,
  compact = false,
  withIcon = false,
}: BookingStatusBadgeProps) {
  const { label, shortLabel, className, compactClassName } = STATUS[status]
  const showIcon = withIcon && (status === "confirmed" || status === "completed")

  return (
    <Badge
      className={cn(
        "h-7.5 px-3.5 text-sm leading-[1.3] font-normal [&>svg]:size-4.5!",
        showIcon && "h-8.5 gap-2 px-2",
        compact ? compactClassName : className
      )}
    >
      {showIcon && <CircleCheck aria-hidden="true" strokeWidth={1.5} />}
      {compact ? shortLabel : label}
    </Badge>
  )
}
