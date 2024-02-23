import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Username must be at least 2 characters.',
    })
    .regex(/^[a-zA-Z]+$/, {
      message: 'Username must contain only letters.',
    }),
  email: z
    .string()
    .email({
      message: 'Invalid email.',
    })
    .min(2, {
      message: 'Email must be at least 2 characters.',
    }),
  password: z
    .string()
    .min(4, {
      message: 'Password must be at least 2 characters.',
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Password must contain only letters and numbers.',
    }),
});
