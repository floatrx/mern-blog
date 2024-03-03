// Interface for the Post model
import type { IUser } from '@/types/user';

export interface IPost {
  title: string;
  body: string;
  author: IUser; // author id referencing the User model
  thumbnail: string;
  tags: string[]; // tag ids referencing the Tag model
}

export interface IPostCreatePayload extends Pick<IPost, 'title' | 'body' | 'thumbnail'> {}
