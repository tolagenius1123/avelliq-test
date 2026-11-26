"use client"

import { useMemo } from "react"

import { useNow } from "@/hooks/use-now"

import { createMockConversations } from "../data/mock-conversations"
import { createEmptyConversation, getLastMessage } from "../lib/conversations"
import { useMessageState } from "../lib/message-store"
import type { Conversation } from "../types"

const getLastSentTime = (conversation: Conversation) =>
  getLastMessage(conversation)?.sentAt.getTime() ?? 0

export function useConversations() {
  const now = useNow()
  const { sent, readIds, archivedIds } = useMessageState()

  return useMemo(() => {
    if (!now) return null

    const existing = createMockConversations(now)
    const started = Object.keys(sent)
      .filter((id) => !existing.some((conversation) => conversation.id === id))
      .map(createEmptyConversation)

    const conversations = [...existing, ...started]
      .map((conversation) => ({
        ...conversation,
        messages: [...conversation.messages, ...(sent[conversation.id] ?? [])],
        unreadCount: readIds.includes(conversation.id) ? 0 : conversation.unreadCount,
        isArchived: archivedIds.includes(conversation.id),
      }))
      .sort((first, second) => getLastSentTime(second) - getLastSentTime(first))

    return {
      now,
      conversations,
      unreadTotal: conversations.reduce((total, { unreadCount }) => total + unreadCount, 0),
    }
  }, [now, sent, readIds, archivedIds])
}
