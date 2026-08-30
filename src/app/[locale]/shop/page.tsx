import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { getProducts, getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("title") };
}

export default function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px] animate-pulse">
            <div className="h-3 w-16 bg-raised rounded mb-16" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-square bg-raised rounded-[4px] mb-4" />
                  <div className="h-3 bg-raised rounded w-2/3 mb-2" />
                  <div className="h-2 bg-raised rounded w-1/3" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <ShopContent params={params} />
      </Suspense>
    </>
  );
}

async function ShopContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  const [products, settings] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ]);

  return (
    <>
      <main className="flex-1 max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px]">
        <p className="section-label text-softer mb-16">{t("title")}</p>

        {products.length === 0 ? (
          <div className="flex flex-col items-center text-center py-16">
            <Image
              src="/images/shop-coming-soon.png"
              alt=""
              width={1024}
              height={1536}
              className="w-[200px] h-auto mb-8"
              priority
            />
            <p className="text-softer text-[15px]">{t("coming_soon")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <div key={product._id} className="card group overflow-hidden cursor-pointer">
                {product.image ? (
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={urlFor(product.image).width(600).height(600).url()}
                      alt={product.title?.[locale] ?? ""}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-raised" />
                )}
                <div className="p-4">
                  <figcaption className="caption">
                    <h2 className="caption-title">{product.title?.[locale]}</h2>
                    {product.description?.[locale] && (
                      <p className="caption-meta line-clamp-2">
                        {product.description[locale]}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      {product.price && (
                        <span className="text-[15px] font-medium text-foreground">
                          {product.currency === "KRW"
                            ? `₩${product.price.toLocaleString()}`
                            : `$${product.price}`}
                        </span>
                      )}
                      {product.externalUrl && (
                        <a
                          href={product.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link"
                        >
                          {t("buy")}
                        </a>
                      )}
                    </div>
                  </figcaption>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer socialLinks={settings?.socialLinks} />
    </>
  );
}
