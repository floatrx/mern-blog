import { CreatePostForm } from '@/components/post/CreatePostForm';
import { CreateUserForm } from '@/components/user/CreateUserForm';
import { LoginUserForm } from '@/components/user/LoginUserForm';
import { Page404 } from '@/components/Page404';
import { Route, Routes } from 'react-router-dom';
import { UserList } from '@/components/user/UserList';
import { PostSinglePage } from '@/components/post/PostSinglePage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<UserList />} />
      <Route path="users">
        <Route path="create" element={<CreateUserForm />} />
        <Route path="list" element={<UserList />} />
      </Route>
      <Route path="posts">
        <Route path="create" element={<CreatePostForm />} />
        <Route path=":id" element={<PostSinglePage />} />
      </Route>
      <Route path="login" element={<LoginUserForm />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  </Routes>
);
