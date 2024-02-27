import type { PropsWithChildren } from 'react';
import { Leaf, SquarePen, UserRoundPlus, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserProfileButton } from '@/components/features/user/UserProfileButton';
import { UsersCounter } from '@/components/features/user/UsersCounter';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';

const menuItems = [
  { to: '/users/list', label: 'Users', icon: <UsersRound />, counter: <UsersCounter variant="outline" /> },
  { to: '/users/create', label: 'New', icon: <UserRoundPlus />, private: true },
  { to: '/posts/create', label: 'Post', icon: <SquarePen />, private: true },
  { type: 'divider' },
];

export const Layout = (props: PropsWithChildren) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <>
      <header className="flex items-center gap-5 p-1">
        <h1 className="m-2 text-2xl font-bold">
          <Link to="/" className="flex items-center gap-1 text-blue-500">
            <Leaf className="text-green-500" />
            MongoBlog
          </Link>
        </h1>

        <nav className="flex flex-auto items-center gap-5">
          <ul className="flex flex-auto space-x-2">
            {menuItems.map((item, index) => (
              <li key={index} className={cn({ 'flex-1': !item.to })}>
                {item.to && (!item.private || (item.private && isLoggedIn)) && (
                  <Link to={item.to} className="flex items-center gap-2 px-3 py-2">
                    {item.icon} {item.label} {item?.counter}
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
      </header>

      <main className="my-2 flex-1 p-10">{props.children}</main>

      <footer className="border-t">
        <div className="p-4 text-xs text-gray-400">
          <p>© 2021 MongoBlog. Test project for learning purposes.</p>
        </div>
      </footer>
    </>
  );
};
