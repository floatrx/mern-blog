import mongoose from 'mongoose';
import { MONGO_HOST, MONGO_URI } from '@/config';

// Connect to MongoDB
export const connectToMongo = async () => {
  console.log(`📦 Connecting to MongoDB ${MONGO_HOST}`);
  mongoose.set('toJSON', { virtuals: true }); // enable virtuals in query results
  mongoose.set('maxTimeMS', 1000 * 60 * 60); // set max time for queries (1 hour

  await mongoose.connect(MONGO_URI).then(() => {
    console.log('📦 MongoDB connected!');
    // Apply migrations
    import('./migrations');
  });
};
