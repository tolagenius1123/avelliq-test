import Image from "next/image"

import { cn, getInitials } from "@/lib/utils"

import type { Professional } from "../types"

interface ProfessionalPortraitProps {
  professional: Pick<Professional, "name" | "photo">
  sizes: string
  className?: string
}

const TITLE_PATTERN = /^Dr\.\s+/

export function ProfessionalPortrait({ professional, sizes, className }: ProfessionalPortraitProps) {
  const { name, photo } = professional

  if (!photo) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center bg-leaf font-heading text-primary",
          className
        )}
      >
        {getInitials(name.replace(TITLE_PATTERN, ""))}
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={photo.image}
        alt={name}
        fill
        sizes={sizes}
        placeholder="blur"
        style={{ objectPosition: photo.position }}
        className="object-cover"
      />
    </div>
  )
}
