import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { OG_IMAGE, SEO_COPY, SITE_NAME, SITE_URL, SITE_VERIFICATION } from "@/lib/site-config";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
});

const verification: Metadata["verification"] = {
  google: SITE_VERIFICATION.google || undefined,
  other: SITE_VERIFICATION.naver
    ? { "naver-site-verification": SITE_VERIFICATION.naver }
    : undefined,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO_COPY.ko.title, template: `%s | ${SITE_NAME}` },
  description: SEO_COPY.ko.description,
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "ko_KR",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  verification,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas text-foreground">
        {children}
      </body>
    </html>
  );
}
