import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isValidSessionToken } from "@/lib/admin/session";
import { readStats, type StatsRange } from "@/lib/analytics/read-stats";
import { SOURCE_LABELS, isAiSource } from "@/lib/analytics/traffic-source";
import { logout } from "@/app/admin/actions";
import { RangeTabs } from "./range-tabs";
import { StatTiles } from "./stat-tiles";
import { DailyChart } from "./daily-chart";
import { RankedList } from "./ranked-list";
import { AiReferrals } from "./ai-referrals";

const RANGES: readonly StatsRange[] = ["7d", "30d", "all"];

function parseRange(value: string | undefined): StatsRange {
  return RANGES.includes(value as StatsRange) ? (value as StatsRange) : "7d";
}

type Props = { searchParams: Promise<{ range?: string }> };

export async function AdminDashboard({ searchParams }: Props) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isValidSessionToken(token)) redirect("/admin/login");

  const range = parseRange((await searchParams).range);
  const stats = await readStats(range);

  return (
    <div className="flex flex-col gap-16">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="caption-category mb-4">TTIYONG.ART · ADMIN</p>
          <h1 className="text-[clamp(40px,6vw,72px)] font-bold leading-none tracking-[-0.04em] text-foreground">
            Traffic<span className="text-accent">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <RangeTabs active={range} />
          <form action={logout}>
            <button type="submit" className="caption-category hover:text-accent transition-colors">
              Logout
            </button>
          </form>
        </div>
      </header>

      {!stats.configured && (
        <p className="text-[14px] text-softer border border-line rounded-[4px] p-4">
          저장소(Upstash Redis)가 아직 연결되지 않아 집계가 꺼져 있어요.
        </p>
      )}

      <StatTiles
        pageviews={stats.totalPageviews}
        landings={stats.totalLandings}
        aiLandings={stats.aiLandings}
      />

      <DailyChart points={stats.days} />

      <AiReferrals referrals={stats.aiReferrals} />

      <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1">
        <RankedList
          title="유입 출처"
          emptyLabel="아직 유입 기록이 없어요."
          rows={stats.sources.map((row) => ({
            label: SOURCE_LABELS[row.key] ?? row.key,
            count: row.count,
            highlight: isAiSource(row.key),
          }))}
        />
        <RankedList
          title="인기 페이지"
          emptyLabel="아직 조회 기록이 없어요."
          rows={stats.pages.slice(0, 15).map((row) => ({ label: row.key, count: row.count }))}
        />
      </div>
    </div>
  );
}
