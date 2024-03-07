import { validateEmail, validatePassword, validateString } from '@/validators/index';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: validateString('Username').regex(/^[a-zA-Z\s]+$/, { message: 'Username must contain only letters.' }),
  email: validateEmail('Email'),
  password: validatePassword('Password'),
});

// Login schema
export const loginUserSchema = z.object({
  email: validateEmail('Email'),
  password: validatePassword('Password'),
});
