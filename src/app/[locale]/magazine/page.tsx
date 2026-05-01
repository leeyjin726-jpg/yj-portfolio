import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getMagazines, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Magazine",
};

export default function MagazineIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px] animate-pulse">
            <div className="h-3 w-24 bg-raised rounded mb-16" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-[4/5] bg-raised rounded-[4px] mb-4" />
                  <div className="h-2 w-20 bg-raised rounded mb-2" />
                  <div className="h-4 bg-raised rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <MagazineIndexContent params={params} />
      </Suspense>
    </>
  );
}

async function MagazineIndexContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [items, settings] = await Promise.all([
    getMagazines(),
    getSiteSettings(),
  ]);

  return (
    <>
      <main className="flex-1 max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px]">
        <p className="section-label text-softer mb-16">MAGAZINE</p>

        {items.length === 0 ? (
          <p className="text-softer text-[15px]">준비 중입니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: any, i: number) => (
              <Link
                key={item._id}
                href={`/${locale}/magazine/${item.slug}`}
                aria-label={`${item.title?.[locale] ?? ""} 매거진 보기`}
                className="card group overflow-hidden block"
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
                <div className="p-4">
                  <figcaption className="caption">
                    <span className="caption-category">
                      {String(i + 1).padStart(2, "0")} — {item.seriesLabel}
                    </span>
                    <h2 className="caption-title group-hover:text-accent transition-colors">
                      {item.title?.[locale]}
                    </h2>
                    {item.description?.[locale] && (
                      <p className="caption-meta line-clamp-2">
                        {item.description[locale]}
                      </p>
                    )}
                  </figcaption>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
