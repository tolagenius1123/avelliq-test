import { DashboardPage } from "@/features/dashboard/components/dashboard-page"
import { MessagesWorkspace } from "@/features/messages/components/messages-workspace"

export default function MessagesLayout({ children }: LayoutProps<"/dashboard/messages">) {
  return (
    <DashboardPage>
      <MessagesWorkspace>{children}</MessagesWorkspace>
    </DashboardPage>
  )
}
