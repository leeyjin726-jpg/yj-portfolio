import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPosts, getMagazines } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { buildArticleItems } from "@/lib/article-items";

export async function HomeArticles({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const [posts, magazines] = await Promise.all([getBlogPosts(), getMagazines()]);
  const items = buildArticleItems(posts, magazines).slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px] border-t border-line">
      <p className="section-label text-softer mb-12">{t("articles")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${item.type}/${item.slug}`}
            className="content-card group overflow-hidden block"
          >
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
        ))}
      </div>
      <Link href="/content" className="button-outline mt-10">
        {t("view_all_articles")}
      </Link>
    </section>
  );
}
