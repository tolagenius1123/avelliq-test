"use client"

import { Search } from "lucide-react"
import type { ComponentProps } from "react"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

import { PILL_FIELD_CLASS } from "./pill-field"

type PillSearchInputProps = Omit<ComponentProps<typeof InputGroupInput>, "type" | "className">

export function PillSearchInput(props: PillSearchInputProps) {
  return (
    <InputGroup className={PILL_FIELD_CLASS}>
      <InputGroupAddon className="pr-0 pl-5">
        <Search aria-hidden="true" strokeWidth={1.5} className="size-6 text-ink-body" />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        autoComplete="off"
        className="h-full px-0! text-base placeholder:text-muted-foreground md:text-base"
        {...props}
      />
    </InputGroup>
  )
}
