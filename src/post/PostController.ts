import { IPost, IPostCreatePayload, Post } from './Post';
import { Request, Response, Router } from 'express';
import { User } from '@/user/User';
import { handleError } from '@/utils';

export class PostController {
  /**
   * Get all posts
   * @returns status 200 if OK
   */
  static async list(_req: Request, res: Response) {
    const posts = await Post.find().populate('author'); // populate author field with user data
    res.json(posts);
  }

  /**
   * Get one post by ID
   * @returns status 200 if OK
   * @returns status 404 if post not found
   */
  static async show(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    if (!id) {
      handleError('id is required');
    }
    const post = await Post.find({ id }).select(['-_id', '-__v']);
    if (post) {
      res.json(post); // OK
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  }

  /**
   * Create a new post
   * @returns status 201 if OK
   * @returns status 400 if missing parameters
   * @returns status 404 if author not found
   */
  static async create(req: Request<never, never, IPostCreatePayload>, res: Response) {
    const { title, body, authorId } = req.body;

    if (!authorId) {
      return res.status(400).json({ message: 'missing authorId' });
    }

    // Check for missing or invalid parameters
    if (!title || !body) {
      return res.status(400).json({ message: 'missing post details' });
    }

    // Check if user with specified authorId exists
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Create a new post with the provided author
    const post = await Post.create({ title, body, author: authorId });

    // Respond with the created post
    res.status(201).json(post);
  }

  /**
   * Update post by ID
   * @returns status 200 if OK
   */
  static async update(req: Request<never, never, IPost & { id: string }>, res: Response) {
    const { id, title, body } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, { title, body });
    return res.status(200).json(updatedPost);
  }

  /**
   * Delete post by ID
   * @returns status 204 if OK
   * @returns status 400 if post already deleted
   */
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    console.log('id', id);
    if (!id) {
      handleError('id is required');
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      handleError('bad id');
    }
    const deletedPost = await Post.findByIdAndDelete(id);
    const posts = await Post.find();
    if (deletedPost) {
      res.json({ message: `${id} deleted`, posts });
    } else {
      res.status(400).json({ message: 'post already deleted' });
    }
  }
}
