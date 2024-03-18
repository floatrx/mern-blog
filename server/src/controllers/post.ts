import { Post } from '@/models/post';
import { Request, Response } from 'express';
import { User } from '@/models/user';

import type { IPost, IPostCreatePayload, IPostUpdatePayload } from '@/types/post';
import { handleError } from '@/middleware/handleError';

/**
 * Post Controller contains static methods for post operations
 * @class
 */
export class PostController {
  /**
   * Create a new post
   * @returns status 201 if OK
   * @returns status 400 if missing parameters
   * @returns status 404 if author not found
   */
  @handleError()
  static async create(req: Request<never, never, IPostCreatePayload>, res: Response) {
    const { title, body, thumbnail } = req.body;

    const authorId = req.userData?.id;
    if (!authorId) {
      return res.status(401).json({ message: 'login required' });
    }

    // Check for missing or invalid parameters
    if (!title || !body) {
      return res.status(400).json({ message: 'missing post details' });
    }

    try {
      await User.findById(authorId); // Check if user with specified authorId exists
    } catch (e) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Create a new post with the provided author
    const post = await Post.create({ title, body, thumbnail, author: authorId });

    // Respond with the created post
    res.status(201).json(post);
  }

  /**
   * Get all posts
   * @returns status 200 if OK
   */
  @handleError()
  static async search(req: Request<never, IPost[], never, { title: string }>, res: Response) {
    const { title = '' } = req.query;
    const query = { title: { $regex: new RegExp(title, 'i') } };
    const posts = await Post.find(query).populate('author').populate('tags').sort({ createdAt: -1 }); // populate author field with user data
    const response = posts.map((post) => ({
      ...post.toJSON(),
      body: post.body.length > 300 ? post.body.substring(0, 200) + '...' : post.body,
    }));
    res.json(response);
  }

  /**
   * Get one post by ID
   * @returns status 200 if OK
   * @returns status 404 if post not found
   */
  @handleError()
  static async show(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }
    const post = await Post.findById(id).populate('author').populate('tags');
    if (post) {
      res.json(post); // OK
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  }

  /**
   * Update post by ID
   * @returns status 200 if OK
   */
  @handleError()
  static async update(req: Request<{ id: string }, IPost, IPostUpdatePayload>, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    try {
      const { title, body, thumbnail } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(id, { title, body, thumbnail });
      return res.status(200).json(updatedPost);
    } catch (e) {
      console.log('error', e.message);
      return res.status(400).json({ status: 'failed', message: e.message });
    }
  }

  /**
   * Delete post by ID
   * @returns status 204 if OK
   * @returns status 400 if post already deleted
   */
  @handleError()
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: 'invalid post id' });
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    if (deletedPost) {
      res.json({ message: `${id} deleted` });
    } else {
      res.status(400).json({ message: 'post already deleted' });
    }
  }

  /**
   * Toggle tag on post
   * @returns status 200 if OK
   * @returns status 400 if post not found
   * @returns status 500 if internal server error
   */
  @handleError()
  static async toggleTag(req: Request<{ id: string }, IPost, { tagId: string }>, res: Response) {
    const { id } = req.params;
    const { tagId } = req.body;

    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: 'post not found' });
    }

    const queryAction = post?.tags.includes(tagId) ? '$pull' : '$addToSet';
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { [queryAction]: { tags: tagId } },
      { new: true }, // This ensures that the updated document is returned
    );
    res.json(updatedPost);
  }
}
