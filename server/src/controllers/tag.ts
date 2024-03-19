import { Request, Response } from 'express';
import { Tag } from '@/models/tag';
import { handleAsyncErrors } from '@/middleware/handle-error';

import type { ITag, ITagCreatePayload } from '@/types/tag';

/**
 * Tag Controller contains static methods for tag operations
 */
@handleAsyncErrors
export class TagController {
  /**
   * Create a new tag
   * @returns status 201 if OK
   * @returns status 400 if missing parameters
   * @returns status 404 if author not found
   */
  static async create(req: Request<never, never, ITagCreatePayload>, res: Response) {
    const { name } = req.body;

    // Check for missing or invalid parameters
    if (!name) {
      return res.status(400).json({ message: 'missing name' });
    }

    // Create a new tag with the provided author
    const tag = await Tag.create({ name });

    // Respond with the created tag
    res.status(201).json(tag);
  }

  /**
   * Get all tags
   * @returns status 200 if OK
   */
  static async list(req: Request<never, never, never, { name: string }>, res: Response) {
    const { name = '' } = req.query;

    const query = { name: { $regex: new RegExp(name, 'i') } };
    const tags = await Tag.find(query); // populate author field with user data
    res.json(tags);
  }

  /**
   * Get one tag by ID
   * @returns status 200 if OK
   * @returns status 404 if tag not found
   */
  static async show(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }
    const tag = await Tag.findById(id);
    if (tag) {
      res.json(tag); // OK
    } else {
      res.status(404).json({ message: 'tag not found' });
    }
  }

  /**
   * Update tag by ID
   * @returns status 200 if OK
   */
  static async update(req: Request<{ id: string }, never, ITag>, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    const { name } = req.body;
    const updatedTag = await Tag.findByIdAndUpdate(id, { name });
    return res.status(200).json(updatedTag);
  }

  /**
   * Delete tag by ID
   * @returns status 204 if OK
   * @returns status 400 if tag already deleted
   */
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }

    const deletedTag = await Tag.findByIdAndDelete(id);
    if (deletedTag) {
      res.json({ message: `${id} deleted` });
    } else {
      res.status(400).json({ message: 'tag already deleted' });
    }
  }
}
