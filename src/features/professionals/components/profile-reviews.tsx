"use client"

import { StarRating } from "@/components/shared/star-rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { formatMonthDayYear, toIsoDate } from "@/lib/date"
import { getInitials } from "@/lib/utils"

import type { ProfessionalReview } from "../types"
import { ProfileSectionTitle } from "./profile-section-title"

export function ProfileReviews({ reviews }: { reviews: ProfessionalReview[] }) {
  return (
    <section className="flex flex-col gap-4">
      <ProfileSectionTitle className="font-normal">Ratings & Reviews</ProfileSectionTitle>
      <Carousel
        opts={{ align: "start", containScroll: "trimSnaps" }}
        aria-label="Reviews"
        className="-mr-4 md:-mr-6"
      >
        <CarouselContent className="-ml-4 pr-4 md:pr-6">
          {reviews.map(({ id, author, avatar, date, rating, quote }) => (
            <CarouselItem key={id} className="basis-69 pl-4">
              <figure className="flex h-full flex-col gap-6.5 rounded-[8px] border-[0.5px] border-black/10 px-3 py-3.5">
                <figcaption className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Avatar>
                      <AvatarImage src={avatar?.src} alt="" />
                      <AvatarFallback className="bg-leaf text-xs text-primary">
                        {getInitials(author)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-px">
                      <p className="text-sm leading-[1.2] font-medium text-ink">{author}</p>
                      <time dateTime={toIsoDate(date)} className="text-[10px] text-ink-body">
                        {formatMonthDayYear(date)}
                      </time>
                    </div>
                  </div>
                  <StarRating rating={rating} starClassName="size-3" />
                </figcaption>
                <blockquote className="text-xs leading-[1.3] text-ink-body">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
