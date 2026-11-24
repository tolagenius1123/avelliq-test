"use client"

import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { notifyComingSoon } from "@/lib/coming-soon"

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  notifyComingSoon()
}

export function NewsletterForm() {
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <Input
        id="newsletter-email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Enter your email address"
        className="h-auto rounded-[6px] border-[0.5px] border-[#F1F3F7] bg-transparent px-4 py-4.5 text-sm leading-[1.3] text-white shadow-[0px_1px_4px_0px_rgba(25,33,61,0.08)] placeholder:text-sand focus-visible:border-white focus-visible:ring-white/30 md:text-sm"
      />
      <Button
        type="submit"
        variant="light"
        className="h-auto w-fit rounded-[6px] px-4.5 py-3.75 text-sm leading-5 font-semibold shadow-[0px_1px_2px_rgba(25,33,61,0.08)]"
      >
        Subscribe
      </Button>
    </form>
  )
}
