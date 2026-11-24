import { LogIn } from "lucide-react"
import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import { buttonVariants } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ROUTES } from "@/config/site"
import { cn } from "@/lib/utils"

import { DashboardNav } from "./dashboard-nav"
import { SidebarHelpCard } from "./sidebar-help-card"

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r-0!">
      <SidebarHeader className="items-center px-6 pt-6 pb-5">
        <Logo inverted />
      </SidebarHeader>

      <SidebarContent className="gap-0 px-6 pb-6">
        <nav aria-label="Dashboard">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <DashboardNav menu="main" />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator className="my-6 mr-0 ml-4 w-auto!" />
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="h-12 px-4 text-base text-white">Report</SidebarGroupLabel>
            <SidebarGroupContent>
              <DashboardNav menu="report" />
            </SidebarGroupContent>
          </SidebarGroup>
        </nav>
        <div className="mt-auto pt-14">
          <SidebarHelpCard />
        </div>
      </SidebarContent>

      <SidebarFooter className="px-6 pt-4 pb-8">
        <Link
          href={ROUTES.signIn}
          className={cn(
            buttonVariants(),
            "h-12 gap-3 rounded-[8px] bg-white/40 text-lg text-support hover:bg-white/55"
          )}
        >
          <LogIn aria-hidden="true" className="size-5" />
          Logout
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
