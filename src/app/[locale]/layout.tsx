import { cacheLife, cacheTag } from "next/cache";
import { NextIntlClientProvider } from "@/components/intl-provider";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

async function loadMessages(locale: string) {
  "use cache";
  cacheLife("max");
  cacheTag(`messages-${locale}`);
  try {
    if (locale === "ko") {
      return (await import("@/i18n/messages/ko.json")).default;
    }
    return (await import("@/i18n/messages/en.json")).default;
  } catch {
    return {};
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ko" | "en")) {
    notFound();
  }

  const messages = await loadMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
