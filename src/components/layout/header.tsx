"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === "ko" ? "en" : "ko";
  const localeSwitchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { href: `/${locale}/about`, label: "About" },
    { href: `/${locale}/work/design`, label: "Portfolio" },
    { href: `/${locale}/blog`, label: "Blog" },
    { href: `/${locale}/magazine`, label: "Magazine" },
    { href: `/${locale}/shop`, label: "Shop" },
    { href: `/${locale}/contact`, label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/50 bg-canvas/40 backdrop-blur-xl">
      <div className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 h-14 flex items-center justify-between">
        {/* Left cluster: logo + nav */}
        <div className="flex items-center gap-10">
          <Link
            href={`/${locale}`}
            className="text-[14px] font-semibold tracking-[0.04em] text-foreground hover:text-accent transition-colors"
          >
            TTIYONG.ART
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-softer hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right cluster: locale */}
        <div className="hidden md:flex items-center gap-3 text-[13px]">
          <span className={locale === "ko" ? "text-foreground underline underline-offset-4" : "text-faint"}>
            {locale === "ko" ? "KR" : (
              <Link href={localeSwitchPath.replace(`/${otherLocale}`, "/ko")} className="hover:text-foreground transition-colors">KR</Link>
            )}
          </span>
          <span className="text-faint">|</span>
          <span className={locale === "en" ? "text-foreground underline underline-offset-4" : "text-faint"}>
            {locale === "en" ? "EN" : (
              <Link href={localeSwitchPath.replace(`/${otherLocale}`, "/en")} className="hover:text-foreground transition-colors">EN</Link>
            )}
          </span>
        </div>

        {/* Mobile: locale + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <Link
            href={localeSwitchPath}
            className="text-[13px] text-faint"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-softer hover:text-foreground transition-colors p-1"
          >
            {menuOpen ? (
              <span className="text-sm leading-none">✕</span>
            ) : (
              <span className="text-sm leading-none">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-line px-10 py-6">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[15px] text-softer hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
