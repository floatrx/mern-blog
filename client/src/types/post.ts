import type { ITag } from './tag.ts';
import type { IUser } from './user.ts';

interface IPostBase {
  title: string;
  content: string; // markdown -> TODO: API rename body to content
}

export interface IPost extends IPostBase {
  _id: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  author: IUser;
  tags: ITag[]; // array of tags (not just ids)
}

export interface IPostCreate extends IPostBase {
  authorId: string;
  tagIds: string[]; // only ids
}

export interface IPostUpdate extends Partial<IPostBase> {
  published?: boolean;
  tagIds?: string[];
}

export interface IPostDelete {
  id: string;
}

export interface IPostList extends FindResponse<IPost> {}
