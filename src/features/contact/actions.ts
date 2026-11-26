"use server"

import { render } from "@react-email/components"
import { z } from "zod"

import { getRequiredEnv, getResendClient } from "@/lib/resend"

import { CONTACT_TOPICS } from "./data/content"
import { ContactInquiryEmail } from "./emails/contact-inquiry-email"
import { contactFormSchema } from "./schema"

export type ContactFormResult =
  | { ok: true }
  | { ok: false; fieldErrors: Partial<Record<string, string[]>> }
  | { ok: false; deliveryFailed: true }

const receivedAtFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "America/New_York",
})

export async function sendContactMessage(values: unknown): Promise<ContactFormResult> {
  const parsed = contactFormSchema.safeParse(values)
  if (!parsed.success) {
    return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  const { fullName, email, phone, topic, message } = parsed.data
  const topicLabel = CONTACT_TOPICS.find((option) => option.value === topic)?.label ?? topic

  try {
    const emailElement = ContactInquiryEmail({
      fullName,
      email,
      phone,
      topicLabel,
      message,
      receivedAt: `${receivedAtFormatter.format(new Date())} ET`,
    })
    const [html, text] = await Promise.all([
      render(emailElement),
      render(emailElement, { plainText: true }),
    ])

    const { error } = await getResendClient().emails.send({
      from: getRequiredEnv("CONTACT_FROM_EMAIL"),
      to: getRequiredEnv("CONTACT_INBOX_EMAIL"),
      replyTo: email,
      subject: `New inquiry: ${topicLabel} from ${fullName}`,
      html,
      text,
    })

    if (error) {
      console.error(
        `[contact] Resend rejected the inquiry (${error.statusCode ?? "no status"} ${error.name}): ${error.message}`
      )
      return { ok: false, deliveryFailed: true }
    }
  } catch (error) {
    console.error("[contact] Failed to send inquiry", error)
    return { ok: false, deliveryFailed: true }
  }

  return { ok: true }
}
