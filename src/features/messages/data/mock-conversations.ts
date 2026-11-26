import { getProfessional } from "@/features/professionals/data/professionals"
import { addDays, formatLongWeekday, parseLocalDateTime, toIsoDate } from "@/lib/date"

import type { Conversation, Message } from "../types"

type MessageTemplate = Omit<Message, "id" | "sentAt" | "text"> & {
  time: string
  text?: string
}

interface ConversationTemplate {
  professionalId: string
  /** Days from today to the exchange and to the booking being discussed. */
  sentDayOffset: number
  bookingDayOffset: number
  unreadCount?: number
  messages: (bookingDay: string) => MessageTemplate[]
}

const CONVERSATION_TEMPLATES: ConversationTemplate[] = [
  {
    professionalId: "eneoma-adebayo",
    sentDayOffset: -1,
    bookingDayOffset: 0,
    messages: (bookingDay) => [
      {
        sender: "professional",
        time: "10:18",
        text: `Hi! I've reviewed Jamie's care notes for ${bookingDay}. I'm looking forward to meeting your family.`,
      },
      {
        sender: "professional",
        time: "10:19",
        file: { name: "Jamie-care-notes.pdf", description: "Shared care notes" },
      },
      {
        sender: "client",
        time: "10:20",
        text: "Thank you! Could you help with homework first, then prepare a light snack?",
        delivery: "read",
      },
      {
        sender: "professional",
        time: "10:24",
        text: "Of course. Homework first, then a light snack. Is there anything else I should know?",
      },
    ],
  },
  {
    professionalId: "emily-chen",
    sentDayOffset: -1,
    bookingDayOffset: 2,
    messages: (bookingDay) => [
      {
        sender: "professional",
        time: "09:32",
        text: `Hi! I'm checking in about ${bookingDay}'s babysitting booking.`,
      },
      {
        sender: "client",
        time: "09:36",
        text: "Hi Emily, we're looking forward to seeing you at 10 AM.",
        delivery: "read",
      },
      { sender: "professional", time: "09:40", text: `See you on ${bookingDay}. Thank you!` },
    ],
  },
  {
    professionalId: "grace-okafor",
    sentDayOffset: -2,
    bookingDayOffset: 5,
    unreadCount: 2,
    messages: () => [
      {
        sender: "professional",
        time: "16:18",
        text: "Hello, thank you for your care request. I'd like to learn a little more about your family's needs.",
      },
      {
        sender: "professional",
        time: "16:20",
        text: "Could you share the arrival details before I confirm the visit?",
      },
    ],
  },
]

export function createMockConversations(today: Date): Conversation[] {
  return CONVERSATION_TEMPLATES.map(
    ({ professionalId, sentDayOffset, bookingDayOffset, unreadCount = 0, messages }) => {
      const sentDay = toIsoDate(addDays(today, sentDayOffset))
      const bookingDay = formatLongWeekday(addDays(today, bookingDayOffset))

      return {
        id: professionalId,
        professional: getProfessional(professionalId),
        messages: messages(bookingDay).map(({ time, ...message }, index) => ({
          ...message,
          id: `${professionalId}-${index}`,
          sentAt: parseLocalDateTime(sentDay, time),
        })),
        unreadCount,
        isArchived: false,
      }
    }
  )
}
