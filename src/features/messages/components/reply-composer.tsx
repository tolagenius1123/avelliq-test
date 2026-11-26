"use client"

import { ArrowUp, Mic, Plus } from "lucide-react"
import { useState, type FormEvent, type KeyboardEvent } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { notifyComingSoon } from "@/lib/coming-soon"

import { sendMessage } from "../lib/message-store"

const MAX_LENGTH = 1000
const ICON_BUTTON_CLASS = "relative size-8 shrink-0 text-ink-body after:absolute after:-inset-1.5"

interface ReplyComposerProps {
  conversationId: string
  recipient: string
}

export function ReplyComposer({ conversationId, recipient }: ReplyComposerProps) {
  const [draft, setDraft] = useState("")
  const text = draft.trim()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text) return
    sendMessage(conversationId, text)
    setDraft("")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return
    event.preventDefault()
    event.currentTarget.form?.requestSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 border-t-[0.5px] border-stroke p-3 @3xl/page:p-4"
    >
      <div className="flex items-end gap-2 rounded-[12px] border-[0.5px] border-stroke p-2 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Attach a file"
          onClick={notifyComingSoon}
          className={ICON_BUTTON_CLASS}
        >
          <Plus aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </Button>
        <Textarea
          rows={1}
          name="message"
          aria-label={`Message ${recipient}`}
          placeholder="Write a message..."
          maxLength={MAX_LENGTH}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          className="max-h-32 min-h-8 resize-none border-0 px-1 py-1.5 leading-[1.3] text-ink-strong shadow-none focus-visible:ring-0"
        />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Record a voice message"
          onClick={notifyComingSoon}
          className={ICON_BUTTON_CLASS}
        >
          <Mic aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </Button>
        <Button
          type="submit"
          size="icon"
          aria-label="Send message"
          disabled={!text}
          className="relative size-8 shrink-0 rounded-full after:absolute after:-inset-1.5"
        >
          <ArrowUp aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
