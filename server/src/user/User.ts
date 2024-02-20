import mongoose, { Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserCreatePayload extends Pick<IUser, 'name' | 'email' | 'password'> {}

export const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false }, // remove __v field
);

// Relation with User._id <-> Post.author
// * Docs: https://mongoosejs.com/docs/populate.html#populate-virtuals
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id', // User._id
  foreignField: 'author', // Post.author
  justOne: false,
});

// Populate virtuals (required for virtuals to work)
// * Note: this approach creates duplicate id and _id fields
userSchema.set('toJSON', {
  virtuals: true, // also creates id from _id
  transform: function (_, ret) {
    delete ret._id; // remove duplicate fields -> coz:
  },
});

// Find middleware
userSchema.pre<IUser>('find', function (next) {
  (this as any).select('-password');
  //                     ^^^^^^^^ Exclude secrets from query results
  next();
});

export const User = mongoose.model<IUser>('User', userSchema);
