import { MetadataRoute } from "next";
import { getBlogPostSlugs } from "@/sanity/fetch";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://yj-portfolio.vercel.app";
const locales = ["ko", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getBlogPostSlugs();

  const staticPages = ["/", "/about", "/work/design", "/work/content", "/content", "/shop", "/contact"];

  const localizedPath = (locale: string, path: string) =>
    locale === "ko" ? path : `/${locale}${path}`;

  const staticUrls = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}${localizedPath(locale, page)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "/" ? 1 : 0.8,
    }))
  );

  const blogUrls = slugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${baseUrl}${localizedPath(locale, `/blog/${slug}`)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [...staticUrls, ...blogUrls];
}
