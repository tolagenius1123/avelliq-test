import Link from "next/link"

import { HeroMotion } from "@/components/motion/hero-motion"
import { Magnetic } from "@/components/motion/magnetic"
import { ComingSoonButton } from "@/components/shared/coming-soon-button"
import { JoinProfessionalButton } from "@/components/shared/join-professional-button"
import { EyebrowBadge } from "@/components/shared/eyebrow-badge"
import { HeroTexture } from "@/components/shared/hero-texture"
import { PhotoCard } from "@/components/shared/photo-card"
import { Section } from "@/components/shared/section"

import { HERO_CATEGORIES } from "../data/content"
import { HeroCarousel } from "./hero-carousel"

export function HeroSection() {
  return (
    <Section className="relative isolate overflow-hidden">
      <HeroTexture />

      <HeroMotion className="flex flex-col gap-20">
        <div className="flex flex-col items-center gap-12 xl:flex-row xl:gap-15">
          <div className="flex w-full flex-col gap-8 xl:max-w-139">
            <div className="flex flex-col gap-5">
              <div data-hero-fade>
                <EyebrowBadge animate={false}>Background-checked Professionals</EyebrowBadge>
              </div>
              <div className="flex flex-col gap-4">
                <h1
                  data-hero-title
                  className="font-heading text-[40px] leading-[1.3] font-medium text-primary md:text-[46px] lg:text-[52px]"
                >
                  A world where dependable support is part of everyday life.
                </h1>
                <p data-hero-fade className="text-base leading-[1.4] text-ink">
                  Connect people with trusted professionals and make the experience of finding,
                  coordinating and maintaining support easier.
                </p>
              </div>
            </div>
            <div data-hero-fade className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <ComingSoonButton size="pill-lg">Find Care</ComingSoonButton>
              </Magnetic>
              <Magnetic>
                <JoinProfessionalButton />
              </Magnetic>
            </div>
          </div>

          <div
            data-hero-media
            className="flex w-full justify-center xl:w-160 xl:justify-start xl:pl-18.75"
          >
            <HeroCarousel />
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {HERO_CATEGORIES.map((category) => (
            <li key={category.title} data-hero-card>
              <Link
                href={category.href}
                className="group block overflow-hidden rounded-[12px] shadow-[0px_0px_4px_0px_rgba(148,125,103,0.25)]"
              >
                <PhotoCard
                  image={category.image}
                  alt={category.alt}
                  title={category.title}
                  sizes="(min-width: 1024px) 244px, (min-width: 768px) 33vw, 50vw"
                  overlay="soft"
                  className="@container aspect-244/215 rounded-[12px] [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-out group-hover:[&_img]:scale-110"
                  titleClassName="right-3 bottom-3 left-3 text-[clamp(13px,9.5cqw,20px)] leading-[1.2] md:right-4 md:bottom-4 md:left-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </HeroMotion>
    </Section>
  )
}
