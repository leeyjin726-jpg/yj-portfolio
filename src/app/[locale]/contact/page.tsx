import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getContactPage, getSiteSettings } from "@/sanity/fetch";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact-form";
import { ConnectButtons } from "@/components/connect-buttons";
import { DEFAULT_SOCIAL_LINKS } from "@/lib/contact-links";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default function ContactPage({
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
            <div className="h-3 w-20 bg-raised rounded mb-16" />
            <div className="space-y-6">
              <div className="h-10 bg-raised rounded-[4px]" />
              <div className="h-10 bg-raised rounded-[4px]" />
              <div className="h-10 bg-raised rounded-[4px]" />
              <div className="h-32 bg-raised rounded-[4px]" />
            </div>
          </div>
        }
      >
        <ContactContent params={params} />
      </Suspense>
    </>
  );
}

async function ContactContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [contact, settings] = await Promise.all([getContactPage(), getSiteSettings()]);

  return (
    <>
      <main className="flex-1 max-w-[860px] mx-auto px-[80px] max-md:px-10 py-[120px]">
        <p className="section-label text-softer mb-16">CONTACT</p>

        <h1 className="text-[clamp(28px,4vw,40px)] font-bold leading-[1.3] tracking-[-0.02em] text-foreground mb-4">
          {contact?.heading?.[locale] ?? (
            <>
              안녕하세요.
              <br />
              글 쓰는 디자이너, 이용진입니다.
            </>
          )}
        </h1>

        <p className="text-[15px] text-softer leading-[1.7] mb-16 max-w-[560px]">
          {contact?.subtext?.[locale] ??
            "다양한 협업 및 문의 내용이 있으면 편하게 대화 주세요 :)"}
        </p>

        <ConnectButtons
          email={settings?.socialLinks?.email ?? DEFAULT_SOCIAL_LINKS.email}
          kakaoOpenChat={
            settings?.socialLinks?.kakaoOpenChat ?? DEFAULT_SOCIAL_LINKS.kakaoOpenChat
          }
        />

        <div className="divider-marker my-16">
          <span className="line" />
          <span className="tick" />
          <span className="dot" />
          <span className="line" />
        </div>

        <p className="caption-category mb-8">또는 아래 폼으로 문의하기</p>

        <ContactForm />
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
