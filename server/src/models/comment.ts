import mongoose, { Schema } from 'mongoose';
import type { IComment } from '@/types/comment';
import { setupJSONTransform } from '@/lib/transform';

const commentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    thread: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // author is a reference to the User model or null
    author: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  {
    timestamps: true,
  },
);

setupJSONTransform(commentSchema);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export { Comment };
