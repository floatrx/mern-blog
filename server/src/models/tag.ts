import { setupJSONTransform } from '@/lib/transform';
import mongoose from 'mongoose';

import type { ITag } from '@/types/tag';

const tagSchema = new mongoose.Schema<ITag>({
  name: {
    type: String,
    required: true,
  },
});

const Tag = mongoose.model<ITag>('Tag', setupJSONTransform(tagSchema));

export { Tag };
