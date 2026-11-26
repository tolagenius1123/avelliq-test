"use client"

import { useMemo, useState } from "react"

import { DEFAULT_CARE_CATEGORY } from "@/features/professionals/data/categories"
import { PROFESSIONALS } from "@/features/professionals/data/professionals"
import type { CareCategorySlug } from "@/features/professionals/types"
import { paginate } from "@/lib/pagination"

import { DEFAULT_CRITERIA, DEFAULT_FILTERS, PAGE_SIZE } from "../data/options"
import { searchProfessionals } from "../lib/search-professionals"
import type { CareCriteria, CareFilters, CareSearch, SortOrder } from "../types"

const INITIAL_SEARCH: Omit<CareSearch, "category"> = {
  criteria: DEFAULT_CRITERIA,
  filters: DEFAULT_FILTERS,
  sort: "recommended",
  page: 1,
}

export function useCareSearch(initialCategory: CareCategorySlug = DEFAULT_CARE_CATEGORY) {
  const [search, setSearch] = useState<CareSearch>({ ...INITIAL_SEARCH, category: initialCategory })
  const { category, criteria, filters, sort, page } = search

  const matches = useMemo(() => searchProfessionals(PROFESSIONALS, search), [search])

  const update = (changes: Partial<CareSearch>) =>
    setSearch((current) => ({ ...current, page: 1, ...changes }))

  return {
    category,
    criteria,
    filters,
    sort,
    results: paginate(matches, page, PAGE_SIZE),
    setCategory: (slug: CareCategorySlug) =>
      update({ category: slug, filters: { ...filters, careTypes: [] } }),
    setCriteria: (next: CareCriteria) => update({ criteria: next }),
    setFilters: (next: CareFilters) => update({ filters: next }),
    setSort: (next: SortOrder) => update({ sort: next }),
    setPage: (next: number) => update({ page: next }),
    reset: () => update({ criteria: DEFAULT_CRITERIA, filters: DEFAULT_FILTERS }),
  }
}
