import type { IPost } from '@/types/post.ts';
import type { IRole } from '@/types/role';

export interface IUser extends IUserBase {
  id: string;
  idRole: number;
  posts: IPost[];
  role: IRole;
}

export interface IUserBase {
  name: string;
  email: string;
}

export interface IUserCreate extends IUserBase {
  password: string; // password is required when creating a user
}

export interface IUserUpdate extends Partial<IUserCreate> {} // same as IUserCreate but all fields are optional
