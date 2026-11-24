import { CircleCheckBig } from "lucide-react"
import Link from "next/link"

import { HeroTexture } from "@/components/shared/hero-texture"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES } from "@/config/site"
import { cn } from "@/lib/utils"

import { DashboardCard } from "./dashboard-card"

export function SafetyCard({ className }: { className?: string }) {
  return (
    <DashboardCard
      className={cn(
        "relative isolate items-center justify-center gap-3.5 border-0 bg-primary px-5 py-10 text-center text-white",
        className
      )}
    >
      <CircleCheckBig aria-hidden="true" strokeWidth={1.5} className="size-5.5" />
      <div className="flex max-w-60 flex-col gap-3">
        <h2 className="font-heading text-lg leading-[1.2] font-medium">Your safety comes first</h2>
        <p className="leading-[1.3]">Keep conversations and bookings on Avelliq for peace of mind.</p>
      </div>
      <Link
        href={ROUTES.trustSafety}
        className={cn(buttonVariants({ variant: "white" }), "h-8.5 rounded-full px-4")}
      >
        Trust & Safety
      </Link>
      <HeroTexture className="opacity-3" sizes="(min-width: 1024px) 400px, 100vw" />
    </DashboardCard>
  )
}
