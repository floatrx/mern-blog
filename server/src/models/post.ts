import { setupJSONTransform } from '@/lib/transform';
import type { IPost } from '@/types/post';
import mongoose, { Schema } from 'mongoose';

// Mongoose Schema for Post
const postSchema = new Schema<IPost>({
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

setupJSONTransform(postSchema);

const Post = mongoose.model<IPost>('Post', postSchema);

export { Post };
