import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getPortfolioItems, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChannelLink } from "@/components/channel-link";
import { SiteCard } from "@/components/site-card";
import { SectionTitle } from "@/components/section-title";
import { OPERATING_SITES } from "@/lib/operating-sites";
import { SNS_CHANNELS } from "@/lib/sns-channels";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("design_title") };
}

export default function DesignPage({
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
            <div className="h-3 w-16 bg-raised rounded mb-16" />
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
        <DesignContent params={params} />
      </Suspense>
    </>
  );
}

async function DesignContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [items, settings] = await Promise.all([
    getPortfolioItems("design"),
    getSiteSettings(),
  ]);

  return (
    <>
      <main className="flex-1 max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px]">
        <div className="pb-20 mb-20 border-b border-line">
          <SectionTitle
            word="CHANNELS"
            subtitle="현재 운영 중이거나 맡아서 진행 중인 프로젝트와 채널들을 소개합니다."
          />
          <p className="section-label text-softer mb-8">운영 중인 사이트</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {OPERATING_SITES.map((site) => (
              <SiteCard key={site.url} {...site} />
            ))}
          </div>

          <p className="section-label text-softer mb-8">SNS</p>
          <div className="flex flex-col">
            {SNS_CHANNELS.map((channel) => (
              <ChannelLink key={channel.url} {...channel} actionLabel="Instagram" />
            ))}
          </div>
        </div>

        <SectionTitle
          word="DESIGN"
          subtitle="다양한 디자인 작업물을 확인할 수 있습니다."
        />

        {items.length === 0 ? (
          <p className="text-softer text-[15px]">준비 중입니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: any, i: number) => (
              <Link
                key={item._id}
                href={`/work/${item.slug?.current}`}
                aria-label={`${item.title?.[locale] ?? ""} 케이스 스터디 보기`}
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
                      {String(i + 1).padStart(2, "0")} — {(item.category as string).toUpperCase()}
                    </span>
                    <h2 className="caption-title group-hover:text-accent transition-colors">
                      {item.title?.[locale]}
                    </h2>
                    <p className="caption-meta">
                      {[item.year, item.client].filter(Boolean).join(" · ")}
                    </p>
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
