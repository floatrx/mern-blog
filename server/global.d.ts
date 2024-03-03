declare interface IErrorResponse {
  message: string; // error message
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      SECRET_KEY: string;
      NODE_ENV: 'development' | 'production';

      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      S3_REGION: string;
      S3_BUCKET: string;
    }
  }
}
