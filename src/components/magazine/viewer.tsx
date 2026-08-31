import { Link } from "@/i18n/navigation";

type Scene = {
  _key?: string;
  title?: string;
  subtitle?: string;
  body?: string;
};

type Props = {
  seriesLabel: string;
  publishedAt?: string;
  scenes: Scene[];
  backLabel: string;
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${month}. ${year}`;
}

export function MagazineViewer({ seriesLabel, publishedAt, scenes, backLabel }: Props) {
  const [hero, ...rest] = scenes;
  const dateLabel = formatDate(publishedAt);

  return (
    <article className="max-w-[860px] mx-auto px-[80px] max-md:px-10 py-[120px]">
      <Link href="/content" className="action-link inline-block mb-16">
        ← {backLabel}
      </Link>

      <p className="caption-category mb-4">
        {seriesLabel}
        {dateLabel && <> · {dateLabel}</>}
      </p>

      {hero?.title && (
        <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.15] tracking-[-0.02em] text-foreground mb-4">
          {hero.title}
        </h1>
      )}

      {hero?.subtitle && (
        <p className="font-serif-mixed italic text-[18px] text-softer mb-12 leading-[1.5]">
          {hero.subtitle}
        </p>
      )}

      {hero?.body && (
        <p className="text-[16px] leading-[1.9] text-softer whitespace-pre-line mb-12">
          {hero.body}
        </p>
      )}

      <div className="divider-marker mb-16">
        <span className="line" />
        <span className="tick" />
        <span className="dot" />
        <span className="line" />
      </div>

      {rest.map((scene, i) => (
        <section
          key={scene._key ?? i}
          className={i > 0 ? "pt-12 mt-12 border-t border-line" : ""}
        >
          {scene.title && (
            <h2 className="text-[clamp(22px,3vw,30px)] font-bold leading-[1.3] tracking-[-0.02em] text-foreground mb-3">
              {scene.title}
            </h2>
          )}

          {scene.subtitle && (
            <p className="font-serif-mixed italic text-[15px] text-softer mb-6">
              {scene.subtitle}
            </p>
          )}

          {scene.body && (
            <p className="text-[16px] leading-[1.9] text-softer whitespace-pre-line">
              {scene.body}
            </p>
          )}
        </section>
      ))}
    </article>
  );
}
