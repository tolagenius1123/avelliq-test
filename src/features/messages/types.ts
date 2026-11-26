import type { Professional } from "@/features/professionals/types"

export type MessageSender = "client" | "professional"
export type DeliveryStatus = "sent" | "read"

export interface SharedFile {
  name: string
  description: string
}

export interface Message {
  id: string
  sender: MessageSender
  sentAt: Date
  text?: string
  file?: SharedFile
  delivery?: DeliveryStatus
}

export interface Conversation {
  /** Conversations are one per professional, so they share the professional's id. */
  id: string
  professional: Professional
  messages: Message[]
  unreadCount: number
  isArchived: boolean
}

export type InboxFolder = "all" | "unread" | "archived"
