import { LoginUserForm } from '@/components/features/user/LoginUserForm';
import { selectIsLoggedIn } from '@/store/auth';
import { useAppSelector } from '@/hooks/redux';
import type { ReactNode } from 'react';

export const AuthRequired = (props: { element: ReactNode }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? props.element : <LoginUserForm />;
};
