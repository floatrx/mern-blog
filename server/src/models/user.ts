import { setupJSONTransform } from '@/lib/transform';
import type { IUser, IUserDocument, IUserModel } from '@/types/user';
import mongoose, { Schema } from 'mongoose';

const userSchema: Schema<IUserDocument> = new Schema<IUserDocument>({
  idRole: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

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

// Now you can use 'userPosts' virtual field to populate user's posts
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
