import { validateString } from '@/validators/index';
import { z } from 'zod';

export const createTagSchema = z.object({
  name: validateString('Name'),
});
