import { getProfessional } from "@/features/professionals/data/professionals"
import { formatMonthDay, formatTime, formatWeekday, getDayDifference, isSameDay } from "@/lib/date"

import type { Conversation, Message } from "../types"

const DAYS_SHOWN_AS_WEEKDAY = 7

export const createEmptyConversation = (professionalId: string): Conversation => ({
  id: professionalId,
  professional: getProfessional(professionalId),
  messages: [],
  unreadCount: 0,
  isArchived: false,
})

export const getLastMessage = ({ messages }: Conversation) => messages.at(-1)

export function describeMessage({ sender, text, file }: Message) {
  const summary = text ?? file?.name ?? ""
  return sender === "client" ? `You: ${summary}` : summary
}

export function formatInboxTime(sentAt: Date, now: Date) {
  if (isSameDay(sentAt, now)) return formatTime(sentAt)
  return getDayDifference(sentAt, now) < DAYS_SHOWN_AS_WEEKDAY
    ? formatWeekday(sentAt)
    : formatMonthDay(sentAt)
}

export function matchesSearch({ professional, messages }: Conversation, query: string) {
  const term = query.trim().toLowerCase()
  return [professional.name, ...messages.map(({ text, file }) => text ?? file?.name ?? "")].some(
    (content) => content.toLowerCase().includes(term)
  )
}

export function groupByDay(messages: Message[]) {
  return messages.reduce<{ day: Date; messages: Message[] }[]>((groups, message) => {
    const current = groups.at(-1)
    if (current && isSameDay(current.day, message.sentAt)) {
      return [...groups.slice(0, -1), { ...current, messages: [...current.messages, message] }]
    }
    return [...groups, { day: message.sentAt, messages: [message] }]
  }, [])
}
