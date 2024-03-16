import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

// Augment the Express Request type to include the auth property
declare global {
  namespace Express {
    interface Request {
      fingerPrint: string;
    }
  }
}

export const fingerPrint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { headers } = req;
    const { 'user-agent': userAgent } = headers;

    req.fingerPrint = bcrypt.hashSync(`${userAgent}${req.ip}`, 10);

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
