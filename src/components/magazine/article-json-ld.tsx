import { PERSON, SITE_NAME, SITE_URL } from "@/lib/site-config";

type Props = {
  url: string;
  headline: string;
  description?: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
};

/**
 * schema.org Article so search engines credit the piece to its author and
 * to this site, and can show date/author in results.
 */
export function ArticleJsonLd({ url, headline, description, imageUrl, datePublished, dateModified }: Props) {
  const author = { "@type": "Person", name: PERSON.name.ko, alternateName: PERSON.name.en, url: SITE_URL };
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: "ko",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author,
    publisher: { ...author, name: `띠용아트 ${SITE_NAME}` },
    isPartOf: { "@type": "WebSite", name: SITE_NAME, alternateName: "띠용아트", url: SITE_URL },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
