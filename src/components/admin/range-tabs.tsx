import Link from "next/link";
import type { StatsRange } from "@/lib/analytics/read-stats";

const TABS: ReadonlyArray<{ value: StatsRange; label: string }> = [
  { value: "7d", label: "7일" },
  { value: "30d", label: "30일" },
  { value: "all", label: "전체" },
];

export function RangeTabs({ active }: { active: StatsRange }) {
  return (
    <nav aria-label="기간" className="flex gap-2">
      {TABS.map((tab) => {
        const isActive = tab.value === active;
        return (
          <Link
            key={tab.value}
            href={`/admin?range=${tab.value}`}
            aria-current={isActive ? "page" : undefined}
            className={`px-4 py-2 rounded-full text-[12px] font-medium transition-colors ${
              isActive
                ? "bg-accent text-canvas"
                : "bg-raised text-softer hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
