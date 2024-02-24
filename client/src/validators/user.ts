import { z } from 'zod';
import { validateEmail, validatePassword, validateString } from '@/validators/index';

export const createUserSchema = z.object({
  name: validateString('Username').regex(/^[a-zA-Z]+$/, { message: 'Username must contain only letters.' }),
  email: validateEmail('Email'),
  password: validatePassword('Password'),
});

// Login schema
export const loginUserSchema = z.object({
  email: validateEmail('Email'),
  password: validatePassword('Password'),
});
