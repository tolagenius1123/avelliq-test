"use client"

import { useEffect, useRef } from "react"

import type { Professional } from "@/features/professionals/types"
import { formatLongWeekdayMonthDay, toIsoDate } from "@/lib/date"

import { groupByDay } from "../lib/conversations"
import type { Message } from "../types"
import { MessageBubble } from "./message-bubble"

interface MessageStreamProps {
  messages: Message[]
  professional: Professional
}

export function MessageStream({ messages, professional }: MessageStreamProps) {
  const streamRef = useRef<HTMLDivElement>(null)
  const lastMessageId = messages.at(-1)?.id

  useEffect(() => {
    const stream = streamRef.current
    stream?.scrollTo({ top: stream.scrollHeight })
  }, [lastMessageId])

  return (
    <div
      ref={streamRef}
      role="log"
      aria-label="Messages"
      tabIndex={0}
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset @3xl/page:p-5"
    >
      {messages.length === 0 && (
        <p className="m-auto max-w-70 text-center text-sm leading-[1.3] text-muted-foreground">
          Say hello to {professional.shortName}. Share what you need and ask about availability.
        </p>
      )}
      {groupByDay(messages).map(({ day, messages: dayMessages }) => (
        <section key={toIsoDate(day)} className="flex flex-col gap-3">
          <h3 className="text-center text-sm leading-[1.3] font-normal text-muted-foreground">
            {formatLongWeekdayMonthDay(day)}
          </h3>
          {dayMessages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              senderName={message.sender === "client" ? "You" : professional.name}
            />
          ))}
        </section>
      ))}
    </div>
  )
}
