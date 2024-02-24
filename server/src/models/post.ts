import { setupJSONTransform } from '@/lib/transform';
import type { IPostDocument, IPostModel } from '@/types/post';
import mongoose, { Schema } from 'mongoose';

// Mongoose Schema for Post
const postSchema = new Schema<IPostDocument>({
  title: { type: String, required: true, unique: true, index: true },
  body: { type: String, required: true },
  authorId: { type: String, required: true },
});

// Relationship with User
postSchema.virtual('author', {
  ref: 'User',
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
});

postSchema.statics.getAll = function (_id?: string) {
  return this.find(_id ? { _id } : {})
    .populate({ path: 'author' })
    .exec();
};

setupJSONTransform(postSchema);

const Post = mongoose.model<IPostDocument, IPostModel>('Post', postSchema);

export { Post };
