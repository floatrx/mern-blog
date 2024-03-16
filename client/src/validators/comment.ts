import { validateString } from '@/validators/index';
import { z } from 'zod';

const text = validateString('Comment message');

export const createCommentSchema = z.object({ text });
