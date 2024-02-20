import { Router } from 'express';
import { PostController } from '@/post/PostController';
import { UserController } from '@/user/UserController';

/**
 * API main routes
 * @version 1.0
 * @see PostController
 * @see UserController
 */
export const router = Router()
  // Welcome route
  .get('/test', (_req, res) => {
    res.status(200).send('👋 Express server!');
  })

  // Post CRUD routes
  .post('/posts', PostController.create)
  .get('/posts', PostController.list)
  .get('/posts/:id', PostController.show)
  .put('/posts/:id', PostController.update)
  .delete('/posts/:id', PostController.delete)

  // User CRUD routes
  .post('/users', UserController.create)
  .get('/users', UserController.list)
  .get('/users/:id', UserController.show)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete)

  // User posts
  .get('/users/posts', UserController.publications);
