"use client"

import { useEffect, useRef } from "react"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface UnderlineTabsProps {
  items: readonly { value: string; label: string }[]
  selected: string
  size?: "default" | "compact"
  "aria-label": string
}

export function UnderlineTabs({
  items,
  selected,
  size = "default",
  "aria-label": ariaLabel,
}: UnderlineTabsProps) {
  const isCompact = size === "compact"
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    const tab = scroller?.querySelector<HTMLElement>(`[data-tab="${selected}"]`)
    if (!scroller || !tab) return

    const centeredLeft = tab.offsetLeft - (scroller.clientWidth - tab.offsetWidth) / 2
    scroller.scrollTo({ left: centeredLeft })
  }, [selected])

  return (
    <div
      ref={scrollerRef}
      className={cn(
        "no-scrollbar relative overflow-x-auto",
        !isCompact && "-mx-4 px-4 md:-mx-6 md:px-6"
      )}
    >
      <TabsList
        variant="line"
        aria-label={ariaLabel}
        className={cn(
          "static gap-4 p-0 group-data-horizontal/tabs:h-11",
          isCompact && "w-full gap-2"
        )}
      >
        {items.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            data-tab={value}
            className={cn(
              "h-full flex-none rounded-none border-0 border-b border-stroke/50 px-4 text-lg leading-[1.2] font-normal text-muted-foreground after:bg-support group-data-horizontal/tabs:after:bottom-0 data-active:font-semibold data-active:text-primary",
              isCompact && "flex-auto px-1 text-base"
            )}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  )
}
