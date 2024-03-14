import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { ILoginPayload, ILoginResponse, ITokenPayload } from '@/types/auth';
import { Request, Response } from 'express';
import { User } from '@/models/user';

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
    // Generate access token -> 1 week (1w for test purposes, use 5-15m in production)
    const accessToken = jwt.sign(tokenPayload, 'secret-key', { expiresIn: '1w' });

    res.json({ accessToken, profile: user.toJSON() });
  }

  /**
   * Check if session is valid
   * @returns status 200 if OK
   */
  static check(req: Request, res: Response) {
    res.json({
      message: 'Session is valid',
      auth: req.userData, // <- test requireAuth middleware
    });
  }
}
