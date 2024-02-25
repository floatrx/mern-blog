import 'dotenv/config'; // Load .env file

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const SECRET_KEY = process.env.SECRET_KEY || 'secret-key';
export const MONGO_HOST = MONGO_URI.split('@').pop() || '<unknown>';

export const USER_ROLES = { ADMIN: 1, USER: 2 };

// AWS
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';

export const S3_REGION = process.env.S3_REGION || 'eu-central-1';
export const S3_BUCKET = process.env.S3_BUCKET || 'floatrx';
