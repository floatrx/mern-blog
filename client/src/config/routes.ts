import { lazy } from "react";
import type { RouteItem } from "@/types/route";

/**
 * Lazy loaded components
 * @see https://reactjs.org/docs/code-splitting.html#reactlazy
 */

// -- General
const Overview = lazy(() => import('@/components/pages/overview'));
const Page404 = lazy(() => import('@/components/pages/page404'));
// -- User
const UserLoginForm = lazy(() => import('@/components/features/user/login-user-form'));
const UsersSearchPage = lazy(() => import('@/components/features/user/users-search-page'));
const UserProfilePage = lazy(() => import('@/components/features/user/profile-page'));
// -- Post
const PostSinglePage = lazy(() => import('@/components/features/post/post-single-page'));
const CreatePostForm = lazy(() => import('@/components/features/post/create-post-form'));
const UpdatePostForm = lazy(() => import('@/components/features/post/update-post-form'));
// -- Tag
const TagsSearchPage = lazy(() => import('@/components/features/tag/tags-search-page'));

export const routes: RouteItem[] = [
  {
    path: '/',
    element: Overview,
  },
  {
    path: 'login',
    element: UserLoginForm,
  },
  {
    path: 'tags',
    element: TagsSearchPage,
    isPrivate: true,
  },
  {
    path: 'users',
    element: UsersSearchPage,
    isPrivate: true,
  },
  {
    path: 'posts',
    children: [
      {
        path: 'create',
        title: 'Create Post',
        element: CreatePostForm,
        isPrivate: true,
      },
      {
        path: ':id',
        element: PostSinglePage,
      },
      {
        path: ':id/edit',
        title: 'Update Post',
        element: UpdatePostForm,
        isPrivate: true,
      },
    ],
  },
  {
    path: 'profile',
    element: UserProfilePage,
    isPrivate: true,
  },
  {
    path: '*',
    element: Page404,
  },
];
