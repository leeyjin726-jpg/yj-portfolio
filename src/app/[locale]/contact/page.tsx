import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getContactPage, getSiteSettings } from "@/sanity/fetch";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact-form";

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
        {contact?.heading?.[locale] && (
          <h1 className="text-[clamp(28px,4vw,40px)] font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-4">
            {contact.heading[locale]}
          </h1>
        )}
        {contact?.subtext?.[locale] && (
          <p className="text-[15px] text-softer leading-[1.7] mb-16 max-w-[560px]">
            {contact.subtext[locale]}
          </p>
        )}
        <ContactForm />
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
