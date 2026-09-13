import Image from "next/image";
import { groupGalleryRows } from "@/lib/gallery-layout";

type GalleryImage = {
  _key: string;
  alt?: string;
  caption?: string;
  asset?: {
    url?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  } | null;
};

export function CaseStudyGallery({ images }: { images: GalleryImage[] }) {
  const sized = images
    .filter((image) => image?.asset?.url)
    .map((image) => ({
      image,
      width: image.asset!.metadata?.dimensions?.width ?? 1200,
      height: image.asset!.metadata?.dimensions?.height ?? 675,
    }));

  const rows = groupGalleryRows(sized);

  return (
    <div className="max-w-[1200px] mx-auto px-[80px] max-md:px-10 mb-[80px]">
      <div className="flex flex-col gap-[80px] max-md:gap-[60px]">
        {rows.map((row, rowIndex) => (
          <div
            key={row.map((entry) => entry.image._key).join("-")}
            className={
              row.length === 2
                ? "grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:gap-[60px]"
                : ""
            }
          >
            {row.map(({ image, width, height }) => (
              <figure key={image._key}>
                <div
                  className="overflow-hidden rounded-[4px]"
                  style={{ aspectRatio: `${width} / ${height}` }}
                >
                  <Image
                    src={image.asset!.url!}
                    alt={image.alt ?? ""}
                    width={width}
                    height={height}
                    priority={rowIndex === 0}
                    className="w-full h-full object-cover"
                  />
                </div>
                {image.caption && (
                  <figcaption className="caption mt-4">
                    <p className="caption-meta">{image.caption}</p>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
