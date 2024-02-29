import { z } from 'zod';
import { validateString } from '@/validators/index';

export const createTagSchema = z.object({
  name: validateString('Name'),
});
