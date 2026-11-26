"use client"

import { useSyncExternalStore } from "react"

import type { Message } from "../types"

interface MessageState {
  sent: Record<string, Message[]>
  readIds: string[]
  archivedIds: string[]
}

const INITIAL_STATE: MessageState = { sent: {}, readIds: [], archivedIds: [] }

let state = INITIAL_STATE
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function update(changes: Partial<MessageState>) {
  state = { ...state, ...changes }
  listeners.forEach((notify) => notify())
}

export function sendMessage(conversationId: string, text: string) {
  const previous = state.sent[conversationId] ?? []
  const message: Message = {
    id: `${conversationId}-sent-${previous.length}`,
    sender: "client",
    sentAt: new Date(),
    text,
    delivery: "sent",
  }

  update({
    sent: { ...state.sent, [conversationId]: [...previous, message] },
    archivedIds: state.archivedIds.filter((id) => id !== conversationId),
  })
}

export function markAsRead(conversationId: string) {
  if (state.readIds.includes(conversationId)) return
  update({ readIds: [...state.readIds, conversationId] })
}

export function toggleArchived(conversationId: string) {
  const { archivedIds } = state
  update({
    archivedIds: archivedIds.includes(conversationId)
      ? archivedIds.filter((id) => id !== conversationId)
      : [...archivedIds, conversationId],
  })
}

/** Kept in memory only, so private conversations never reach browser storage. */
export const useMessageState = () =>
  useSyncExternalStore(
    subscribe,
    () => state,
    () => INITIAL_STATE
  )
