import { setupJSONTransform } from '@/lib/transform';
import type { IPost } from '@/types/post';
import mongoose, { Schema } from 'mongoose';

// Mongoose Schema for Post
const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, unique: true, index: true },
    body: { type: String, required: true },
    thumbnail: { type: String },
    authorId: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically populate createdAt and updatedAt fields
  },
);

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
