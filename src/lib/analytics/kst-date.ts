const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** YYYY-MM-DD in Korea Standard Time. */
export function kstDay(date: Date = new Date()): string {
  return new Date(date.getTime() + KST_OFFSET_MS).toISOString().slice(0, 10);
}

/** Last `count` KST days, oldest first, ending today. */
export function recentKstDays(count: number, now: Date = new Date()): string[] {
  return Array.from({ length: count }, (_, i) =>
    kstDay(new Date(now.getTime() - (count - 1 - i) * DAY_MS)),
  );
}

/** Every KST day from `start` (YYYY-MM-DD) through today, oldest first. */
export function kstDaysSince(start: string, now: Date = new Date()): string[] {
  const startMs = Date.parse(`${start}T00:00:00Z`);
  const todayMs = Date.parse(`${kstDay(now)}T00:00:00Z`);
  if (Number.isNaN(startMs) || startMs > todayMs) return [kstDay(now)];
  const count = Math.round((todayMs - startMs) / DAY_MS) + 1;
  return recentKstDays(count, now);
}
