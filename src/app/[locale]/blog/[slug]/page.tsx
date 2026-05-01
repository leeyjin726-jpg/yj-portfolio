import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getBlogPostBySlug, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return {
    title: post.title?.[locale],
    description: post.excerpt?.[locale],
    openGraph: {
      title: post.title?.[locale],
      description: post.excerpt?.[locale],
      images: post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : [],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 max-w-[860px] mx-auto px-[80px] max-md:px-10 py-[120px] animate-pulse">
            <div className="h-2 w-16 bg-raised rounded mb-16" />
            <div className="h-2 w-24 bg-raised rounded mb-4" />
            <div className="h-8 w-3/4 bg-raised rounded mb-10" />
            <div className="aspect-[16/9] bg-raised rounded-[4px] mb-12" />
          </div>
        }
      >
        <BlogPostContent params={params} />
      </Suspense>
      <FooterServer />
    </>
  );
}

async function BlogPostContent({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const post = await getBlogPostBySlug(slug).catch(() => null);

  if (!post) notFound();

  return (
    <main className="flex-1 max-w-[860px] mx-auto px-[80px] max-md:px-10 py-[120px]">
      <Link
        href={`/${locale}/blog`}
        className="action-link inline-block mb-16"
      >
        ← {t("back")}
      </Link>

      <time className="caption-category block mb-4">
        {post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString(
              locale === "ko" ? "ko-KR" : "en-US"
            )
          : ""}
      </time>

      <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.15] tracking-[-0.02em] text-foreground mb-10">
        {post.title?.[locale]}
      </h1>

      {post.coverImage && (
        <div className="aspect-[16/9] bg-raised overflow-hidden mb-12 rounded-[4px]">
          <Image
            src={urlFor(post.coverImage).width(1200).height(675).url()}
            alt={post.title?.[locale] ?? ""}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}

      {post.body?.[locale] && (
        <div className="prose prose-invert max-w-none">
          <PortableText value={post.body[locale]} />
        </div>
      )}
    </main>
  );
}

async function FooterServer() {
  const settings = await getSiteSettings().catch(() => null);
  return <Footer socialLinks={settings?.socialLinks} />;
}
