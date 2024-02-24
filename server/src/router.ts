import { AuthController } from '@/controllers/auth';
import { Router } from 'express';
import { PostController } from '@/controllers/post';
import { UserController } from '@/controllers/user';
import { requireAuth } from '@/middleware/auth';

/**
 * API main routes
 * @version 1.0
 * @see Post
 * @see UserController
 */
export const router = Router()
  // Welcome route
  .get('/test', (_req, res) => {
    res.status(200).send('👋 Express server!');
  })

  // Public API

  // Login
  .post('/auth/login', AuthController.login)
  .get('/auth/check', requireAuth, AuthController.check)

  // Post CRUD routes
  .post('/posts', requireAuth, PostController.create)
  .get('/posts', PostController.list)
  .get('/posts/:id', PostController.show)
  .put('/posts/:id', PostController.update)
  .delete('/posts/:id', PostController.delete)

  // User CRUD routes
  .post('/users', UserController.create)
  .get('/users', UserController.list)
  .get('/users/:id', UserController.show)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete);
