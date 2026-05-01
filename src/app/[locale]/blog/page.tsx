import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogPosts, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title") };
}

export default function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 max-w-[860px] mx-auto px-[80px] max-md:px-10 py-[120px] animate-pulse">
            <div className="h-3 w-12 bg-raised rounded mb-16" />
            <div className="space-y-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b border-line pb-12">
                  <div className="h-2 w-24 bg-raised rounded mb-3" />
                  <div className="h-5 bg-raised rounded w-3/4 mb-2" />
                  <div className="h-3 bg-raised rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <BlogContent params={params} />
      </Suspense>
    </>
  );
}

async function BlogContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const [posts, settings] = await Promise.all([
    getBlogPosts(),
    getSiteSettings(),
  ]);

  return (
    <>
      <main className="flex-1 max-w-[860px] mx-auto px-[80px] max-md:px-10 py-[120px]">
        <p className="section-label text-softer mb-16">{t("title")}</p>

        {posts.length === 0 ? (
          <p className="text-softer text-[15px]">아직 글이 없습니다.</p>
        ) : (
          <div className="space-y-0">
            {posts.map((post: any) => (
              <article key={post._id} className="border-b border-line py-10 first:pt-0">
                <Link
                  href={`/${locale}/blog/${post.slug?.current}`}
                  className="group block"
                >
                  {post.coverImage && (
                    <div className="aspect-[16/9] bg-raised overflow-hidden mb-6 rounded-[4px]">
                      <Image
                        src={urlFor(post.coverImage).width(860).height(484).url()}
                        alt={post.title?.[locale] ?? ""}
                        width={860}
                        height={484}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <time className="caption-category">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString(
                          locale === "ko" ? "ko-KR" : "en-US"
                        )
                      : ""}
                  </time>
                  <h2 className="text-[17px] font-medium text-foreground group-hover:text-accent transition-colors mt-2">
                    {post.title?.[locale]}
                  </h2>
                  {post.excerpt?.[locale] && (
                    <p className="text-[14px] text-softer mt-2 line-clamp-3 leading-[1.7]">
                      {post.excerpt[locale]}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
