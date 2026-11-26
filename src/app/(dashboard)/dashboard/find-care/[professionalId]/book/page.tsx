import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BookingFlow } from "@/features/booking-flow/components/booking-flow"
import { DashboardPage } from "@/features/dashboard/components/dashboard-page"
import { findProfessional, PROFESSIONALS } from "@/features/professionals/data/professionals"

type BookingPageProps = PageProps<"/dashboard/find-care/[professionalId]/book">

export const dynamicParams = false

export const generateStaticParams = () => PROFESSIONALS.map(({ id }) => ({ professionalId: id }))

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { professionalId } = await params
  const professional = findProfessional(professionalId)

  return {
    title: professional ? `Book ${professional.name}` : "Book care",
    robots: { index: false, follow: false },
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { professionalId } = await params
  if (!findProfessional(professionalId)) notFound()

  return (
    <DashboardPage>
      <BookingFlow professionalId={professionalId} />
    </DashboardPage>
  )
}
