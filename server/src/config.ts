import 'dotenv/config'; // Load .env file

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const MONGO_HOST = MONGO_URI.split('@').pop() || '<unknown>';
