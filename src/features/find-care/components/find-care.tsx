"use client"

import { useRef, useState } from "react"

import { ComingSoonButton } from "@/components/shared/coming-soon-button"
import { EmptyResults } from "@/components/shared/empty-results"
import { ListFooter } from "@/components/shared/list-footer"
import { UnderlineTabs } from "@/components/shared/underline-tabs"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ROUTES } from "@/config/site"
import { DashboardPageHeader } from "@/features/dashboard/components/dashboard-page-header"
import { ProfessionalCard } from "@/features/professionals/components/professional-card"
import { ProfileSheet } from "@/features/professionals/components/profile-sheet"
import { CARE_CATEGORIES, getCategoryLabel } from "@/features/professionals/data/categories"
import { findProfessional } from "@/features/professionals/data/professionals"
import type { Professional } from "@/features/professionals/types"

import { useCareSearch } from "../hooks/use-care-search"
import { useSavedProfessionals } from "../hooks/use-saved-professionals"
import { CareFiltersForm } from "./care-filters-form"
import { CareFiltersSheet } from "./care-filters-sheet"
import { CareSearchForm } from "./care-search-form"
import { ResultsToolbar } from "./results-toolbar"

const CATEGORY_TABS = CARE_CATEGORIES.map(({ slug, label }) => ({ value: slug, label }))

interface FindCareProps {
  initialProfessionalId?: string
}

export function FindCare({ initialProfessionalId }: FindCareProps) {
  const [profile, setProfile] = useState(() => findProfessional(initialProfessionalId))
  const [isProfileOpen, setIsProfileOpen] = useState(profile !== undefined)
  const search = useCareSearch(profile?.category)
  const { category, criteria, filters, results } = search
  const { isSaved, toggleSaved } = useSavedProfessionals()
  const resultsRef = useRef<HTMLDivElement>(null)

  const filterProps = { category, filters, onApply: search.setFilters }
  const resultsTitle = `${results.total} ${getCategoryLabel(category).toLowerCase()} ${
    results.total === 1 ? "professional" : "professionals"
  }`

  const viewProfile = (professional: Professional) => {
    setProfile(professional)
    setIsProfileOpen(true)
  }

  const handleProfileOpenChange = (open: boolean) => {
    setIsProfileOpen(open)
    if (!open && initialProfessionalId) window.history.replaceState(null, "", ROUTES.findCare)
  }

  const goToPage = (nextPage: number) => {
    search.setPage(nextPage)
    resultsRef.current?.scrollIntoView({ block: "start" })
  }

  return (
    <>
      <DashboardPageHeader
        title="Find care that feels right"
        description="Discover trusted professionals for the people and places you love."
        action={
          <ComingSoonButton size="pill-lg" className="font-normal">
            Post a Care Request
          </ComingSoonButton>
        }
      />

      <Tabs value={category} onValueChange={search.setCategory} className="gap-6">
        <UnderlineTabs
          items={CATEGORY_TABS}
          selected={category}
          aria-label="Care categories"
        />
        <CareSearchForm criteria={criteria} onSearch={search.setCriteria} />

        <TabsContent
          value={category}
          className="grid grid-cols-1 items-start gap-6 @5xl:grid-cols-[236px_minmax(0,1fr)]"
        >
          <aside className="hidden rounded-[12px] border border-stroke bg-white p-5 @5xl:mt-12 @5xl:block">
            <CareFiltersForm {...filterProps} />
          </aside>

          <div
            ref={resultsRef}
            className="@container/results flex scroll-mt-36 flex-col gap-4 md:scroll-mt-24"
          >
            <ResultsToolbar
              title={resultsTitle}
              sort={search.sort}
              onSortChange={search.setSort}
              filtersTrigger={<CareFiltersSheet {...filterProps} />}
            />

            {results.total === 0 ? (
              <EmptyResults
                title="No professionals match your search"
                description="Try a different date or location, or clear your filters."
                onReset={search.reset}
              />
            ) : (
              <>
                <ul className="grid grid-cols-1 gap-4 @md/results:grid-cols-2 @[54rem]/results:grid-cols-3">
                  {results.items.map((professional) => (
                    <li key={professional.id}>
                      <ProfessionalCard
                        professional={professional}
                        isSaved={isSaved(professional.id)}
                        onToggleSaved={() => toggleSaved(professional.id)}
                        onViewProfile={() => viewProfile(professional)}
                      />
                    </li>
                  ))}
                </ul>
                <ListFooter slice={results} onPageChange={goToPage} />
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <ProfileSheet
        professional={profile}
        open={isProfileOpen}
        onOpenChange={handleProfileOpenChange}
        isSaved={profile !== undefined && isSaved(profile.id)}
        onToggleSaved={() => profile && toggleSaved(profile.id)}
      />
    </>
  )
}
