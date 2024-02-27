export interface IAuth {
  userId: string;
  accessToken: string;
}

export interface TokenPayload {
  id: string;
  email: string;
}

// Augment the Express Request type to include the auth property
declare global {
  namespace Express {
    interface Request {
      userData?: TokenPayload;
    }
  }
}
