import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getMagazineBySlug, getMagazineSlugs, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MagazineViewer } from "@/components/magazine/viewer";
import { RelatedArticles } from "@/components/magazine/related-articles";
import { ArticleJsonLd } from "@/components/magazine/article-json-ld";
import { SITE_URL } from "@/lib/site-config";

/** Articles are Korean-only, so every locale points search engines at the ko URL. */
const canonicalPath = (slug: string) => `/magazine/${slug}`;

export async function generateStaticParams() {
  const slugs = await getMagazineSlugs();
  const locales = ["ko", "en"];
  return locales.flatMap((locale) =>
    slugs.map((slug: string) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getMagazineBySlug(slug).catch(() => null);
  if (!item) return {};
  return {
    title: item.title?.[locale],
    description: item.description?.[locale],
    alternates: { canonical: canonicalPath(slug) },
    openGraph: {
      type: "article",
      url: canonicalPath(slug),
      publishedTime: item.publishedAt,
      modifiedTime: item._updatedAt,
      title: item.title?.[locale],
      description: item.description?.[locale],
      images: item.coverImage
        ? [urlFor(item.coverImage).width(1200).height(630).url()]
        : [],
    },
  };
}

export default function MagazineDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center py-[120px]">
            <div className="caption-meta animate-pulse">Loading…</div>
          </div>
        }
      >
        <MagazineDetailContent params={params} />
      </Suspense>
    </>
  );
}

async function MagazineDetailContent({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [item, t, settings] = await Promise.all([
    getMagazineBySlug(slug).catch(() => null),
    getTranslations({ locale, namespace: "common" }),
    getSiteSettings(),
  ]);

  if (!item) notFound();
  if (!item.scenes?.length) notFound();

  return (
    <>
      <ArticleJsonLd
        url={`${SITE_URL}${canonicalPath(slug)}`}
        headline={item.title?.ko ?? item.title?.[locale]}
        description={item.description?.ko}
        imageUrl={item.coverImage ? urlFor(item.coverImage).width(1200).height(630).url() : undefined}
        datePublished={item.publishedAt}
        dateModified={item._updatedAt}
      />
      <main className="flex-1">
        <MagazineViewer
          seriesLabel={item.seriesLabel}
          publishedAt={item.publishedAt}
          scenes={item.scenes}
          backLabel={t("back")}
        />
        <RelatedArticles locale={locale} currentSlug={slug} />
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
