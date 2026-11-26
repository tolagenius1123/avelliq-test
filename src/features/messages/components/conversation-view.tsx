"use client"

import { useEffect } from "react"

import { Skeleton } from "@/components/ui/skeleton"

import { useConversations } from "../hooks/use-conversations"
import { useLinkedBooking } from "../hooks/use-linked-booking"
import { createEmptyConversation } from "../lib/conversations"
import { markAsRead } from "../lib/message-store"
import type { Conversation } from "../types"
import { BookingStrip } from "./booking-strip"
import { CareContext } from "./care-context"
import { ConversationHeader } from "./conversation-header"
import { MessageStream } from "./message-stream"
import { ReplyComposer } from "./reply-composer"

const CONTEXT_CLASS = "hidden @5xl/page:flex"

function ConversationPanes({ conversation }: { conversation: Conversation }) {
  const { id, professional, messages } = conversation
  const booking = useLinkedBooking(id)

  return (
    <>
      <section
        aria-label={`Conversation with ${professional.name}`}
        className="flex h-[calc(100svh-10.5rem)] min-h-105 min-w-0 flex-col overflow-hidden rounded-[16px] bg-white @3xl/page:h-full @3xl/page:min-h-0"
      >
        <ConversationHeader conversation={conversation} booking={booking} />
        {booking && <BookingStrip booking={booking} />}
        <MessageStream messages={messages} professional={professional} />
        <ReplyComposer key={id} conversationId={id} recipient={professional.shortName} />
      </section>
      <CareContext
        professional={professional}
        booking={booking}
        messages={messages}
        className={CONTEXT_CLASS}
      />
    </>
  )
}

interface ConversationViewProps {
  /** Omitted on the inbox route, where the latest conversation is previewed without being marked as read. */
  conversationId?: string
}

export function ConversationView({ conversationId }: ConversationViewProps) {
  const data = useConversations()

  useEffect(() => {
    if (conversationId) markAsRead(conversationId)
  }, [conversationId])

  if (!data) {
    return (
      <>
        <Skeleton className="h-150 rounded-[16px] bg-white @3xl/page:h-full" />
        <Skeleton className="hidden rounded-[16px] bg-white @5xl/page:block" />
      </>
    )
  }

  const conversation = conversationId
    ? (data.conversations.find(({ id }) => id === conversationId) ??
      createEmptyConversation(conversationId))
    : data.conversations[0]

  return <ConversationPanes conversation={conversation} />
}
