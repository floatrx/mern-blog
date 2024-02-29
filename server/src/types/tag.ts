import { Document, Model } from 'mongoose';

export interface ITag {
  name: string;
}

export interface ITagCreatePayload extends ITag {}

export interface ITagDocument extends ITag, Document {}

export interface ITagModel extends Model<ITagDocument> {
  getAll(id?: string): Promise<ITagDocument[]>; // Declare static method getAll
}
