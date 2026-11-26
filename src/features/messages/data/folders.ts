import type { Conversation, InboxFolder } from "../types"

export const INBOX_FOLDERS: { value: InboxFolder; label: string; emptyMessage: string }[] = [
  { value: "all", label: "All", emptyMessage: "No conversations yet." },
  { value: "unread", label: "Unread", emptyMessage: "You're all caught up." },
  { value: "archived", label: "Archived", emptyMessage: "No archived conversations." },
]

export const isInFolder = ({ isArchived, unreadCount }: Conversation, folder: InboxFolder) => {
  if (folder === "archived") return isArchived
  return !isArchived && (folder === "all" || unreadCount > 0)
}
