import jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '@/config';
import { pick } from '@/lib/pick';

import type { NextFunction, Request, Response } from 'express';
import type { ITokenPayload } from '@/types/auth';
import { User } from '@/models/user';
import { RoleEnum } from '@/types/role';

/**
 * Middleware to require authentication
 * Modifying the request object to include user data -> req.userData
 * @returns status 200 if OK
 * @returns status 400 if missing parameters
 * @returns status 401 if unauthorized
 * @returns status 500 if server error
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, TOKEN_SECRET_KEY) as ITokenPayload;

    // Add user data to the request -> pass it to the next middleware
    req.userData = pick(decodedToken, ['id', 'email']); // pick only id and email
    // Add token to the request
    req.token = token;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

/**
 * Middleware to require admin authentication
 * Use after requireAuth middleware
 * @param req
 * @param res
 * @param next
 */
export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { id } = jwt.verify(req.token, TOKEN_SECRET_KEY) as ITokenPayload;
      const user = await User.findById(id);

      if (!user || user.idRole !== RoleEnum.ADMIN) {
        return res.status(403).json({ error: 'Permission denied' });
      }
    } catch (e) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    // If user is admin, pass to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
