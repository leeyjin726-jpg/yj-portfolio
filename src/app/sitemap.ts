import { MetadataRoute } from "next";
import { getBlogPostSlugs, getMagazineSlugs, getPortfolioItemSlugs } from "@/sanity/fetch";
import { SITE_URL } from "@/lib/site-config";

const STATIC_PAGES = ["/", "/about", "/work/design", "/work/content", "/content", "/shop", "/contact"];

const localizedUrl = (locale: "ko" | "en", path: string) =>
  `${SITE_URL}${locale === "ko" ? path : `/en${path}`}`;

function entry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl("ko", path),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: { ko: localizedUrl("ko", path), en: localizedUrl("en", path) },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, workSlugs, magazineSlugs] = await Promise.all([
    getBlogPostSlugs(),
    getPortfolioItemSlugs(),
    getMagazineSlugs(),
  ]);

  return [
    ...STATIC_PAGES.map((page) => entry(page, page === "/" ? 1 : 0.8)),
    ...workSlugs.map((slug) => entry(`/work/${slug}`, 0.7)),
    ...magazineSlugs.map((slug) => entry(`/magazine/${slug}`, 0.6)),
    ...blogSlugs.map((slug) => entry(`/blog/${slug}`, 0.6)),
  ];
}
