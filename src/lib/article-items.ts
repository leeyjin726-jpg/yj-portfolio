export type ArticleItem = {
  id: string;
  type: "blog" | "magazine";
  slug: string;
  title: Record<string, string>;
  summary?: Record<string, string>;
  coverImage: unknown;
  publishedAt: string;
  badge: string;
};

type LocalizedText = Record<string, string>;

type BlogPostDoc = {
  _id: string;
  slug?: { current: string };
  title: LocalizedText;
  excerpt?: LocalizedText;
  coverImage: unknown;
  publishedAt: string;
};

type MagazineDoc = {
  _id: string;
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  coverImage: unknown;
  publishedAt: string;
  seriesLabel?: string;
};

/** Merge blog posts and magazines into one list, newest first. */
export function buildArticleItems(posts: BlogPostDoc[], magazines: MagazineDoc[]): ArticleItem[] {
  return [
    ...posts.map((post) => ({
      id: post._id,
      type: "blog" as const,
      slug: post.slug?.current ?? "",
      title: post.title,
      summary: post.excerpt,
      coverImage: post.coverImage,
      publishedAt: post.publishedAt,
      badge: "BLOG",
    })),
    ...magazines.map((mag) => ({
      id: mag._id,
      type: "magazine" as const,
      slug: mag.slug,
      title: mag.title,
      summary: mag.description,
      coverImage: mag.coverImage,
      publishedAt: mag.publishedAt,
      badge: mag.seriesLabel ?? "MAGAZINE",
    })),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
