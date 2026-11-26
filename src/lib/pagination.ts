export type PageItem = number | "ellipsis-start" | "ellipsis-end"

const MAX_VISIBLE_PAGES = 7
const EDGE_PAGES = 5

const pageRange = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index)

export function getPageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= MAX_VISIBLE_PAGES) return pageRange(1, pageCount)
  if (page < EDGE_PAGES) return [...pageRange(1, EDGE_PAGES), "ellipsis-end", pageCount]
  if (page > pageCount - EDGE_PAGES + 1) {
    return [1, "ellipsis-start", ...pageRange(pageCount - EDGE_PAGES + 1, pageCount)]
  }
  return [1, "ellipsis-start", ...pageRange(page - 1, page + 1), "ellipsis-end", pageCount]
}

export interface PageSlice<T> {
  items: T[]
  firstIndex: number
  total: number
  page: number
  pageCount: number
}

export function paginate<T>(items: T[], requestedPage: number, pageSize: number): PageSlice<T> {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const page = Math.min(requestedPage, pageCount)
  const firstIndex = (page - 1) * pageSize

  return {
    items: items.slice(firstIndex, firstIndex + pageSize),
    firstIndex,
    total: items.length,
    page,
    pageCount,
  }
}
