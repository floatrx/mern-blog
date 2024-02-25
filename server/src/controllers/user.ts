import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Role } from '@/models/role';
import { User } from '@/models/user';
import type { IUser, IUserCreatePayload, IUserLoginPayload } from '@/types/user';
import type { TokenPayload } from '@/types/auth';

export class UserController {
  /**
   * Create a new user
   * @returns status 201 if OK
   * @returns status 400 if missing parameters
   */
  static async create(req: Request<never, never, IUserCreatePayload>, res: Response) {
    const { name, email, password } = req.body;

    // Verify if the required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      idRole: 2,
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
  static async update(req: Request<{ id: string }, never, IUserCreatePayload>, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(id, { name, email, password });
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
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }
    await User.findByIdAndDelete(id);
    return res.status(204).send();
  }
}
