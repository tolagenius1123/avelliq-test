"use client"

import Image from "next/image"
import Link from "next/link"

import wave from "@/assets/images/dashboard/wave.png"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES } from "@/config/site"
import { useNow } from "@/hooks/use-now"
import { getDayPeriod } from "@/lib/date"
import { cn } from "@/lib/utils"

import { CURRENT_USER } from "../data/mock"
import { CurrentPlaceAndDate } from "./current-place-and-date"
import { DashboardPageHeader } from "./dashboard-page-header"

export function WelcomeBanner() {
  const now = useNow()

  return (
    <DashboardPageHeader
      eyebrow={<CurrentPlaceAndDate className="xl:hidden" />}
      isTitlePending={!now}
      title={
        <>
          {now ? `Good ${getDayPeriod(now)}` : "Welcome"}, {CURRENT_USER.firstName}{" "}
          <Image src={wave} alt="" loading="eager" className="inline-block size-7 align-[-0.1em]" />
        </>
      }
      description="Stay connected with your professionals and make more time for what matters."
      action={
        <Link
          href={ROUTES.findCare}
          className={cn(buttonVariants({ size: "pill-lg" }), "font-normal")}
        >
          Find care
        </Link>
      }
    />
  )
}
