type Props = { pageviews: number; landings: number; aiLandings: number };

function Tile({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div className="border-t border-line pt-6">
      <p className="caption-category mb-3">{label}</p>
      <p className="font-display text-[56px] font-bold leading-none tracking-[-0.04em] text-foreground">
        {value.toLocaleString("ko-KR")}
      </p>
      <p className="text-[13px] text-faint mt-3">{note}</p>
    </div>
  );
}

export function StatTiles({ pageviews, landings, aiLandings }: Props) {
  const aiShare = landings > 0 ? Math.round((aiLandings / landings) * 1000) / 10 : 0;

  return (
    <section className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
      <Tile label="Pageviews" value={pageviews} note="페이지가 열린 횟수" />
      <Tile label="Visits" value={landings} note="외부에서 들어온 방문 수" />
      <Tile label="AI Referrals" value={aiLandings} note={`AI 답변에서 들어온 방문 · 전체의 ${aiShare}%`} />
    </section>
  );
}
