import { Info } from "lucide-react"
import Link from "next/link"

import { ButtonArrow } from "@/components/shared/button-arrow"
import { HeroTexture } from "@/components/shared/hero-texture"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ROUTES } from "@/config/site"
import { cn } from "@/lib/utils"

export function SidebarHelpCard() {
  return (
    <Card className="relative isolate shrink-0 items-center gap-2 rounded-[12px] bg-background px-3 py-5 text-center leading-[1.3] shadow-none ring-0">
      <Info aria-hidden="true" strokeWidth={1.5} className="size-5.5 text-primary" />
      <p className="text-ink-strong">A little help, anytime.</p>
      <p className="text-muted-foreground">
        We&apos;re here for your <br /> peace of mind.
      </p>
      <Link
        href={ROUTES.contact}
        className={cn(buttonVariants({ variant: "link" }), "h-auto gap-1.25 p-0")}
      >
        Visit help center
        <ButtonArrow />
      </Link>
      <HeroTexture className="opacity-3" sizes="200px" />
    </Card>
  )
}
