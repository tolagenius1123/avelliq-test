import type { CSSProperties } from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header"
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar"

const SIDEBAR_STYLE = { "--sidebar-width": "15rem" } as CSSProperties

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider style={SIDEBAR_STYLE}>
      <DashboardSidebar />
      <SidebarInset className="min-w-0">
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
