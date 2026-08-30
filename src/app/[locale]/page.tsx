import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getFeaturedPortfolio, getLatestBlogPosts, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeStory } from "@/components/home-story";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings();

  return {
    title: settings?.title?.[locale] ?? "YJ Portfolio",
    description: settings?.description?.[locale] ?? "Designer & Content Creator",
    openGraph: {
      title: settings?.title?.[locale],
      description: settings?.description?.[locale],
      images: settings?.profileImage
        ? [urlFor(settings.profileImage).width(1200).height(630).url()]
        : [],
    },
  };
}

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 animate-pulse">
            <div className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 pt-[120px] pb-[160px]">
              <div className="h-3 w-24 bg-raised rounded mb-8" />
              <div className="h-16 bg-raised rounded w-2/3 mb-6" />
              <div className="h-4 bg-raised rounded w-1/3" />
            </div>
          </div>
        }
      >
        <HomeContent params={params} />
      </Suspense>
    </>
  );
}

async function HomeContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const navT = await getTranslations({ locale, namespace: "nav" });

  const [portfolio, latestPosts, settings] = await Promise.all([
    getFeaturedPortfolio(),
    getLatestBlogPosts(),
    getSiteSettings(),
  ]);

  return (
    <>
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 pt-[120px] pb-[160px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <h1 className="text-[clamp(56px,8vw,96px)] font-bold leading-[1.05] tracking-[-0.04em] text-foreground">
              {t("hero_title")
                .split("|")
                .map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
            </h1>
            <div className="pb-2">
              <p className="text-[15px] text-softer leading-[1.7] mb-10 max-w-xs">
                {t("hero_subtitle")}
              </p>
              <Link href="/about" className="button-primary">
                {t("cta")}
              </Link>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1280px] mx-auto px-[80px] max-md:px-10">
          <div className="divider-marker">
            <span className="line" />
            <span className="tick" />
            <span className="dot" />
            <span className="line" />
          </div>
        </div>

        {/* Story */}
        <HomeStory />

        {/* Featured Work */}
        {portfolio.length > 0 && (
          <section className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px]">
            <p className="section-label text-softer mb-12">{t("featured_work")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.slice(0, 3).map((item: any, i: number) => (
                <Link
                  key={item._id}
                  href={`/work/${item.slug?.current}`}
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
                        {String(i + 1).padStart(2, "0")} — {item.category?.toUpperCase()}
                      </span>
                      <h3 className="caption-title group-hover:text-accent transition-colors">{item.title?.[locale]}</h3>
                      {item.tags?.length > 0 && (
                        <p className="caption-meta">
                          {(item.tags as string[]).slice(0, 3).join(" · ")}
                        </p>
                      )}
                    </figcaption>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Latest Blog Posts */}
        {latestPosts.length > 0 && (
          <section className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px] border-t border-line">
            <p className="section-label text-softer mb-12">{t("latest_posts")}</p>
            <div className="space-y-8">
              {latestPosts.map((post: any) => (
                <article
                  key={post._id}
                  className="border-b border-line pb-8 last:border-none last:pb-0"
                >
                  <Link
                    href={`/blog/${post.slug?.current}`}
                    className="group block"
                  >
                    <time className="caption-category">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(
                            locale === "ko" ? "ko-KR" : "en-US"
                          )
                        : ""}
                    </time>
                    <h3 className="text-[17px] font-medium text-foreground group-hover:text-accent transition-colors mt-2">
                      {post.title?.[locale]}
                    </h3>
                    {post.excerpt?.[locale] && (
                      <p className="text-[14px] text-softer mt-2 line-clamp-2">
                        {post.excerpt[locale]}
                      </p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
            <Link href="/content" className="button-outline mt-10">
              {navT("blog")}
            </Link>
          </section>
        )}
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
