import { SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"

interface EmptyResultsProps {
  title: string
  description: string
  onReset: () => void
}

export function EmptyResults({ title, description, onReset }: EmptyResultsProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[16px] border-[0.5px] border-stroke bg-white px-5 py-14 text-center">
      <SearchX aria-hidden="true" strokeWidth={1.5} className="size-8 text-primary" />
      <div className="flex flex-col gap-2">
        <p className="font-heading text-xl leading-[1.2] font-medium text-ink-strong">{title}</p>
        <p className="text-sm leading-[1.3] text-muted-foreground">{description}</p>
      </div>
      <Button variant="outline-primary" size="pill-sm" onClick={onReset}>
        Clear search
      </Button>
    </div>
  )
}
