import type { Metadata } from "next"

import { ConversationView } from "@/features/messages/components/conversation-view"

export const metadata: Metadata = {
  title: "Messages",
  description: "Talk to your care professionals on Avelliq.",
  robots: { index: false, follow: false },
}

export default function MessagesPage() {
  return <ConversationView />
}
