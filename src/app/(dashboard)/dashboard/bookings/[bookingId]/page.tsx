import type { Metadata } from "next"

import { BookingDetails } from "@/features/bookings/components/booking-details"
import { DashboardPage } from "@/features/dashboard/components/dashboard-page"

type BookingDetailsPageProps = PageProps<"/dashboard/bookings/[bookingId]">

export async function generateMetadata({ params }: BookingDetailsPageProps): Promise<Metadata> {
  const { bookingId } = await params

  return { title: `Booking ${bookingId}`, robots: { index: false, follow: false } }
}

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { bookingId } = await params

  return (
    <DashboardPage>
      <BookingDetails bookingId={bookingId} />
    </DashboardPage>
  )
}
