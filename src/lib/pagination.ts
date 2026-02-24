/**
 * Returns the list of page numbers to show in the pagination bar (max 7).
 * Logic: show first 7 when at start, last 7 when at end, else a window around current.
 */
export function getVisiblePageNumbers(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 0) return [];
  const maxVisible = 7;
  const count = Math.min(totalPages, maxVisible);
  if (totalPages <= maxVisible) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
  if (currentPage >= totalPages - 3) {
    return Array.from({ length: count }, (_, i) => totalPages - 6 + i);
  }
  return Array.from({ length: count }, (_, i) => currentPage - 3 + i);
}
