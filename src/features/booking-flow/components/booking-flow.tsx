"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { getProfessional } from "@/features/professionals/data/professionals"
import { useNow } from "@/hooks/use-now"

import { BookingWizard } from "./booking-wizard"

export function BookingFlow({ professionalId }: { professionalId: string }) {
  const now = useNow()

  if (!now) {
    return (
      <>
        <Skeleton className="h-17 max-w-120 bg-white" />
        <Skeleton className="h-15 rounded-[12px] bg-white" />
        <Skeleton className="h-150 rounded-[16px] bg-white" />
      </>
    )
  }

  return <BookingWizard professional={getProfessional(professionalId)} today={now} />
}
