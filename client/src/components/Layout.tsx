import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';
import { BiKey, BiUser, BiUserPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const menuItems = [
  { to: '/list', label: 'Users', icon: <BiUser /> },
  { to: '/add', label: 'New', icon: <BiUserPlus /> },
  { type: 'divider' },
  { to: '/login', label: 'Login', icon: <BiKey /> },
];

export const Layout = (props: PropsWithChildren) => (
  <>
    <header className="flex items-center gap-5 p-1">
      <h1 className="m-2 text-2xl font-bold">
        <span className="">Blog</span>
      </h1>
      <nav className="flex flex-auto items-center gap-5">
        <ul className="flex flex-auto space-x-2">
          {menuItems.map((item, index) => (
            <li key={index} className={cn({ 'flex-1': !item.to })}>
              {item.to && (
                <Link to={item.to} className="flex items-center gap-2 rounded bg-gray-100 px-3 py-2">
                  {item.icon} {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>

    <main>{props.children}</main>
  </>
);
