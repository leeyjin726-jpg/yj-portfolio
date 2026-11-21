import { getRedis } from "./redis";
import { analyticsKeys, AI_FIELD_SEPARATOR } from "./keys";
import { kstDay } from "./kst-date";
import { isAiSource, type TrafficSource } from "./traffic-source";

export type Visit = {
  path: string;
  /** Present only for the first pageview of a browsing session. */
  landingSource: TrafficSource | null;
};

/** Increment the day's counters for one pageview. */
export async function recordVisit(visit: Visit): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  const day = kstDay();
  const tx = redis.pipeline();
  tx.hincrby(analyticsKeys.pageviews(day), visit.path, 1);
  tx.setnx(analyticsKeys.firstDay, day);

  const source = visit.landingSource;
  if (source) {
    tx.hincrby(analyticsKeys.sources(day), source, 1);
    if (isAiSource(source)) {
      const field = `${source}${AI_FIELD_SEPARATOR}${visit.path}`;
      tx.hincrby(analyticsKeys.aiLandings(day), field, 1);
    }
  }

  await tx.exec();
}
