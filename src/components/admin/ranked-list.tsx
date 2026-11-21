export type RankedRow = { label: string; count: number; highlight?: boolean };

type Props = { title: string; rows: RankedRow[]; emptyLabel: string };

/** Label + count rows with a proportional bar underneath each. */
export function RankedList({ title, rows, emptyLabel }: Props) {
  const max = Math.max(1, ...rows.map((r) => r.count));

  return (
    <section>
      <h2 className="caption-category mb-6">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-[14px] text-faint">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between gap-4 text-[14px]">
                <span className="truncate text-foreground">
                  {row.label}
                  {row.highlight && <span className="ml-2 text-[10px] tracking-[0.15em] text-accent">AI</span>}
                </span>
                <span className="tabular-nums text-softer">{row.count.toLocaleString("ko-KR")}</span>
              </div>
              <div className="mt-2 h-[4px] rounded-full bg-raised overflow-hidden">
                <div
                  className="h-full rounded-full bg-softer/60"
                  style={{ width: `${(row.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
