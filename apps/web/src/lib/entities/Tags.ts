import type { Tag, PBRecordArtifacts } from '$lib/types';
import { pb } from '$lib/pocketbase/pocketbase';

export class Taggable {
  private _tags;

  public get tags() {
    return this._tags;
  }

  constructor(tags: (Tag & PBRecordArtifacts)[]) {
    this._tags = tags;
  }
  public async createNewTag(tag: string) {
    const createdTag = await pb
      .collection('tag')
      .create<Tag & PBRecordArtifacts>({ tag });
    this._tags = [...this.tags, createdTag];
    return createdTag;
  }
}
