import { Document, Model } from 'mongoose';

export interface IPost {
  title: string;
  body: string;
  authorId: string;
}

export interface IPostDocument extends IPost, Document {}

export interface IPostModel extends Model<IPostDocument> {
  getAll(id?: string): Promise<IPostDocument[]>; // Declare static method getAll
}

export interface IPostCreatePayload extends Pick<IPost, 'title' | 'body'> {
  authorId: string; // author _id
}
