import type { Metadata } from "next"

import { MyBookings } from "@/features/bookings/components/my-bookings"
import { DashboardPage } from "@/features/dashboard/components/dashboard-page"

export const metadata: Metadata = {
  title: "My bookings",
  description: "See and manage your upcoming and past care on Avelliq.",
  robots: { index: false, follow: false },
}

export default function MyBookingsPage() {
  return (
    <DashboardPage>
      <MyBookings />
    </DashboardPage>
  )
}
