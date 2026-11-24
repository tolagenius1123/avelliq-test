"use client"

import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { notifyComingSoon } from "@/lib/coming-soon"

import { ButtonArrow } from "./button-arrow"

type ComingSoonButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  withArrow?: boolean
}

export function ComingSoonButton({ withArrow = false, children, ...props }: ComingSoonButtonProps) {
  return (
    <Button onClick={notifyComingSoon} {...props}>
      {children}
      {withArrow && <ButtonArrow />}
    </Button>
  )
}
