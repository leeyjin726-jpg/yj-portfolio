import Image from "next/image";

export type SceneImageData = {
  alt?: string;
  caption?: string;
  asset?: {
    url?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  } | null;
};

export function SceneImage({ image }: { image?: SceneImageData | null }) {
  const url = image?.asset?.url;
  if (!url) return null;
  const width = image.asset?.metadata?.dimensions?.width ?? 1200;
  const height = image.asset?.metadata?.dimensions?.height ?? 1600;

  return (
    <figure className="mt-10">
      <div
        className="overflow-hidden rounded-[4px]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={url}
          alt={image.alt ?? ""}
          width={width}
          height={height}
          sizes="(max-width: 860px) 100vw, 700px"
          className="w-full h-full object-cover"
        />
      </div>
      {image.caption && (
        <figcaption className="caption-category mt-3">{image.caption}</figcaption>
      )}
    </figure>
  );
}
