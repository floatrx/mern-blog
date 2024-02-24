import type { IUser } from '@/types/user';

interface IPostBase {
  title: string;
  body: string; // markdown -> TODO: API rename body to content
}

export interface IPost extends IPostBase {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  published?: boolean;
  author: IUser;
  authorId: string;
  // tags: ITag[]; // array of tags (not just ids)
}

export interface IPostCreate extends IPostBase {
  authorId: string;
  // tagIds: string[]; // only ids
}

export interface IPostUpdate extends Partial<IPostBase> {
  published?: boolean;
  tagIds?: string[];
}

export interface IPostDelete {
  id: string;
}

export interface IPostList extends FindResponse<IPost> {}
