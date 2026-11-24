import Image from "next/image"

import heroTexture from "@/assets/images/textures/hero-linen.jpg"
import { cn } from "@/lib/utils"

interface HeroTextureProps {
  className?: string
  sizes?: string
}

export function HeroTexture({ className, sizes = "100vw" }: HeroTextureProps) {
  return (
    <Image
      src={heroTexture}
      alt=""
      fill
      priority
      sizes={sizes}
      className={cn("-z-10 object-cover opacity-[0.02]", className)}
    />
  )
}
