import { type PropsWithChildren } from 'react';

import { SITE_NAME } from '@/config/const';

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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container my-8 flex-1">{props.children}</main>

      <footer className="border-t">
        <div className="container p-4 text-xs text-gray-400">
          <p>© 2021 {SITE_NAME}. Test project for learning purposes.</p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
};
