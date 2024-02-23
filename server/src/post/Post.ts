import { IUser } from '@/user/User';
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPost {
  title: string;
  body: string;
  authorId: string;
}

interface IPostDocument extends IPost, Document {}

interface IPostModel extends Model<IPostDocument> {
  getAll(id?: string): Promise<IPostDocument[]>; // Declare static method getAll
}

export interface IPostCreatePayload extends Pick<IPost, 'title' | 'body'> {
  authorId: string; // author _id
}

const postSchema = new Schema<IPostDocument>(
  {
    title: { type: String, required: true, unique: true, index: true },
    body: { type: String, required: true },
    authorId: { type: String, required: true },
  },
  { versionKey: false }, // remove __v field
);

postSchema.virtual('author', {
  ref: 'User', // Reference the 'Post' model
  localField: 'authorId', // Field in the User model that holds the reference
  foreignField: '_id', // Field in the Post model that holds the reference to the User model
  justOne: true, // Set false to populate with an array of documents
  options: {
    // Exclude _id from virtuals
    excludeId: true,
  },
});

postSchema.set('toJSON', {
  virtuals: true, // also creates id from _id
  transform: function (_, ret) {
    const json = { ...ret };
    delete json._id; // remove duplicate _id
    return { id: ret.id, ...json };
  },
});

postSchema.statics.getAll = function (_id?: string) {
  return this.find(_id ? { _id } : {})
    .populate({
      path: 'author',
    })
    .exec();
};

const Post = mongoose.model<IPostDocument, IPostModel>('Post', postSchema);

export { Post };
