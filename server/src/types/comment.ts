import type { IPost } from '@/types/post';
import type { IUser } from '@/types/user';

export interface IComment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  thread: Omit<IComment, 'post'>[];
  author: IUser | null;
  post: IPost;
}

export interface ICreateCommentPayload {
  text: string;
  post: string;
  thread?: string; // id of the parent comment
}
