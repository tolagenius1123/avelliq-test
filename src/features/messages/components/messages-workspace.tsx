"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { DashboardPageHeader } from "@/features/dashboard/components/dashboard-page-header"
import { cn } from "@/lib/utils"

import { useConversations } from "../hooks/use-conversations"
import { Inbox } from "./inbox"
import { NewMessageDialog } from "./new-message-dialog"

const PANE_HEIGHT_CLASS = "@3xl/page:h-[calc(100svh-15.5rem)] @3xl/page:max-h-220 @3xl/page:min-h-130"

export function MessagesWorkspace({ children }: PropsWithChildren) {
  const selectedId = useSelectedLayoutSegment()
  const data = useConversations()
  const hasSelection = selectedId !== null

  return (
    <>
      <div className={cn("@container", hasSelection && "hidden @3xl/page:block")}>
        <DashboardPageHeader
          title="Messages"
          description="A little conversation. Better care."
          action={<NewMessageDialog />}
        />
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-4 @3xl/page:grid-cols-[280px_minmax(0,1fr)] @5xl/page:grid-cols-[296px_minmax(0,1fr)_264px]",
          PANE_HEIGHT_CLASS
        )}
      >
        <div className={cn("min-h-0 min-w-0", hasSelection && "hidden @3xl/page:block")}>
          {data ? (
            <Inbox
              conversations={data.conversations}
              now={data.now}
              selectedId={selectedId ?? data.conversations.at(0)?.id}
            />
          ) : (
            <Skeleton className="h-100 rounded-[16px] bg-white @3xl/page:h-full" />
          )}
        </div>
        <div
          className={cn(
            "min-h-0 min-w-0 grid-cols-subgrid @3xl/page:contents",
            !hasSelection && "hidden"
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}
