import Image from "next/image";

interface SiteCardProps {
  name: string;
  handle: string;
  url: string;
  image: string;
}

export function SiteCard({ name, handle, url, image }: SiteCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group overflow-hidden block"
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex items-center justify-between gap-4">
        <figcaption className="caption">
          <h3 translate="no" className="notranslate caption-title group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p translate="no" className="notranslate caption-meta">
            {handle}
          </p>
        </figcaption>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="flex-shrink-0 text-softer group-hover:text-accent group-hover:translate-x-1 transition-all"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}
