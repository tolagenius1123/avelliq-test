import { ArrowRight } from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

import { ImageReveal } from "@/components/motion/image-reveal"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { ServiceCategory } from "../types"

export const SERVICE_CTA_CLASS = cn(
  buttonVariants({ variant: "outline-primary", size: "pill-sm" }),
  "w-full"
)

export function ServiceCtaContent({ label }: { label: string }) {
  return (
    <>
      {label}
      <ArrowRight aria-hidden="true" className="size-3" />
    </>
  )
}

interface ServiceCardShellProps {
  service: ServiceCategory
  action: ReactNode
  children?: ReactNode
  id?: string
  revealImage?: boolean
  className?: string
  titleClassName?: string
}

export function ServiceCardShell({
  service,
  action,
  children,
  id,
  revealImage = true,
  className,
  titleClassName,
}: ServiceCardShellProps) {
  const { title, description, image, imageAlt, imagePosition } = service
  const ImageFrame = revealImage ? ImageReveal : "div"

  return (
    <article
      id={id}
      className={cn(
        "flex h-full scroll-mt-32 flex-col gap-5 rounded-[12px] border-[0.5px] border-stroke bg-white p-5",
        className
      )}
    >
      <ImageFrame className="relative h-49.5 overflow-hidden rounded-[12px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      </ImageFrame>

      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          <h3
            className={cn(
              "font-heading text-2xl leading-[1.2] font-medium text-primary",
              titleClassName
            )}
          >
            {title}
          </h3>
          <p className="text-base leading-[1.3] text-ink">{description}</p>
        </div>
        {children}
      </div>

      {action}
    </article>
  )
}
