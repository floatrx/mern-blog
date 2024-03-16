import { Request, Response } from 'express';
import type { IComment, ICreateCommentPayload } from '@/types/comment';
import { Comment } from '@/models/comment';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '@/config';
import type { ITokenPayload } from '@/types/auth';

export class CommentController {
  static async post(req: Request<never, never, ICreateCommentPayload>, res: Response<IComment | { message: string }>) {
    const { text, thread, post } = req.body;

    if (!text || !post) {
      return res.status(400).json({ message: 'text and post are required' });
    }

    let author: string | null = null;
    if (req.headers.authorization) {
      // Try get user from request if authorized
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decodedToken = jwt.verify(token, TOKEN_SECRET_KEY) as ITokenPayload;
        author = decodedToken.id;
      } catch (e) {
        // console.log('Error decoding token', e);
      }
    }

    try {
      const newComment = await Comment.create({ text, post, author, thread: null });

      const parentComment = thread ? await Comment.findById(thread) : null;
      if (parentComment) {
        // upsert comment to parent thread
        console.log('upsert comment to parent thread', thread, newComment);
        await Comment.findByIdAndUpdate(thread, { $addToSet: { thread: newComment } });
      }

      res.json(newComment);
    } catch (e) {
      res.status(500).json({ message: 'Internal server errors' });
    }
  }

  static async list(req: Request, res: Response<IComment[] | { message: string }>) {
    // get comments when thread array is empty

    try {
      const comments = await Comment.find().populate('author');

      res.json(comments);
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async threads(req: Request, res: Response<IComment[] | { message: string }>) {
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
}
