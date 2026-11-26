import type { Metadata } from "next"

import { DashboardPage } from "@/features/dashboard/components/dashboard-page"
import { DiscoverServices } from "@/features/dashboard/components/discover-services"
import { NextBookingCard } from "@/features/dashboard/components/next-booking-card"
import { SafetyCard } from "@/features/dashboard/components/safety-card"
import { StatsOverview } from "@/features/dashboard/components/stats-overview"
import { WeekCard } from "@/features/dashboard/components/week-card"
import { WelcomeBanner } from "@/features/dashboard/components/welcome-banner"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your care, bookings and messages on Avelliq.",
  robots: { index: false, follow: false },
}

export default function DashboardOverviewPage() {
  return (
    <DashboardPage>
      <WelcomeBanner />
      <StatsOverview />
      <div className="grid grid-cols-1 gap-5 @2xl:grid-cols-2 @5xl:grid-cols-[497fr_243fr_372fr]">
        <NextBookingCard className="@2xl:col-span-2 @5xl:col-span-1" />
        <SafetyCard />
        <WeekCard />
      </div>
      <DiscoverServices />
    </DashboardPage>
  )
}
