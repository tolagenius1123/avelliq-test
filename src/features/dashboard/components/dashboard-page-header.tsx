import type { ReactNode, Ref } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface DashboardPageHeaderProps {
  title: ReactNode
  description: string
  eyebrow?: ReactNode
  action?: ReactNode
  isTitlePending?: boolean
  headingRef?: Ref<HTMLHeadingElement>
}

export function DashboardPageHeader({
  title,
  description,
  eyebrow,
  action,
  isTitlePending = false,
  headingRef,
}: DashboardPageHeaderProps) {
  return (
    <section className="flex flex-col items-start justify-between gap-5 @2xl:flex-row @2xl:items-center">
      <div className="flex flex-col gap-3.5">
        {eyebrow}
        <div className="text-[26px] leading-[1.2] @2xl:text-[32px]">
          <h1
            ref={headingRef}
            tabIndex={headingRef ? -1 : undefined}
            className={cn(
              "font-heading font-semibold text-primary outline-none",
              isTitlePending && "sr-only"
            )}
          >
            {title}
          </h1>
          {isTitlePending && <Skeleton className="h-[1.2em] w-75 max-w-full" />}
        </div>
        <p className="text-base leading-[1.4] text-muted-foreground">{description}</p>
      </div>
      {action}
    </section>
  )
}
