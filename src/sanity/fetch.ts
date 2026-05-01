// Cached Sanity fetch helpers using Next.js 16 'use cache' directive + cacheTag()
// Errors are caught internally so failed fetches return null/[] instead of throwing.
// This prevents Next.js from treating failed cache entries as "uncached data".
import { cacheTag } from "next/cache";
import { client } from "./client";
import {
  blogPostsQuery,
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  latestBlogPostsQuery,
  portfolioItemsQuery,
  portfolioItemBySlugQuery,
  portfolioItemSlugsQuery,
  featuredPortfolioQuery,
  productsQuery,
  siteSettingsQuery,
  aboutPageQuery,
  contactPageQuery,
  magazinesQuery,
  magazineBySlugQuery,
  magazineSlugsQuery,
} from "./queries";

export async function getBlogPosts() {
  "use cache";
  cacheTag("blog");
  try {
    return await client.fetch(blogPostsQuery);
  } catch {
    return [];
  }
}

export async function getLatestBlogPosts() {
  "use cache";
  cacheTag("blog");
  try {
    return await client.fetch(latestBlogPostsQuery);
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  "use cache";
  cacheTag("blog");
  try {
    return await client.fetch(blogPostBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("blog");
  try {
    return await client.fetch(blogPostSlugsQuery);
  } catch {
    return [];
  }
}

export async function getPortfolioItemBySlug(slug: string) {
  "use cache";
  cacheTag("portfolio");
  try {
    return await client.fetch(portfolioItemBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function getPortfolioItemSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("portfolio");
  try {
    return await client.fetch(portfolioItemSlugsQuery);
  } catch {
    return [];
  }
}

export async function getPortfolioItems(category: "design" | "content") {
  "use cache";
  cacheTag("portfolio");
  try {
    return await client.fetch(portfolioItemsQuery, { category });
  } catch {
    return [];
  }
}

export async function getFeaturedPortfolio() {
  "use cache";
  cacheTag("portfolio");
  try {
    return await client.fetch(featuredPortfolioQuery);
  } catch {
    return [];
  }
}

export async function getProducts() {
  "use cache";
  cacheTag("products");
  try {
    return await client.fetch(productsQuery);
  } catch {
    return [];
  }
}

export async function getAboutPage() {
  "use cache";
  cacheTag("about");
  try {
    return await client.fetch(aboutPageQuery);
  } catch {
    return null;
  }
}

export async function getContactPage() {
  "use cache";
  cacheTag("contact");
  try {
    return await client.fetch(contactPageQuery);
  } catch {
    return null;
  }
}

export async function getMagazines() {
  "use cache";
  cacheTag("magazine");
  try {
    return await client.fetch(magazinesQuery);
  } catch {
    return [];
  }
}

export async function getMagazineBySlug(slug: string) {
  "use cache";
  cacheTag("magazine");
  try {
    return await client.fetch(magazineBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function getMagazineSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("magazine");
  try {
    return await client.fetch(magazineSlugsQuery);
  } catch {
    return [];
  }
}

export async function getSiteSettings() {
  "use cache";
  cacheTag("settings");
  try {
    return await client.fetch(siteSettingsQuery);
  } catch {
    return null;
  }
}
