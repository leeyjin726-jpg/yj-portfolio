import type { DailyPoint } from "@/lib/analytics/read-stats";

const CHART_HEIGHT = 160;

function shortDay(day: string): string {
  const [, month, date] = day.split("-");
  return `${Number(month)}.${Number(date)}`;
}

/** Single-series daily pageview bars. Hover a bar for its exact value. */
export function DailyChart({ points }: { points: DailyPoint[] }) {
  const max = Math.max(1, ...points.map((p) => p.pageviews));
  const first = points[0];
  const last = points[points.length - 1];

  return (
    <section>
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="caption-category">일별 페이지뷰</h2>
        <p className="text-[12px] text-faint">최대 {max.toLocaleString("ko-KR")}</p>
      </div>

      <div
        className="flex items-end gap-[2px] border-b border-line"
        style={{ height: CHART_HEIGHT }}
        role="img"
        aria-label={`일별 페이지뷰, ${first?.day ?? ""}부터 ${last?.day ?? ""}까지`}
      >
        {points.map((point) => {
          const ratio = point.pageviews / max;
          return (
            <div
              key={point.day}
              className="group relative flex-1 h-full flex items-end"
              title={`${point.day} · ${point.pageviews.toLocaleString("ko-KR")}회`}
            >
              <div
                className="w-full rounded-t-[4px] bg-softer/60 group-hover:bg-accent transition-colors"
                style={{ height: point.pageviews > 0 ? `max(2px, ${ratio * 100}%)` : 0 }}
              />
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-raised px-2 py-1 text-[11px] text-foreground opacity-0 group-hover:opacity-100">
                {shortDay(point.day)} · {point.pageviews.toLocaleString("ko-KR")}
              </span>
            </div>
          );
        })}
      </div>

      {first && last && (
        <div className="flex justify-between mt-3 text-[11px] text-faint">
          <span>{shortDay(first.day)}</span>
          <span>{shortDay(last.day)}</span>
        </div>
      )}
    </section>
  );
}
