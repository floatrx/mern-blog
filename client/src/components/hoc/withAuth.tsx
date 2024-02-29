import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';

export const withAuth =
  <P extends Record<string, unknown>>(WrappedComponent: React.ComponentType<P>) =>
  (props: P) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    if (!isLoggedIn) return null;

    return <WrappedComponent {...props} />;
  };
