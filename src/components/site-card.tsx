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
        <span translate="no" className="notranslate pill absolute top-3 right-3">
          VISIT
        </span>
      </div>
      <div className="p-4">
        <figcaption className="caption">
          <h3 translate="no" className="notranslate caption-title group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p translate="no" className="notranslate caption-meta">
            {handle}
          </p>
        </figcaption>
      </div>
    </a>
  );
}
