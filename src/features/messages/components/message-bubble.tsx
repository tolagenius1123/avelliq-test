import { FileText } from "lucide-react"

import { ComingSoonButton } from "@/components/shared/coming-soon-button"
import { formatTime } from "@/lib/date"
import { cn } from "@/lib/utils"

import type { DeliveryStatus, Message, SharedFile } from "../types"

const DELIVERY_LABELS: Record<DeliveryStatus, string> = { sent: "Sent", read: "Read" }

interface SharedFileCardProps {
  file: SharedFile
  time: string
}

function SharedFileCard({ file, time }: SharedFileCardProps) {
  return (
    <ComingSoonButton
      variant="ghost"
      className="h-auto w-full items-start justify-start gap-3 rounded-[12px] border-stroke p-3 text-left font-normal whitespace-normal"
    >
      <FileText aria-hidden="true" strokeWidth={1.5} className="size-6 text-ink-strong" />
      <span className="flex min-w-0 flex-col gap-1.5 text-sm leading-[1.3]">
        <span className="wrap-anywhere text-ink-strong">{file.name}</span>
        <span className="text-muted-foreground">
          {file.description} · {time}
        </span>
      </span>
    </ComingSoonButton>
  )
}

interface MessageBubbleProps {
  message: Message
  senderName: string
}

export function MessageBubble({ message, senderName }: MessageBubbleProps) {
  const { sender, sentAt, text, file, delivery } = message
  const isOwn = sender === "client"
  const time = formatTime(sentAt)

  if (file) return <SharedFileCard file={file} time={time} />

  return (
    <article
      className={cn(
        "flex w-fit max-w-[85%] flex-col gap-1.5 text-sm leading-[1.3] @3xl/page:max-w-100",
        isOwn && "items-end self-end"
      )}
    >
      <p
        className={cn(
          "rounded-[14px] bg-background p-3 wrap-anywhere whitespace-pre-wrap text-ink-strong",
          isOwn && "bg-primary text-white"
        )}
      >
        <span className="sr-only">{senderName}: </span>
        {text}
      </p>
      <p className="text-muted-foreground">
        <time dateTime={sentAt.toISOString()}>{time}</time>
        {delivery && ` · ${DELIVERY_LABELS[delivery]}`}
      </p>
    </article>
  )
}
