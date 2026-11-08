/** Single source of truth for site identity: URLs, SEO copy, and external profiles. */

export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://ttiyong.art").replace(/\/$/, "");

export const SITE_NAME = "TTIYONG.ART";

export const PERSON = {
  name: { ko: "이용진", en: "Yongjin Lee" },
  jobTitles: ["브랜드 디자이너", "브랜드 빌더", "에디터", "Brand Designer", "Editor"],
  email: "leeyjin726@naver.com",
} as const;

export const SEO_COPY: Record<"ko" | "en", { title: string; description: string }> = {
  ko: {
    title: "이용진 · 브랜드 디자이너 & 에디터 | TTIYONG.ART",
    description:
      "브랜드의 본질을 읽고 시각으로 설계하는 글 쓰는 디자이너 이용진의 포트폴리오. 로고·BI 디자인, 브랜드 빌딩, 에디토리얼 작업. 프리랜서 프로젝트 의뢰와 협업 제안을 받고 있습니다.",
  },
  en: {
    title: "Yongjin Lee · Brand Designer & Editor | TTIYONG.ART",
    description:
      "Portfolio of Yongjin Lee, a writing brand designer who reads a brand's essence and shapes it visually. Logo & BI design, brand building, and editorial work. Open to freelance projects and collaborations.",
  },
};

export function seoCopy(locale: string) {
  return locale === "en" ? SEO_COPY.en : SEO_COPY.ko;
}

/**
 * External portfolio / career profiles. Shown in the footer and declared to
 * search engines (JSON-LD sameAs) so they link back to this site.
 * Add an entry here when a profile URL is ready.
 */
export const PROFILE_LINKS: { label: string; url: string }[] = [];
