import type { ImageThumb, PocketbaseRecord } from '@indecisive/types';
import { env } from '$env/dynamic/public';

export const recordImageToUrl = (
  record: PocketbaseRecord,
  image: string,
  thumb?: ImageThumb
) => {
  let url = `${env.PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${image}`;
  url += thumb ? `?${thumb.x}x${thumb.y}` : '';
  return url;
};
