import { Request, Response } from 'express';
import { Post } from '@/models/post';
import { User } from '@/models/user';
import type { IPost, IPostCreatePayload } from '@/types/post';
import { wait } from '@/lib/wait';

export class PostController {
  /**
   * Create a new post
   * @returns status 201 if OK
   * @returns status 400 if missing parameters
   * @returns status 404 if author not found
   */
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

    try {
      // Create a new post with the provided author
      const post = await Post.create({ title, body, thumbnail, authorId });

      // Respond with the created post
      res.status(201).json(post);
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Get all posts
   * @returns status 200 if OK
   */
  static async list(_req: Request, res: Response) {
    try {
      const posts = await Post.find().populate('author').populate('tags').sort({ createdAt: -1 }); // populate author field with user data
      const response = posts.map((post) => ({
        ...post.toJSON(),
        body: post.body.length > 300 ? post.body.substring(0, 200) + '...' : post.body,
      }));
      await wait(1.5);
      res.json(response);
    } catch (e) {
      res.status(500).json({ message: 'Internal server errors' });
    }
  }

  /**
   * Get one post by ID
   * @returns status 200 if OK
   * @returns status 404 if post not found
   */
  static async show(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }
    try {
      const post = await Post.findById(id).populate('author').populate('tags');
      if (post) {
        res.json(post); // OK
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    } catch (e) {
      res.status(400).json({ status: 'failed', message: e.message });
    }
  }

  /**
   * Update post by ID
   * @returns status 200 if OK
   */
  static async update(req: Request<{ id: string }, never, IPost>, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    try {
      const { title, body, authorId } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(id, { title, body, authorId });
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
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: 'invalid post id' });
    }

    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      console.log('deletedPost', deletedPost);
      if (deletedPost) {
        res.json({ message: `${id} deleted` });
      } else {
        res.status(400).json({ message: 'post already deleted' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Tags
  static async tag(req: Request<{ id: string }, IPost, { tagId: string }>, res: Response) {
    const { id } = req.params;
    const { tagId } = req.body;

    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: 'post not found' });
    }

    try {
      const queryAction = post?.tags.includes(tagId) ? '$pull' : '$addToSet';
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { [queryAction]: { tags: tagId } },
        { new: true }, // This ensures that the updated document is returned
      );
      res.json(updatedPost);
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
