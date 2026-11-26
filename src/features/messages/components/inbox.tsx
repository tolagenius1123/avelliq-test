"use client"

import { Search } from "lucide-react"
import { useState } from "react"

import { UnderlineTabs } from "@/components/shared/underline-tabs"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Tabs, TabsContent } from "@/components/ui/tabs"

import { INBOX_FOLDERS, isInFolder } from "../data/folders"
import { matchesSearch } from "../lib/conversations"
import type { Conversation, InboxFolder } from "../types"
import { InboxItem } from "./inbox-item"

interface InboxProps {
  conversations: Conversation[]
  now: Date
  selectedId?: string
}

export function Inbox({ conversations, now, selectedId }: InboxProps) {
  const [folder, setFolder] = useState<InboxFolder>("all")
  const [query, setQuery] = useState("")

  const visible = conversations.filter(
    (conversation) => isInFolder(conversation, folder) && matchesSearch(conversation, query)
  )
  const emptyMessage = query
    ? "No conversations match your search."
    : INBOX_FOLDERS.find(({ value }) => value === folder)?.emptyMessage

  return (
    <section
      aria-labelledby="inbox-heading"
      className="flex h-full min-h-90 flex-col gap-4 rounded-[16px] bg-white p-4"
    >
      <h2
        id="inbox-heading"
        className="font-heading text-xl leading-[1.2] font-medium text-ink-strong"
      >
        Inbox
      </h2>
      <InputGroup className="h-12 shrink-0 rounded-[8px] border-[0.5px] border-stroke shadow-none">
        <InputGroupAddon className="pl-5">
          <Search aria-hidden="true" strokeWidth={1.5} className="size-4 text-ink-body" />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          aria-label="Search messages"
          placeholder="Search messages"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="placeholder:text-muted-foreground md:text-sm"
        />
      </InputGroup>
      <Tabs
        value={folder}
        onValueChange={(value: InboxFolder) => setFolder(value)}
        className="min-h-0 flex-1 gap-4"
      >
        <UnderlineTabs
          items={INBOX_FOLDERS}
          selected={folder}
          size="compact"
          aria-label="Message folders"
        />
        <TabsContent value={folder} className="-mx-1 min-h-0 overflow-y-auto px-1">
          {visible.length === 0 ? (
            <p role="status" className="py-6 text-center text-muted-foreground">
              {emptyMessage}
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {visible.map((conversation) => (
                <li key={conversation.id}>
                  <InboxItem
                    conversation={conversation}
                    now={now}
                    isSelected={conversation.id === selectedId}
                  />
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
