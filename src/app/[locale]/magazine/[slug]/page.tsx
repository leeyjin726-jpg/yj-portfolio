import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMagazineBySlug, getMagazineSlugs } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
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
          <div className="flex-1 flex items-center justify-center h-[calc(100vh-3.5rem)]">
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
  const { slug } = await params;
  const item = await getMagazineBySlug(slug).catch(() => null);

  if (!item) notFound();
  if (!item.scenes?.length) notFound();

  return (
    <main className="flex-1">
      <MagazineViewer
        seriesLabel={item.seriesLabel}
        publishedAt={item.publishedAt}
        scenes={item.scenes}
      />
    </main>
  );
}
