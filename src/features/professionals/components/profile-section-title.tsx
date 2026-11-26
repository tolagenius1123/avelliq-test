import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function ProfileSectionTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-heading text-xl leading-[1.2] font-medium text-primary", className)}
      {...props}
    />
  )
}
