import { Document, Model } from 'mongoose';

export interface IUser {
  idRole: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserLoginPayload {
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  getAll(id?: string): Promise<IUserDocument[]>; // Declare static method getAll
  getAllWithVirtualPosts(): Promise<IUserDocument[]>; // Declare static method getAllWithVirtualPosts
}

export interface IUserCreatePayload extends Pick<IUser, 'name' | 'email' | 'password'> {}
