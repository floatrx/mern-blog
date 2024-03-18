import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { RoleEnum } from '@/types/role';
import { User } from '@/models/user';
import { filterObject } from '@/lib/filter-object';

import type { IUserCreatePayload } from '@/types/user';
import { handleError } from '@/middleware/handleError';

/**
 * User Controller contains static methods for user operations
 * @class
 */
export class UserController {
  /**
   * Create a new user
   * @returns status 201 if OK
   * @returns status 400 if missing parameters
   */
  @handleError()
  static async create(req: Request<never, never, IUserCreatePayload>, res: Response) {
    const { name, email, password } = req.body;

    // Verify if the required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      idRole: RoleEnum.USER, // <- default role is "user"
      name,
      email,
      password: hashedPassword,
    };

    // Create user
    const createdUser = await User.create(newUser);
    return res.status(201).json(createdUser);
  }

  /**
   * List all users
   * @returns status 200 if OK with JSON array of users
   */
  static async list(_: Request, res: Response) {
    const users = await User.find().populate('posts').populate('role');
    return res.json(users);
  }

  /**
   * Show user by ID
   */
  static async show(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }
    const user = await User.getAll(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  }

  /**
   * Update user by ID
   * @returns status 200 if OK with updated user
   * @returns status 400 if missing parameters
   */
  @handleError()
  static async update(req: Request<{ id: string }, never, IUserCreatePayload>, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    try {
      // Hash password if present
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
      // Filter object to remove falsy values
      const data = filterObject({ name, email, password: hashedPassword });
      // Update user and send response
      const updatedUser = await User.findByIdAndUpdate(id, data);
      return res.json(updatedUser);
    } catch (e) {
      return res.status(400).json({ message: 'User not found' });
    }
  }

  /**
   * Delete user by ID
   * @returns status 204 if OK
   * @returns status 400 if missing parameters
   */
  @handleError()
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }
    await User.findByIdAndDelete(id);
    return res.status(204).send(); // http 204 no content
  }
}
