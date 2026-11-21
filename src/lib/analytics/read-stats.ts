import { getRedis } from "./redis";
import { analyticsKeys, AI_FIELD_SEPARATOR } from "./keys";
import { kstDaysSince, recentKstDays } from "./kst-date";
import type { TrafficSource } from "./traffic-source";

export type StatsRange = "7d" | "30d" | "all";

export type DailyPoint = { day: string; pageviews: number };
export type Ranked<T extends string = string> = { key: T; count: number };
export type AiReferral = { source: TrafficSource; path: string; count: number };

export type Stats = {
  configured: boolean;
  days: DailyPoint[];
  totalPageviews: number;
  totalLandings: number;
  aiLandings: number;
  sources: Ranked<TrafficSource>[];
  pages: Ranked[];
  aiReferrals: AiReferral[];
};

type CountHash = Record<string, number | string> | null;

function addInto(target: Map<string, number>, hash: CountHash) {
  for (const [field, raw] of Object.entries(hash ?? {})) {
    target.set(field, (target.get(field) ?? 0) + Number(raw));
  }
}

function sum(hash: CountHash): number {
  return Object.values(hash ?? {}).reduce<number>((acc, v) => acc + Number(v), 0);
}

function ranked<T extends string>(map: Map<string, number>): Ranked<T>[] {
  return [...map.entries()]
    .map(([key, count]) => ({ key: key as T, count }))
    .sort((a, b) => b.count - a.count);
}

async function resolveDays(range: StatsRange): Promise<string[]> {
  if (range === "7d") return recentKstDays(7);
  if (range === "30d") return recentKstDays(30);
  const first = await getRedis()?.get<string>(analyticsKeys.firstDay);
  return first ? kstDaysSince(first) : recentKstDays(1);
}

const EMPTY: Omit<Stats, "configured" | "days"> = {
  totalPageviews: 0,
  totalLandings: 0,
  aiLandings: 0,
  sources: [],
  pages: [],
  aiReferrals: [],
};

export async function readStats(range: StatsRange): Promise<Stats> {
  const redis = getRedis();
  const days = await resolveDays(range);
  if (!redis) {
    return { ...EMPTY, configured: false, days: days.map((day) => ({ day, pageviews: 0 })) };
  }

  const tx = redis.pipeline();
  for (const day of days) {
    tx.hgetall(analyticsKeys.pageviews(day));
    tx.hgetall(analyticsKeys.sources(day));
    tx.hgetall(analyticsKeys.aiLandings(day));
  }
  const results = (await tx.exec()) as CountHash[];

  const pages = new Map<string, number>();
  const sources = new Map<string, number>();
  const ai = new Map<string, number>();
  const daily: DailyPoint[] = days.map((day, i) => {
    const [pv, src, aiHash] = results.slice(i * 3, i * 3 + 3);
    addInto(pages, pv);
    addInto(sources, src);
    addInto(ai, aiHash);
    return { day, pageviews: sum(pv) };
  });

  const aiReferrals = ranked(ai).map(({ key, count }) => {
    const [source, path] = key.split(AI_FIELD_SEPARATOR);
    return { source: source as TrafficSource, path, count };
  });

  return {
    configured: true,
    days: daily,
    totalPageviews: daily.reduce((acc, d) => acc + d.pageviews, 0),
    totalLandings: [...sources.values()].reduce((a, b) => a + b, 0),
    aiLandings: aiReferrals.reduce((acc, r) => acc + r.count, 0),
    sources: ranked<TrafficSource>(sources),
    pages: ranked(pages),
    aiReferrals,
  };
}
