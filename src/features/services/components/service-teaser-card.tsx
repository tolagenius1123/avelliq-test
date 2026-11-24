import Link from "next/link"

import { ROUTES } from "@/config/site"

import type { ServiceCategory } from "../types"
import { SERVICE_CTA_CLASS, ServiceCardShell, ServiceCtaContent } from "./service-card-shell"

export function ServiceTeaserCard({ service }: { service: ServiceCategory }) {
  return (
    <ServiceCardShell
      service={service}
      revealImage={false}
      className="rounded-[24px]"
      titleClassName="text-xl leading-[1.2]"
      action={
        <Link href={`${ROUTES.services}#${service.slug}`} className={SERVICE_CTA_CLASS}>
          <ServiceCtaContent label={service.ctaLabel} />
        </Link>
      }
    />
  )
}
