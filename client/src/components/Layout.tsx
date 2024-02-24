import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';
import { BiKey, BiUser, BiUserPlus, BiLeaf } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { UsersCounter } from '@/components/user/UsersCounter';

const menuItems = [
  { to: '/list', label: 'Users', icon: <BiUser />, counter: <UsersCounter variant="outline" /> },
  { to: '/add', label: 'New', icon: <BiUserPlus /> },
  { type: 'divider' },
  { to: '/login', label: 'Login', icon: <BiKey /> },
];

export const Layout = (props: PropsWithChildren) => (
  <>
    <header className="flex items-center gap-5 p-1">
      <h1 className="m-2 text-2xl font-bold">
        <Link to="/" className="flex items-center gap-1 text-blue-500">
          <BiLeaf className="text-green-500" />
          MongoBlog
        </Link>
      </h1>

      <nav className="flex flex-auto items-center gap-5">
        <ul className="flex flex-auto space-x-2">
          {menuItems.map((item, index) => (
            <li key={index} className={cn({ 'flex-1': !item.to })}>
              {item.to && (
                <Link to={item.to} className="flex items-center gap-2 px-3 py-2">
                  {item.icon} {item.label} {item?.counter}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>

    <main className="flex-1 border-2 px-2 py-10">{props.children}</main>

    <footer className="border-t">
      <div className="p-4 text-xs text-gray-400">
        <p>© 2021 MongoBlog. Test project for learning purposes.</p>
      </div>
    </footer>
  </>
);
