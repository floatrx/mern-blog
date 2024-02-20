import mongoose from 'mongoose';

export interface ITag {
  name: string;
}

const tagSchema = new mongoose.Schema<ITag>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }, // remove __v field
);

export const Tag = mongoose.model<ITag>('Tag', tagSchema);
