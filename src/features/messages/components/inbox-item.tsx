import Link from "next/link"

import { ProfessionalPortrait } from "@/features/professionals/components/professional-portrait"
import { cn } from "@/lib/utils"

import { describeMessage, formatInboxTime, getLastMessage } from "../lib/conversations"
import { conversationHref } from "../lib/routes"
import type { Conversation } from "../types"

interface InboxItemProps {
  conversation: Conversation
  now: Date
  isSelected: boolean
}

export function InboxItem({ conversation, now, isSelected }: InboxItemProps) {
  const { id, professional, unreadCount } = conversation
  const lastMessage = getLastMessage(conversation)

  return (
    <Link
      href={conversationHref(id)}
      aria-current={isSelected ? "true" : undefined}
      className={cn(
        "flex items-start gap-2.5 rounded-[8px] p-3 text-sm leading-[1.3] transition-colors outline-none hover:bg-background/60 focus-visible:ring-3 focus-visible:ring-ring/50",
        isSelected && "@3xl/page:bg-background"
      )}
    >
      <ProfessionalPortrait
        professional={professional}
        sizes="36px"
        className="size-9 shrink-0 rounded-full text-xs"
      />
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="flex items-baseline gap-2">
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-ink-strong",
              unreadCount > 0 && "font-semibold"
            )}
          >
            {professional.name}
          </span>
          {lastMessage && (
            <time
              dateTime={lastMessage.sentAt.toISOString()}
              className="shrink-0 text-xs text-muted-foreground"
            >
              {formatInboxTime(lastMessage.sentAt, now)}
            </time>
          )}
        </span>
        <span className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate text-muted-foreground">
            {lastMessage && describeMessage(lastMessage)}
          </span>
          {unreadCount > 0 && (
            <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-white">
              {unreadCount}
              <span className="sr-only"> unread</span>
            </span>
          )}
        </span>
      </span>
    </Link>
  )
}
