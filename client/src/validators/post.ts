import { z } from 'zod';
import { validateString } from '@/validators/index';

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
