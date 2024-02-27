import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import { serverErrorHandler, syntaxErrorHandler } from '@/lib/utils';
import { connectToMongo } from '@/mongo';
import { PORT } from '@/config';

import { router } from '@/router';

// App
const app = express();

app.use(cors()); // enable CORS
app.use(express.json()); // parse application/json
app.use(fileUpload()); // enable file uploads
app.use([serverErrorHandler, syntaxErrorHandler]); // handle errors globally

app.use('/api', router); // mount routers

// Start server
(async () => {
  try {
    await connectToMongo();
    app.listen(PORT, async () => {
      console.log(`👋 Express server is running! http://localhost:${PORT}/api/test`);
    });
  } catch (e) {
    console.error('📦 Error:', e.message);
  }
})();
