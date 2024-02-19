import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URI, PORT } from '@/config';
import { serverErrorHandler, syntaxErrorHandler } from '@/utils';
import { router } from '@/router';

// App
const app = express();

app.use(express.json()); // parse application/json
app.use([serverErrorHandler, syntaxErrorHandler]); // handle errors globally

app.use('/api', router); // mount user & post routers

app.get('/', (_req, res) => {
  res.status(200).send('👋 Express server!');
});

app.listen(PORT, async () => {
  // Connect to MongoDB
  await mongoose.connect(MONGO_URI).catch((e) => console.error(e.message));
  // await mongoose.connection.db.dropDatabase(); // <- clean database

  console.log(`Express server is running http://localhost:${PORT}`);
});
