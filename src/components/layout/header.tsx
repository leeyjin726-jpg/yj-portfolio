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
    { href: `/${locale}/about`, label: "ABOUT" },
    { href: `/${locale}/work/design`, label: "PORTFOLIO" },
    { href: `/${locale}/blog`, label: "BLOG" },
    { href: `/${locale}/magazine`, label: "MAGAZINE" },
    { href: `/${locale}/shop`, label: "SHOP" },
    { href: `/${locale}/contact`, label: "CONTACT" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-sm">
      <div className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 h-14 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="section-label text-foreground hover:text-accent transition-colors"
        >
          TTIYONG.ART
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="section-label text-softer hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={localeSwitchPath}
            className="section-label text-faint hover:text-softer transition-colors border-l border-line pl-6"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </nav>

        {/* Mobile: locale + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <Link
            href={localeSwitchPath}
            className="section-label text-faint"
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
                className="section-label text-softer hover:text-foreground transition-colors"
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
