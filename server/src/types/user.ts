import { Document, Model } from 'mongoose';

interface IUserBase {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends IUserBase {
  idRole: number;
}

// Declare the IUserDocument as a new interface that extends the IUser and the Document interface
export interface IUserDocument extends IUser, Document {}

// Custom static methods
export interface IUserModel extends Model<IUserDocument> {
  getAll(id?: string): Promise<IUserDocument[]>; // Declare static method getAll
  getAllWithVirtualPosts(): Promise<IUserDocument[]>; // Declare static method getAllWithVirtualPosts
}

export interface IUserCreatePayload extends Pick<IUser, 'name' | 'email' | 'password'> {}
