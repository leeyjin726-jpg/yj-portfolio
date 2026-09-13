export type GalleryLayoutImage = {
  width: number;
  height: number;
};

/**
 * Groups images into rows for a case-study gallery: consecutive portrait
 * (width < height) images are paired two-per-row, everything else gets
 * its own full-width row.
 */
export function groupGalleryRows<T extends GalleryLayoutImage>(images: T[]): T[][] {
  const rows: T[][] = [];
  let i = 0;

  while (i < images.length) {
    const current = images[i];
    const next = images[i + 1];
    const isNarrow = current.width < current.height;
    const nextIsNarrow = next ? next.width < next.height : false;

    if (isNarrow && nextIsNarrow) {
      rows.push([current, next]);
      i += 2;
    } else {
      rows.push([current]);
      i += 1;
    }
  }

  return rows;
}
