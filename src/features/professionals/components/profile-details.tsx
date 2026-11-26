import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import checkCircleIcon from "@/assets/icons/check-circle.svg"
import { buttonVariants } from "@/components/ui/button"
import { conversationHref } from "@/features/messages/lib/routes"
import { cn } from "@/lib/utils"

import { getCategoryLabel } from "../data/categories"
import {
  describeProfessional,
  formatDistance,
  formatExperience,
  formatRating,
} from "../lib/format"
import { bookingHref } from "../lib/routes"
import type { Professional } from "../types"
import { ProfessionalPortrait } from "./professional-portrait"
import { ProfileGallery } from "./profile-gallery"
import { ProfileHighlights } from "./profile-highlights"
import { ProfileInterests } from "./profile-interests"
import { ProfileQualifications } from "./profile-qualifications"
import { ProfileReviews } from "./profile-reviews"
import { ProfileSectionTitle } from "./profile-section-title"

const CTA_CLASS = "h-11 flex-1 rounded-full px-4 text-sm @lg:h-9 @lg:flex-none @lg:text-xs"

export function ProfileDetails({ professional }: { professional: Professional }) {
  const {
    name,
    shortName,
    role,
    category,
    area,
    distanceMiles,
    hourlyRate,
    experienceYears,
    rating,
    reviewCount,
    isVerified,
    profile,
  } = professional

  const stats = [
    { value: `$${hourlyRate}`, label: "per hour" },
    { value: formatExperience(experienceYears), label: "experience" },
    { value: `${formatRating(rating)} / 5`, label: `${reviewCount} reviews` },
  ]

  return (
    <div className="@container">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-5 @md:flex-row @md:gap-4.5">
          <ProfessionalPortrait
            professional={professional}
            sizes="122px"
            className="size-30.5 shrink-0 rounded-full text-4xl"
          />
          <dl className="grid w-full flex-1 grid-cols-3 gap-2 text-center">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col-reverse gap-1.5">
                <dt className="text-sm leading-[1.3] text-muted-foreground">{label}</dt>
                <dd className="font-heading text-xl leading-[1.2] font-medium text-primary @md:text-2xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
            <div className="flex min-w-0 flex-col gap-1.5">
              <h2 className="flex items-center gap-1.75 font-heading text-xl leading-[1.2] font-medium text-ink-strong">
                {name}
                {isVerified && (
                  <Image src={checkCircleIcon} alt="Verified" width={16} height={16} />
                )}
              </h2>
              {profile && (
                <div className="flex flex-col gap-1.5 font-inter text-sm leading-[1.2] text-ink">
                  <p>{profile.headline}</p>
                  <p>{profile.tagline}</p>
                </div>
              )}
            </div>
            <div className="flex shrink-0 gap-2.5">
              <Link
                href={conversationHref(professional.id)}
                className={cn(buttonVariants({ variant: "outline-primary" }), CTA_CLASS)}
              >
                Message {shortName}
              </Link>
              <Link
                href={bookingHref(professional.id)}
                className={cn(buttonVariants(), CTA_CLASS)}
              >
                Book Now
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-base leading-[1.4] text-muted-foreground">
              {role} · {getCategoryLabel(category)}
            </p>
            <p className="flex items-center gap-2 text-sm leading-[1.3] text-ink-strong">
              <MapPin aria-hidden="true" strokeWidth={1.5} className="size-4.5 shrink-0" />
              {area} · {formatDistance(distanceMiles)} away
            </p>
          </div>

          <p className="text-sm leading-[1.3] text-muted-foreground">
            {describeProfessional(professional)}
          </p>
        </div>

        {profile && (
          <>
            <ProfileInterests interests={profile.interests} />
            <ProfileGallery images={profile.gallery} />
            <ProfileHighlights profile={profile} />
          </>
        )}

        <ProfileQualifications isVerified={isVerified} />
        {profile && <ProfileReviews reviews={profile.reviews} />}

        <section className="flex flex-col gap-2 rounded-[12px] bg-background px-4 py-3">
          <ProfileSectionTitle>A little clarity, more peace of mind</ProfileSectionTitle>
          <p className="text-sm leading-[1.3] text-muted-foreground">
            Confirm care duties, availability, certifications and your final rate with {shortName}.
            Keep conversations and bookings on Avelliq.
          </p>
        </section>
      </div>
    </div>
  )
}
