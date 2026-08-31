import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getMagazineBySlug, getMagazineSlugs, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MagazineViewer } from "@/components/magazine/viewer";

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
    openGraph: {
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
      <main className="flex-1">
        <MagazineViewer
          seriesLabel={item.seriesLabel}
          publishedAt={item.publishedAt}
          scenes={item.scenes}
          backLabel={t("back")}
        />
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
