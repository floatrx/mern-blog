import { type PropsWithChildren } from 'react';

import { useCheckAuthQuery } from '@/api/auth';
import { SITE_NAME } from '@/config/const';
import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';

import { Header } from '@/components/ui/layout/header';
import { Toaster } from '@/components/ui/toaster';

/**
 * Main layout
 * - Header (logo & navigation)
 * - Main (greedy height)
 * - Footer
 * @param props
 * @constructor
 */
export const Layout = (props: PropsWithChildren) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // Check auth if session artifacts are present (persisted storage)
  useCheckAuthQuery(undefined, { skip: !isLoggedIn });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container my-8 flex-1">{props.children}</main>

      <footer className="border-t">
        <div className="container p-4 text-xs text-gray-400">
          <p>
            © 2021 {SITE_NAME}. Test project for learning purposes.{' '}
            <a href="https://github.com/floatrx/mern-blog" target="_blank" rel="noopener" className="text-blue-500">
              GitHub.
            </a>{' '}
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
};
