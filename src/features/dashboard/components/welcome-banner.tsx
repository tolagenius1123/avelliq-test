"use client"

import Image from "next/image"

import wave from "@/assets/images/dashboard/wave.png"
import { ComingSoonButton } from "@/components/shared/coming-soon-button"
import { Skeleton } from "@/components/ui/skeleton"
import { useNow } from "@/hooks/use-now"
import { getDayPeriod } from "@/lib/date"
import { cn } from "@/lib/utils"

import { CURRENT_USER } from "../data/mock"
import { CurrentPlaceAndDate } from "./current-place-and-date"

export function WelcomeBanner() {
  const now = useNow()

  return (
    <section className="flex flex-col items-start justify-between gap-5 @2xl:flex-row @2xl:items-center">
      <div className="flex flex-col gap-3.5">
        <CurrentPlaceAndDate className="xl:hidden" />
        <div className="text-[26px] leading-[1.2] @2xl:text-[32px]">
          <h1 className={cn("font-heading font-semibold text-primary", !now && "sr-only")}>
            {now ? `Good ${getDayPeriod(now)}` : "Welcome"}, {CURRENT_USER.firstName}{" "}
            <Image src={wave} alt="" loading="eager" className="inline-block size-7 align-[-0.1em]" />
          </h1>
          {!now && <Skeleton className="h-[1.2em] w-75 max-w-full" />}
        </div>
        <p className="text-base leading-[1.4] text-muted-foreground">
          Stay connected with your professionals and make more time for what matters.
        </p>
      </div>
      <ComingSoonButton size="pill-lg" className="font-normal">
        Find care
      </ComingSoonButton>
    </section>
  )
}
