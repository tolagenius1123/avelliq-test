"use client"

import { PhotoCard } from "@/components/shared/photo-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useAutoplay } from "@/hooks/use-autoplay"
import { cn } from "@/lib/utils"

import { HERO_SLIDES } from "../data/content"

const CONTROL_CLASS_NAME =
  "size-8.5 rounded-full border-[0.5px] border-sand bg-white text-ink shadow-none hover:bg-white"

export function HeroCarousel() {
  const autoplay = useAutoplay()

  return (
    <Carousel opts={{ loop: true }} plugins={[autoplay]} className="w-full max-w-125">
      <CarouselContent>
        {HERO_SLIDES.map((slide, index) => (
          <CarouselItem key={slide.alt}>
            <PhotoCard
              image={slide.image}
              alt={slide.alt}
              overlay="strong"
              priority={index === 0}
              sizes="(min-width: 640px) 500px, 90vw"
              className="aspect-square w-full rounded-[24px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={cn(CONTROL_CLASS_NAME, "left-3 xl:-left-22")} />
      <CarouselNext className={cn(CONTROL_CLASS_NAME, "right-3 xl:-right-16")} />
    </Carousel>
  )
}
