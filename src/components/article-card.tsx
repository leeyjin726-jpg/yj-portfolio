import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/image";
import type { ArticleItem } from "@/lib/article-items";

/** 4:5 cover card for a blog post or magazine article. */
export function ArticleCard({ item, locale }: { item: ArticleItem; locale: string }) {
  return (
    <Link href={`/${item.type}/${item.slug}`} className="content-card group overflow-hidden block">
      {item.coverImage ? (
        <div className="aspect-[4/5] overflow-hidden">
          <Image
            src={urlFor(item.coverImage).width(600).height(750).url()}
            alt={item.title?.[locale] ?? ""}
            width={600}
            height={750}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[4/5] bg-raised" />
      )}
      <div className="px-1 py-4">
        <figcaption className="caption">
          <h3 className="caption-title group-hover:text-accent transition-colors">
            {item.title?.[locale]}
          </h3>
          <p className="caption-category">{item.badge}</p>
          {item.summary?.[locale] && (
            <p className="caption-meta line-clamp-2">{item.summary[locale]}</p>
          )}
        </figcaption>
      </div>
    </Link>
  );
}
