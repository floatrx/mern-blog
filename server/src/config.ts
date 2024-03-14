import 'dotenv/config';
import * as process from 'process'; // Load .env file

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const MONGO_HOST = MONGO_URI.split('@').pop() || '<unknown>';

export const USER_ROLES = { ADMIN: 1, USER: 2 };
export const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || '123456';

// AWS
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';

export const S3_REGION = process.env.S3_REGION || 'eu-central-1';
export const S3_BUCKET = process.env.S3_BUCKET || 'floatrx';

// JWT
export const TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || 'secret-key';
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '1m';
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '1d';
