import type { IPost } from '@/types/post.ts';

export interface IUser extends IUserBase {
  id: string;
  posts: IPost[];
}

interface IUserBase {
  name: string;
  email: string;
}

export interface IUserCreate extends IUserBase {
  password: string; // password is required when creating a user
}

export interface IUserLoginRequest {
  email: string;
  password: string; // password is required when creating a user
}

export interface IUserLoginResponse extends IUserBase {
  accessToken: string;
}

export interface IUserUpdate extends Partial<IUserCreate> {} // same as IUserCreate but all fields are optional

export interface IUserDelete {
  id: string;
}

export interface IUserList extends FindResponse<IUser> {}
