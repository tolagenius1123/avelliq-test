import type { PropsWithChildren } from "react"

interface BookingPanelProps {
  title: string
  description: string
}

export function BookingPanel({ title, description, children }: PropsWithChildren<BookingPanelProps>) {
  return (
    <>
      <div className="flex flex-col gap-3 @md/page:gap-6">
        <h2 className="font-heading text-xl leading-[1.2] font-medium text-ink-strong">{title}</h2>
        <p className="text-base leading-[1.4] text-muted-foreground">{description}</p>
      </div>
      {children}
    </>
  )
}
