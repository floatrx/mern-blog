import { Router } from 'express';
import { requireAuth } from '@/middleware/auth';

import { AuthController } from '@/controllers/auth';
import { BucketController } from '@/controllers/bucket';
import { PostController } from '@/controllers/post';
import { TagController } from '@/controllers/tag';
import { UserController } from '@/controllers/user';

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

  // -- Public API --

  // Login
  .post('/auth/login', AuthController.login)
  .get('/auth/check', requireAuth, AuthController.check)

  // Post
  .post('/posts', requireAuth, PostController.create)
  .get('/posts', PostController.list)
  .get('/posts/:id', PostController.show)
  .put('/posts/:id', requireAuth, PostController.update)
  .delete('/posts/:id', requireAuth, PostController.delete)
  .put('/posts/:id/tag', requireAuth, PostController.tag)

  // Post
  .post('/tags', requireAuth, TagController.create)
  .get('/tags', TagController.list)
  .get('/tags/:id', TagController.show)
  .put('/tags/:id', requireAuth, TagController.update)
  .delete('/tags/:id', requireAuth, TagController.delete)

  // User
  .post('/users', UserController.create)
  .get('/users', UserController.list)
  .get('/users/:id', UserController.show)
  .put('/users/:id', requireAuth, UserController.update)
  .delete('/users/:id', requireAuth, UserController.delete)

  // Upload to S3
  .post('/upload', BucketController.uploadOne)
  .post('/upload/bulk', BucketController.uploadBulk);
