import type { PropsWithChildren } from 'react';
import { Leaf, SquarePen, UserRoundPlus, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserProfileButton } from '@/components/features/user/UserProfileButton';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';
import { Toaster } from '@/components/ui/toaster';

const menuItems = [
  { to: '/users/list', label: 'Users', icon: <UsersRound /> },
  { to: '/users/create', label: 'New', icon: <UserRoundPlus />, private: true },
  { to: '/posts/create', label: 'Post', icon: <SquarePen />, private: true },
  { type: 'divider' },
];

export const Layout = (props: PropsWithChildren) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <div className="flex min-h-screen flex-col border">
      <header className="sticky top-0 z-40 flex w-full items-center gap-5 border border-b bg-background p-1">
        <div className="container flex h-16 items-center space-x-4 border sm:justify-between sm:space-x-0">
          <h1 className="m-2 border text-2xl font-bold">
            <Link to="/" className="flex items-center gap-1 text-blue-500">
              <Leaf className="text-green-500" />
              MongoBlog
            </Link>
          </h1>

          <nav className="flex flex-auto items-center gap-5 border">
            <ul className="flex flex-auto space-x-2">
              {menuItems.map((item, index) => (
                <li key={index} className={cn({ 'flex-1': !item.to })}>
                  {item.to && (!item.private || (item.private && isLoggedIn)) && (
                    <Link to={item.to} className="flex items-center gap-2 px-3 py-2">
                      {item.icon} {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <UserProfileButton />
              </li>
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container my-2 flex-1 border  p-10">{props.children}</main>

      <footer className="border border-t">
        <div className="container p-4 text-xs text-gray-400">
          <p>© 2021 MongoBlog. Test project for learning purposes.</p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
};
