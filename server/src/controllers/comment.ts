import jwt from 'jsonwebtoken';
import { Comment } from '@/models/comment';
import { Request, Response } from 'express';
import { TOKEN_SECRET_KEY } from '@/config';

import type { IComment, ICreateCommentPayload } from '@/types/comment';
import type { ITokenPayload } from '@/types/auth';

export class CommentController {
  /**
   * Create comment for a post
   * Check if is a thread comment (answer) and automatically detect the author
   * @returns status 201 if OK
   * @returns status 400 if missing parameters
   * @returns status 500 if internal server error
   */
  static async post(req: Request<never, never, ICreateCommentPayload>, res: Response<IComment | { message: string }>) {
    const { text, thread, post } = req.body;

    if (!text || !post) {
      return res.status(400).json({ message: 'text and post are required' });
    }

    let author: string | null = null; // null is guest user

    if (req.headers.authorization) {
      // Try to get user from request if authorized
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decodedToken = jwt.verify(token, TOKEN_SECRET_KEY) as ITokenPayload;
        author = decodedToken.id; // set author to user id
      } catch (e) {
        // no need to handle error
      }
    }

    try {
      // Check if is a thread comment and try to find parent comment
      const parentComment = thread ? await Comment.findById(thread) : null;
      // If parent comment already has an answer, use it as parent comment -> flatten thread (2nd level)
      const idThread = parentComment?.answer || parentComment?._id || null; // null means main thread
      // Create a new comment
      const newComment = await Comment.create({ text, post, author, answer: idThread });

      if (parentComment) {
        // upsert comment to parent thread
        await Comment.findByIdAndUpdate(idThread, { $addToSet: { thread: newComment } });
      }

      res.json(newComment);
    } catch (e) {
      res.status(500).json({ message: 'Internal server errors' });
    }
  }

  /**
   * List all comments
   * @returns status 200 if OK
   * @returns status 500 if internal server error
   */
  static async list(_req: Request, res: Response<IComment[] | { message: string }>) {
    // get comments when thread array is empty

    try {
      const comments = await Comment.find().populate('author');

      res.json(comments);
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Get all comments as threads (1st level only)
   * @returns status 200 if OK
   * @returns status 500 if internal server error
   */
  static async threads(_req: Request, res: Response<IComment[] | { message: string }>) {
    // get comments when thread array is empty

    try {
      const comments = await Comment.find({ answer: { $eq: null } })
        .populate('author')
        .populate('thread');

      res.json(comments);
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Get post comments as threads (1st level only)
   * @returns status 200 if OK
   * @returns status 500 if internal server error
   */
  static async threadByPostId(req: Request<{ id: string }>, res: Response<IComment[] | { message: string }>) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Id is required' });
    }

    try {
      const comments = await Comment.find({
        post: id,
        answer: { $eq: null }, // main threads
      })
        .populate('author')
        .populate({ path: 'thread', populate: 'author' });

      res.json(comments);
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Delete comment
   * @returns status 200 if OK
   * @returns status 400 if missing parameters
   * @returns status 500 if internal server error
   */
  static async delete(req: Request<{ id: string }>, res: Response<{ message: string }>) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    try {
      await Comment.findById(id);
    } catch (e) {
      return res.status(400).json({ message: 'Comment not found' });
    }

    try {
      // Delete all thread comments
      await Comment.deleteMany({ answer: id });
      // Delete comment
      await Comment.findByIdAndDelete(id);

      res.json({ message: 'Comment deleted' });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
