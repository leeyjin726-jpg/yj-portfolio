import { PERSON, PROFILE_LINKS, SITE_NAME, SITE_URL, seoCopy } from "@/lib/site-config";

/** schema.org Person + WebSite data so search engines tie the name to this site. */
export function PersonJsonLd({ locale }: { locale: string }) {
  const name = locale === "en" ? PERSON.name.en : PERSON.name.ko;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name,
      alternateName: [PERSON.name.ko, PERSON.name.en, "이띠용", "TTIYONG"],
      jobTitle: PERSON.jobTitles,
      url: SITE_URL,
      email: `mailto:${PERSON.email}`,
      description: seoCopy(locale).description,
      sameAs: PROFILE_LINKS.map((p) => p.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: ["띠용아트", "TTIYONG ART"],
      url: SITE_URL,
      inLanguage: ["ko", "en"],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
