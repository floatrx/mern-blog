import { MONGO_HOST, MONGO_URI, PORT } from '@/config';
import { router } from '@/router';

import { serverErrorHandler, syntaxErrorHandler } from '@/utils';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

// App
const app = express();

app.use(cors()); // enable CORS
app.use(express.json()); // parse application/json
app.use([serverErrorHandler, syntaxErrorHandler]); // handle errors globally

app.use('/api', router); // mount routers

(async () => {
  try {
    console.log(`📦 Connecting to MongoDB ${MONGO_HOST}`);
    await mongoose.connect(MONGO_URI).then(() => console.log('📦 MongoDB connected!'));
    app.listen(PORT, async () => {
      console.log(`👋 Express server is running! http://localhost:${PORT}/api/test`);
    });
  } catch (e) {
    console.error('📦 Error:', e.message);
  }
})();
