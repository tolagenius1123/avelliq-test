import type { Metadata } from "next"

import { DashboardPage } from "@/features/dashboard/components/dashboard-page"
import { FindCare } from "@/features/find-care/components/find-care"

export const metadata: Metadata = {
  title: "Find Care",
  description: "Search and filter trusted care professionals on Avelliq.",
  robots: { index: false, follow: false },
}

export default async function FindCarePage({ searchParams }: PageProps<"/dashboard/find-care">) {
  const { professional } = await searchParams
  const professionalId = typeof professional === "string" ? professional : undefined

  return (
    <DashboardPage>
      <FindCare initialProfessionalId={professionalId} />
    </DashboardPage>
  )
}
