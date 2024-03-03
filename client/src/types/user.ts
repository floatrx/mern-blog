import type { IPost } from '@/types/post.ts';
import type { IRole } from '@/types/role';

export interface IUserBase {
  name: string;
  email: string;
}

export interface IUser extends IUserBase {
  id: string;
  idRole: number;
  posts: IPost[];
  role: IRole;
}

export interface IUserCreateRequest extends IUserBase {
  password: string; // password is required when creating a user
}

export interface IUserUpdateRequest extends Partial<IUserCreateRequest> {} // same as IUserCreate but all fields are optional
