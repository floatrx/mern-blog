import { ReactElement, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { ErrorBoundary } from '@/components/hoc/error-boundary';
import { useDocumentTitle } from '@/hooks/use-document-title';
import type { RouteItem } from '@/types/route';
import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';
import LoginUserForm from '@/components/features/user/login-user-form';

/**
 * LazyComponent HOC with ErrorBoundary and Suspense
 * @param Element - react lazy Component (Component = lazy(() => import('path')))
 * @param title - page title
 * @param icon
 * @param path
 * @param auth
 * @constructor
 */
export const LazyComponent = ({ element: Element, title, icon, path, isPrivate }: RouteItem): ReactElement => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // Update document title
  useDocumentTitle(title, path);

  // Nested routes as Outlet
  if (!Element) return <Outlet />;

  if (isPrivate && !isLoggedIn) return <LoginUserForm />;

  return (
    <Suspense fallback={<Spinner spinning />}>
      <ErrorBoundary>
        <Element title={title} icon={icon} />
      </ErrorBoundary>
    </Suspense>
  );
};
