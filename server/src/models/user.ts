import { setupJSONTransform } from '@/lib/transform';
import type { IUser, IUserDocument, IUserModel } from '@/types/user';
import mongoose, { Schema } from 'mongoose';

/**
 * User schema
 * This schema has a virtual field 'posts' that will be populated with user's posts and custom static methods
 * @see https://mongoosejs.com/docs/guide.html#virtuals
 * Note: Find middleware is used to exclude secrets & version key from query results
 */
const userSchema: Schema<IUserDocument> = new Schema<IUserDocument>(
  {
    idRole: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically populate createdAt and updatedAt fields
  },
);

// Find middleware
userSchema.pre<IUser>('find', function (next) {
  (this as any).select('-password -__v');
  //                     ^^^^^^^^ Exclude secrets from query results
  next();
});

// Relationship with the 'Post' model
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'authorId',
  justOne: false,
});

// Relationship with the 'Role' model
userSchema.virtual('role', {
  ref: 'Role',
  localField: 'idRole',
  foreignField: 'idRole',
  justOne: true,
});

// Add static method getAllWithVirtualPosts to the schema
userSchema.statics.getAllWithVirtualPosts = function () {
  return this.find({}).select('-password').populate('posts').populate('role');
};

// Add static method getAll to the schema
userSchema.statics.getAll = function (_id?: string) {
  return this.find(_id ? { _id } : {})
    .populate('posts')
    .populate('role');
};

const User = mongoose.model<IUserDocument, IUserModel>('User', setupJSONTransform(userSchema));

export { User };
