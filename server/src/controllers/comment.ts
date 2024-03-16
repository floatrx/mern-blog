import { Request, Response } from 'express';
import type { IComment, ICreateCommentPayload } from '@/types/comment';
import { Comment } from '@/models/comment';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '@/config';
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
      // Check if is a thread comment (answer)
      const parentComment = thread ? await Comment.findById(thread) : null;
      // Create a new comment
      const newComment = await Comment.create({ text, post, author, answer: parentComment ? parentComment._id : null });

      if (parentComment) {
        // upsert comment to parent thread
        await Comment.findByIdAndUpdate(thread, { $addToSet: { thread: newComment } });
      }

      res.json(newComment);
    } catch (e) {
      res.status(500).json({ message: 'Internal server errors' });
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

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(400).json({ message: 'Comment not found' });
    }

    try {
      // Find comments which include this comment as thread and delete from thread
      // await Comment.findByIdAndUpdate(comment.id, { $pull: { thread: id } });
      // Delete comment
      await Comment.findByIdAndDelete(id);

      res.json({ message: 'Comment deleted' });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
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
      const comments = await Comment.find({ thread: { $exists: true, $ne: [] } })
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
   * @returns status 400 if post not found
   * @returns status 500 if internal server error
   */
  static async threadByPostId(req: Request<{ id: string }>, res: Response<IComment[] | { message: string }>) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    try {
      // Check if post exists
      await Comment.findById(id);
    } catch (e) {
      res.status(400).json({ message: 'Post not found' });
    }

    try {
      const comments = await Comment.find({
        post: id,
        answer: { $eq: null }, // main threads
      })
        .populate('author')
        .populate('thread');

      res.json(comments);
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
