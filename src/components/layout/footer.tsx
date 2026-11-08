import { useTranslations } from "next-intl";
import { PROFILE_LINKS } from "@/lib/site-config";

interface FooterProps {
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    email?: string;
    kakaoOpenChat?: string;
  };
}

export function Footer({ socialLinks }: FooterProps) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line mt-auto">
      <div className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="section-label text-faint">
          © {year} TTIYONG.ART · {t("rights")}
        </p>

        {(socialLinks || PROFILE_LINKS.length > 0) && (
          <div className="flex flex-wrap items-center gap-6">
            {PROFILE_LINKS.map((profile) => (
              <a
                key={profile.url}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer me"
                className="action-link"
              >
                {profile.label}
              </a>
            ))}
            {socialLinks?.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                Instagram
              </a>
            )}
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                LinkedIn
              </a>
            )}
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                GitHub
              </a>
            )}
            {socialLinks?.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="action-link"
              >
                Email
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
