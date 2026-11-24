import type { ComponentProps } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function DashboardCard({ className, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "rounded-[12px] border-[0.5px] border-stroke shadow-none ring-0 [--card-spacing:--spacing(5)]",
        className
      )}
      {...props}
    />
  )
}
