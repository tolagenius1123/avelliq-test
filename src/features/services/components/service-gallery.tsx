"use client"

import { Reveal } from "@/components/motion/reveal"
import { CarouselDots } from "@/components/shared/carousel-dots"
import { PhotoCard } from "@/components/shared/photo-card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useAutoplay } from "@/hooks/use-autoplay"
import { useCarouselIndex } from "@/hooks/use-carousel-index"
import { useScrollLock } from "@/hooks/use-scroll-lock"

import { SERVICE_DETAILS } from "../data/service-details"
import { ServiceDetail } from "./service-detail"

export function ServiceGallery() {
  const { setApi, selectedIndex, scrollTo } = useCarouselIndex()
  const autoplay = useAutoplay()
  const setScrollLocked = useScrollLock()

  return (
    <Reveal className="flex flex-col gap-5" targets="[data-gallery-card]" stagger={0.12} y={40}>
      <CarouselDots
        count={SERVICE_DETAILS.length}
        activeIndex={selectedIndex}
        onSelect={scrollTo}
        label="Service gallery slides"
        className="self-end"
      />

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        plugins={[autoplay]}
        className="overflow-hidden rounded-l-[30px]"
      >
        <CarouselContent className="-ml-5 py-5">
          {SERVICE_DETAILS.map((detail) => (
            <CarouselItem key={detail.slug} className="basis-[85%] pl-5 sm:basis-auto">
              <Dialog onOpenChange={setScrollLocked}>
                <DialogTrigger
                  data-gallery-card
                  aria-label={`Learn more about ${detail.title}`}
                  className="group block w-full cursor-pointer rounded-[24px] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <PhotoCard
                    image={detail.thumbnail}
                    alt={detail.thumbnailAlt}
                    title={detail.label}
                    overlay="strong"
                    sizes="(min-width: 640px) 500px, 85vw"
                    className="aspect-square w-full rounded-[24px] sm:w-125 [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-out group-hover:[&_img]:scale-105"
                    titleClassName="bottom-8 left-8 text-2xl font-medium"
                  />
                </DialogTrigger>
                <DialogContent
                  showCloseButton={false}
                  className="overflow-hidden rounded-[24px] p-0 shadow-[0px_24px_48px_0px_rgba(76,90,61,0.16)] xs:max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]"
                >
                  <ServiceDetail detail={detail} />
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Reveal>
  )
}
