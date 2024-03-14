import { Router } from "express";
import { requireAdmin, requireAuth } from "@/middleware/auth";

import { AuthController } from "@/controllers/auth";
import { BucketController } from "@/controllers/bucket";
import { PostController } from "@/controllers/post";
import { TagController } from "@/controllers/tag";
import { UserController } from "@/controllers/user";

/**
 * API main routes
 * @version 1.0
 * @see Post
 * @see UserController
 */
export const router = Router()
  // Welcome route
  .get("/test", (_req, res) => {
    res.status(200).send("👋 Express server!");
  })

  // -- Public API --

  // Login
  .post("/auth/login", AuthController.login)
  .get("/auth/check", requireAuth, AuthController.check)
  .post("/auth/refresh", AuthController.refreshToken)

  // Post
  .post("/posts", requireAuth, PostController.create)
  .get("/posts", PostController.search)
  .get("/posts/:id", PostController.show)
  .put("/posts/:id", requireAuth, PostController.update)
  .put("/posts/:id/tag", requireAuth, PostController.toggleTag)
  .delete("/posts/:id", requireAuth, PostController.delete)

  // Tags
  .post("/tags", requireAuth, requireAdmin, TagController.create)
  .get("/tags", TagController.list)
  .get("/tags/:id", TagController.show)
  .put("/tags/:id", requireAuth, requireAdmin, TagController.update)
  .delete("/tags/:id", requireAuth, requireAdmin, TagController.delete)

  // User
  // TODO: profile, profile/update
  .post("/users", requireAuth, requireAdmin, UserController.create)
  .get("/users", UserController.list)
  .get("/users/:id", UserController.show)
  .put("/users/:id", requireAuth, requireAdmin, UserController.update)
  .delete("/users/:id", requireAuth, requireAdmin, UserController.delete)

  // Upload file to S3
  .post("/upload", requireAuth, BucketController.uploadOne)
  .post("/upload/bulk", requireAuth, BucketController.uploadBulk);
