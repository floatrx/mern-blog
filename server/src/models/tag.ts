import { setupJSONTransform } from '@/lib/transform';
import mongoose from 'mongoose';

import type { ITagDocument, ITagModel } from '@/types/tag';

const tagSchema = new mongoose.Schema<ITagDocument>({
  name: {
    type: String,
    required: true,
  },
});

tagSchema.statics.getAll = function (_id?: string) {
  this.find({ _id })
    .populate({
      path: 'posts',
      populate: { path: 'author' },
    })
    .exec();
};

const Tag = mongoose.model<ITagDocument, ITagModel>('Tag', setupJSONTransform(tagSchema));

export { Tag };
