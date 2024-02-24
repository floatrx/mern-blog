import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import { pick } from '@/lib/pick';

import type { NextFunction, Request, Response } from 'express';
import type { TokenPayload } from '@/types/auth';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, SECRET_KEY) as TokenPayload;

    // Add user data to the request -> pass it to the next middleware
    req.userData = pick(decodedToken, ['id', 'email']);

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
