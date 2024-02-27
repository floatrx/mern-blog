import type { IUser } from '@/types/user';

interface IPostBase {
  title: string;
  body: string;
  thumbnail: string;
}

export interface IPost extends IPostBase {
  id: string;
  authorId: string;
  author: IUser;
}

export interface IPostCreate extends IPostBase {
  authorId: string;
}

export interface IPostUpdate extends Partial<IPostBase> {}

export interface IPostDelete {
  id: string;
}

export interface IPostList extends FindResponse<IPost> {}
