import Link from "next/link"

import { CheckListItem } from "@/components/shared/check-list-item"
import { ROUTES } from "@/config/site"

import { SERVICE_INSIGHTS_BY_SLUG } from "../data/service-insights"
import type { ServiceCategory } from "../types"
import { SERVICE_CTA_CLASS, ServiceCardShell, ServiceCtaContent } from "./service-card-shell"
import { ServiceInsightDialog } from "./service-insight-dialog"

export function ServiceCard({ service }: { service: ServiceCategory }) {
  const { slug, offerings, ctaLabel } = service
  const ctaContent = <ServiceCtaContent label={ctaLabel} />

  return (
    <ServiceCardShell
      id={slug}
      service={service}
      action={
        SERVICE_INSIGHTS_BY_SLUG.has(slug) ? (
          <ServiceInsightDialog
            slug={slug}
            trigger={ctaContent}
            triggerClassName={SERVICE_CTA_CLASS}
          />
        ) : (
          <Link href={`${ROUTES.services}#${slug}`} className={SERVICE_CTA_CLASS}>
            {ctaContent}
          </Link>
        )
      }
    >
      <ul className="flex flex-col gap-2">
        {offerings.map((offering) => (
          <CheckListItem key={offering}>{offering}</CheckListItem>
        ))}
      </ul>
    </ServiceCardShell>
  )
}
