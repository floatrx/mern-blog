import mongoose from 'mongoose';
import { MONGO_HOST, MONGO_URI } from '@/config';

// Connect to MongoDB
export const connectToMongo = async () => {
  console.log(`📦 Connecting to MongoDB ${MONGO_HOST}`);
  mongoose.set('toJSON', { virtuals: true }); // enable virtuals in query results

  await mongoose.connect(MONGO_URI).then(() => {
    console.log('📦 MongoDB connected!');
    // Apply migrations
    import('./migrations');
  });
};
