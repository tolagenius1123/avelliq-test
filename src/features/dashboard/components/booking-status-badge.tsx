import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import type { BookingStatus } from "../types"

const STATUS: Record<BookingStatus, { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "bg-success-soft text-success" },
  pending: { label: "Pending", className: "bg-warning/15 text-warning" },
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const { label, className } = STATUS[status]

  return (
    <Badge className={cn("h-7.5 px-3.5 text-sm leading-[1.3] font-normal", className)}>
      {label}
    </Badge>
  )
}
