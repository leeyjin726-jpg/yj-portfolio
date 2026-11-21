import type { AiReferral } from "@/lib/analytics/read-stats";
import { AI_SOURCES, SOURCE_LABELS, type TrafficSource } from "@/lib/analytics/traffic-source";

function groupBySource(referrals: AiReferral[]) {
  return AI_SOURCES.map((source) => {
    const rows = referrals.filter((r) => r.source === source);
    return { source, rows, total: rows.reduce((acc, r) => acc + r.count, 0) };
  })
    .filter((group) => group.total > 0)
    .sort((a, b) => b.total - a.total);
}

function SourceCard({ source, rows, total }: { source: TrafficSource; rows: AiReferral[]; total: number }) {
  return (
    <div className="rounded-[4px] bg-surface border border-line p-6">
      <div className="flex items-baseline justify-between mb-5">
        <p className="text-[17px] font-medium text-foreground">{SOURCE_LABELS[source]}</p>
        <p className="font-display text-[28px] font-bold tracking-[-0.02em] text-foreground">{total}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {rows.slice(0, 5).map((row) => (
          <li key={row.path} className="flex justify-between gap-4 text-[13px]">
            <span className="truncate text-softer">{row.path}</span>
            <span className="tabular-nums text-faint">{row.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Which AI assistants sent visitors, and to which pages. */
export function AiReferrals({ referrals }: { referrals: AiReferral[] }) {
  const groups = groupBySource(referrals);

  return (
    <section>
      <h2 className="caption-category mb-6">AI 답변에서 들어온 방문</h2>
      {groups.length === 0 ? (
        <p className="text-[14px] text-faint">
          아직 없어요. ChatGPT · Claude · Perplexity · Gemini · Copilot 답변의 링크로 들어오면 여기에 표시돼요.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {groups.map((group) => (
            <SourceCard key={group.source} {...group} />
          ))}
        </div>
      )}
    </section>
  );
}
