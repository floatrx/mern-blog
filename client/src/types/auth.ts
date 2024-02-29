import type { IUser, IUserBase } from '@/types/user';

export interface IAuthLoginRequest {
  email: string;
  password: string; // password is required when creating a user
}

export interface IAuthLoginResponse extends IUserBase {
  accessToken: string;
  profile: IUser;
}
