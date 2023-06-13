import { env } from '$env/dynamic/public';
import type { Record } from 'pocketbase';

type ImageThumb = {
  x: number;
  y: number;
};

export const pocketbaseImageToUrl = (
  record: Record,
  image: string,
  thumb?: ImageThumb
) => {
  let url = `${env.PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${image}`;
  url += thumb ? `?${thumb.x}x${thumb.y}` : '';
  return url;
};
