type Dated = { year?: string | null; _createdAt?: string };

/** Latest 4-digit year in a free-form year string ("2026", "2024-2025", "~2025"). */
function latestYear(year?: string | null): number {
  const years = (year ?? "").match(/\d{4}/g)?.map(Number) ?? [];
  return years.length ? Math.max(...years) : 0;
}

/** Newest first: by work year, then by when the entry was added. */
export function sortByRecency<T extends Dated>(items: T[]): T[] {
  return [...items].sort(
    (a, b) =>
      latestYear(b.year) - latestYear(a.year) ||
      (b._createdAt ?? "").localeCompare(a._createdAt ?? "")
  );
}
