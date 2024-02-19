import { Request, Response, Router } from 'express';
import { IUserCreatePayload, User } from '@/user/User';

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

    // Create user
    const createdUser = await User.create({ name, email, password });
    return res.status(201).json(createdUser);
  }

  /**
   * List all users
   * @returns status 200 if OK with JSON array of users
   */
  static async list(_: Request, res: Response) {
    const users = await User.find();
    return res.json(users);
  }

  /**
   * List all users with their posts
   * @returns status 200 if OK with JSON array of users with their posts
   * TODO: Debug population option "select"
   */
  static async publications(req: Request, res: Response) {
    const users = await User.find().populate({
      path: 'posts',
      select: '-body', // useless fields
    });
    return res.json(users);
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
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    //                                                                                                                           ^^^^^ debug
    return res.json(updatedUser);
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

  /**
   * Show user by ID
   */
  static async show(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  }
}
