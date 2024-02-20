import express from 'express';
import mongoose from 'mongoose';

import { MONGO_HOST, MONGO_URI, PORT } from '@/config';
import { router } from '@/router';

import { serverErrorHandler, syntaxErrorHandler } from '@/utils';

// App
const app = express();

app.use(express.json()); // parse application/json
app.use([serverErrorHandler, syntaxErrorHandler]); // handle errors globally

app.use('/api', router); // mount routers

app.listen(PORT, async () => {
  try {
    console.log(`📦 Connecting to MongoDB ${MONGO_HOST}`);
    await mongoose.connect(MONGO_URI).then(console.clear);
    console.log(`👋 Express server is running! http://localhost:${PORT}/api/test`);
  } catch (e) {
    console.error('Error:', e.message);
  }
});
