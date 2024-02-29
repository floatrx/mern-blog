import type { PropsWithChildren } from 'react';
import { Hash, Leaf, SquarePen, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserProfileButton } from '@/components/features/user/UserProfileButton';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';
import { Toaster } from '@/components/ui/toaster';
import { PostsCounter } from '@/components/features/post/PostsCounter';
import { UsersCounter } from '@/components/features/user/UsersCounter';
import { TagsCounter } from '@/components/features/tag/TagsCounter';

const menuItems = [
  { type: 'divider' },
  { to: '/users', label: 'Users', icon: <UsersRound />, counter: <UsersCounter /> },
  { to: '/tags', label: 'Tags', icon: <Hash />, counter: <TagsCounter /> },
  { to: '/posts/create', label: 'Post', icon: <SquarePen />, private: true, counter: <PostsCounter /> },
  { type: 'divider' },
];

export const Layout = (props: PropsWithChildren) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 flex w-full items-center gap-5 bg-background p-1 shadow">
        <div className="container flex h-16 items-center space-x-4 sm:space-x-0">
          <h1 className="m-2 mr-5 text-2xl">
            <Link to="/" className="flex items-center gap-1">
              <Leaf />
              <span className="font-bold">Mongo</span>
              Blog
            </Link>
          </h1>

          <nav className="flex flex-auto items-center gap-5">
            <ul className="flex flex-auto space-x-2">
              {menuItems.map((item, index) => (
                <li key={index} className={cn({ 'flex-1': !item.to })}>
                  {item.to && (!item.private || (item.private && isLoggedIn)) && (
                    <Link to={item.to} className="flex items-center gap-2 px-3 py-2">
                      {item.icon} {item.label} {item.counter}
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

      <main className="container my-2 flex-1 p-10">{props.children}</main>

      <footer className="border border-t">
        <div className="container p-4 text-xs text-gray-400">
          <p>© 2021 MongoBlog. Test project for learning purposes.</p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
};
