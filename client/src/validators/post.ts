import { validateString } from '@/validators/index';
import { z } from 'zod';

export const createPostSchema = z.object({
  title: validateString('Title'),
  body: validateString('Body'),
  thumbnail: z
    .string()
    .regex(/^https?:\/\//gim, {
      message: 'Thumbnail must be a valid URL.',
    })
    .optional(),
});
