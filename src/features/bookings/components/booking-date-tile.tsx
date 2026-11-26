import { formatMonth, toIsoDate } from "@/lib/date"
import { cn } from "@/lib/utils"

interface BookingDateTileProps {
  date: Date
  className?: string
  dayClassName?: string
}

export function BookingDateTile({ date, className, dayClassName }: BookingDateTileProps) {
  return (
    <time
      dateTime={toIsoDate(date)}
      className={cn(
        "flex w-16 shrink-0 flex-col items-center rounded-[10px] bg-background p-2.5 text-primary",
        className
      )}
    >
      <span className="text-sm leading-[1.3] uppercase">{formatMonth(date)}</span>
      <span className={cn("font-heading text-2xl leading-[1.2] font-medium", dayClassName)}>
        {date.getDate()}
      </span>
    </time>
  )
}
