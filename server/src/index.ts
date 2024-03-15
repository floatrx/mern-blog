import express from 'express';
import fileUpload from 'express-fileupload';
import { rateLimit } from 'express-rate-limit';
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

// Throttle requests
// @see https://www.npmjs.com/package/express-rate-limit
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.set('trust proxy', 1); // Adjust the value based on your proxy setup (see below)

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
