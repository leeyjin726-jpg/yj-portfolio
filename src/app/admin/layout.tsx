import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 w-full max-w-[1200px] mx-auto px-[80px] max-md:px-6 py-[96px] max-md:py-16">
      {children}
    </main>
  );
}
