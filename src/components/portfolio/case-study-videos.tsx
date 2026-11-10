type CaseStudyVideo = {
  _key: string;
  caption?: string;
  url?: string;
  poster?: {
    url?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  } | null;
};

/**
 * Motion deliverables. Muted autoplay loop (browsers block autoplay with
 * sound); controls let viewers unmute. Two-up on desktop like portrait gallery rows.
 */
export function CaseStudyVideos({ videos }: { videos: CaseStudyVideo[] }) {
  const playable = videos.filter((video) => video.url);
  if (playable.length === 0) return null;

  return (
    <div className="max-w-[1200px] mx-auto px-[80px] max-md:px-10 mb-[80px]">
      <div
        className={
          playable.length > 1
            ? "grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:gap-[60px]"
            : ""
        }
      >
        {playable.map((video) => {
          const dims = video.poster?.metadata?.dimensions;
          return (
            <figure key={video._key}>
              <div
                className="overflow-hidden rounded-[4px] bg-raised"
                style={{ aspectRatio: `${dims?.width ?? 3} / ${dims?.height ?? 4}` }}
              >
                <video
                  src={video.url}
                  poster={video.poster?.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
              {video.caption && (
                <figcaption className="caption mt-4">
                  <p className="caption-meta">{video.caption}</p>
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
