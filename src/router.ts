import { Router } from 'express';
import { PostController } from '@/post/PostController';
import { UserController } from '@/user/UserController';

export const router = Router()
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
