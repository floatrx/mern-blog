import { CreateUserForm } from '@/components/user/CreateUserForm';
import { Page404 } from '@/components/Page404';
import { LoginUserForm } from '@/components/user/LoginUserForm';
import { Route, Routes } from 'react-router-dom';
import { UserList } from '@/components/user/UserList';

export const AppRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<UserList />} />
      <Route path="add" element={<CreateUserForm />} />
      <Route path="list" element={<UserList />} />
      <Route path="login" element={<LoginUserForm />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  </Routes>
);
