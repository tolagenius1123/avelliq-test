"use client"

import { Calendar, Check, MapPin, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { formatDistance, formatExperience, formatRating } from "../lib/format"
import type { Professional } from "../types"
import { ProfessionalPortrait } from "./professional-portrait"
import { SaveProfessionalButton } from "./save-professional-button"

interface ProfessionalCardProps {
  professional: Professional
  isSaved: boolean
  onToggleSaved: () => void
  onViewProfile: () => void
}

export function ProfessionalCard({
  professional,
  isSaved,
  onToggleSaved,
  onViewProfile,
}: ProfessionalCardProps) {
  const { name, role, hourlyRate, rating, reviewCount, experienceYears, area, distanceMiles } =
    professional

  return (
    <Card className="h-full gap-4 rounded-[16px] border-[0.5px] border-stroke p-4 shadow-[0px_4px_6px_0px_rgba(15,77,66,0.02)] ring-0">
      <div className="relative">
        <ProfessionalPortrait
          professional={professional}
          sizes="(min-width: 1440px) 256px, (min-width: 768px) 50vw, 100vw"
          className="h-55 w-full rounded-[12px] text-5xl"
        />
        {professional.isVerified && (
          <Badge className="absolute top-3 left-3 rounded-[6px] px-2 py-1 text-[11px] font-semibold [&>svg]:size-2.5!">
            <Check aria-hidden="true" strokeWidth={3} />
            Verified
          </Badge>
        )}
        <SaveProfessionalButton
          name={name}
          isSaved={isSaved}
          onToggle={onToggleSaved}
          className="absolute top-2 right-2"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <h3 className="font-heading text-xl leading-[1.2] font-medium text-ink-strong @[54rem]/results:text-lg">
            {name}
          </h3>
          <p className="text-lg leading-[1.2] font-bold text-primary">${hourlyRate}/hr</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge className="h-6 rounded-[6px] bg-leaf-soft text-tan">{role}</Badge>
          <p className="flex items-center gap-1 text-ink-strong">
            <Star aria-hidden="true" className="size-3.5 text-star" />
            <span className="sr-only">Rated</span>
            <span className="font-semibold">{formatRating(rating)}</span>
            <span className="text-xs text-muted-foreground">
              ({reviewCount}
              <span className="sr-only"> reviews</span>)
            </span>
          </p>
        </div>

        <Separator className="bg-stroke/50" />

        <ul className="flex flex-col gap-1.5 leading-[1.3] text-muted-foreground">
          <li className="flex items-center gap-2">
            <Calendar aria-hidden="true" strokeWidth={1.5} className="size-3.5 shrink-0" />
            {formatExperience(experienceYears)} experience
          </li>
          <li className="flex items-center gap-2">
            <MapPin aria-hidden="true" strokeWidth={1.5} className="size-3.5 shrink-0" />
            {area} · {formatDistance(distanceMiles)}
          </li>
        </ul>

        <Button
          variant="outline"
          aria-label={`View ${name}'s profile`}
          onClick={onViewProfile}
          className="mt-auto h-10 w-full rounded-[8px] border-[0.5px] border-stroke font-semibold text-primary shadow-none"
        >
          View Profile
        </Button>
      </div>
    </Card>
  )
}
