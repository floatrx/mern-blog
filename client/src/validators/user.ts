import { validateEmail, validatePassword, validateString } from '@/validators/index';
import { z } from 'zod';

const name = validateString('Username').regex(/^[a-zA-Z\s]+$/, { message: 'Username must contain only letters.' });
const email = validateEmail('Email');
const password = validatePassword('Password');

export const createUserSchema = z.object({ name, email, password });

export const updateUserSchema = z.object({ name, email, password: password.optional() });

export const loginUserSchema = z.object({ email, password });
