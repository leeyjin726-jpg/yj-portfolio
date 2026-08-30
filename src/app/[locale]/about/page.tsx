import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getAboutPage, getSiteSettings } from "@/sanity/fetch";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default function AboutPage({
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
            <div className="h-3 w-16 bg-raised rounded mb-16" />
            <div className="w-20 h-20 rounded-full bg-raised mb-12" />
            <div className="space-y-3">
              <div className="h-3 bg-raised rounded w-3/4" />
              <div className="h-3 bg-raised rounded w-1/2" />
              <div className="h-3 bg-raised rounded w-2/3" />
            </div>
          </div>
        }
      >
        <AboutContent params={params} />
      </Suspense>
    </>
  );
}

async function AboutContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);

  return (
    <>
      <main className="flex-1 max-w-[860px] mx-auto px-[80px] max-md:px-10 py-[120px]">
        <p className="section-label text-softer mb-16">ABOUT</p>

        <div className="w-[200px] mb-12">
          <Image
            src="/images/avatar.png"
            alt="Avatar"
            width={1182}
            height={1330}
            className="w-full h-auto"
            priority
          />
        </div>

        {about?.bio?.[locale] ? (
          <div className="prose prose-invert max-w-none">
            <PortableText value={about.bio[locale]} />
          </div>
        ) : (
          <div className="space-y-[100px] max-md:space-y-16">
            <h1 className="text-[clamp(45px,6.4vw,77px)] font-bold leading-[1.05] tracking-[-0.04em] text-foreground max-w-[600px]">
              글 쓰는 디자이너,
              <br />
              이용진입니다<span className="text-accent">.</span>
            </h1>

            <p className="text-[18px] text-softer leading-[1.8] max-w-[560px]">
              AI가 현업에 들어오면서 일의 방식이 빠르게 바뀌고 있습니다. 결과물을 만드는 속도는
              점점 빨라지고 있지만, 그만큼 무엇을 만들 것인지 결정하는 기획력은 더 중요해지고
              있습니다. 저는 디자인과 글쓰기를 함께 해오며 AI 시대에 필요한 두 가지 역량을
              갖추게 됐습니다.
            </p>

            <div className="divider-marker">
              <span className="line" />
              <span className="tick" />
              <span className="dot" />
              <span className="line" />
            </div>

            <div className="space-y-16">
              <div className="flex gap-6">
                <span className="number-badge mt-1">01</span>
                <div className="space-y-4 max-w-[560px]">
                  <p className="text-[17px] font-medium text-foreground">
                    시각적 기획력입니다.
                  </p>
                  <p className="text-[15px] text-softer leading-[1.7]">
                    디자이너는 이야기를 들을 때 머릿속에서 동시에 그림을 그립니다. 누군가의
                    말을 들으면 글보다 먼저 구조와 흐름이 시각적으로 정리됩니다.
                  </p>
                  <p className="text-[15px] text-softer leading-[1.7]">
                    저는 클라이언트와 소통하거나 제안서를 만들 때 아이디어를 먼저 시각적으로
                    구조화하는 방식으로 문제를 풀어왔습니다. 생각을 글로 설명하기 전에
                    보여지는 형태로 정리하면 팀과 클라이언트가 같은 그림을 보며 의사결정을 할
                    수 있습니다. 그 결과 커뮤니케이션의 속도와 정확도가 크게 달라지는 것을
                    경험했습니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <span className="number-badge mt-1">02</span>
                <div className="space-y-4 max-w-[560px]">
                  <p className="text-[17px] font-medium text-foreground">
                    브랜드를 여러 관점에서 읽는 능력입니다.
                  </p>
                  <p className="text-[15px] text-softer leading-[1.7]">
                    브랜드의 성공은 단순히 좋은 비주얼만으로 만들어지지 않습니다. 고객을
                    설득하기 위해서는 매출 구조, 소비 흐름, 그리고 시장의 맥락까지 함께
                    이해해야 합니다.
                  </p>
                  <p className="text-[15px] text-softer leading-[1.7]">
                    저는 2년 넘게 에디터로 활동하며 트렌드와 다양한 브랜드를 꾸준히
                    케이스스터디 해왔습니다. 그 과정에서 저는 &lsquo;아름다움을 만드는
                    디자이너&rsquo;에서 &lsquo;브랜드의 본질을 읽는 디자이너&rsquo;로
                    변화했습니다.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[18px] text-foreground leading-[1.8] max-w-[560px] font-medium">
              빠르게 시각적으로 구조화하고, 그 구조를 글로 설득력 있게 풀어내는 것. 저는 이
              두 가지를 함께 할 수 있는 사람입니다.
            </p>
          </div>
        )}

        {settings?.socialLinks && (
          <div className="mt-16 pt-12 border-t border-line flex gap-8 flex-wrap">
            {settings.socialLinks.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                Instagram
              </a>
            )}
            {settings.socialLinks.linkedin && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                LinkedIn
              </a>
            )}
            {settings.socialLinks.email && (
              <a
                href={`mailto:${settings.socialLinks.email}`}
                className="action-link"
              >
                Email
              </a>
            )}
          </div>
        )}
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
