// Mongoose transform functions
import mongoose from 'mongoose';

export const setupJSONTransform = (schema: mongoose.Schema) => {
  schema.set('toJSON', {
    transform: (_: unknown, ret: Record<string, any>) => {
      const json = { ...ret };
      delete json._id; // remove duplicate _id
      delete json.__v; // remove version key
      delete json.password; // remove password
      return { id: ret.id, ...json }; // set id as first field
    },
  });
  return schema;
};
