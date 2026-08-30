import { Suspense } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getBlogPosts, getMagazines, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Content",
};

type ContentItem = {
  id: string;
  type: "blog" | "magazine";
  slug: string;
  title: Record<string, string>;
  summary?: Record<string, string>;
  coverImage: unknown;
  publishedAt: string;
  badge: string;
};

export default function ContentIndexPage({
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
        <ContentIndexContent params={params} />
      </Suspense>
    </>
  );
}

async function ContentIndexContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [posts, magazines, settings] = await Promise.all([
    getBlogPosts(),
    getMagazines(),
    getSiteSettings(),
  ]);

  const items: ContentItem[] = [
    ...posts.map((post: any) => ({
      id: post._id,
      type: "blog" as const,
      slug: post.slug?.current,
      title: post.title,
      summary: post.excerpt,
      coverImage: post.coverImage,
      publishedAt: post.publishedAt,
      badge: "BLOG",
    })),
    ...magazines.map((mag: any) => ({
      id: mag._id,
      type: "magazine" as const,
      slug: mag.slug,
      title: mag.title,
      summary: mag.description,
      coverImage: mag.coverImage,
      publishedAt: mag.publishedAt,
      badge: mag.seriesLabel ?? "MAGAZINE",
    })),
  ].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <main className="flex-1 max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px]">
        <p className="section-label text-softer mb-16">CONTENT</p>

        {items.length === 0 ? (
          <p className="text-softer text-[15px]">준비 중입니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/${item.type}/${item.slug}`}
                aria-label={`${item.title?.[locale] ?? ""} 보기`}
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
                <div className="p-5">
                  <figcaption className="caption">
                    <h2 className="caption-title !text-[19px] group-hover:text-accent transition-colors">
                      {item.title?.[locale]}
                    </h2>
                    {item.summary?.[locale] && (
                      <p className="caption-meta line-clamp-2">
                        {item.summary[locale]}
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
