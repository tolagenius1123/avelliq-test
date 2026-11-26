import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ConversationView } from "@/features/messages/components/conversation-view"
import { findProfessional, PROFESSIONALS } from "@/features/professionals/data/professionals"

type ConversationPageProps = PageProps<"/dashboard/messages/[conversationId]">

export const dynamicParams = false

export const generateStaticParams = () => PROFESSIONALS.map(({ id }) => ({ conversationId: id }))

export async function generateMetadata({ params }: ConversationPageProps): Promise<Metadata> {
  const { conversationId } = await params
  const professional = findProfessional(conversationId)

  return {
    title: professional ? `Messages with ${professional.name}` : "Messages",
    robots: { index: false, follow: false },
  }
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const { conversationId } = await params
  if (!findProfessional(conversationId)) notFound()

  return <ConversationView conversationId={conversationId} />
}
