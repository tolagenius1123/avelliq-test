import type { PropsWithChildren } from "react"

export function DashboardPage({ children }: PropsWithChildren) {
  return (
    <div className="@container/page">
      <div className="flex flex-col gap-6 px-4 py-6 md:px-6 md:py-8">{children}</div>
    </div>
  )
}
