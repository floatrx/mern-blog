import type { IPost } from '@/types/post';
import type { IUser } from '@/types/user';

export interface IComment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  thread: Omit<IComment, 'post'>[]; // if not empty, is the thread of comments
  author: IUser | null; // if null, is the author is guest
  post: IPost; // the post where the comment is
  answer: string | null; // if not null, is the id of the parent comment
}

export interface ICreateCommentPayload {
  text: string;
  post: string;
  thread?: string; // id of the parent comment
}
