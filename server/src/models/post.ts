import { setupJSONTransform } from '@/lib/transform';
import type { IPost } from '@/types/post';
import mongoose, { Schema } from 'mongoose';

// Mongoose Schema for Post
const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, unique: true, index: true },
    body: { type: String, required: true },
    thumbnail: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  },
  {
    timestamps: true, // Automatically populate createdAt and updatedAt fields
  },
);

setupJSONTransform(postSchema);

const Post = mongoose.model<IPost>('Post', postSchema);

export { Post };
