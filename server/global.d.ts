declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      SECRET_KEY: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
