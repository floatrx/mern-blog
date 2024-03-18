import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, TOKEN_SECRET_KEY } from '@/config';
import { Request, Response } from 'express';
import { User } from '@/models/user';
import { pick } from '@/lib/pick';

import type { IDecodedToken, ILoginPayload, ILoginResponse, ITokenPayload } from '@/types/auth';
import { handleError } from '@/middleware/handleError';

/**
 * Auth Controller contains static methods for auth operations
 * @class
 */
export class AuthController {
  /**
   * Login user
   * @returns status 200 if OK
   * @returns status 400 if missing parameters
   * @returns status 401 if invalid username or password
   * @returns status 500 if server error
   */
  @handleError()
  static async login(req: Request<never, never, ILoginPayload>, res: Response<ILoginResponse | { message: string }>) {
    const { email, password } = req.body;

    // Verify if the required fields are present
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate access token
    const tokenPayload: ITokenPayload = { id: user._id, email: user.email };

    // Generate tokens
    const [accessToken, refreshToken] = [ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN].map((expiresIn) =>
      jwt.sign(tokenPayload, TOKEN_SECRET_KEY, { expiresIn }),
    );

    res.json({ tokens: { accessToken, refreshToken }, profile: user.toJSON(), v: '2' });
  }

  /**
   * Check if session is valid ->
   * Use after "requireAuth" middleware
   * @returns status 200 if OK
   */
  @handleError()
  static check(req: Request, res: Response) {
    res.json({ message: 'Session is valid', auth: req.userData });
  }

  /**
   * Refresh access token
   * @returns status 200 if OK
   * @returns status 400 if missing parameters
   * @returns status 401 if invalid refreshToken
   */
  @handleError()
  static refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'RefreshToken is required' });
    }

    try {
      // Verify refreshToken
      const tokenPayload = jwt.verify(refreshToken, TOKEN_SECRET_KEY) as IDecodedToken;
      // Generate new access token
      const accessToken = jwt.sign(pick(tokenPayload, ['id', 'email']), TOKEN_SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

      // __ FOR DEBUG PURPOSES __
      // Get new expiresIn
      const { exp } = jwt.decode(accessToken) as IDecodedToken;
      // Convert expiresIn to ISO string (for debugging)
      const date = new Date(exp * 1000).toISOString();
      // ------------------------

      // Send new accessToken
      res.json({ accessToken, exp, date });
    } catch (error) {
      return res.status(403).json({ message: 'Invalid refreshToken', error: error.message });
    }
  }
}
