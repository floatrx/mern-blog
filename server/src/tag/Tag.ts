import mongoose, { Document, Model, Schema } from 'mongoose';
import { IPost } from '@/post/Post';

export interface ITag {
  name: string;
}

interface ITagDocument extends ITag, Document {}

interface ITagModel extends Model<ITagDocument> {
  getAll(id?: string): Promise<ITagDocument[]>; // Declare static method getAll
}

const tagSchema = new mongoose.Schema<ITagDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }, // remove __v field
);

tagSchema.statics.getAll = function (_id?: string) {
  this.find({ _id })
    .populate({
      path: 'posts',
      populate: { path: 'author' },
    })
    .exec();
};

const Tag = mongoose.model<ITagDocument, ITagModel>('Tag', tagSchema);

export { Tag };
