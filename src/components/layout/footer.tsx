import { useTranslations } from "next-intl";
import { PERSON, PROFILE_LINKS } from "@/lib/site-config";
import { FooterIcon } from "@/components/layout/footer-icons";

const ICON_LINK =
  "inline-flex items-center justify-center w-9 h-9 -m-2 text-softer hover:text-accent transition-colors";

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
      <div className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="section-label text-faint">
            © {year} TTIYONG.ART · {t("rights")}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={`mailto:${PERSON.email}`}
              aria-label={`Email ${PERSON.email}`}
              title={PERSON.email}
              className={ICON_LINK}
            >
              <FooterIcon name="email" className="w-5 h-5" />
            </a>
            {PROFILE_LINKS.map((profile) => (
              <a
                key={profile.url}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={profile.label}
                title={profile.label}
                className={ICON_LINK}
              >
                <FooterIcon name={profile.icon} className={profile.icon === "notefolio" ? "w-5 h-5" : "w-[18px] h-[18px]"} />
              </a>
            ))}
            {socialLinks && (
              <>
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
              </>
            )}
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-[12px] leading-[1.7] text-faint">
          {t("copyright_notice")}
        </p>
      </div>
    </footer>
  );
}
