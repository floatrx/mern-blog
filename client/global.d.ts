declare interface FindResponse<T> {
  data: T[];
  total: number;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      VITE_PORT: string;
      REACT_APP_API_URL: string;
    }
  }
}
