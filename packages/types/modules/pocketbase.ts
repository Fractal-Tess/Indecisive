export type PocketbaseRecord = {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  expand: Record<string, unknown>;
};

export type ImageThumb = {
  x: number;
  y: number;
};
