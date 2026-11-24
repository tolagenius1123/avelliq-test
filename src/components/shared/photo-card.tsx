import Image, { type StaticImageData } from "next/image"

import { cn } from "@/lib/utils"

const OVERLAY_CLASS = {
  soft: "bg-linear-to-b from-black/0 from-55% to-black/55",
  strong:
    "bg-linear-to-b from-[rgba(102,102,102,0)] from-[43.9%] to-[rgba(0,0,0,0.67)] to-[81.7%]",
} as const

interface PhotoCardProps {
  image: StaticImageData
  alt: string
  title?: string
  sizes: string
  overlay?: keyof typeof OVERLAY_CLASS
  priority?: boolean
  className?: string
  titleClassName?: string
}

export function PhotoCard({
  image,
  alt,
  title,
  sizes,
  overlay,
  priority = false,
  className,
  titleClassName,
}: PhotoCardProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className="object-cover"
      />
      {overlay && (
        <div aria-hidden="true" className={cn("absolute inset-0", OVERLAY_CLASS[overlay])} />
      )}
      {title && (
        <p
          className={cn(
            "absolute bottom-4 left-4 font-heading text-xl leading-[1.2] text-white",
            titleClassName
          )}
        >
          {title}
        </p>
      )}
    </div>
  )
}
