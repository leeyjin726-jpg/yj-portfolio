import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getAboutPage, getSiteSettings } from "@/sanity/fetch";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default function AboutPage({
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
            <div className="h-3 w-16 bg-raised rounded mb-16" />
            <div className="w-20 h-20 rounded-full bg-raised mb-12" />
            <div className="space-y-3">
              <div className="h-3 bg-raised rounded w-3/4" />
              <div className="h-3 bg-raised rounded w-1/2" />
              <div className="h-3 bg-raised rounded w-2/3" />
            </div>
          </div>
        }
      >
        <AboutContent params={params} />
      </Suspense>
    </>
  );
}

async function AboutContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);

  return (
    <>
      <main className="flex-1 max-w-[860px] mx-auto px-[80px] max-md:px-10 py-[120px]">
        <p className="section-label text-softer mb-16">ABOUT</p>

        <div className="w-[200px] mb-12">
          <Image
            src="/images/avatar.png"
            alt="Avatar"
            width={1182}
            height={1330}
            className="w-full h-auto"
            priority
          />
        </div>

        {about?.bio?.[locale] ? (
          <div className="prose prose-invert max-w-none">
            <PortableText value={about.bio[locale]} />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[15px] text-softer leading-[1.7]">
              디자이너 &amp; 콘텐츠 크리에이터입니다.
            </p>
            <p className="text-[15px] text-softer leading-[1.7]">
              브랜드를 만들고 이야기를 전합니다.
            </p>
          </div>
        )}

        {settings?.socialLinks && (
          <div className="mt-16 pt-12 border-t border-line flex gap-8 flex-wrap">
            {settings.socialLinks.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                Instagram
              </a>
            )}
            {settings.socialLinks.linkedin && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                LinkedIn
              </a>
            )}
            {settings.socialLinks.email && (
              <a
                href={`mailto:${settings.socialLinks.email}`}
                className="action-link"
              >
                Email
              </a>
            )}
          </div>
        )}
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
