import mongoose, { Schema } from 'mongoose';
import { IUser } from '@/user/User';

export interface IPost {
  title: string;
  body: string;
  author?: IUser;
}

export interface IPostCreatePayload extends Pick<IPost, 'title' | 'body'> {
  authorId: string; // author _id
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, unique: true, index: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, // relation with User._id -> this data can be populated
  },
  { versionKey: false }, // remove __v field
);

export const Post = mongoose.model<IPost>('Post', postSchema);
