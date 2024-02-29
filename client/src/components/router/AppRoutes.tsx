import type { ReactNode } from 'react';
import { AuthRequired } from '@/components/router/AuthRequired';
import { CreatePostForm } from '@/components/features/post/CreatePostForm';
import { CreateUserForm } from '@/components/features/user/CreateUserForm';
import { LoginUserForm } from '@/components/features/user/LoginUserForm';
import { Overview } from '@/components/Overview';
import { Page404 } from '@/components/Page404';
import { PostSinglePage } from '@/components/features/post/PostSinglePage';
import { Route, Routes } from 'react-router-dom';
import { UpdatePostForm } from '@/components/features/post/UpdatePostForm';
import { UserList } from '@/components/features/user/UserList';

type RouteItem = {
  path: string;
  children?: RouteItem[];
  element?: ReactNode;
};

// Define a type for the routes array
const routes: RouteItem[] = [
  {
    path: '/',
    element: <Overview />,
  },
  {
    path: 'users',
    children: [
      {
        path: 'create',
        element: <AuthRequired element={<CreateUserForm />} />,
      },
      {
        path: 'list',
        element: <UserList />,
      },
    ],
  },
  {
    path: 'posts',
    children: [
      {
        path: 'create',
        element: <AuthRequired element={<CreatePostForm />} />,
      },
      {
        path: ':id',
        element: <PostSinglePage />,
      },
      {
        path: ':id/edit',
        element: <AuthRequired element={<UpdatePostForm />} />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginUserForm />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

/**
 * Render routes recursively
 * @param routes
 */
const renderRoutes = (routes?: RouteItem[]) => {
  if (!routes) return null;
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {'children' in route && renderRoutes(route?.children)}
    </Route>
  ));
};

export const AppRoutes = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};
