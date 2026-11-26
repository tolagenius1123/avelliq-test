"use client"

import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SaveProfessionalButtonProps {
  name: string
  isSaved: boolean
  onToggle: () => void
  variant?: "icon" | "label"
  className?: string
}

export function SaveProfessionalButton({
  name,
  isSaved,
  onToggle,
  variant = "icon",
  className,
}: SaveProfessionalButtonProps) {
  const heart = (
    <Heart
      aria-hidden="true"
      strokeWidth={1.5}
      className={cn(isSaved && "fill-support text-support")}
    />
  )

  if (variant === "label") {
    return (
      <Button
        variant="outline-primary"
        aria-pressed={isSaved}
        aria-label={`Save ${name}`}
        onClick={onToggle}
        className={cn("h-10 gap-2 rounded-full px-6 text-base font-normal", className)}
      >
        {heart}
        {isSaved ? "Saved" : "Save"}
      </Button>
    )
  }

  return (
    <Button
      variant="white"
      size="icon"
      aria-pressed={isSaved}
      aria-label={`Save ${name}`}
      onClick={onToggle}
      className={cn(
        "size-8 rounded-full text-ink-strong shadow-none after:absolute after:-inset-1.5 [&_svg]:size-4.5!",
        className
      )}
    >
      {heart}
    </Button>
  )
}
