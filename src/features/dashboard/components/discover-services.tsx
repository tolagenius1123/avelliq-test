import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ROUTES } from "@/config/site"
import { ServiceTeaserCard } from "@/features/services/components/service-teaser-card"
import { SERVICES } from "@/features/services/data/services"
import { cn } from "@/lib/utils"

const FEATURED_SLUGS = ["housekeeping", "house-sitters"]

const isFeatured = ({ slug }: { slug: string }) => FEATURED_SLUGS.includes(slug)

const DISCOVER_SERVICES = [
  ...SERVICES.filter(isFeatured),
  ...SERVICES.filter((service) => !isFeatured(service)),
]

export function DiscoverServices() {
  return (
    <section aria-labelledby="discover-services" className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="discover-services"
          className="font-heading text-2xl leading-[1.2] font-medium text-ink-strong"
        >
          Discover Services
        </h2>
        <Link
          href={ROUTES.services}
          className={cn(buttonVariants({ variant: "link" }), "h-auto p-0 text-base leading-[1.4]")}
        >
          See all
        </Link>
      </div>

      <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} aria-label="Services">
        <CarouselContent className="-ml-5">
          {DISCOVER_SERVICES.map((service) => (
            <CarouselItem key={service.slug} className="basis-[88%] pl-5 @lg:basis-110.25">
              <ServiceTeaserCard service={service} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
