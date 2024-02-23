import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IUserDocument extends IUser, Document {}

interface IUserModel extends Model<IUserDocument> {
  getAll(id?: string): Promise<IUserDocument[]>; // Declare static method getAll
  getAllWithVirtualPosts(): Promise<IUserDocument[]>; // Declare static method getAllWithVirtualPosts
}

export interface IUserCreatePayload extends Pick<IUser, 'name' | 'email' | 'password'> {}

const userSchema: Schema<IUserDocument> = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false },
);

// Find middleware
userSchema.pre<IUser>('find', function (next) {
  (this as any).select('-password');
  //                     ^^^^^^^^ Exclude secrets from query results
  next();
});

// Add static method getAll to the schema
userSchema.statics.getAll = function (_id?: string) {
  return this.find(_id ? { _id } : {})
    .populate({
      path: 'posts',
      // populate: { path: 'tags' }, // Populate the 'tags' field within each 'post'
    })
    .exec();
};

userSchema.virtual('posts', {
  ref: 'Post', // Reference the 'Post' model
  localField: '_id', // Field in the User model that holds the reference
  foreignField: 'authorId', // Field in the Post model that holds the reference to the User model
  justOne: false, // Set false to populate with an array of documents
  options: {
    // Exclude _id from virtuals
    excludeId: true,
  },
});

// Set the 'toJSON' option to use virtuals when converting the document to JSON
userSchema.set('toJSON', {
  virtuals: true, // also creates id from _id
  transform: function (_, ret) {
    const json = { ...ret };
    delete json._id; // remove duplicate _id
    return { id: ret.id, ...json };
  },
});

// Now you can use 'userPosts' virtual field to populate user's posts
userSchema.statics.getAllWithVirtualPosts = function () {
  return this.find({}).populate('posts').exec();
};

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export { User };
