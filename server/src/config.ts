import 'dotenv/config'; // Load .env file

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const SECRET_KEY = process.env.SECRET_KEY || 'secret-key';
export const MONGO_HOST = MONGO_URI.split('@').pop() || '<unknown>';

export const USER_ROLES = { ADMIN: 1, USER: 2 };
