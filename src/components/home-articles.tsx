import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPosts, getMagazines } from "@/sanity/fetch";
import { buildArticleItems } from "@/lib/article-items";
import { ArticleCard } from "@/components/article-card";

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
          <ArticleCard key={item.id} item={item} locale={locale} />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Link href="/content" className="button-outline">
          {t("view_all_articles")}
        </Link>
      </div>
    </section>
  );
}
