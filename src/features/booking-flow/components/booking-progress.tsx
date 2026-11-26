import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

import { BOOKING_STEPS } from "../data/steps"

interface BookingProgressProps {
  currentIndex: number
}

export function BookingProgress({ currentIndex }: BookingProgressProps) {
  return (
    <ol
      aria-label="Booking progress"
      className="grid grid-cols-4 gap-2 rounded-[12px] border-[0.5px] border-stroke bg-white p-4 @2xl:gap-4"
    >
      {BOOKING_STEPS.map(({ step, label }, index) => {
        const isComplete = index < currentIndex
        const isCurrent = index === currentIndex

        return (
          <li
            key={step}
            aria-current={isCurrent ? "step" : undefined}
            className="flex flex-col items-center gap-2 text-center @2xl:flex-row @2xl:gap-2.5 @2xl:text-left"
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full bg-background text-sm leading-[1.3] text-muted-foreground",
                isCurrent && "bg-muted-foreground text-white",
                isComplete && "bg-support text-white"
              )}
            >
              {isComplete ? <Check className="size-4" /> : index + 1}
            </span>
            <span
              className={cn(
                "text-xs leading-[1.4] text-muted-foreground @2xl:text-base",
                (isComplete || isCurrent) && "text-primary"
              )}
            >
              {label}
              {isComplete && <span className="sr-only"> (completed)</span>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
