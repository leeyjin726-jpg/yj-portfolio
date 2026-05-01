import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getPortfolioItemBySlug, getPortfolioItemSlugs, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function generateStaticParams() {
  const slugs = await getPortfolioItemSlugs();
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
  const item = await getPortfolioItemBySlug(slug).catch(() => null);
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

export default function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 max-w-[1200px] mx-auto px-[80px] max-md:px-10 py-[120px] animate-pulse">
            <div className="h-3 w-20 bg-raised rounded mx-auto mb-8" />
            <div className="h-12 bg-raised rounded w-2/3 mx-auto mb-6" />
            <div className="h-3 bg-raised rounded w-1/2 mx-auto mb-[80px]" />
            <div className="aspect-[16/9] bg-raised rounded-[4px]" />
          </div>
        }
      >
        <PortfolioDetailContent params={params} />
      </Suspense>
    </>
  );
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string; _id?: string; url?: string } | null; alt?: string; caption?: string } }) => {
      if (!value?.asset) return null;
      let src: string;
      try {
        src = urlFor(value).width(1200).height(675).url();
      } catch {
        src = (value.asset as { url?: string }).url ?? "";
      }
      if (!src) return null;
      return (
        <figure className="my-8">
          <div className="aspect-[16/9] overflow-hidden rounded-[4px]">
            <Image
              src={src}
              alt={value.alt ?? ""}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="caption-meta mt-3">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

const CASE_SECTIONS = [
  { key: "problem",    label: "PROBLEM" },
  { key: "hypothesis", label: "HYPOTHESIS" },
  { key: "solution",   label: "SOLUTION" },
  { key: "results",    label: "RESULTS" },
  { key: "learnings",  label: "LEARNINGS" },
] as const;

async function PortfolioDetailContent({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [item, settings] = await Promise.all([
    getPortfolioItemBySlug(slug).catch(() => null),
    getSiteSettings(),
  ]);

  if (!item) notFound();

  const backHref = `/${locale}/work/${item.category === "content" ? "content" : "design"}`;
  const hasCaseStudy = CASE_SECTIONS.some((s) => item[s.key]?.length);

  return (
    <>
      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-[80px] max-md:px-10 pt-[120px] pb-[80px] text-center">
          <Link href={backHref} className="action-link mb-12 inline-block">
            ← {item.category?.toUpperCase()}
          </Link>

          <h1 className="display mb-6 text-foreground">
            {item.title?.[locale]}
          </h1>

          {item.description?.[locale] && (
            <p className="text-[18px] text-softer leading-[1.7] max-w-[600px] mx-auto">
              {item.description[locale]}
            </p>
          )}

          {/* Meta row */}
          {(item.year || item.client || item.tags?.length) && (
            <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
              {item.year && (
                <div className="text-center">
                  <p className="caption-category mb-1">YEAR</p>
                  <p className="text-[15px] text-foreground">{item.year}</p>
                </div>
              )}
              {item.client && (
                <div className="text-center">
                  <p className="caption-category mb-1">CLIENT</p>
                  <p className="text-[15px] text-foreground">{item.client}</p>
                </div>
              )}
              {item.tags?.length > 0 && (
                <div className="text-center">
                  <p className="caption-category mb-1">TAGS</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {item.tags.map((tag: string) => (
                      <span key={tag} className="pill">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── Cover Image ────────────────────────────────────── */}
        {item.coverImage && (
          <div className="max-w-[1200px] mx-auto px-[80px] max-md:px-10 mb-[80px]">
            <div className="aspect-[16/9] overflow-hidden rounded-[4px]">
              <Image
                src={urlFor(item.coverImage).width(1200).height(675).url()}
                alt={item.title?.[locale] ?? ""}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* ── Gallery Images ─────────────────────────────────── */}
        {/* Single-column vertical stack (default).
            Future 2-col option: replace `flex flex-col` with
            `grid grid-cols-2` and add `gap-x-6` to the wrapper. */}
        {item.galleryImages?.length > 0 && (
          <div className="max-w-[1200px] mx-auto px-[80px] max-md:px-10 mb-[80px]">
            <div className="flex flex-col gap-[80px] max-md:gap-[60px]">
              {item.galleryImages.map((image: any, index: number) => {
                if (!image?.asset) return null;
                const src: string = image.asset.url ?? "";
                if (!src) return null;
                return (
                  <figure key={image._key ?? index}>
                    <div className="aspect-[16/9] overflow-hidden rounded-[4px]">
                      <Image
                        src={src}
                        alt={image.alt ?? ""}
                        width={image.asset.metadata?.dimensions?.width ?? 1200}
                        height={image.asset.metadata?.dimensions?.height ?? 675}
                        priority={index === 0}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {image.caption && (
                      <figcaption className="caption mt-4">
                        <p className="caption-meta">{image.caption}</p>
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Divider ────────────────────────────────────────── */}
        {hasCaseStudy && (
          <div className="max-w-[1200px] mx-auto px-[80px] max-md:px-10 mb-[80px]">
            <div className="divider-marker">
              <span className="line" />
              <span className="tick" />
              <span className="dot" />
              <span className="line" />
            </div>
          </div>
        )}

        {/* ── Case Study Sections (Pattern B 2-column) ───────── */}
        {hasCaseStudy && (
          <div className="max-w-[1200px] mx-auto px-[80px] max-md:px-10 pb-[120px]">
            {CASE_SECTIONS.map((section) => {
              const content = item[section.key];
              if (!content?.length) return null;
              return (
                <section
                  key={section.key}
                  className="grid grid-cols-[200px_1fr] max-md:grid-cols-1 gap-[80px] max-md:gap-8 py-[80px] border-b border-line first:border-t"
                >
                  <div className="pt-1">
                    <p className="section-label text-faint">{section.label}</p>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <PortableText
                      value={content}
                      components={portableTextComponents}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
