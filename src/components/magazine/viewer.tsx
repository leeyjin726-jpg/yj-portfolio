"use client";

import { useEffect, useRef, useState } from "react";

type Tone = "lavender" | "sage" | "sand" | "slate" | "peach";

type Scene = {
  _key?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  tone?: Tone;
};

type Props = {
  seriesLabel: string;
  publishedAt?: string;
  scenes: Scene[];
  brand?: string;
  handle?: string;
};

const ROMAN = [
  "i.",
  "ii.",
  "iii.",
  "iv.",
  "v.",
  "vi.",
  "vii.",
  "viii.",
  "ix.",
  "x.",
  "xi.",
  "xii.",
];

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${month}. ${year}`;
}

export function MagazineViewer({
  seriesLabel,
  publishedAt,
  scenes,
  brand = "ttiyong.mag",
  handle = "@ttiyong.art",
}: Props) {
  const total = scenes.length;
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = sectionRefs.current.findIndex(
            (el) => el === visible[0].target
          );
          if (idx !== -1) setActive(idx);
        }
      },
      { threshold: [0.5, 0.75] }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [scenes.length]);

  const scrollTo = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  const dateLabel = formatDate(publishedAt);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className="magazine-canvas snap-y snap-mandatory overflow-y-scroll h-[calc(100vh-3.5rem)]"
    >
      {/* Right-side dot indicators */}
      <nav
        aria-label="Scenes"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 max-md:right-3"
      >
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Scene ${i + 1}`}
            aria-current={active === i}
            className={`w-2 h-2 rounded-full transition-all mag-line-bg ${
              active === i ? "scale-150 opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          />
        ))}
      </nav>

      {scenes.map((scene, i) => (
        <section
          key={scene._key ?? i}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          data-tone={scene.tone ?? "lavender"}
          data-active={active === i}
          className="mag-scene snap-start h-[calc(100vh-3.5rem)] flex flex-col relative px-[80px] max-md:px-10 py-12 transition-[background] duration-700"
        >
          {/* Top bar */}
          <div className="flex items-start justify-between text-[12px] mag-soft">
            <span>{seriesLabel}</span>
            <span>
              {pad(i + 1)} / {pad(total)}
              {dateLabel && <> · {dateLabel}</>}
            </span>
          </div>

          {/* Center content */}
          <div className="mag-scene-content flex-1 flex flex-col items-center justify-center text-center max-w-[720px] mx-auto">
            <p className="font-serif-mixed italic text-[16px] mag-soft mb-8 tracking-[0.18em]">
              scene {ROMAN[i] ?? `${i + 1}.`}
            </p>

            {scene.title && (
              <h2 className="text-[clamp(36px,5vw,60px)] font-bold leading-[1.1] tracking-[-0.02em] mb-6 mag-fg">
                {scene.title}
              </h2>
            )}

            {scene.subtitle && (
              <p className="font-serif-mixed italic text-[24px] mag-fg mb-8">
                {scene.subtitle}
              </p>
            )}

            <span className="block w-12 h-px mag-line-bg mb-8 opacity-60" />

            {scene.body && (
              <p className="text-[16px] leading-[1.9] mag-soft max-w-[600px] whitespace-pre-line">
                {scene.body}
              </p>
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between text-[12px] mag-soft">
            <span>{brand}</span>
            <span>
              {pad(i + 1)} / {pad(total)}
            </span>
            <span>{handle}</span>
          </div>
        </section>
      ))}
    </div>
  );
}
