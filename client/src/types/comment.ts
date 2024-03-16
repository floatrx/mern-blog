import type { IPost } from '@/types/post';
import type { IUser } from '@/types/user';

export interface IComment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  thread: ICommentWithoutPost[];
  author: IUser | null;
  post: IPost;
}

export interface ICommentWithoutPost extends Omit<IComment, 'post'> {}

export interface ICommentCreateRequest {
  text: string;
  post: string;
  thread?: string;
}
