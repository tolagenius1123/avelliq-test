"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, CircleCheck } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { CheckboxField } from "@/components/form/checkbox-field"
import { InputField } from "@/components/form/input-field"
import { SelectField } from "@/components/form/select-field"
import { SubmitButton } from "@/components/form/submit-button"
import { TextareaField } from "@/components/form/textarea-field"
import { Button } from "@/components/ui/button"

import { sendContactMessage } from "../actions"
import { CONTACT_TOPICS } from "../data/content"
import { CONTACT_FORM_DEFAULTS, contactFormSchema, type ContactFormValues } from "../schema"

type ContactFormOutput = z.output<typeof contactFormSchema>
type SubmitState = "idle" | "success" | "error"

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle")
  const form = useForm<ContactFormValues, unknown, ContactFormOutput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: CONTACT_FORM_DEFAULTS,
    mode: "onTouched",
  })
  const { control, handleSubmit, setError, reset, formState } = form

  const onSubmit = async (values: ContactFormOutput) => {
    try {
      const result = await sendContactMessage(values)
      if (result.ok) {
        reset()
        setSubmitState("success")
        return
      }
      if ("deliveryFailed" in result) {
        setSubmitState("error")
        return
      }
      for (const [name, messages] of Object.entries(result.fieldErrors)) {
        setError(name as keyof ContactFormValues, { message: messages?.[0] })
      }
    } catch {
      setSubmitState("error")
    }
  }

  if (submitState === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <CircleCheck aria-hidden="true" strokeWidth={1.5} className="size-10 text-primary" />
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-2xl font-medium text-primary">Message sent</h3>
          <p className="text-base leading-[1.4] text-ink">
            Thanks for reaching out. Our team will reply within one business day.
          </p>
        </div>
        <Button variant="outline-primary" size="pill-sm" onClick={() => setSubmitState("idle")}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      noValidate
      aria-label="Contact form"
      aria-busy={formState.isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 sm:gap-y-8">
        <InputField
          control={control}
          name="fullName"
          label="Full Name"
          placeholder="e.g. Sarah Jenkins"
          autoComplete="name"
        />
        <InputField
          control={control}
          name="email"
          label="Email Address"
          type="email"
          placeholder="e.g. sarah@example.com"
          autoComplete="email"
        />
        <InputField
          control={control}
          name="phone"
          label="Phone Number"
          optional
          type="tel"
          placeholder="e.g. +1 (555) 000-0000"
          autoComplete="tel"
        />
        <SelectField
          control={control}
          name="topic"
          label="Topic"
          placeholder="Select a topic..."
          options={CONTACT_TOPICS}
        />
        <TextareaField
          control={control}
          name="message"
          label="Message"
          placeholder="Briefly describe how our support team can assist you..."
          className="sm:col-span-2"
        />
      </div>

      <CheckboxField
        control={control}
        name="consent"
        label="I agree to the privacy policy and consent to receiving support updates via email."
      />

      {submitState === "error" && (
        <p role="alert" className="text-sm text-destructive">
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      )}

      <SubmitButton
        size="pill-sm"
        isLoading={formState.isSubmitting}
        loadingLabel="Sending..."
        className="w-full sm:w-fit"
      >
        Send Message
        <ArrowRight
          aria-hidden="true"
          className="size-3 transition-transform group-hover/button:translate-x-0.5"
        />
      </SubmitButton>
    </form>
  )
}
