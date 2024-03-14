import type { IUser } from '@/types/user';

export interface ITokenPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface IDecodedToken extends Required<ITokenPayload> {}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  profile: IUser;
}

// Augment the Express Request type to include the auth property
declare global {
  namespace Express {
    interface Request {
      userData?: ITokenPayload; // [!] Add userData to the Request object
      token?: string;
    }
  }
}
