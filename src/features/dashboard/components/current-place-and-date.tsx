"use client"

import { MapPin } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { useNow } from "@/hooks/use-now"
import { formatLongDate, toIsoDate } from "@/lib/date"
import { cn } from "@/lib/utils"

import { CURRENT_USER } from "../data/mock"

export function CurrentPlaceAndDate({ className }: { className?: string }) {
  const now = useNow()

  return (
    <div
      className={cn("flex items-center gap-2 text-sm leading-[1.3] text-ink-body", className)}
    >
      <MapPin aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0" />
      <span className="whitespace-nowrap">{CURRENT_USER.location}</span>
      <span aria-hidden="true">|</span>
      {now ? (
        <time dateTime={toIsoDate(now)} className="font-medium">
          {formatLongDate(now)}
        </time>
      ) : (
        <Skeleton className="h-4 w-50" />
      )}
    </div>
  )
}
