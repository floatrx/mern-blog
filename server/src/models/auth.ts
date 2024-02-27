import { setupJSONTransform } from '@/lib/transform';
import type { IAuth } from '@/types/auth';
import mongoose, { Schema } from 'mongoose';

// Mongoose Schema for Auth
const authSchema = new Schema<IAuth>(
  {
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically populate createdAt and updatedAt fields
  },
);

// Relationship with User
authSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

setupJSONTransform(authSchema);

const Auth = mongoose.model<IAuth>('Auth', authSchema);

export { Auth };
